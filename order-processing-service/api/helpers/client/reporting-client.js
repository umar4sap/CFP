'use strict';
var Logger = require('bunyan');
const request = require('request-promise');
const reporting_service = process.env.REPORTING_SERVICE_ENDPOINT|| "https://waweb-cncwa-test.ek.aero";

const basePath= "/cfporder/_doc/10010";

var log = new Logger.createLogger({ 
name: 'reporting-clients', 
serializers: { req: Logger.stdSerializers.req } 
});
//var jwt_token=process.env.WHATS_APP_TOKEN || "eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE1NzM1NTg3MDcsImV4cCI6MTU3NDE2MzUwNywid2E6cmFuZCI6LTc3OTUxODk3NzgwMzU5MTI5OH0.3VkKVXEBgUKOA_enhaCc8l4Z45qwq-l2G2uh9FuStTM";

var sendToReporting = function(reportingdata,order_id, traceId,cb) {
  // var phone_number=process.env.WHATS_APP_NUMBER || "971503961047";
var uri = reporting_service + basePath;
var requestData={
    "orderID": order_id,
    "OrderCode": reportingdata.orderReceiptNumber,
    "flightNumber":reportingdata.flightNo,
    "flightDate":reportingdata.flightDepartureDateAndTime,
    "Airline": reportingdata.carrierCode,
    "CabinClass": "Y",
    "menuType": "PAX",
    "menuCategory": "Lunch",
    "menusubCategory": "Standard Meal", 
    "categoryDuration": "CAT-5",
    "region": "Asian",
    "recipeType": "Main Course",
    "recipeName": "Veg Biryani",
    "recipeCategory": "Standard Veg Biryani_J",
    "recipeSubCategory": "Indian Vegetarian Meal",
    "descriptions": "This meal is available for  vegetarian passengers. It is usually aromatic and spicy, and incorporates flavours from the Indian sub-continent. It can contain all types of vegetables. It does NOT contain any type of meat or by-products, fish, shellfish, eggs or animal gelatine",
    "orderStatus":"Created",
    "orderdate": reportingdata.updatedate,
    "deliverDate": reportingdata.expectedDeliveryDateAndTime,
    "orderCreated": reportingdata.updatedate
  }
   
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
    sendToReporting: sendToReporting
}
