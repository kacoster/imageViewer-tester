
/***************************************************************************
 *    @version Viewer.js v1.3.5
 *    @author Valentine Tawira
 *    @Copyright (C) 2019 | Panthera Corporation
 ****************************************************************************/
var imgClssfctnObj = new ViewerComponent(0,50,5,"img_clssfctn_ud","img_clssfctn_ud.csv");
var ct_vldt_img_trggr_tbl_vldtn_9  = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_9","ct_vldt_img_trggr_tbl_vldtn_9.csv");
var ct_vldt_img_trggr_tbl_vldtn_10 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_10","ct_vldt_img_trggr_tbl_vldtn_10.csv");
var ct_vldt_img_trggr_tbl_vldtn_11 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_11","ct_vldt_img_trggr_tbl_vldtn_11.csv");
var ct_vldt_img_trggr_tbl_vldtn_12 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_12","ct_vldt_img_trggr_tbl_vldtn_12.csv");

console.log("New viewerHelper.js");

 function fetchServerData(csvfile,moduleId)
{
    
    if(moduleId === "img_clssfctn_ud")
    {
        imgClssfctnObj.readServerData(loadFile(csvfile));
        //setImageArray(loadFile(csvfile));
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_9"){
        //console.log("fetchserverdata : ct_vldt_img_trggr_tbl_vldtn_9")
        ct_vldt_img_trggr_tbl_vldtn_9.readServerData(loadFile(csvfile));
        //prepArray(loadFile(csvfile));
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_10"){
       // prepArrayvldtn_10(loadFile(csvfile));
       ct_vldt_img_trggr_tbl_vldtn_10.readServerData(loadFile(csvfile));
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_11"){
        ct_vldt_img_trggr_tbl_vldtn_11.readServerData(loadFile(csvfile));
        //prepArrayvldtn_11(loadFile(csvfile));
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_12"){
        ct_vldt_img_trggr_tbl_vldtn_12.readServerData(loadFile(csvfile));
        //prepArrayvldtn_12(loadFile(csvfile));
    }
}

function loadFile(filename) {
    console.log("In loadFile");
    let result = null;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filename, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = (xmlhttp.responseText).replace(/^\s*$[\n\r]{1,}/gm, '');
      return result;
    }
    //alert("Error in Reading Images ");
    return result;
  }

  function observeClick(event)
  {
    console.log("Type of : " + event.target.id);
    let targetId = event.target.id;
    let moduleId = targetId.substring(targetId.indexOf("_")+1);
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_9")
    {
        getEvent(event); 
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_10")
    {
        ct_vldt10_event(event);
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_11")
    {
        ct_vldt11_event(event); 
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_12")
    {
        ct_vldt12_event(event);
    }
  }
  
  function clcsfcnSave()
  {
      console.log("In clcsfcnSave()");
      saveButtonListerner();
  }

  /*************************************** */
 // var imgClssfctnObj = new ViewerComponent(0,50,5,"img_clssfctn_ud","img_clssfctn_ud.csv");

     $(document).ready(function () {
          $("#apply").on("click", function () {
            // send message to Shiny
            Shiny.onInputChange("sources", imgClssfctnObj.sendDataToShinny());
          });
          $("#selectAll").on("click", function () {
            Shiny.onInputChange("sources", imgClssfctnObj.selectAll());
          });
          $("#deSelectAll").on("click", function () {
            imgClssfctnObj.deSelectAll();
          });
          $("#img_clssfctn_ud_nxt_bttn").on("click", function () {
             Shiny.onInputChange("next", imgClssfctnObj.next());
          });
          $("#img_clssfctn_ud_prvs_bttn").on("click", function () {
            Shiny.onInputChange("prev", imgClssfctnObj.prev());
          });
      });

    function isKeyPressed(event,id) {
      console.log("isKeyPressed(event)");
      arrayClone(imgClssfctnObj.selected_images);
      if (event.shiftKey) {
        console.log('event.shiftKey : ' + event.target.src);
        if(imgClssfctnObj.selected_images.includes(event.target.src))
        {
          selectionFind(true);
        }
        imgClssfctnObj.handleExistance(imgClssfctnObj.selected_images, event.target.src, event.target.id);
      } else {
        objectOf("imgClassification");
        imgClssfctnObj.callvjs(imgClssfctnObj.moduleId+"_divId");
      }
    }

    function resetSelectedImages()
    {
      imgClssfctnObj.selected_images.length = 0;
      imgClssfctnObj.batnum = 0;
      imgClssfctnObj.msngImgsFlag = true;
      imgClssfctnObj.getCurrClckdImg("clssfctn_slctd_img","");
    }
    
    function setColumnNumb(numb)
    {
      imgClssfctnObj.columnSize = numb;
      imgClssfctnObj.setCol();
    }
    
    function resetMsnImgsInputs(msg)
    {
      imgClssfctnObj.resetHandlers(msg);
    }
    function setImagesNumber(numb)
    {
      imgClssfctnObj.imgNumb = numb;
    } 
    
    function setImageArray(resp)
    {
      imgClssfctnObj.readServerData(resp);
    }
  
    function saveButtonListerner()
    {
        console.log("Save Click");
        imgClssfctnObj.liWhiteBackground();
        imgClssfctnObj.deSelectAll();
        imgClssfctnObj.getCurrClckdImg("clssfctn_slctd_img","");
        imgClssfctnObj.getCurrClckdImg("clssfctn_vw_curr_img","");
    }
    
    function clearImages() {
        $("#img_clssfctn_ud").html("");
    }

    /************************************************************* */