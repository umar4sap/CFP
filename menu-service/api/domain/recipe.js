'use strict';
var Q = require('q');
var _ = require('lodash'),
    dbconfig = require('../../config/db'),
    dbUtils = require('../helpers/db/db'),
    RecipeMetadata = require('../helpers/transformer/recipeMetadata'),
    Logger = require('bunyan');
var request = require("request");
var moment = require('moment');
var log = new Logger.createLogger({
    name: 'recipe-service',
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
recipe.prototype.data = {}


function recipe(data) {
    recipe.prototype.data = data;
}
function verification(data) {
    verification.prototype.data = data;
}

recipe.prototype.getData = function () {
    return recipe.prototype.data;
}
verification.prototype.getData = function () {
    return verification.prototype.data;
}


// create new recipe for airline
recipe.prototype.createRecipe=(traceId,userId, cb) => {

    var recipeMetadata = new RecipeMetadata(recipe.prototype.data).getData();
    recipeMetadata.createdDTS= moment.utc().format();
    recipeMetadata.updatedDTS= moment.utc().format();
    // recipeMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // recipeMetadata.listedDate=new Date();
    recipeMetadata.recipeedBy=userId;
    //recipeMetadata.carrierCode=carrierCode;
   // recipeMetadata.airlineId=airlineId;
    var response = {
        message: "Cannot create the recipe.",
        statusCode: 404,
        errorCode: "code1"
    }
     rdb.table("cfp_recipe_tb").insert(recipeMetadata).run().then(function (recipeData) {
         console.log(JSON.stringify(recipeData.generated_keys[0]));
             var resObj = { "status": "200", "data": { "message": "Your recipe has been submitted and the recipe id is -> "+ recipeData.generated_keys[0] } }
                    cb(null,resObj);
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }

// update recipe for owner
recipe.prototype.updateRecipeById =(traceId, recipeId , cb) => {
    recipe.prototype.data['updatedDTS'] = moment.utc().format();
    var recipeMetadata = new RecipeMetadata(recipe.prototype.data).getData();
   
     rdb.table("cfp_recipe_tb").get(recipeId).update(recipeMetadata).run().then(function(recipeData) {
             var resObj = { "status": "200", "data": { "message": "RecipeID : "+recipeId+ " Recipe info is updated"} }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    var resObj = { "status": "404", "error": err };
                    cb(resObj);
                });  
        }


// delete recipe
recipe.prototype.deleteRecipe= ( traceId,recipeId, cb) => {
    var response = {
        message: "Cannot Delete the recipe.",
        statusCode: 404,
        errorCode: "code1"
    }
    rdb.table("cfp_recipe_tb").get(recipeId).delete().run().then(function (result) {
        cb(null, result);
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", "traceId", JSON.stringify(err));
       
        cb(response);
    });
}

// list all recipe for platform admin level
recipe.prototype.findAllRecipes = (traceId,cb) => {
    var response = {
        message: "Cannot Get all recipe issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0s

        
        rdb.table("cfp_recipe_tb").run().then(function (result) {
            rdb.table("cfp_recipe_tb").count().run().then(function (result2) {
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


// get recipe 
recipe.prototype.getOneRecipe= (traceId,recipeId, cb) => {
    rdb.table("cfp_recipe_tb").get(recipeId).run().then(function (result) {

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


// list all recipe for platform admin level
recipe.prototype.findAllRecipesWithStatus = (traceId,status,cb) => {
    var response = {
        message: "Cannot Get all recipe issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0s

        
        rdb.table("cfp_recipe_tb").filter({"mealStatus":status}).run().then(function (result) {
            rdb.table("cfp_recipe_tb").filter({"mealStatus":status}).count().run().then(function (result2) {
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
recipe.prototype.searchRecipe=(traceId, cb) => {
    // menu.prototype.data['createdDTS'] = moment.utc().format();
    // menu.prototype.data['updatedDTS'] = moment.utc().format();
    var recipeMetadata = new RecipeMetadata(recipe.prototype.data).getData();
    
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
    if(!recipeMetadata.all){
     rdb.table("cfp_recipe_tb").filter(recipeMetadata).run().then(function (recipedata) {
         console.log(JSON.stringify(recipedata));
             var resObj = { "status": "200", "data": recipedata }
                    cb(null,resObj);
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }
    else{
        rdb.table("cfp_recipe_tb").run().then(function (recipedata) {
            console.log(JSON.stringify(recipedata));
                var resObj = { "status": "200", "data": recipedata }
                       cb(null,resObj);
                   }).catch(function (err) {
                       console.log("first err catch")
                       log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                       
                       cb(response);
                   });  
           }
        
    }




module.exports = recipe;
