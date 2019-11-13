_ = require("underscore");
var Order = require('../domain/order');

module.exports={
    createOrderForAirline:createOrderForAirline,
    getOrdersForAirline:getOrdersForAirline,
    updateOrderWithOrderProcessId:updateOrderWithOrderProcessId,
    getOrderWithOrderProcessId:getOrderWithOrderProcessId,
    getAllOrdersWithStatus:getAllOrdersWithStatus
}



// post a  network
function createOrderForAirline(req, res) {
   // var tokenId = req.headers.authorization;
    var userId = "airlineUser";
    var traceId = "test";
    //var tenantId = req.user.aud;
    var carrierCode = req.swagger.params.carrierCode.value;
    //var userType= req.user[URL].userType;
    var bodyData = req.swagger.params.body.value;
   
            (new Order(bodyData)).createOrder(traceId,userId,carrierCode,
                function (err, content) {
                    console.log('after save...'+content)
                    if (err) {
                        console.log("errrrrrrrrrrr")
                        res.send(err);
                        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    } else {
                        res.json(content);
                    }
                });
        }



        function updateOrderWithOrderProcessId(req, res) {
         //   var tokenId = req.headers.authorization;
            var userId = "airlineUser"
            var traceId = "test";
         //   var tenantId = req.user.aud;
         //   var carrierId = req.swagger.params.carrierId.value;
            //var userType= req.user[URL].userType;
            var order_processing_id = req.swagger.params.order_processing_id.value;
            var bodyData = req.swagger.params.body.value;
           
                    (new Order(bodyData)).updateOrderById(traceId,order_processing_id,
                        function (err, content) {
                            console.log('after save...'+content)
                            if (err) {
                                console.log("errrrrrrrrrrr")
                                res.send(err);
                                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                            } else {
                                res.json(content);
                            }
                        });
                }

                function getOrdersForAirline(req, res) {
                //    var tokenId = req.headers.authorization;
                //    var userId = req.user.sub.split("|")[1];
                    var traceId = "test";
                //    var tenantId = req.user.aud;
                    var carrierCode = req.swagger.params.carrierCode.value;
                    

                    //var userType= req.user[URL].userType;
                  //  var networkId = req.swagger.params.networkId.value;
                   
                   
                            (new Order()).c(traceId,carrierCode,
                                function (err, content) {
                                    console.log('after save...'+content)
                                    if (err) {
                                        console.log("errrrrrrrrrrr")
                                        res.send(err);
                                        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                                    } else {
                                        res.json(content);
                                    }
                                });
                        }

                
                                function getOrderWithOrderProcessId(req, res) {
                                  //  var tokenId = req.headers.authorization;
                                 //   var userId = req.user.sub.split("|")[1];
                                    var traceId = "test";
                                  //  var tenantId = req.user.aud;
                                   // var carrierId = req.swagger.params.carrierId.value;
                                    //var userType= req.user[URL].userType;
                                    var order_processing_id = req.swagger.params.order_processing_id.value;
                                   
                                   
                                            (new Order()).getOneOrder(traceId,order_processing_id,
                                                function (err, content) {
                                                    console.log('after save...'+content)
                                                    if (err) {
                                                        console.log("errrrrrrrrrrr")
                                                        res.send(err);
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
                                                                res.send(err);
                                                                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                                                            } else {
                                                                res.json(content);
                                                            }
                                                        });
                                                }

                                                function getAllOrdersWithStatus(req, res) {
                                                    //    var tokenId = req.headers.authorization;
                                                    //    var userId = req.user.sub.split("|")[1];
                                                        var traceId = "test";
                                                    //    var tenantId = req.user.aud;
                                                        var status = req.swagger.params.status.value;
                                                        var boardingPoint = req.swagger.params.boardingPoint.value;
                                                        //var userType= req.user[URL].userType;
                                                      //  var networkId = req.swagger.params.networkId.value;
                                                       
                                                       
                                                                (new Order()).findAllOrdersWithStatus(traceId,status,boardingPoint,
                                                                    function (err, content) {
                                                                        console.log('after save...'+content)
                                                                        if (err) {
                                                                            console.log("errrrrrrrrrrr")
                                                                            res.send(err);
                                                                            log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                                                                        } else {
                                                                            res.json(content);
                                                                        }
                                                                    });
                                                            }
                                                            