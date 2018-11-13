const express = require("express");
const bodyParser = require("body-parser");
const appq = express();
const gitlab = require("./gitlab");
const curl = new (require("curl-request"))();

module.exports = app => {
  app.on(['pull_request.opened', 'pull_request.synchronize'], async context => {
    // An issue was just opened.


    const params = context.issue({ body: JSON.stringify(context) });
    console.log(context);
    // Post a comment on the issue
    // return context.github.issues.createComment(params);
    console.log(context.payload.repository.name);
    console.log(context.payload.number)
    curl
    .setHeaders([
      "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
      "token:b7c7c99c4d63fde3ed338b942554b2",
      "ref:master"
    ]).setBody({'ref':'bot','token':'b7c7c99c4d63fde3ed338b942554b2','variables[repo]':`${context.payload.repository.name}`,'variables[pull]':`${context.payload.number}`})
    .post("https://gitlab.openebs.ci/api/v4/projects/8/trigger/pipeline")
    .then(({ statusCode, body, headers }) => {
      console.log(statusCode, body, headers);
    })
    .catch(e => {
      console.log(e);
    });
    return context.github.issues.createComment(params);
  });

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
