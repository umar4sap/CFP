_ = require("underscore");
var Recipe = require('../domain/recipe');

module.exports = {
    createRecipe: createRecipe,
    getRecipes: getRecipes,
    updateRecipeWithRecipeId: updateRecipeWithRecipeId,
    getRecipeWithRecipeId: getRecipeWithRecipeId,
    getAllRecipesWithStatus: getAllRecipesWithStatus,
    getAllRecipseWithSearchCretria:getAllRecipseWithSearchCretria
}



// post a  network
function createRecipe(req, res) {
    // var tokenId = req.headers.authorization;
    var userId = "airlineUser";
    var traceId = "test";
    //var tenantId = req.user.aud;
    
    //var userType= req.user[URL].userType;
    var bodyData = req.swagger.params.body.value;

    (new Recipe(bodyData)).createRecipe(traceId, userId,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(err);
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}



function updateRecipeWithRecipeId(req, res) {
    //   var tokenId = req.headers.authorization;
    var userId = "airlineUser"
    var traceId = "test";
    //   var tenantId = req.user.aud;
    //   var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var recipe_id = req.swagger.params.recipe_id.value;
    var bodyData = req.swagger.params.body.value;

    (new Recipe(bodyData)).updateRecipeById(traceId, recipe_id,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(err);
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}

function getRecipes(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //    var tenantId = req.user.aud;
    //var carrierCode = req.swagger.params.carrierCode.value;


    //var userType= req.user[URL].userType;
    //  var networkId = req.swagger.params.networkId.value;


    (new Recipe()).findAllRecipes(traceId,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(err);
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}


function getRecipeWithRecipeId(req, res) {
    //  var tokenId = req.headers.authorization;
    //   var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //  var tenantId = req.user.aud;
    // var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var recipe_id = req.swagger.params.recipe_id.value;


    (new Recipe()).getOneRecipe(traceId, recipe_id,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(err);
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}

function deleteRecipe(req, res) {
    var tokenId = req.headers.authorization;
    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    var tenantId = req.user.aud;
    var recipe_id = req.swagger.params.recipe_id.value;
    //var userType= req.user[URL].userType;
    var networkId = req.swagger.params.networkId.value;


    (new Recipe()).deleteRecipe(traceId, recipe_id,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(err);
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}

function getAllRecipesWithStatus(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //    var tenantId = req.user.aud;
    var status = req.swagger.params.status.value;
  
    //var userType= req.user[URL].userType;
    //  var networkId = req.swagger.params.networkId.value;


    (new Recipe()).findAllRecipesWithStatus(traceId, status,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(err);
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}


function getAllRecipseWithSearchCretria(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";

    var bodyData = req.swagger.params.body.value;

    (new Recipe(bodyData)).searchRecipe(traceId,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(err);
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}
