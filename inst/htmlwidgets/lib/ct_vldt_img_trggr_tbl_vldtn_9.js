var ct_vldt_img_trggr_tbl_vldtn_9 = new ViewerComponent(0,50,5,"img_clssfctn_ud","img_clssfctn_ud.csv");

  function prepArray(resp)
  {
    console.log("In prepArray");
    ct_vldt_img_trggr_tbl_vldtn_9.readServerData(resp,ct_vldt_img_trggr_tbl_vldtn_9.moduleId);
  }

  function getEvent(event) {
    console.log("keyPress(event)");
    console.log("event.target.src : " + event.target.src);
    ct_vldt_img_trggr_tbl_vldtn_9.columnSize = 5;
    ct_vldt_img_trggr_tbl_vldtn_9.imgNumb = 30;
    objectOf("ct_vldt_img_trggr_tbl_vldtn_9");
    ct_vldt_img_trggr_tbl_vldtn_9.callvjs();
  }


