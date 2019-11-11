_ = require("underscore");
var Template = require('../domain/template');

module.exports = {
    createTemplate: createTemplate,
    getTemplates: getTemplates,
    updateTemplateWithTemplateId: updateTemplateWithTemplateId,
    getTemplateWithTemplateId: getTemplateWithTemplateId,
    getAllTemplatesWithStatus: getAllTemplatesWithStatus,
    getAllTemplatesWithSearchCretria:getAllTemplatesWithSearchCretria,
    getAllTemplatesWithtemplateCodes:getAllTemplatesWithtemplateCodes

}



// post a  network
function createTemplate(req, res) {
    // var tokenId = req.headers.authorization;
    var userId = "airlineUser";
    var traceId = "test";
    //var tenantId = req.user.aud;
    
    //var userType= req.user[URL].userType;
    var bodyData = req.swagger.params.body.value;

    (new Template(bodyData)).createTemplate(traceId, userId,
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



function updateTemplateWithTemplateId(req, res) {
    //   var tokenId = req.headers.authorization;
    var userId = "airlineUser"
    var traceId = "test";
    //   var tenantId = req.user.aud;
    //   var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var template_id = req.swagger.params.template_id.value;
    var bodyData = req.swagger.params.body.value;

    (new Template(bodyData)).updateTemplateById(traceId, template_id,
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

function getTemplates(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //    var tenantId = req.user.aud;
    //var carrierCode = req.swagger.params.carrierCode.value;


    //var userType= req.user[URL].userType;
    //  var networkId = req.swagger.params.networkId.value;


    (new Template()).findAllTemplates(traceId,
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


function getTemplateWithTemplateId(req, res) {
    //  var tokenId = req.headers.authorization;
    //   var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //  var tenantId = req.user.aud;
    // var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var template_id = req.swagger.params.template_id.value;


    (new Template()).getOneTemplate(traceId, template_id,
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

function deleteTemplate(req, res) {
    var tokenId = req.headers.authorization;
    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    var tenantId = req.user.aud;
    var template_id = req.swagger.params.template_id.value;
    //var userType= req.user[URL].userType;
    var networkId = req.swagger.params.networkId.value;


    (new Template()).deleteTemplate(traceId, template_id,
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

function getAllTemplatesWithStatus(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //    var tenantId = req.user.aud;
    var status = req.swagger.params.status.value;
  
    //var userType= req.user[URL].userType;
    //  var networkId = req.swagger.params.networkId.value;


    (new Template()).findAllTemplatesWithStatus(traceId, status,
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


function getAllTemplatesWithSearchCretria(req, res) {
    //    var tokenId = req.headers.authorization;
    //    var userId = req.user.sub.split("|")[1];
    var traceId = "test";

    var bodyData = req.swagger.params.body.value;

    (new Template(bodyData)).searchTemplate(traceId,
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
        function getAllTemplatesWithtemplateCodes(req, res) {
            //    var tokenId = req.headers.authorization;
            //    var userId = req.user.sub.split("|")[1];
            var traceId = "test";
        
            var bodyData = req.swagger.params.body.value;
        
            (new Template(bodyData)).getAllWithtemplateCodes(traceId,
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

