'use strict'

ingradientMetadata.prototype.ingradient = {}

function ingradientMetadata(data, userId, tenantId,orgId) {
    ingradientMetadata.prototype.ingradient = {};
    var ingradientData;
    if ((typeof data) === "string") {
        ingradientData = Json.parse(data);
    } else {
        ingradientData = data;
    }
   
    ingradientMetadata.prototype.ingradient.ingradientSeqNumber = ingradientData.ingradientSeqNumber
    ingradientMetadata.prototype.ingradient.ingradientType = ingradientData.ingradientType;
 
    ingradientMetadata.prototype.ingradient.ingradientCode = ingradientData.ingradientCode;
  
    ingradientMetadata.prototype.ingradient.ingradientDescription = ingradientData.ingradientDescription;

    ingradientMetadata.prototype.ingradient.ingradientCategory = ingradientData.ingradientCategory;
    ingradientMetadata.prototype.ingradient.remark = ingradientData.remark;

if(ingradientData.all){
    templateMetadata.prototype.ingradient.all = ingradientData.all;
}
    ingradientMetadata.prototype.ingradient.ingradientStatus = ingradientData.ingradientStatus;
  


   
    
}
ingradientMetadata.prototype.getData = function () {
    return ingradientMetadata.prototype.ingradient;
}


module.exports = ingradientMetadata;