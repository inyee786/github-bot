module.exports = app => {
    // Get an express router to expose new HTTP endpoints
    const router = app.route('/my-app')
  
    // Use any middleware
    router.use(require('express').static('public'))
  
    // Add a new route
    router.get('/hello-world', (req, res) => {
      res.send('Hello World')
    })
  }



// const express = require('express');
// const router = express();

// router.get('/jobstatus', (req, resp) => {
//  console.log(resp);  
// });

// router.post('/post', (req, resp) => {
//     console.log(resp); 
//     resp.status(200).json({test:'test'}); 
//    });
   
// module.exports = router;



// var http = require('http')
// var createHandler = require('node-gitlab-webhook')
// var handler = createHandler([ // multiple handlers
//   { path: 'gitlab', secret: 'development' }
// ])
// // var handler = createHandler({ path: '/webhook1', secret: 'secret1' }) // single handler
//  console.log(handler);
// // http.createServer(function (req, res) {
// //   handler(req, res, function (err) {
// //     res.statusCode = 404
// //     res.end('no such location')
// //   })
// // }).listen(7777)
 
// handler.on('error', function (err) {
//   console.error('Error:', err.message)
// })
 
// handler.on('push', function (event) {
//   console.log(
//     'Received a push event for %s to %s',
//     event.payload.repository.name,
//     event.payload.ref
//   )
//   switch (event.path) {
//     case 'gitlab':
//       console.log(event);
//       break
//   }
// })

