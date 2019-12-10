
function fetchServerData(csvfile,moduleId)
{
    
    if(moduleId === "img_clssfctn_ud")
    {
        setImageArray(loadFile(csvfile));
    }
    if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_9")
    {
        prepArray(loadFile(csvfile));
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
    alert("Error in Reading Images ");
    return result;
  }

  function observeClick(event)
  {
    getEvent(event);
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
