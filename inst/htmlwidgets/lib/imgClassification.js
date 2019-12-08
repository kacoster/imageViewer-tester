
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

     //var imgClssfctnObj = new ViewerComponent(0,50,5,"img_clssfctn_ud");
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

  /**
  * Handles all image panel click events
  * @parameter - event click/shiftKey
  *
  * Checks if event is shiftKey/click
  * Execute appropriate instructions based on event
  * @return void
  */
  function isKeyPressed(event) {
      console.log(" isKeyPressed(event)");
       arrayClone(imgClssfctnObj.selected_images);
      if (event.shiftKey) {
        console.log(" isKeyPressed : event.shiftKey");
        imgClssfctnObj.handleExistance(imgClssfctnObj.selected_images, event.target.src, event.target.id);

      } else {
        //clickEventStatus("0");
        console.log(" isKeyPressed : event.click");
        objectOf("imgClassification");
        imgClssfctnObj.callvjs();

      }
  }

  
  /************************************************************************/

  /**
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
      imgClssfctnObj.setCol();
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


  




