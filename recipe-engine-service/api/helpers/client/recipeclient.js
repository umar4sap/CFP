'use strict';
var Logger = require('bunyan');
const request = require('request-promise');
const recipe_service = process.env.RECIPE_SERVICE_ENDPOINT|| "http://52.188.192.123:9002";

const basePath= "/cfp/services/menu-service";

var log = new Logger.createLogger({ 
name: 'storage-setup', 
serializers: { req: Logger.stdSerializers.req } 
});

var getRecipe = function(recipe_id, traceId,cb) {
   
var uri = recipe_service + basePath + "/recipe/" + recipe_id ;
    request(
    { 
        method: 'GET',
        uri: uri,
        headers: {
            'trace-id':traceId
        }
    }).then((data) => {
        var response = JSON.parse(data);
       
        cb(null, response );
    }).catch((err) => {
        log.error("TraceId : %s, Error : %s", traceId , JSON.stringify(err));
        var e = new Error(err);
        cb(e);
    });
}


module.exports = {
    getRecipe: getRecipe
}
