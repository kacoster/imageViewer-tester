  var ct_vldt_img_trggr_tbl_vldtn_9  = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_9","img_clssfctn_ud.csv");
  var ct_vldt_img_trggr_tbl_vldtn_11 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_11","ct_vldt_img_trggr_tbl_vldtn_11.csv");
  var ct_vldt_img_trggr_tbl_vldtn_10 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_10","ct_vldt_img_trggr_tbl_vldtn_10.csv");
  var ct_vldt_img_trggr_tbl_vldtn_12 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_12","ct_vldt_img_trggr_tbl_vldtn_12.csv");
  
  
  function mapObject(event)
  {
    console.log("event.target.id  : " + event.target.id );
    let id =  event.target.id;
    let moduleId = id.substr(id.indexOf("ct"), id.length);
    console.log("moduleId : " + moduleId );
    if(moduleId == "ct_vldt_img_trggr_tbl_vldtn_9" ){ viewImages(ct_vldt_img_trggr_tbl_vldtn_9)}
    if(moduleId == "ct_vldt_img_trggr_tbl_vldtn_10"){ viewImages(ct_vldt_img_trggr_tbl_vldtn_10)}
    if(moduleId == "ct_vldt_img_trggr_tbl_vldtn_11"){ viewImages(ct_vldt_img_trggr_tbl_vldtn_11)}
    if(moduleId == "ct_vldt_img_trggr_tbl_vldtn_12"){ viewImages(ct_vldt_img_trggr_tbl_vldtn_12)}
  }

  function getObject()
  {

  }

  /*function getEvent(event) {
    console.log("getEvent(event)");
    console.log("event.target.src : " + event.target.src);
    console.log("event.target.id : " +  event.target.id);
    getObject(event.target.id).callvjs(getObject(event.target.id).moduleId+"_divId");
    //ct_vldt_img_trggr_tbl_vldtn_9.callvjs(ct_vldt_img_trggr_tbl_vldtn_9.moduleId+"_divId");
  }*/

  function viewImages(object){
    object.columnSize = 5;
    object.imgNumb = 30;
    object.setCol();
    object.callvjs(object.moduleId+"_divId");
  }

  function setValidationArray(resp,vldtnNum)
  {
    //console.log("setValidationArray");
    if(vldtnNum === 9)
    {
      //console.log("vldtnNum === 9");
      ct_vldt_img_trggr_tbl_vldtn_9.readServerData(resp);
    }
    if(vldtnNum === 10){
      //console.log("vldtnNum === 10");
      ct_vldt_img_trggr_tbl_vldtn_10.readServerData(resp);
    }
    if(vldtnNum === 11){
      //console.log("vldtnNum === 11");
      ct_vldt_img_trggr_tbl_vldtn_11.readServerData(resp);
    }
    if(vldtnNum === 12){
      //console.log("vldtnNum === 12");
      ct_vldt_img_trggr_tbl_vldtn_12.readServerData(resp);
    }
  }


