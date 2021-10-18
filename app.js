// const cluster = require('cluster');
// const cpus = require('os');
// const http = require('http');
// const process  = require('process');

// const pid = process.pid;

// http.createServer((req,res)=>{
//   for(let i; i<1e7; i++)
//   res.end(`end in port ${pid}`);
// }).listen(8080,()=>{
//   console.log(`started ${pid}`);
// });

// setTimeout(()=>{
//   process.exit(1);
// }, Math.random() * 10000);

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const process = require('process');
const app = require('express')();
const port = process.env.PORT || 8000;
app.use('/geos',(req,res)=>{
  res.send("hello world");
  
    //
  process.exit(1);
})
app.use('/hello', (req,res)=>{
  res.send("Ok it's done");
})
let pro;
if (process.env.ENVIRONMENT !== 'local' && cluster.isMaster) {
    const os = require('os');
    const numberOfWorkers = os.cpus().length;
    // for (let i = 0; i < numberOfWorkers; i++) {
    //     cluster.fork();
    // }
    cluster.fork();
    cluster.on('online', (worker) => {
      pro = worker.process.pid;
      console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    const server = app.listen(port, () => {
        console.log(`Express server listening on port ${port}`);
    });
    
    //==== Socket Initialization only from developement stage ====//
}
