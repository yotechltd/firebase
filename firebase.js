const credent = require("./firebase.json");
var admin = require('firebase-admin');
app4 = admin.initializeApp({
  application: admin.credential.cert(credent),
});
module.exports.sendMsg = async(req,res)=>{
  try{

  }catch(error){

  }
}