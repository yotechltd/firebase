// const process = require('process');
// const app = require('express')();
// process.stdin.resume();
// app.listen(8000,(err)=>{
//   console.log(`port 8000`);
// });
// process.on('SIGINT',()=>{
//   app.listen(8000,(err)=>{
//     console.log(`port 8000`);
//   });
// })
// const handle = (signal) => {
//   console.log(`receiving singnal ${signal}`);
// }
// process.on('SIGUSR1', handle);

// app.get('/',(req,res)=>{
//   res.send('Hello world');
//   process.exit(`SIGINT`);
// })

const process = require('process');

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

console.log('This message is displayed first.');