  var ct_vldt_img_trggr_tbl_vldtn_9  = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_9","img_clssfctn_ud.csv");
  var ct_vldt_img_trggr_tbl_vldtn_11 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_11","ct_vldt_img_trggr_tbl_vldtn_11.csv");
  var ct_vldt_img_trggr_tbl_vldtn_10 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_10","ct_vldt_img_trggr_tbl_vldtn_10.csv");
  var ct_vldt_img_trggr_tbl_vldtn_12 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_12","ct_vldt_img_trggr_tbl_vldtn_12.csv");
  
  
  function getObject(moduleId)
  {
    console.log("columnSize v9: " + ct_vldt_img_trggr_tbl_vldtn_9.columnSize);
    console.log("columnSize v10: " + ct_vldt_img_trggr_tbl_vldtn_10.columnSize);
    console.log("columnSize v11: " + ct_vldt_img_trggr_tbl_vldtn_11.columnSize);
    console.log("columnSize v12: " + ct_vldt_img_trggr_tbl_vldtn_12.columnSize);
    if(moduleId == "ct_vldt_img_trggr_tbl_vldtn_9"){ return ct_vldt_img_trggr_tbl_vldtn_9}
    if(moduleId == "ct_vldt_img_trggr_tbl_vldtn_10"){ return ct_vldt_img_trggr_tbl_vldtn_10}
    if(moduleId == "ct_vldt_img_trggr_tbl_vldtn_11"){ return ct_vldt_img_trggr_tbl_vldtn_11}
    if(moduleId == "ct_vldt_img_trggr_tbl_vldtn_12"){ return ct_vldt_img_trggr_tbl_vldtn_12}
  }
    /*function prepArray(resp)
    {
      console.log("In prepArray ct_vldt_img_trggr_tbl_vldtn_9");
      ct_vldt_img_trggr_tbl_vldtn_9.readServerData(resp);
    }*/
  
  function getEvent(event) {
    console.log("getEvent(event)");
    console.log("event.target.src : " + event.target.src);
    console.log("event.target.id : " +  event.target.id);

    getObject(event.target.id).columnSize = 5;
    // ct_vldt_img_trggr_tbl_vldtn_9.columnSize = 5;
    getObject(event.target.id).imgNumb = 30;
    //ct_vldt_img_trggr_tbl_vldtn_9.imgNumb = 30;
    getObject(event.target.id).setCol();
    //ct_vldt_img_trggr_tbl_vldtn_9.setCol();
    //objectOf("ct_vldt_img_trggr_tbl_vldtn_9");
    getObject(event.target.id).callvjs(getObject(event.target.id).moduleId+"_divId");
    //ct_vldt_img_trggr_tbl_vldtn_9.callvjs(ct_vldt_img_trggr_tbl_vldtn_9.moduleId+"_divId");
  }

  function setValidationArray(resp,vldtnNum)
  {

    console.log("setValidationArray");
    if(vldtnNum === 9)
    {
      console.log("vldtnNum === 9");
      ct_vldt_img_trggr_tbl_vldtn_9.readServerData(resp);
    }
    if(vldtnNum === 10){
      console.log("vldtnNum === 10");
      ct_vldt_img_trggr_tbl_vldtn_10.readServerData(resp);
    }
    if(vldtnNum === 11){
      console.log("vldtnNum === 11");
      ct_vldt_img_trggr_tbl_vldtn_11.readServerData(resp);
    }
    if(vldtnNum === 12){
      console.log("vldtnNum === 12");
      ct_vldt_img_trggr_tbl_vldtn_12.readServerData(resp);
    }
  }


