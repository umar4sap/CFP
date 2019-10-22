'use strict';
var Q = require('q');
var _ = require('lodash'),
    dbconfig = require('../../config/db'),
    dbUtils = require('../helpers/db/db'),
    NetworkMetadata = require('../helpers/transformer/orderMetadata'),
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
order.prototype.postorder=(traceId, airlineId,userId, cb) => {
    order.prototype.data['createdDTS'] = moment.utc().format();
    order.prototype.data['updatedDTS'] = moment.utc().format();
    var orderMetadata = new NetworkMetadata(order.prototype.data).getData();
    orderMetadata.orderNameSpace="none";
    // orderMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // orderMetadata.listedDate=new Date();
    orderMetadata.createdBy=userId;
    orderMetadata.airlineId=airlineId;
    var response = {
        message: "Cannot create the order.",
        statusCode: 404,
        errorCode: "code1"
    }
     rdb.table("order").insert(orderMetadata).run().then(function (orderData) {
         console.log(JSON.stringify(orderData.generated_keys[0]));
             var resObj = { "status": "200", "data": { "message": "Your order  info published and the order id is -> "+ orderData.generated_keys[0] } }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }

// update order for owner
order.prototype.updateNetworkById =(traceId,airlineId, orderId , cb) => {
    order.prototype.data['updatedDTS'] = moment.utc().format();
    var orderMetadata = new NetworkMetadata(order.prototype.data).getData();
   
     rdb.table("order").get(orderId).update(orderMetadata).run().then(function(orderData) {
             var resObj = { "status": "200", "data": { "message": "Your order info is updated"} }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    var resObj = { "status": "404", "error": err };
                    cb(resObj);
                });  
        }


// delete order
order.prototype.deleteorder= ( traceId,airlineId,orderId, cb) => {
    var response = {
        message: "Cannot Delete the order.",
        statusCode: 404,
        errorCode: "code1"
    }
    rdb.table("order").get(orderId).delete().run().then(function (result) {
        cb(null, result);
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", "traceId", JSON.stringify(err));
       
        cb(response);
    });
}

// list all order for platform admin level
order.prototype.findAllNetworksForCarrier = (traceId,airlineId,cb) => {
    var response = {
        message: "Cannot Get all order issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0

        
        rdb.table("order").filter({"airlineId":airlineId}).run().then(function (result) {
            rdb.table("order").count().run().then(function (result2) {
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
order.prototype.getOneorder= (traceId,airlineId, orderId, cb) => {
    rdb.table("order").get(orderId).run().then(function (result) {

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








module.exports = order;
