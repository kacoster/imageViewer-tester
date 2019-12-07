
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

     var imgClssfctnObj = new ViewerComponent(0,50,5,"img_clssfctn_ud");
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


   /*
   * Function to read Server Data from Server-Side
   * @parameter msg A message from Shiny indication the csv file
   *
   */
  function readServerData(msg) {  // datapath , batchNumber , loadSize
    let csvfile = "" + msg + "";
    loadDoc( csvfile, myFunction1);
  }

  function loadDoc(url, cFunction) {

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

           cFunction(this);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  function myFunction1(xhttp) {
    let ar = [];
    ar = (xhttp.responseText.replace(/^\s*$[\n\r]{1,}/gm, '')).split(',');
    ar.splice(0, 1);
    ar[0] = ar[0].replace("Source", "");
    ar[0] = ar[ar.length - 1] + ar[0];
    ar.splice(ar.length - 1, 1);
    imgClssfctnObj.imgArray = [...ar];
    console.log(ar);
    //return ar;
    Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
            1 + " / " + imgClssfctnObj.getBatchNumber());

    callImges(imgClssfctnObj.displayImages(imgClssfctnObj.imgNumb,0));

  }

  /************************************************************************/


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
         myFunction();

      }
  }




  /************************************************************************/

  /**
   * @description - creates html component to display the images
   * @param {String} ar - an array of images
   * @returns {void} var src = ( ( ar[0].trim()).replace(/['"]+/g, ''));
   * someText = src.replace(/(\r\n|\n|\r)/gm,"");
   */
  function imgloop(ar) {
    $(".pictures > li").css("background-color", "white");

    //$(".pictures > li").css("width", "calc(100% / " + columnSize + ")");
    //width: calc(100% / columnSize  )
    for (i = 0; i < ar.length; i++) {
      var liId = i;
      var img = new Image();
      var ul = document.getElementById('img_clssfctn_ud');
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
  }

  /**
   * @description clears inner html components identified by elementId 'x'
   *
   */
  function clearImages() {
    $("#img_clssfctn_ud").html("");
  }

  /**
   *
   * @param {String} arry
   */
  function callImges(arry) {
    imgloop(arry);
  }

  /**
   * @description - indirect call to the vjs() function
   * @returns image view
   */
  function myFunction() {
    imgClssfctnObj.vjs();
    return;
  }




