
    /***************************************************************************
    @version Viewer.js v1.3.5
    @author Valentine Tawira
    @description PantheraImageViewer Script for handling the processing of the
            file data and rendering of the viewer panel
    Copyright (C) 2019 | Panthera Corporation
    ***************************************************************************/

    /****************************************************************************
     code included inside $(document).ready() will only run once the page is
      ready for JavaScript code to execute
    ***************************************************************************/

     //var img_clssfctn_ud = new ViewerComponent(0,50,5,"img_clssfctn_ud");
     //var img_clssfctn_ud = new ViewerComponent(0,50,5,"img_clssfctn_ud");
     
     $(document).ready(function () {
    
        $("#apply").on("click", function () {
          // send message to Shiny
          Shiny.onInputChange("sources", img_clssfctn_ud.sendDataToShinny());
        });

        $("#selectAll").on("click", function () {
          Shiny.onInputChange("sources", img_clssfctn_ud.selectAll());

        });

        $("#deSelectAll").on("click", function () {
          img_clssfctn_ud.deSelectAll();
        });

        $("#img_clssfctn_ud_nxt_bttn").on("click", function () {
           Shiny.onInputChange("next", img_clssfctn_ud.next());
        });

        $("#img_clssfctn_ud_prvs_bttn").on("click", function () {
          Shiny.onInputChange("prev", img_clssfctn_ud.prev());
        });

  });
  

  // var img_clssfctn_ud = new ViewerComponent(0,50,5,"img_clssfctn_ud","img_clssfctn_ud.csv");
  //var ct_vldt_img_trggr_tbl_vldtn_9 = new ViewerComponent(0,50,5,"img_clssfctn_ud","img_clssfctn_ud.csv");

  /**
  * Handles all image panel click events
  * @parameter - event click/shiftKey
  *
  * Checks if event is shiftKey/click
  * Execute appropriate instructions based on event
  * @return void
  */
  function isKeyPressed(event,id) {

        console.log("isKeyPressed(event)");
        //console.log("event.target.src : " + event.target.src);
        arrayClone(img_clssfctn_ud.selected_images);

        if (event.shiftKey) {
          console.log('event.shiftKey : ' + event.target.src);
          
          if(img_clssfctn_ud.selected_images.includes(event.target.src))
          {
            selectionFind(true);
          }
          //console.log("isKeyPressed : " + img_clssfctn_ud.selected_images);
          img_clssfctn_ud.handleExistance(img_clssfctn_ud.selected_images, event.target.src, event.target.id);
        } else {
          //console.log(" isKeyPressed : " + event.click);
          objectOf("imgClassification");
          img_clssfctn_ud.callvjs(img_clssfctn_ud.moduleId+"_divId");
        }
  }

  function resetSelectedImages()
  {
    img_clssfctn_ud.selected_images.length = 0;
    img_clssfctn_ud.batnum = 0;
    img_clssfctn_ud.msngImgsFlag = true;
    img_clssfctn_ud.getCurrClckdImg("clssfctn_slctd_img","");
  }

  function setColumnNumb(numb)
  {
    img_clssfctn_ud.columnSize = numb;
    img_clssfctn_ud.setCol();
    //this.columnSize = numb;
    //alert("Adjusted Columns " + img_clssfctn_ud.columnSize);
  }
  function resetMsnImgsInputs(msg)
  {
    img_clssfctn_ud.resetHandlers(msg);
  }
  function setImagesNumber(numb)
  {
    img_clssfctn_ud.imgNumb = numb;
  } 

  function setImageArray(resp)
  {
    img_clssfctn_ud.readServerData(resp);
  }

  function saveButtonListerner()
  {
    console.log("Save Click");
    img_clssfctn_ud.liWhiteBackground();
    img_clssfctn_ud.deSelectAll();
    //img_clssfctn_ud.selected_images.length = 0;
    img_clssfctn_ud.getCurrClckdImg("clssfctn_slctd_img","");
    img_clssfctn_ud.getCurrClckdImg("clssfctn_vw_curr_img","");
  }

  /************************************************************************/
  /*
  *
   * @description - creates html component to display the images
   * @param {String} ar - an array of images
   * @returns {void} var src = ( ( ar[0].trim()).replace(/['"]+/g, ''));
   * someText = src.replace(/(\r\n|\n|\r)/gm,"");
   
  function imgloop(ar) {

    $(".pictures > li").css("background-color", "white");
    //$(".pictures > li").css("width", "calc(100% / " + columnSize + ")");
    //width: calc(100% / columnSize  )
    for (i = 0; i < ar.length; i++) {
      var liId = i;
      var img = new Image();
      var ul = document.getElementById(this.mo);
      img.src = ((ar[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
      img.alt = "Camera Trap";
      img.datamarked = 0;
      //setCol();
      ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' +
      img.src + '"  marked="' + img.datamarked + '" src="' +
      img.src + '" alt="' + img.alt + '" /> </li>';
      img_clssfctn_ud.setCol();
      // inserting an list of images uinside the ul tag
    }  
  } */

  /**
   * @description clears inner html components identified by elementId 'x'
   *
   */
  function clearImages() {
    $("#img_clssfctn_ud").html("");
  }


  




