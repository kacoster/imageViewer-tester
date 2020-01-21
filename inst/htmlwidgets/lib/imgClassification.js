
    /***************************************************************************
    @version Viewer.js v1.3.5
    @author Valentine Tawira
    @description This script handles all the logic and requirements only specific 
                  to the image classification viewer.
    @copyright (C) 2019 | Panthera Corporation
    ***************************************************************************

     var imgClssfctnObj = new ViewerComponent(0,50,5,"img_clssfctn_ud","img_clssfctn_ud.csv");

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
    
    

    
    
    
    */
