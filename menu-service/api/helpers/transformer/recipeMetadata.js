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

    if(recipeData.in){
    recipeMetadata.prototype.recipe.recipes = recipeData.recipeDetails.recipes;
}
    recipeMetadata.prototype.recipe.recipeStatus = recipeData.recipeStatus;
    recipeMetadata.prototype.recipe.updatedDTS = recipeData.updatedDTS;
    recipeMetadata.prototype.recipe.updatedBy = recipeData.updatedBy;


   
    
}
recipeMetadata.prototype.getData = function () {
    return recipeMetadata.prototype.recipe;
}


module.exports = recipeMetadata;