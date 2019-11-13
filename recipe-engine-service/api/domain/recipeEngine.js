'use strict';
var Q = require('q');
var _ = require('lodash'),
    dbconfig = require('../../config/db'),
    dbUtils = require('../helpers/db/db'),
    EnginerecipeMetadata = require('../helpers/transformer/recipeEngineMetadata'),
    recipeClient = require('../helpers/client/recipeclient'),
    Logger = require('bunyan');
var request = require("request");
var moment = require('moment');
var log = new Logger.createLogger({
    name: 'enginerecipe-service',
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
enginerecipe.prototype.data = {}


function enginerecipe(data) {
    enginerecipe.prototype.data = data;
}
function verification(data) {
    verification.prototype.data = data;
}

enginerecipe.prototype.getData = function () {
    return enginerecipe.prototype.data;
}
verification.prototype.getData = function () {
    return verification.prototype.data;
}


// create new enginerecipe for airline
enginerecipe.prototype.processRecipe=(traceId,userId, cb) => {
    // enginerecipe.prototype.data['createdDTS'] = moment.utc().format();
    // enginerecipe.prototype.data['updatedDTS'] = moment.utc().format();
    var enginerecipeMetadata = new EnginerecipeMetadata(enginerecipe.prototype.data).getData();
    enginerecipeMetadata.createdDate=moment.utc().format();
    enginerecipeMetadata.updatedDate=moment.utc().format();
    // enginerecipeMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // enginerecipeMetadata.listedDate=new Date();
    enginerecipeMetadata.createddBy=userId;
    enginerecipeMetadata.updatedBy="Recipe Engine";
    //enginerecipeMetadata.carrierCode=carrierCode;
   // enginerecipeMetadata.airlineId=airlineId;
    var response = {
        message: "Cannot create the enginerecipe.",
        statusCode: 404,
        errorCode: "code1"
    }
  var measurementTypes=['kg','g','ml']
  generateRecipe(enginerecipeMetadata,function(err,res){
      if(!err){
        enginerecipeMetadata.enginerecipeStatus="READY"
    rdb.table("cfp_recipe_engine_tb").insert(enginerecipeMetadata).run().then(function (enginerecipeData) {
        console.log(JSON.stringify(enginerecipeData.generated_keys[0]));
            var resObj = { "status": "200", "data": enginerecipeMetadata }
                   cb(null,resObj);
               }).catch(function (err) {
                   console.log("first err catch")
                   log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                   
                   cb(response);
               });  
            }else{
                enginerecipeMetadata.enginerecipeStatus="FAILED TO GENERATE"
                rdb.table("cfp_recipe_engine_tb").insert(enginerecipeMetadata).run().then(function (enginerecipeData) {
                    console.log(JSON.stringify(enginerecipeData.generated_keys[0]));
                        var resObj = { "status": "200", "data": enginerecipeMetadata }
                               cb(null,resObj);
                           }).catch(function (err) {
                               console.log("first err catch")
                               log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                               
                               cb(response);
                           }); 
            }
  })
    
        }
// create new enginerecipe for airline
enginerecipe.prototype.processAllRecipe=(traceId,userId, cb) => {
    var enginerecipeMetadata = new EnginerecipeMetadata(enginerecipe.prototype.data).getData();
    enginerecipeMetadata.createdDate=moment.utc().format();
    enginerecipeMetadata.updatedDate=moment.utc().format();
    enginerecipeMetadata.createddBy=userId;
    enginerecipeMetadata.updatedBy="Recipe Engine";
    var response = {
        message: "Cannot create the enginerecipe.",
        statusCode: 404,
        errorCode: "code1"
    }
  var measurementTypes=['kg','g','ml']
  var recipesList=enginerecipeMetadata.recipes;
  generateRecipes(enginerecipeMetadata,recipesList);
  console.log("initiated recipe generation for order "+enginerecipeMetadata.order_processing_id)
  var resObj = { "status": "200", "data": { "message": enginerecipeMetadata.order_processing_id+ " Recipe info is initiated"} }
  cb(null,resObj);
  
  
        }






// update enginerecipe for owner
enginerecipe.prototype.updateEnginerecipeById =(traceId, enginerecipeId , cb) => {
    enginerecipe.prototype.data['updatedDTS'] = moment.utc().format();
    var enginerecipeMetadata = new EnginerecipeMetadata(enginerecipe.prototype.data).getData();
   
     rdb.table("cfp_recipe_engine_tb").get(enginerecipeId).update(enginerecipeMetadata).run().then(function(enginerecipeData) {
             var resObj = { "status": "200", "data": { "message": "EnginerecipeID : "+enginerecipeId+ " Enginerecipe info is updated"} }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    var resObj = { "status": "404", "error": err };
                    cb(resObj);
                });  
        }


// delete enginerecipe
enginerecipe.prototype.deleteEnginerecipe= ( traceId,enginerecipeId, cb) => {
    var response = {
        message: "Cannot Delete the enginerecipe.",
        statusCode: 404,
        errorCode: "code1"
    }
    rdb.table("cfp_recipe_engine_tb").get(enginerecipeId).delete().run().then(function (result) {
        cb(null, result);
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", "traceId", JSON.stringify(err));
       
        cb(response);
    });
}

// list all enginerecipe for platform admin level
enginerecipe.prototype.findAllEnginerecipes = (traceId,cb) => {
    var response = {
        message: "Cannot Get all enginerecipe issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0s

        
        rdb.table("cfp_recipe_engine_tb").run().then(function (result) {
            rdb.table("cfp_recipe_engine_tb").count().run().then(function (result2) {
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


// get enginerecipe 
enginerecipe.prototype.getOneEnginerecipe= (traceId,recipeId,order_processing_id, cb) => {
    rdb.table("cfp_recipe_engine_tb").filter({"recipe_id":recipeId,"order_processing_id":order_processing_id}).run().then(function (result) {

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


// list all enginerecipe for platform admin level
enginerecipe.prototype.findAllEnginerecipesWithStatus = (traceId,status,cb) => {
    var response = {
        message: "Cannot Get all enginerecipe issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0s

        
        rdb.table("cfp_recipe_engine_tb").filter({"mealStatus":status}).run().then(function (result) {
            rdb.table("cfp_recipe_engine_tb").filter({"mealStatus":status}).count().run().then(function (result2) {
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



// search enginerecipe 
enginerecipe.prototype.searchEnginerecipe=(traceId, cb) => {
    // enginerecipe.prototype.data['createdDTS'] = moment.utc().format();
    // enginerecipe.prototype.data['updatedDTS'] = moment.utc().format();
    var enginerecipeMetadata = new EnginerecipeMetadata(enginerecipe.prototype.data).getData();
    
    // enginerecipeMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // enginerecipeMetadata.listedDate=new Date();
    // enginerecipeMetadata.enginerecipeedBy=userId;
    //enginerecipeMetadata.carrierCode=carrierCode;
   // enginerecipeMetadata.airlineId=airlineId;
    var response = {
        message: "Cannot get the enginerecipe.",
        statusCode: 404,
        errorCode: "code1"
    }
    if(!enginerecipeMetadata.all){
     rdb.table("cfp_recipe_engine_tb").filter(enginerecipeMetadata).run().then(function (enginerecipeData) {
         console.log(JSON.stringify(enginerecipeData));
             var resObj = { "status": "200", "data": enginerecipeData }
                    cb(null,resObj);
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }else{
            rdb.table("cfp_recipe_engine_tb").run().then(function (enginerecipeData) {
                console.log(JSON.stringify(enginerecipeData));
                    var resObj = { "status": "200", "data": enginerecipeData }
                           cb(null,resObj);
                       }).catch(function (err) {
                           console.log("first err catch")
                           log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                           
                           cb(response);
                       }); 
        }
    }

    // search enginerecipe 
enginerecipe.prototype.getAllWithenginerecipeCodes=(traceId, cb) => {
    // enginerecipe.prototype.data['createdDTS'] = moment.utc().format();
    // enginerecipe.prototype.data['updatedDTS'] = moment.utc().format();
    var enginerecipeMetadata = new EnginerecipeMetadata(enginerecipe.prototype.data).getData();
    
    // enginerecipeMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // enginerecipeMetadata.listedDate=new Date();
    // enginerecipeMetadata.enginerecipeedBy=userId;
    //enginerecipeMetadata.carrierCode=carrierCode;
   // enginerecipeMetadata.airlineId=airlineId;
    var response = {
        message: "Cannot get the enginerecipe.",
        statusCode: 404,
        errorCode: "code1"
    }
   
            rdb.table("cfp_recipe_engine_tb").getAll.apply(rdb.table("cfp_recipe_engine_tb"),enginerecipeMetadata.ids).run().then(function (enginerecipeData) {
                console.log(JSON.stringify(enginerecipeData));
                    var resObj = { "status": "200", "data": enginerecipeData }
                           cb(null,resObj);
                       }).catch(function (err) {
                           console.log("first err catch")
                           log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                           
                           cb(response);
                       }); 
        
    }



 function generateRecipes(enginerecipeMetadata,recipesList){
    var totalRecipe=enginerecipeMetadata.recipes.length;
    var regeratedRecipe=0;
    recipesList.forEach(element => {
        enginerecipeMetadata.recipe_id=element.recipe_id;
        enginerecipeMetadata.paxCount=element.paxCount;
        enginerecipeMetadata.crewCount=element.crewCount;
        generateRecipe(enginerecipeMetadata,function(err,res){
            if(!err){
                res.enginerecipeStatus="READY"
          rdb.table("cfp_recipe_engine_tb").insert(enginerecipeMetadata).run().then(function (enginerecipeData) {
              console.log(JSON.stringify(enginerecipeData.generated_keys[0]));
              regeratedRecipe=regeratedRecipe+1;
              console.log("Generated Recipe for "+enginerecipeData.order_processing_id+" Recipe id "+enginerecipeData.recipe_id)
              if(totalRecipe==regeratedRecipe){
                 console.log("All recipes generated")
              }
                     }).catch(function (err) {
                         console.log("first err catch")
                         log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                         
                         
                     });  
                  }else{
                    err.enginerecipeStatus="FAILED TO GENERATE";
                      console.log("Failed to generate recipe for "+enginerecipeMetadata.recipe_id);
                      rdb.table("cfp_recipe_engine_tb").insert(enginerecipeMetadata).run().then(function (enginerecipeData) {
                          console.log(JSON.stringify(enginerecipeData.generated_keys[0]));
                              var resObj = { "status": "200", "data": enginerecipeMetadata }
                                    
                                 }).catch(function (err) {
                                     console.log("first err catch")
                                     log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                                     
                                    
                                 }); 
                  }
        })
      });  
 }   

function generateRecipe(enginerecipeMetadata,cb){
    recipeClient.getRecipe(enginerecipeMetadata.recipe_id,"test",function(err,res){
        if(!err || res.status=="400"){
            var ingradients=res.data.ingradients;
            var samplePerCount=res.data.perCount;
            var orderPerCount=enginerecipeMetadata.paxCount;
            
            ingradients.forEach(element => {
                if(element.measurement_value){
                var oldIngredientAmount = element.measurement_value;
                var newIngredientAmount = oldIngredientAmount * orderPerCount / samplePerCount;
                element.measurement_value=newIngredientAmount;
                }
            });
            enginerecipeMetadata.ingradients=ingradients;
            return(null,enginerecipeMetadata)
        }else{
            return(enginerecipeMetadata)
        }
        })
    }


module.exports = enginerecipe;
