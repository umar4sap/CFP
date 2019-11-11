_ = require("underscore");
var Enginerecipe = require('../domain/enginerecipe');

module.exports = {
    createEnginerecipe: createEnginerecipe,
    getEnginerecipes: getEnginerecipes,
    updateEnginerecipeWithEnginerecipeId: updateEnginerecipeWithEnginerecipeId,
    getEnginerecipeWithEnginerecipeId: getEnginerecipeWithEnginerecipeId,
    getAllEnginerecipesWithStatus: getAllEnginerecipesWithStatus,
    getAllEnginerecipesWithSearchCretria:getAllEnginerecipesWithSearchCretria,
    getAllEnginerecipesWithenginerecipeCodes:getAllEnginerecipesWithenginerecipeCodes

}



// post a  network
function createEnginerecipe(req, res) {
    // var tokenId = req.headers.authorization;
    var userId = "airlineUser";
    var traceId = "test";
    //var tenantId = req.user.aud;
    
    //var userType= req.user[URL].userType;
    var bodyData = req.swagger.params.body.value;

    (new Enginerecipe(bodyData)).createEnginerecipe(traceId, userId,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}



function updateEnginerecipeWithEnginerecipeId(req, res) {
    //   var tokenId = req.headers.authorization;
    var userId = "airlineUser"
    var traceId = "test";
    //   var tenantId = req.user.aud;
    //   var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var enginerecipe_id = req.swagger.params.enginerecipe_id.value;
    var bodyData = req.swagger.params.body.value;

    (new Enginerecipe(bodyData)).updateEnginerecipeById(traceId, enginerecipe_id,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}

function getEnginerecipes(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //    var tenantId = req.user.aud;
    //var carrierCode = req.swagger.params.carrierCode.value;


    //var userType= req.user[URL].userType;
    //  var networkId = req.swagger.params.networkId.value;


    (new Enginerecipe()).findAllEnginerecipes(traceId,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}


function getEnginerecipeWithEnginerecipeId(req, res) {
    //  var tokenId = req.headers.authorization;
    //   var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //  var tenantId = req.user.aud;
    // var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var enginerecipe_id = req.swagger.params.enginerecipe_id.value;


    (new Enginerecipe()).getOneEnginerecipe(traceId, enginerecipe_id,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}

function deleteEnginerecipe(req, res) {
    var tokenId = req.headers.authorization;
    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    var tenantId = req.user.aud;
    var enginerecipe_id = req.swagger.params.enginerecipe_id.value;
    //var userType= req.user[URL].userType;
    var networkId = req.swagger.params.networkId.value;


    (new Enginerecipe()).deleteEnginerecipe(traceId, enginerecipe_id,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}

function getAllEnginerecipesWithStatus(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //    var tenantId = req.user.aud;
    var status = req.swagger.params.status.value;
  
    //var userType= req.user[URL].userType;
    //  var networkId = req.swagger.params.networkId.value;


    (new Enginerecipe()).findAllEnginerecipesWithStatus(traceId, status,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
}


function getAllEnginerecipesWithSearchCretria(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";

    var bodyData = req.swagger.params.body.value;

    (new Enginerecipe(bodyData)).searchEnginerecipe(traceId,
        function (err, content) {
            console.log('after save...' + content)
            if (err) {
                console.log("errrrrrrrrrrr")
                res.send(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else {
                res.json(content);
            }
        });
    }
        function getAllEnginerecipesWithenginerecipeCodes(req, res) {
            //    var tokenId = req.headers.authorization;
            //    var userId = req.user.sub.split("|")[1];
            var traceId = "test";
        
            var bodyData = req.swagger.params.body.value;
        
            (new Enginerecipe(bodyData)).getAllWithenginerecipeCodes(traceId,
                function (err, content) {
                    console.log('after save...' + content)
                    if (err) {
                        console.log("errrrrrrrrrrr")
                        res.send(JSON.stringify(err));
                        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    } else {
                        res.json(content);
                    }
                });
            }

