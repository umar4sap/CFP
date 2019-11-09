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
   
    menuMetadata.prototype.menu.menuSeqNumber = menuData.menuSeqNumber
    menuMetadata.prototype.menu.menuType = menuData.menuType;
    menuMetadata.prototype.menu.templateType = menuData.templateType;
    menuMetadata.prototype.menu.menuCode = menuData.menuCode;
    menuMetadata.prototype.menu.cabinClass = menuData.cabinClass;
    menuMetadata.prototype.menu.menuDescription = menuData.menuDescription;
    menuMetadata.prototype.menu.duration = menuData.duration;
    menuMetadata.prototype.menu.cycleCodeRef = menuData.cycleCodeRef;
    menuMetadata.prototype.menu.menuCategory = menuData.menuCategory;
    menuMetadata.prototype.menu.remark = menuData.remark;
    menuMetadata.prototype.menu.region = menuData.region; 
   
    if(menuData.recipes){
    menuMetadata.prototype.menu.recipes = menuData.menuDetails.recipes;
    //recipeName
    //recipeCode
}
    menuMetadata.prototype.menu.menuStatus = menuData.menuStatus;
  


   
    
}
menuMetadata.prototype.getData = function () {
    return menuMetadata.prototype.menu;
}


module.exports = menuMetadata;