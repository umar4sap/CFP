'use strict';
var Logger = require('bunyan');
const request = require('request-promise');
const whatsapp_service = process.env.WHATSAPP_SERVICE_ENDPOINT|| "https://waweb-cncwa-test.ek.aero";

const basePath= "/v1/messages/";

var log = new Logger.createLogger({ 
name: 'whatsapp-clients', 
serializers: { req: Logger.stdSerializers.req } 
});
var jwt_token=process.env.WHATS_APP_TOKEN || "eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE1NzM1NTg3MDcsImV4cCI6MTU3NDE2MzUwNywid2E6cmFuZCI6LTc3OTUxODk3NzgwMzU5MTI5OH0.3VkKVXEBgUKOA_enhaCc8l4Z45qwq-l2G2uh9FuStTM";

var sendWhatsAppMessage = function(whatsapp_message, traceId,cb) {
   var phone_number=process.env.WHATS_APP_NUMBER || "971503961047";
var uri = whatsapp_service + basePath;
var requestData={
    "to": phone_number,
        "type": "text",
        "recipient_type": "individual",
        "text": {
          "body": whatsapp_message||"Catering Order for Flight EK-0545 is sent for your review and approval"
        }
    }
    request(
    { 
        method: 'POST',
        uri: uri,
        headers: {
           // 'trace-id':traceId
            "Authorization":"Bearer "+jwt_token,
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
    sendWhatsAppMessage: sendWhatsAppMessage
}
