'use strict';
var Q = require('q');
var _ = require('lodash'),
    dbconfig = require('../../config/db'),
    dbUtils = require('../helpers/db/db'),
    IngradientMetadata = require('../helpers/transformer/ingradientMetadata'),
    Logger = require('bunyan');
var request = require("request");
var moment = require('moment');
var log = new Logger.createLogger({
    name: 'ingradient-service',
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
ingradient.prototype.data = {}


function ingradient(data) {
    ingradient.prototype.data = data;
}
function verification(data) {
    verification.prototype.data = data;
}

ingradient.prototype.getData = function () {
    return ingradient.prototype.data;
}
verification.prototype.getData = function () {
    return verification.prototype.data;
}


// create new ingradient for airline
ingradient.prototype.createIngradient=(traceId,userId, cb) => {
    // ingradient.prototype.data['createdDTS'] = moment.utc().format();
    // ingradient.prototype.data['updatedDTS'] = moment.utc().format();
    var ingradientMetadata = new IngradientMetadata(ingradient.prototype.data).getData();
    ingradientMetadata.createdDate=moment.utc().format();
    ingradientMetadata.updatedDate=moment.utc().format();
    // ingradientMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // ingradientMetadata.listedDate=new Date();
    ingradientMetadata.createddBy=userId;
    ingradientMetadata.updatedBy=userId;
    //ingradientMetadata.carrierCode=carrierCode;
   // ingradientMetadata.airlineId=airlineId;
    var response = {
        message: "Cannot create the ingradient.",
        statusCode: 404,
        errorCode: "code1"
    }
     rdb.table("cfp_ingradient_tb").insert(ingradientMetadata).run().then(function (ingradientData) {
         console.log(JSON.stringify(ingradientData.generated_keys[0]));
             var resObj = { "status": "200", "data": { "message": "Your ingradient has been submitted and the ingradient id is -> "+ ingradientData.generated_keys[0] } }
                    cb(null,resObj);
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }

// update ingradient for owner
ingradient.prototype.updateIngradientById =(traceId, ingradientId , cb) => {
    ingradient.prototype.data['updatedDTS'] = moment.utc().format();
    var ingradientMetadata = new IngradientMetadata(ingradient.prototype.data).getData();
   
     rdb.table("cfp_ingradient_tb").get(ingradientId).update(ingradientMetadata).run().then(function(ingradientData) {
             var resObj = { "status": "200", "data": { "message": "IngradientID : "+ingradientId+ " Ingradient info is updated"} }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    var resObj = { "status": "404", "error": err };
                    cb(resObj);
                });  
        }


// delete ingradient
ingradient.prototype.deleteIngradient= ( traceId,ingradientId, cb) => {
    var response = {
        message: "Cannot Delete the ingradient.",
        statusCode: 404,
        errorCode: "code1"
    }
    rdb.table("cfp_ingradient_tb").get(ingradientId).delete().run().then(function (result) {
        cb(null, result);
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", "traceId", JSON.stringify(err));
       
        cb(response);
    });
}

// list all ingradient for platform admin level
ingradient.prototype.findAllIngradients = (traceId,cb) => {
    var response = {
        message: "Cannot Get all ingradient issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0s

        
        rdb.table("cfp_ingradient_tb").run().then(function (result) {
            rdb.table("cfp_ingradient_tb").count().run().then(function (result2) {
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


// get ingradient 
ingradient.prototype.getOneIngradient= (traceId,ingradientId, cb) => {
    rdb.table("cfp_ingradient_tb").get(ingradientId).run().then(function (result) {

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


// list all ingradient for platform admin level
ingradient.prototype.findAllIngradientsWithStatus = (traceId,status,cb) => {
    var response = {
        message: "Cannot Get all ingradient issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0s

        
        rdb.table("cfp_ingradient_tb").filter({"mealStatus":status}).run().then(function (result) {
            rdb.table("cfp_ingradient_tb").filter({"mealStatus":status}).count().run().then(function (result2) {
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



// search ingradient 
ingradient.prototype.searchIngradient=(traceId, cb) => {
    // ingradient.prototype.data['createdDTS'] = moment.utc().format();
    // ingradient.prototype.data['updatedDTS'] = moment.utc().format();
    var ingradientMetadata = new IngradientMetadata(ingradient.prototype.data).getData();
    
    // ingradientMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // ingradientMetadata.listedDate=new Date();
    // ingradientMetadata.ingradientedBy=userId;
    //ingradientMetadata.carrierCode=carrierCode;
   // ingradientMetadata.airlineId=airlineId;
    var response = {
        message: "Cannot get the ingradient.",
        statusCode: 404,
        errorCode: "code1"
    }
    if(!ingradientMetadata.all){
     rdb.table("cfp_ingradient_tb").filter(ingradientMetadata).run().then(function (ingradientData) {
         console.log(JSON.stringify(ingradientData));
             var resObj = { "status": "200", "data": ingradientData }
                    cb(null,resObj);
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }else{
            rdb.table("cfp_ingradient_tb").run().then(function (ingradientData) {
                console.log(JSON.stringify(ingradientData));
                    var resObj = { "status": "200", "data": ingradientData }
                           cb(null,resObj);
                       }).catch(function (err) {
                           console.log("first err catch")
                           log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                           
                           cb(response);
                       }); 
        }
    }





module.exports = ingradient;
