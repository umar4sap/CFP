_ = require("underscore");
var Ingradient = require('../domain/ingradient');

module.exports = {
    createIngradient: createIngradient,
    getIngradients: getIngradients,
    updateIngradientWithIngradientId: updateIngradientWithIngradientId,
    getIngradientWithIngradientId: getIngradientWithIngradientId,
    getAllIngradientsWithStatus: getAllIngradientsWithStatus,
    getAllIngradientsWithSearchCretria:getAllIngradientsWithSearchCretria

}



// post a  network
function createIngradient(req, res) {
    // var tokenId = req.headers.authorization;
    var userId = "airlineUser";
    var traceId = "test";
    //var tenantId = req.user.aud;
    
    //var userType= req.user[URL].userType;
    var bodyData = req.swagger.params.body.value;

    (new Ingradient(bodyData)).createIngradient(traceId, userId,
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



function updateIngradientWithIngradientId(req, res) {
    //   var tokenId = req.headers.authorization;
    var userId = "airlineUser"
    var traceId = "test";
    //   var tenantId = req.user.aud;
    //   var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var ingradient_id = req.swagger.params.ingradient_id.value;
    var bodyData = req.swagger.params.body.value;

    (new Ingradient(bodyData)).updateIngradientById(traceId, ingradient_id,
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

function getIngradients(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //    var tenantId = req.user.aud;
    //var carrierCode = req.swagger.params.carrierCode.value;


    //var userType= req.user[URL].userType;
    //  var networkId = req.swagger.params.networkId.value;


    (new Ingradient()).findAllIngradients(traceId,
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


function getIngradientWithIngradientId(req, res) {
    //  var tokenId = req.headers.authorization;
    //   var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //  var tenantId = req.user.aud;
    // var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var ingradient_id = req.swagger.params.ingradient_id.value;


    (new Ingradient()).getOneIngradient(traceId, ingradient_id,
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

function deleteIngradient(req, res) {
    var tokenId = req.headers.authorization;
    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    var tenantId = req.user.aud;
    var ingradient_id = req.swagger.params.ingradient_id.value;
    //var userType= req.user[URL].userType;
    var networkId = req.swagger.params.networkId.value;


    (new Ingradient()).deleteIngradient(traceId, ingradient_id,
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

function getAllIngradientsWithStatus(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //    var tenantId = req.user.aud;
    var status = req.swagger.params.status.value;
  
    //var userType= req.user[URL].userType;
    //  var networkId = req.swagger.params.networkId.value;


    (new Ingradient()).findAllIngradientsWithStatus(traceId, status,
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


function getAllIngradientsWithSearchCretria(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";

    var bodyData = req.swagger.params.body.value;

    (new Ingradient(bodyData)).searchIngradient(traceId,
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
