'use strict'

enginerecipeMetadata.prototype.enginerecipe = {}

function enginerecipeMetadata(data, userId, tenantId,orgId) {
    enginerecipeMetadata.prototype.enginerecipe = {};
    var enginerecipeData;
    if ((typeof data) === "string") {
        enginerecipeData = Json.parse(data);
    } else {
        enginerecipeData = data;
    }
   
    enginerecipeMetadata.prototype.enginerecipe.enginerecipeSeqNumber = enginerecipeData.enginerecipeSeqNumber
    enginerecipeMetadata.prototype.enginerecipe.mealType = enginerecipeData.mealType;
    enginerecipeMetadata.prototype.enginerecipe.enginerecipeType = enginerecipeData.enginerecipeType;
    enginerecipeMetadata.prototype.enginerecipe.enginerecipeCode = enginerecipeData.enginerecipeCode;
    enginerecipeMetadata.prototype.enginerecipe.boardPoint = enginerecipeData.boardPoint;
    enginerecipeMetadata.prototype.enginerecipe.destination = enginerecipeData.destination;
    enginerecipeMetadata.prototype.enginerecipe.catRefId = enginerecipeData.catRefId;
    enginerecipeMetadata.prototype.enginerecipe.region = enginerecipeData.region;
    enginerecipeMetadata.prototype.enginerecipe.cabinClass = enginerecipeData.cabinClass;
    enginerecipeMetadata.prototype.enginerecipe.flightCategory = enginerecipeData.flightCategory;
    enginerecipeMetadata.prototype.enginerecipe.carrierCode = enginerecipeData.carrierCode;
    enginerecipeMetadata.prototype.enginerecipe.flightNumber = enginerecipeData.flightNumber;
    enginerecipeMetadata.prototype.enginerecipe.menuTemplateRef = enginerecipeData.menuTemplateRef;
    if(enginerecipeData.menus){
        enginerecipeMetadata.prototype.enginerecipe.menus=enginerecipeData.menus;
}
if(enginerecipeData.all){
    enginerecipeMetadata.prototype.enginerecipe.all = enginerecipeData.all;
}
  
    enginerecipeMetadata.prototype.enginerecipe.enginerecipeStatus = enginerecipeData.enginerecipeStatus;
    enginerecipeMetadata.prototype.enginerecipe.enginerecipeDescription = enginerecipeData.enginerecipeDescription;
  

    if(enginerecipeData.ids){
    enginerecipeMetadata.prototype.enginerecipe.ids = enginerecipeData.ids
    }



   
    
}
enginerecipeMetadata.prototype.getData = function () {
    return enginerecipeMetadata.prototype.enginerecipe;
}


module.exports = enginerecipeMetadata;