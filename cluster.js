const cluster = require("cluster");
const process = require('process');
const os = require("os");
if(cluster.isMaster){
  const cpus = os.cpus().length;
  for(let i=0; i<cpus ; i++){
    cluster.fork()
  }
  console.log(`Master pid ${process.pid}`);
  console.log(process);
  cluster.on('exit',(worker, code, signal)=>{
    if(code !== 0 , !worker.exitedAfterDisconnect){
      console.log(`console.log worker crashed ${worker.id}`);
      cluster.fork();
    }
  })

  process.on('SIGUSR2', ()=>{
    const workers = cluster.workers;
    const restartWorker = (workerIndex) => {
      const worker = workers[workerIndex];
      if(!worker) return;
      worker.on('exit', () => {
        console.log(workerIndex, worker);
        if(!worker.exitedAfterDisconnect) return;
        cluster.fork.on('listening',()=>{
          console.log(`listening port ${worker}`)
          restartWorker(workerIndex + 1);
        });
      });
      worker.disconnect();
    }
    restartWorker(0);
  })
}else{
  require('./app');
}

//after cluster

// const cluster = require('cluster');
// const http = require('http');
// const cpus = require('os');
// const process = require('process');

// const numCPUs = cpus.cpus().length;

// if (cluster.isMaster) {
//   console.log(`Primary ${process.pid} is running`);
//   console.log(numCPUs);
  
//     cluster.fork();
//   //}
//   // cluster.on('online',(worker, code, signal) => {
//   //   console.log(`worker connect on ${worker.pid}`);
//   // })
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     cluster.fork();
//   });
// } else {
//   // Workers can share any TCP connection
//   // In this case it is an HTTP server
//   http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end('hello world\n').googley();
//   }).listen(8000);

//   console.log(`Worker ${process.pid} started`);
// }