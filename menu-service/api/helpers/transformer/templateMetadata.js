'use strict'

templateMetadata.prototype.template = {}

function templateMetadata(data, userId, tenantId,orgId) {
    templateMetadata.prototype.template = {};
    var templateData;
    if ((typeof data) === "string") {
        templateData = Json.parse(data);
    } else {
        templateData = data;
    }
   
    templateMetadata.prototype.template.templateSeqNumber = templateData.templateSeqNumber
    templateMetadata.prototype.template.mealType = templateData.mealType;
    templateMetadata.prototype.template.templateType = templateData.templateType;
    templateMetadata.prototype.template.templateCode = templateData.templateCode;
    templateMetadata.prototype.template.boardPoint = templateData.boardPoint;
    templateMetadata.prototype.template.destination = templateData.destination;
    templateMetadata.prototype.template.catRefId = templateData.catRefId;
    templateMetadata.prototype.template.region = templateData.region;
    templateMetadata.prototype.template.cabinClass = templateData.cabinClass;
    templateMetadata.prototype.template.flightCategory = templateData.flightCategory;
    templateMetadata.prototype.template.carrierCode = templateData.carrierCode;
    templateMetadata.prototype.template.flightNumber = templateData.flightNumber;
    templateMetadata.prototype.template.menuTemplateRef = templateData.menuTemplateRef;
    if(templateData.menus){
    templateMetadata.prototype.template.menu = templateData.templateDetails.menu;
    //menuTemplateRef
    //menuName
}
if(templateData.all){
    templateMetadata.prototype.template.all = templateData.all;
}
  
    templateMetadata.prototype.template.templateStatus = templateData.templateStatus;
    templateMetadata.prototype.template.templateDescription = templateData.templateDescription;
  


   
    
}
templateMetadata.prototype.getData = function () {
    return templateMetadata.prototype.template;
}


module.exports = templateMetadata;