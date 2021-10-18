const cluster = require("cluster");
const os = require("os");
if(!cluster.isMaster){
  console.log(cluster.isMaster);
  const cpus = os.cpus.length;
  console.log(os.cpus);
  for(let i=0; i<cpus ; i++){
    cluster.fork()
    console.log(cpus);
  }
  cluster.on('exit',(worker, code, signal)=>{
    if(code !== 0 , !worker.exitedAfterDisconnect){
      console.log(`console.log worker crashed ${worker.id}`);
      cluster.fork();
    }
  })
}else{
  console.log('require');
  require('./app');
}