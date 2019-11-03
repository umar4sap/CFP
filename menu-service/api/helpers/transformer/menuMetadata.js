'use strict'

menuMetadata.prototype.menu = {}

function menuMetadata(data, userId, tenantId,orgId) {
    menuMetadata.prototype.menu = {};
    var menuData;
    if ((typeof data) === "string") {
        menuData = Json.parse(data);
    } else {
        menuData = data;
    }
   
    menuMetadata.prototype.menu.mealSeqNumber = menuData.mealSeqNumber
    menuMetadata.prototype.menu.mealsType = menuData.mealsType;
    menuMetadata.prototype.menu.mealCode = menuData.mealCode;
    menuMetadata.prototype.menu.mealName = menuData.mealName;
    menuMetadata.prototype.menu.mealDescription = menuData.mealDescription;

    if(menuData.recipes){
    menuMetadata.prototype.menu.recipes = menuData.mealDetails.recipes;
}
    menuMetadata.prototype.menu.mealStatus = menuData.mealStatus;
  


   
    
}
menuMetadata.prototype.getData = function () {
    return menuMetadata.prototype.menu;
}


module.exports = menuMetadata;