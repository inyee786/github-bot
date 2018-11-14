const express = require("express");
const bodyParser = require("body-parser");
const appq = express();
const gitlab = require("./gitlab");
const curl = new (require("curl-request"))();
const dbConnection = require("./config/dbconnection");
const dbSchema = require("./config/schema");

module.exports = app => {

// remove the repositories 

app.on(['installation_repositories.removed'],async context =>{
  console.log(JSON.stringify(context));

  for(i=0;i<context.payload.repositories_removed.length;i++){
    dbSchema.repos.collection.deleteOne(
      { repoId: context.payload.repositories_removed[i].id },
      (err, resp) => {
        if (err) {
          console.log("installation is not delete" + err);
        } else {
          console.log("installation is deleted");
        }
      }
    );
  }
})

// add the repositories

app.on(['installation_repositories.added'], async context =>{
for (i = 0; i < context.payload.repositories_added.length; i++) {
  dbSchema.repos.collection.insert(
    {
      name: context.payload.repositories_added[i].name,
      repoId: context.payload.repositories_added[i].id,
      orgName: context.payload.installation.account.login,
      token: "b7c7c99c4d63fde3ed338b942554b2",
      curlUrl:
        "https://gitlab.openebs.ci/api/v4/projects/8/trigger/pipeline",
      ref: "bot",
      active: 1
    },
    (err, resp) => {
      if (err) {
        console.log("error repo details not saved" + err);
      } else {
        console.log("repo details is saved");
      }
    }
  );
}
})

// add organization and repositories at initial time 

  app.on(["installation.created"], async context => {

    //save the organization

    dbSchema.installation.collection.insert(
      {
        name: context.payload.installation.account.login,
        id: context.payload.installation.id,
        type: context.payload.installation.account.type,
        active: 1
      },
      (err, resp) => {
        if (err) {
          console.log("data can't be save to installation collection");
        } else {
          console.log("data is save to installation collection");
        }
      }
    );

    // save the repo
    for (i = 0; i < context.payload.repositories.length; i++) {
      dbSchema.repos.collection.insert(
        {
          name: context.payload.repositories[i].name,
          repoId: context.payload.repositories[i].id,
          orgName: context.payload.installation.account.login,
          token: "b7c7c99c4d63fde3ed338b942554b2",
          curlUrl:
            "https://gitlab.openebs.ci/api/v4/projects/8/trigger/pipeline",
          ref: "bot",
          active: 1
        },
        (err, resp) => {
          if (err) {
            console.log("error repo details not saved" + err);
          } else {
            console.log("repo details is saved");
          }
        }
      );
    }
  });

  // Delete organization and repositories

  app.on(["installation.deleted"], async context => {
    console.log("installation deleted");
    console.log(JSON.stringify(context));

    // Delete data from installation collection
    dbSchema.installation.collection.deleteOne(
      { name: context.payload.installation.account.login },
      (err, resp) => {
        if (err) {
          console.log("installation is not delete" + err);
        } else {
          console.log("installation is deleted");
        }
      }
    );

    // delete data from repo
    dbSchema.repos.collection.deleteMany(
      { orgName: context.payload.installation.account.login },
      (err, resp) => {
        if (err) {
          console.log("repos are not deleted" + err);
        } else {
          console.log("repos are deleted" + resp);
        }
      }
    );
  });


  
  // app.on(['pull_request.opened', 'pull_request.synchronize'], async context => {
  //   // An issue was just opened.

  //   const params = context.issue({ body: JSON.stringify(context) });
  //   console.log(context);
  //   // Post a comment on the issue
  //   // return context.github.issues.createComment(params);
  //   console.log(context.payload.repository.name);
  //   console.log(context.payload.number)
  //   curl
  //   .setHeaders([
  //     "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
  //     "token:b7c7c99c4d63fde3ed338b942554b2",
  //     "ref:master"
  //   ]).setBody({'ref':'bot','token':'b7c7c99c4d63fde3ed338b942554b2','variables[repo]':`${context.payload.repository.name}`,'variables[pull]':`${context.payload.number}`})
  //   .post("https://gitlab.openebs.ci/api/v4/projects/8/trigger/pipeline")
  //   .then(({ statusCode, body, headers }) => {
  //     console.log(statusCode, body, headers);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
  //   return context.github.issues.createComment(params);
  // });

  // curl
  //   .setHeaders([
  //     "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
  //     "token:b7c7c99c4d63fde3ed338b942554b2",
  //     "ref:master"
  //   ]).setBody({'ref':'bot','token':'b7c7c99c4d63fde3ed338b942554b2','variables[branch]':'master','variables[pull]':'20'})
  //   .post("https://gitlab.openebs.ci/api/v4/projects/8/trigger/pipeline")
  //   .then(({ statusCode, body, headers }) => {
  //     console.log(statusCode, body, headers);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });

  // const router = app.route("/my-app");
  // // Use any middleware
  // router.use(require("express").static("public"));
  // // Add a new route
  // router.get("/hello-world", (req, res) => {
  //   res.send("Hello World");
  // });

  // appq.use("/gitlab", gitlab);
};
