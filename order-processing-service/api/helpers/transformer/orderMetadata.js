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
   
    orderMetadata.prototype.order.orderReceiptNumber = orderData.orderReceiptNumber
    orderMetadata.prototype.order.flightNo = orderData.flightNo;
    orderMetadata.prototype.order.carrierCode = orderData.carrierCode;
    orderMetadata.prototype.order.orderDate = orderData.orderDate;
    orderMetadata.prototype.order.expectedDeliveryDateAndTime = orderData.expectedDeliveryDateAndTime;
    orderMetadata.prototype.order.flightDepartureDateAndTime = orderData.flightDepartureDateAndTime;
    orderMetadata.prototype.order.boardingPoint = orderData.boardingPoint;
    orderMetadata.prototype.order.destination = orderData.destination;
    orderMetadata.prototype.order.orderedBy = orderData.orderedBy;
    orderMetadata.prototype.order.mealDetails = orderData.mealDetails;
    if(orderData.mealDetails){
    orderMetadata.prototype.order.mealDetails.totalPaxCount = orderData.mealDetails.totalPaxCount;
    orderMetadata.prototype.order.mealDetails.totalMealsCode = orderData.mealDetails.totalMealsCode;
    orderMetadata.prototype.order.mealDetails.mealsType = orderData.mealDetails.mealsType;
    orderMetadata.prototype.order.mealDetails.totalMealChoice = orderData.mealDetails.totalMealChoice;
    
    if(orderData.mealDetails.mealInfo){
    orderMetadata.prototype.order.mealDetails.mealInfo = orderData.mealDetails.mealInfo
    }
}
    orderMetadata.prototype.order.orderStatus = orderData.orderStatus;
    orderMetadata.prototype.order.destinations = orderData.destinations;
    orderMetadata.prototype.order.updatedDTS = orderData.updatedDTS;
    orderMetadata.prototype.order.updatedBy = orderData.updatedBy;


   
    
}
orderMetadata.prototype.getData = function () {
    return orderMetadata.prototype.order;
}


module.exports = orderMetadata;