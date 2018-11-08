// module.exports = app => {
//   // Your code here
//   app.log('Yay, the app was loaded!')

//   app.on('issues.opened', async context => {
//     const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
//     return context.github.issues.createComment(issueComment)
//   })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
// }

module.exports = app => {
  app.on('pull_request.opened', async context => {
    // An issue was just opened.
    console.log("jhvbfhjbfj");
    console.log(context);
    const params = context.issue({ body: JSON.stringify(context) })

    // Post a comment on the issue
    return context.github.issues.createComment(params);
  })
}
