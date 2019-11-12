'use strict'

recipeMetadata.prototype.recipe = {}

function recipeMetadata(data, userId, tenantId,orgId) {
    recipeMetadata.prototype.recipe = {};
    var recipeData;
    if ((typeof data) === "string") {
        recipeData = Json.parse(data);
    } else {
        recipeData = data;
    }
   
    recipeMetadata.prototype.recipe.recipeSeqNumber = recipeData.recipeSeqNumber
    recipeMetadata.prototype.recipe.recipesType = recipeData.recipesType;
    recipeMetadata.prototype.recipe.recipeCode = recipeData.recipeCode;
    recipeMetadata.prototype.recipe.recipeName = recipeData.recipeName;
    recipeMetadata.prototype.recipe.recipeDescription = recipeData.recipeDescription;
    recipeMetadata.prototype.recipe.category = recipeData.category;
    recipeMetadata.prototype.recipe.subCategory = recipeData.subCategory;
    recipeMetadata.prototype.recipe.region = recipeData.region;
    recipeMetadata.prototype.recipe.displayName = recipeData.displayName;
    recipeMetadata.prototype.recipe.version= recipeData.version;
    recipeMetadata.prototype.recipe.cabinClass= recipeData.cabinClass;
    recipeMetadata.prototype.recipe.effectiveFrom= recipeData.effectiveFrom;
    recipeMetadata.prototype.recipe.effectiveTo= recipeData.effectiveTo;
    
    if(recipeData.ingradient){
    recipeMetadata.prototype.recipe.ingradient = recipeData.recipeDetails.ingradient;
   //{ingradientCode:001
    //ingradientName:biryani}
}
if(recipeData.all){
    recipeMetadata.prototype.recipe.all = recipeData.all;
}

if(recipeData.cookingSteps){
    recipeMetadata.prototype.recipe.steps = recipeData.recipeDetails.steps;
    //{stepNo
    //stepDescription}
}
    recipeMetadata.prototype.recipe.recipeStatus = recipeData.recipeStatus;
    recipeMetadata.prototype.recipe.updatedDTS = recipeData.updatedDTS;
    recipeMetadata.prototype.recipe.updatedBy = recipeData.updatedBy;


   
    
}
recipeMetadata.prototype.getData = function () {
    return recipeMetadata.prototype.recipe;
}


module.exports = recipeMetadata;