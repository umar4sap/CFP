'use strict';
var Q = require('q');
var _ = require('lodash'),
    dbconfig = require('../../config/db'),
    dbUtils = require('../helpers/db/db'),
    OrderMetadata = require('../helpers/transformer/orderMetadata'),
    WhatsappClient = require('../helpers/client/whatsapp-client'),
    AnalyticsClient = require('../helpers/client/reporting-client'),
    Logger = require('bunyan');
var request = require("request");
var moment = require('moment');
var log = new Logger.createLogger({
    name: 'order-processing-service',
    serializers: { req: Logger.stdSerializers.req }
});
var rdb = require('rethinkdbdash')({
    pool: true,
    cursor: false,
    port: dbconfig.rethinkdb.port,
    host: dbconfig.rethinkdb.host,
    db: dbconfig.rethinkdb.db
});
const uuidv4 = require('uuid/v4');
order.prototype.data = {}


function order(data) {
    order.prototype.data = data;
}
function verification(data) {
    verification.prototype.data = data;
}

order.prototype.getData = function () {
    return order.prototype.data;
}
verification.prototype.getData = function () {
    return verification.prototype.data;
}


// create new order for airline
order.prototype.createOrder=(traceId,userId,carrierCode, cb) => {
    order.prototype.data['createddate'] = moment.utc().format();
    order.prototype.data['updatedate'] = moment.utc().format();
    var orderMetadata = new OrderMetadata(order.prototype.data).getData();
    
    // orderMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // orderMetadata.listedDate=new Date();
    orderMetadata.orderedBy=userId;
    orderMetadata.carrierCode=carrierCode;
   // orderMetadata.airlineId=airlineId;
    var response = {
        message: "Cannot create the order.",
        statusCode: 404,
        errorCode: "code1"
    }
     rdb.table("cfp_order_processing_tb").insert(orderMetadata).run().then(function (orderData) {
         console.log(JSON.stringify(orderData.generated_keys[0]));
        var  message="Catering Order for Flight "+ orderMetadata.carrierCode+orderMetadata.flightNo+" is sent for your review and approval for order id "+orderData.generated_keys[0] +" expected deleviry date "+orderMetadata.expectedDeliveryDateAndTime;
         WhatsappClient.sendWhatsAppMessage(message,"traceid",function(err,res){
         if(!err){
             console.log("notified"+res);
         }else{
            console.log("unable to notify"+err);
         }
         })
         AnalyticsClient.sendToReporting(orderMetadata,orderData.generated_keys[0],"traceid",function(err,res){
            if(!err){
                console.log("sent to analystics"+res);
            }else{
               console.log("unable to send to analystics"+err);
            }
            })
             var resObj = { "status": "200", "data": { "message": "Your order has been submitted and the order id is -> "+ orderData.generated_keys[0] } }
                    cb(null,resObj);
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }

// update order for owner
order.prototype.updateOrderById =(traceId, orderId , cb) => {
    order.prototype.data['updatedDTS'] = moment.utc().format();
    var orderMetadata = new OrderMetadata(order.prototype.data).getData();
   
     rdb.table("cfp_order_processing_tb").get(orderId).update(orderMetadata).run().then(function(orderData) {
             var resObj = { "status": "200", "data": { "message": "OrderID : "+orderId+ " Order info is updated"} }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    var resObj = { "status": "404", "error": err };
                    cb(resObj);
                });  
        }


// delete order
order.prototype.deleteorder= ( traceId,orderId, cb) => {
    var response = {
        message: "Cannot Delete the order.",
        statusCode: 404,
        errorCode: "code1"
    }
    rdb.table("cfp_order_processing_tb").get(orderId).delete().run().then(function (result) {
        cb(null, result);
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", "traceId", JSON.stringify(err));
       
        cb(response);
    });
}

// list all order for platform admin level
order.prototype.findAllOrdersForAirline = (traceId,carrierCode,cb) => {
    var response = {
        message: "Cannot Get all order issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0

        
        rdb.table("cfp_order_processing_tb").filter({"carrierCode":carrierCode}).run().then(function (result) {
            rdb.table("cfp_order_processing_tb").filter({"carrierCode":carrierCode}).count().run().then(function (result2) {
            if (result.length > 0) {
                                    var resObj = { "status": "200", "data": result,"count":result2}
                                    cb(null, resObj);
                } else {
                    var resObj = { "status": "200", "data": result ,"count":result2}
                    cb(null, resObj);
                }

                }).catch(function (err) {
                    var resObj = { "status": "200", "data":  result,"count":"count db error" }
                        cb(null, resObj);
                })
            
            
            
           
        }).catch(function (err) {
            log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            
            cb(response);
        });
   
}


// get order 
order.prototype.getOneOrder= (traceId,orderId, cb) => {
    rdb.table("cfp_order_processing_tb").get(orderId).run().then(function (result) {

        if (result.length > 0) {
                        var resObj = { "status": "200", "data": result }
                        cb(null, resObj);
                
        } else {
            var resObj = { "status": "200", "data": result }
            cb(null, resObj);
        }
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
        var resObj = { "status": "404", "error": err }
        cb(resObj);
    })
}


// list all order for platform admin level
order.prototype.findAllOrdersWithStatus = (traceId,status,boardingPoint,cb) => {
    var response = {
        message: "Cannot Get all order issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0

        
        rdb.table("cfp_order_processing_tb").filter({"boardingPoint":boardingPoint,"orderStatus":status}).run().then(function (result) {
            rdb.table("cfp_order_processing_tb").filter({"boardingPoint":boardingPoint,"orderStatus":status}).count().run().then(function (result2) {
            if (result.length > 0) {
                                    var resObj = { "status": "200", "data": result,"count":result2}
                                    cb(null, resObj);
                } else {
                    var resObj = { "status": "200", "data": result ,"count":result2}
                    cb(null, resObj);
                }

                }).catch(function (err) {
                    var resObj = { "status": "200", "data":  result,"count":"count db error" }
                        cb(null, resObj);
                })
            
            
            
           
        }).catch(function (err) {
            log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            
            cb(response);
        });
   
}





module.exports = order;
