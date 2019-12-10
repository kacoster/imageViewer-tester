var ct_vldt_img_trggr_tbl_vldtn_10 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_10","ct_vldt_img_trggr_tbl_vldtn_10.csv");

  function prepArray(resp)
  {
    console.log("In prepArray");
    ct_vldt_img_trggr_tbl_vldtn_10.readServerData(resp);
  }

  function getEvent(event) {
    console.log("getEvent(event)");
    console.log("event.target.src : " + event.target.src);
    ct_vldt_img_trggr_tbl_vldtn_10.columnSize = 5;
    ct_vldt_img_trggr_tbl_vldtn_10.imgNumb = 30;
    ct_vldt_img_trggr_tbl_vldtn_10.setCol();
    objectOf("ct_vldt_img_trggr_tbl_vldtn_9");
    ct_vldt_img_trggr_tbl_vldtn_10.callvjs(ct_vldt_img_trggr_tbl_vldtn_10.moduleId+"_divId");
  }


