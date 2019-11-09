_ = require("underscore");
var Menu = require('../domain/menu');

module.exports = {
    createMenu: createMenu,
    getMenus: getMenus,
    updateMenuWithMenuId: updateMenuWithMenuId,
    getMenuWithMenuId: getMenuWithMenuId,
    getAllMenusWithStatus: getAllMenusWithStatus,
    getAllMenusWithSearchCretria:getAllMenusWithSearchCretria

}



// post a  network
function createMenu(req, res) {
    // var tokenId = req.headers.authorization;
    var userId = "airlineUser";
    var traceId = "test";
    //var tenantId = req.user.aud;
    
    //var userType= req.user[URL].userType;
    var bodyData = req.swagger.params.body.value;

    (new Menu(bodyData)).createMenu(traceId, userId,
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



function updateMenuWithMenuId(req, res) {
    //   var tokenId = req.headers.authorization;
    var userId = "airlineUser"
    var traceId = "test";
    //   var tenantId = req.user.aud;
    //   var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var menu_id = req.swagger.params.menu_id.value;
    var bodyData = req.swagger.params.body.value;

    (new Menu(bodyData)).updateMenuById(traceId, menu_id,
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

function getMenus(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //    var tenantId = req.user.aud;
    //var carrierCode = req.swagger.params.carrierCode.value;


    //var userType= req.user[URL].userType;
    //  var networkId = req.swagger.params.networkId.value;


    (new Menu()).findAllMenus(traceId,
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


function getMenuWithMenuId(req, res) {
    //  var tokenId = req.headers.authorization;
    //   var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //  var tenantId = req.user.aud;
    // var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var menu_id = req.swagger.params.menu_id.value;


    (new Menu()).getOneMenu(traceId, menu_id,
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

function deleteMenu(req, res) {
    var tokenId = req.headers.authorization;
    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    var tenantId = req.user.aud;
    var menu_id = req.swagger.params.menu_id.value;
    //var userType= req.user[URL].userType;
    var networkId = req.swagger.params.networkId.value;


    (new Menu()).deleteMenu(traceId, menu_id,
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

function getAllMenusWithStatus(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //    var tenantId = req.user.aud;
    var status = req.swagger.params.status.value;
  
    //var userType= req.user[URL].userType;
    //  var networkId = req.swagger.params.networkId.value;


    (new Menu()).findAllMenusWithStatus(traceId, status,
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


function getAllMenusWithSearchCretria(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";

    var bodyData = req.swagger.params.body.value;

    (new Menu(bodyData)).searchMenu(traceId,
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
