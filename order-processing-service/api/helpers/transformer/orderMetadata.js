'use strict'

orderMetadata.prototype.order = {}

function orderMetadata(data, userId, tenantId,orgId) {
    orderMetadata.prototype.order = {};
    var orderData;
    if ((typeof data) === "string") {
        orderData = Json.parse(data);
    } else {
        orderData = data;
    }
   
    orderMetadata.prototype.order.serviceName = orderData.serviceName
    orderMetadata.prototype.order.orderPrefrence = orderData.orderPrefrence;
    orderMetadata.prototype.order.carrierorderStatus = orderData.carrierorderStatus?orderData.carrierorderStatus:"active"
    orderMetadata.prototype.order.origin = orderData.origin;
    orderMetadata.prototype.order.destinations = orderData.destinations;
    orderMetadata.prototype.order.updatedDTS = orderData.updatedDTS;
    orderMetadata.prototype.order.updatedBy = orderData.updatedBy;


   
    
}
orderMetadata.prototype.getData = function () {
    return orderMetadata.prototype.order;
}


module.exports = orderMetadata;