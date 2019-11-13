'use strict';
var Logger = require('bunyan');
const request = require('request-promise');
const recipe_engine_service = process.env.RECIPE_ENGINE_SERVICE_ENDPOINT|| "http://52.188.192.123:9003";

const basePath= "/cfp/services/recipe-engine-service";

var log = new Logger.createLogger({ 
name: 'recipe-engine-clients', 
serializers: { req: Logger.stdSerializers.req } 
});
//var jwt_token=process.env.WHATS_APP_TOKEN || "eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE1NzM1NTg3MDcsImV4cCI6MTU3NDE2MzUwNywid2E6cmFuZCI6LTc3OTUxODk3NzgwMzU5MTI5OH0.3VkKVXEBgUKOA_enhaCc8l4Z45qwq-l2G2uh9FuStTM";

var generateRecipe = function(requestData, traceId,cb) {
  // var phone_number=process.env.WHATS_APP_NUMBER || "971503961047";
var uri = recipe_engine_service + basePath+"/enginerecipe/all";

   
    request(
    { 
        method: 'POST',
        uri: uri,
        headers: {
           // 'trace-id':traceId
           // "Authorization":"Bearer "+jwt_token,
            "Content-Type": "application/json"
        },
        json:requestData
              
              
        }
    ).then((data) => {
        
       
        cb(null, data );
    }).catch((err) => {
        log.error("TraceId : %s, Error : %s", traceId , JSON.stringify(err));
        var e = new Error(err);
        cb(e);
    });
}


module.exports = {
    generateRecipe: generateRecipe
}
