_ = require("underscore");
var Order = require('../domain/order');

module.exports={
    createOrderForAirline:createOrderForAirline,
    getOrderForAirline:getOrderForAirline,
    updateOrderForAirline:updateOrderForAirline,
    deleteOrderForAirline:deleteOrderForAirline,
    getOrderById:getOrderById
}



// post a  network
function createOrderForAirline(req, res) {
   // var tokenId = req.headers.authorization;
   // var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    //var tenantId = req.user.aud;
    //var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var bodyData = req.swagger.params.body.value;
   
            (new Order(bodyData)).postOrder(traceId,carrierId,userId,
                function (err, content) {
                    console.log('after save...'+content)
                    if (err) {
                        console.log("errrrrrrrrrrr")
                        res.send(JSON.stringify(err));
                        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    } else {
                        res.json(content);
                    }
                });
        }



        function updateOrderForAirline(req, res) {
            var tokenId = req.headers.authorization;
            var userId = req.user.sub.split("|")[1];
            var traceId = "test";
            var tenantId = req.user.aud;
            var carrierId = req.swagger.params.carrierId.value;
            //var userType= req.user[URL].userType;
            var networkId = req.swagger.params.networkId.value;
            var bodyData = req.swagger.params.body.value;
           
                    (new Order(bodyData)).updateOrderById(traceId,carrierId,networkId,
                        function (err, content) {
                            console.log('after save...'+content)
                            if (err) {
                                console.log("errrrrrrrrrrr")
                                res.send(JSON.stringify(err));
                                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                            } else {
                                res.json(content);
                            }
                        });
                }

                function getOrderForAirline(req, res) {
                //    var tokenId = req.headers.authorization;
                //    var userId = req.user.sub.split("|")[1];
                    var traceId = "test";
                //    var tenantId = req.user.aud;
                    var carrierId = req.swagger.params.carrierId.value;
                    //var userType= req.user[URL].userType;
                  //  var networkId = req.swagger.params.networkId.value;
                   
                   
                            (new Order()).findAllOrdersForAirline(traceId,carrierId,
                                function (err, content) {
                                    console.log('after save...'+content)
                                    if (err) {
                                        console.log("errrrrrrrrrrr")
                                        res.send(JSON.stringify(err));
                                        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                                    } else {
                                        res.json(content);
                                    }
                                });
                        }


                        function updateOrderForAirline(req, res) {
                            var tokenId = req.headers.authorization;
                            var userId = req.user.sub.split("|")[1];
                            var traceId = "test";
                            var tenantId = req.user.aud;
                            var carrierId = req.swagger.params.carrierId.value;
                            //var userType= req.user[URL].userType;
                            var networkId = req.swagger.params.networkId.value;
                            var bodyData = req.swagger.params.body.value;
                           
                                    (new Order(bodyData)).updateOrderById(traceId,carrierId,networkId,
                                        function (err, content) {
                                            console.log('after save...'+content)
                                            if (err) {
                                                console.log("errrrrrrrrrrr")
                                                res.send(JSON.stringify(err));
                                                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                                            } else {
                                                res.json(content);
                                            }
                                        });
                                }
                
                                function getOrderById(req, res) {
                                  //  var tokenId = req.headers.authorization;
                                 //   var userId = req.user.sub.split("|")[1];
                                    var traceId = "test";
                                  //  var tenantId = req.user.aud;
                                    var carrierId = req.swagger.params.carrierId.value;
                                    //var userType= req.user[URL].userType;
                                    var networkId = req.swagger.params.networkId.value;
                                   
                                   
                                            (new Order()).getOneOrder(traceId,carrierId,networkId,
                                                function (err, content) {
                                                    console.log('after save...'+content)
                                                    if (err) {
                                                        console.log("errrrrrrrrrrr")
                                                        res.send(JSON.stringify(err));
                                                        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                                                    } else {
                                                        res.json(content);
                                                    }
                                                });
                                        }

                                        function deleteOrderForAirline(req, res) {
                                            var tokenId = req.headers.authorization;
                                            var userId = req.user.sub.split("|")[1];
                                            var traceId = "test";
                                            var tenantId = req.user.aud;
                                            var carrierId = req.swagger.params.carrierId.value;
                                            //var userType= req.user[URL].userType;
                                            var networkId = req.swagger.params.networkId.value;
                                           
                                           
                                                    (new Order()).deleteOrder(traceId,carrierId,networkId,
                                                        function (err, content) {
                                                            console.log('after save...'+content)
                                                            if (err) {
                                                                console.log("errrrrrrrrrrr")
                                                                res.send(JSON.stringify(err));
                                                                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                                                            } else {
                                                                res.json(content);
                                                            }
                                                        });
                                                }