'use strict';
var Q = require('q');
var _ = require('lodash'),
    dbconfig = require('../../config/db'),
    dbUtils = require('../helpers/db/db'),
    TemplateMetadata = require('../helpers/transformer/templateMetadata'),
    Logger = require('bunyan');
var request = require("request");
var moment = require('moment');
var log = new Logger.createLogger({
    name: 'template-service',
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
template.prototype.data = {}


function template(data) {
    template.prototype.data = data;
}
function verification(data) {
    verification.prototype.data = data;
}

template.prototype.getData = function () {
    return template.prototype.data;
}
verification.prototype.getData = function () {
    return verification.prototype.data;
}


// create new template for airline
template.prototype.createTemplate=(traceId,userId, cb) => {
    // template.prototype.data['createdDTS'] = moment.utc().format();
    // template.prototype.data['updatedDTS'] = moment.utc().format();
    var templateMetadata = new TemplateMetadata(template.prototype.data).getData();
    templateMetadata.createdDate=moment.utc().format();
    templateMetadata.updatedDate=moment.utc().format();
    // templateMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // templateMetadata.listedDate=new Date();
    templateMetadata.createddBy=userId;
    templateMetadata.updatedBy=userId;
    //templateMetadata.carrierCode=carrierCode;
   // templateMetadata.airlineId=airlineId;
    var response = {
        message: "Cannot create the template.",
        statusCode: 404,
        errorCode: "code1"
    }
     rdb.table("cfp_template_tb").insert(templateMetadata).run().then(function (templateData) {
         console.log(JSON.stringify(templateData.generated_keys[0]));
             var resObj = { "status": "200", "data": { "message": "Your template has been submitted and the template id is -> "+ templateData.generated_keys[0] } }
                    cb(null,resObj);
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }

// update template for owner
template.prototype.updateTemplateById =(traceId, templateId , cb) => {
    template.prototype.data['updatedDTS'] = moment.utc().format();
    var templateMetadata = new TemplateMetadata(template.prototype.data).getData();
   
     rdb.table("cfp_template_tb").get(templateId).update(templateMetadata).run().then(function(templateData) {
             var resObj = { "status": "200", "data": { "message": "TemplateID : "+templateId+ " Template info is updated"} }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    var resObj = { "status": "404", "error": err };
                    cb(resObj);
                });  
        }


// delete template
template.prototype.deleteTemplate= ( traceId,templateId, cb) => {
    var response = {
        message: "Cannot Delete the template.",
        statusCode: 404,
        errorCode: "code1"
    }
    rdb.table("cfp_template_tb").get(templateId).delete().run().then(function (result) {
        cb(null, result);
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", "traceId", JSON.stringify(err));
       
        cb(response);
    });
}

// list all template for platform admin level
template.prototype.findAllTemplates = (traceId,cb) => {
    var response = {
        message: "Cannot Get all template issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0s

        
        rdb.table("cfp_template_tb").run().then(function (result) {
            rdb.table("cfp_template_tb").count().run().then(function (result2) {
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


// get template 
template.prototype.getOneTemplate= (traceId,templateId, cb) => {
    rdb.table("cfp_template_tb").get(templateId).run().then(function (result) {

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


// list all template for platform admin level
template.prototype.findAllTemplatesWithStatus = (traceId,status,cb) => {
    var response = {
        message: "Cannot Get all template issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0s

        
        rdb.table("cfp_template_tb").filter({"mealStatus":status}).run().then(function (result) {
            rdb.table("cfp_template_tb").filter({"mealStatus":status}).count().run().then(function (result2) {
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



// search template 
template.prototype.searchTemplate=(traceId, cb) => {
    // template.prototype.data['createdDTS'] = moment.utc().format();
    // template.prototype.data['updatedDTS'] = moment.utc().format();
    var templateMetadata = new TemplateMetadata(template.prototype.data).getData();
    
    // templateMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // templateMetadata.listedDate=new Date();
    // templateMetadata.templateedBy=userId;
    //templateMetadata.carrierCode=carrierCode;
   // templateMetadata.airlineId=airlineId;
    var response = {
        message: "Cannot get the template.",
        statusCode: 404,
        errorCode: "code1"
    }
    if(!templateMetadata.all){
     rdb.table("cfp_template_tb").filter(templateMetadata).run().then(function (templateData) {
         console.log(JSON.stringify(templateData));
             var resObj = { "status": "200", "data": templateData }
                    cb(null,resObj);
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }else{
            rdb.table("cfp_template_tb").run().then(function (templateData) {
                console.log(JSON.stringify(templateData));
                    var resObj = { "status": "200", "data": templateData }
                           cb(null,resObj);
                       }).catch(function (err) {
                           console.log("first err catch")
                           log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                           
                           cb(response);
                       }); 
        }
    }





module.exports = template;
