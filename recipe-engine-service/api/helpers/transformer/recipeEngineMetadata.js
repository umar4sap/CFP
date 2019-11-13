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
    enginerecipeMetadata.prototype.enginerecipe.order_processing_id=enginerecipeData.order_processing_id;
    enginerecipeMetadata.prototype.enginerecipe.recipe_id=enginerecipeData.recipe_id;
    enginerecipeMetadata.prototype.enginerecipe.paxCount = enginerecipeData.paxCount;
    enginerecipeMetadata.prototype.enginerecipe.crewCount = enginerecipeData.crewCount;
    enginerecipeMetadata.prototype.enginerecipe.templateId=enginerecipeData.templateId;

if(enginerecipeData.all){
    enginerecipeMetadata.prototype.enginerecipe.all = enginerecipeData.all;
}
if(enginerecipeData.recipes){
    enginerecipeMetadata.prototype.enginerecipe.recipes = enginerecipeData.recipes;
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