const  redisClient  = require("./dbconnection")
// const redis=require('redis')
// const redisClient=redis.createClient();
  
async function setRedisData(key,value){
    return redisClient.set(key,value)
}

async function getRedisData(key){
    return redisClient.get(key)
}
module.exports={setRedisData,getRedisData}