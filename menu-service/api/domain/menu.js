'use strict';
var Q = require('q');
var _ = require('lodash'),
    dbconfig = require('../../config/db'),
    dbUtils = require('../helpers/db/db'),
    MenuMetadata = require('../helpers/transformer/menuMetadata'),
    Logger = require('bunyan');
var request = require("request");
var moment = require('moment');
var log = new Logger.createLogger({
    name: 'menu-service',
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
menu.prototype.data = {}


function menu(data) {
    menu.prototype.data = data;
}
function verification(data) {
    verification.prototype.data = data;
}

menu.prototype.getData = function () {
    return menu.prototype.data;
}
verification.prototype.getData = function () {
    return verification.prototype.data;
}


// create new menu for airline
menu.prototype.createMenu=(traceId,userId, cb) => {
    // menu.prototype.data['createdDTS'] = moment.utc().format();
    // menu.prototype.data['updatedDTS'] = moment.utc().format();
    var menuMetadata = new MenuMetadata(menu.prototype.data).getData();
    menuMetadata.createdDate=moment.utc().format();
    menuMetadata.updatedDate=moment.utc().format();
    // menuMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // menuMetadata.listedDate=new Date();
    menuMetadata.createdBy=userId;
    menuMetadata.updatedBy=userId;
    //menuMetadata.carrierCode=carrierCode;
   // menuMetadata.airlineId=airlineId;
    var response = {
        message: "Cannot create the menu.",
        statusCode: 404,
        errorCode: "code1"
    }
     rdb.table("cfp_menu_tb").insert(menuMetadata).run().then(function (menuData) {
         console.log(JSON.stringify(menuData.generated_keys[0]));
             var resObj = { "status": "200", "data": { "message": "Your menu has been submitted and the menu id is -> "+ menuData.generated_keys[0] } }
                    cb(null,resObj);
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }

// update menu for owner
menu.prototype.updateMenuById =(traceId, menuId , cb) => {
    menu.prototype.data['updatedDTS'] = moment.utc().format();
    var menuMetadata = new MenuMetadata(menu.prototype.data).getData();
   
     rdb.table("cfp_menu_tb").get(menuId).update(menuMetadata).run().then(function(menuData) {
             var resObj = { "status": "200", "data": { "message": "MenuID : "+menuId+ " Menu info is updated"} }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    var resObj = { "status": "404", "error": err };
                    cb(resObj);
                });  
        }


// delete menu
menu.prototype.deleteMenu= ( traceId,menuId, cb) => {
    var response = {
        message: "Cannot Delete the menu.",
        statusCode: 404,
        errorCode: "code1"
    }
    rdb.table("cfp_menu_tb").get(menuId).delete().run().then(function (result) {
        cb(null, result);
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", "traceId", JSON.stringify(err));
       
        cb(response);
    });
}

// list all menu for platform admin level
menu.prototype.findAllMenus = (traceId,cb) => {
    var response = {
        message: "Cannot Get all menu issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0s

        
        rdb.table("cfp_menu_tb").run().then(function (result) {
            rdb.table("cfp_menu_tb").count().run().then(function (result2) {
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


// get menu 
menu.prototype.getOneMenu= (traceId,menuId, cb) => {
    rdb.table("cfp_menu_tb").get(menuId).run().then(function (result) {

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


// list all menu for platform admin level
menu.prototype.findAllMenusWithStatus = (traceId,status,cb) => {
    var response = {
        message: "Cannot Get all menu issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0s

        
        rdb.table("cfp_menu_tb").filter({"mealStatus":status}).run().then(function (result) {
            rdb.table("cfp_menu_tb").filter({"mealStatus":status}).count().run().then(function (result2) {
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



// search menu 
menu.prototype.searchMenu=(traceId, cb) => {
    // menu.prototype.data['createdDTS'] = moment.utc().format();
    // menu.prototype.data['updatedDTS'] = moment.utc().format();
    var menuMetadata = new MenuMetadata(menu.prototype.data).getData();
    
    // menuMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // menuMetadata.listedDate=new Date();
    // menuMetadata.menuedBy=userId;
    //menuMetadata.carrierCode=carrierCode;
   // menuMetadata.airlineId=airlineId;
    var response = {
        message: "Cannot get the menu.",
        statusCode: 404,
        errorCode: "code1"
    }
     rdb.table("cfp_menu_tb").filter(menuMetadata).run().then(function (menuData) {
         console.log(JSON.stringify(menuData));
             var resObj = { "status": "200", "data": menuData }
                    cb(null,resObj);
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }





module.exports = menu;
