var idntfcntprmry = new ViewerComponent(0,15,3,"idntfcntprmry","idntfcntprmry.csv")

function setIdentificationArray(resp)
{
    idntfcntprmry.readServerData(resp);
}

mapIdentificationObject(event)
{
    let id =  event.target.id;
    let moduleId = id.substr(id.indexOf("idntf"), id.length);
    console.log("moduleId : " + moduleId );
    if(moduleId == "idntfcntprmry" ){ viewIdntificationImages(idntfcntprmry)}
    // for the secondary images we will add another if clause as follows
    /***
     *     if(moduleId == "idntfcntscndry" ){ viewIdntificationImages(idntfcntscndry)}
     */
}
function viewIdntificationImages(object){
    object.columnSize = 5;
    object.imgNumb = 30;
    object.setCol();
    object.callvjs(object.moduleId+"_divId");
}

//var imgClssfctnObj = new ViewerComponent(0,50,5,"img_clssfctn_ud","img_clssfctn_ud.csv");
