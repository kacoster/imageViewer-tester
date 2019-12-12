
function fetchServerData(csvfile,moduleId)
{
    
    if(moduleId === "img_clssfctn_ud")
    {
        setImageArray(loadFile(csvfile));
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_9"){
        prepArray(loadFile(csvfile));
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_10"){
        prepArrayvldtn_10(loadFile(csvfile));
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_11"){
        prepArrayvldtn_11(csvfile);
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_12"){
        prepArrayvldtn_12(csvfile);
    }
}

function loadFile(filename) {
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

  function viewy() {
        var viewer = new Viewer(document.getElementById('gal'), {
            url: 'data-original',
            title: function (image) {
            return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
            },
        });
    }

    function clcsfcnSave()
    {
        console.log("In clcsfcnSave()");
        saveButtonListerner();
    }
