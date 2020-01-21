
/***************************************************************************
 *    @version Viewer.js v1.3.5
 *    @author Valentine Tawira
 *    @Copyright (C) 2019 | Panthera Corporation
 ****************************************************************************/

/*******************************************************************/

/*******************************************************************/
var img_clssfctn_ud = new ViewerComponent(0,50,5,"img_clssfctn_ud","img_clssfctn_ud.csv"); // img_clssfctn_ud
var ct_vldt_img_trggr_tbl_vldtn_11 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_11","ct_vldt_img_trggr_tbl_vldtn_11.csv");
var ct_vldt_img_trggr_tbl_vldtn_10 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_10","ct_vldt_img_trggr_tbl_vldtn_10.csv");
var ct_vldt_img_trggr_tbl_vldtn_12 = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_12","ct_vldt_img_trggr_tbl_vldtn_12.csv");
var ct_vldt_img_trggr_tbl_vldtn_9  = new ViewerComponent(0,30,5,"ct_vldt_img_trggr_tbl_vldtn_9","img_clssfctn_ud.csv");


// function prepArrayvldtn_11(resp)
//   {
//     //console.log("In prepArray");
//     ct_vldt_img_trggr_tbl_vldtn_11.readServerData(resp);
//   }

function fetchServerData(csvfile,moduleId)
{

    console.log("Module ID : " + moduleId);
    
    if(moduleId === "img_clssfctn_ud")
    {
        //setImageArray(loadFile(csvfile))
        img_clssfctn_ud.loadFile(csvfile)
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_9"){
        console.log("fetchserverdata : ct_vldt_img_trggr_tbl_vldtn_9")
        ct_vldt_img_trggr_tbl_vldtn_9.loadFile(csvfile);
       // prepArray(loadFile(csvfile));
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_10"){
        ct_vldt_img_trggr_tbl_vldtn_10.loadFile(csvfile);
        //prepArrayvldtn_10(loadFile(csvfile));
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_11"){
        // prepArrayvldtn_11(loadFile(csvfile));
        ct_vldt_img_trggr_tbl_vldtn_11.loadFile(csvfile);
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_12"){

        //prepArrayvldtn_12(loadFile(csvfile));
        ct_vldt_img_trggr_tbl_vldtn_12.loadFile(csvfile);
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
        console.log("observeClick VLDN 11 : " );
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
