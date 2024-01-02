require('dotenv').config()
const redis=require('redis')
const redisClient=redis.createClient();
  
(async () => {
    await redisClient.connect();
})();
  
console.log("Connecting to the Redis");
  
redisClient.on("ready", () => {
    console.log("Connected! to the Redis");
});
  
redisClient.on("error", (err) => {
    console.log("Error in the Connection");
});

async function setRedisData(key,value){
    return redisClient.set(key,value)
}

async function getredisData(key){
    return redisClient.get(key)
}

async function setExpiryRedisData(key ,value){
    return redisClient.setEx(key,process.env.REDDIS_EXPIRY_TIME,value)
}
 module.exports={setRedisData,getredisData,setExpiryRedisData}

