
    /***************************************************************************
      @version Viewer.js v1.3.5
      @author Valentine Tawira
      @description PantheraImageViewer Script for handling the processing of the
                  file data and rendering of the viewer panel
      Copyright (C) 2019 | Panthera Corporation
     ***************************************************************************/


    /**Program Global Variables */
    var imageArray = [];
   // var resetSel = [];
    var highlighted_images = [];
    var tempRemoved ;

    var result;
    var start, end;

    var batnum  = 0 ; // default batch Number
    var imgNumb = 0; // default image size




     /* Function to read Server Data from Server-Side
     * @parameter msg A message from Shiny indication the csv file
     *
     */
    function fetchServerData(msg) {  // datapath , batchNumber , loadSize
      var csvfile = "" + msg + "";
      console.log("readServerData : " +  csvfile);
      getData( csvfile, processXHTTPResponse);
    }

    function getData(url, cFunction) {
      console.log("In getData()");
      var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          //console.log("readyState 4 and status 200 : " + this);
          cFunction(this);
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    }

    function processXHTTPResponse(xhttp) {
      //console.log("processXHTTPResponse()");
      imageArray = (xhttp.responseText.replace(/^\s*$[\n\r]{1,}/gm, '')).split(',');
      imageArray.splice(0, 1);
      imageArray[0] = imageArray[0].replace("Source", "");
      imageArray[0] = imageArray[imageArray.length - 1] + imageArray[0];
      imageArray.splice(imageArray.length - 1, 1);
      console.log("Number of Images : " + imageArray.length );
      displayImages(9,0);
     /************************************************************************
     Shiny.addCustomMessageHandler("testmessage",
        function (message) {
          imgNumb = parseInt(JSON.stringify(message));
        }
      );

      Shiny.addCustomMessageHandler("testmsg",
        function (message) {
          batnum = parseInt(JSON.stringify(message));
          displayImages(imgNumb, batnum);
        }
      );
      ************************************************************************/

    // Read the batch Image Number from from slider : img_clssfctn_ud_btch_img_thrshld
    /*Shiny.addCustomMessageHandler("img_clssfctn_ud_batch_image_size",
      function(message) {
         imgNumb =  parseInt(JSON.stringify(message));
          //console.log("Tester : " +   batnum + "/" + getBatchNumber());
              Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
            1 + " / " + getBatchNumber());
         // console.log("Image Number from the Slider : " + imgNumb);
          displayImages(imgNumb,0);
       
    );

    /*Shiny.addCustomMessageHandler("btch_num_msg",
    function(message) {
      batnum =  parseInt(JSON.stringify(message));
      displayImages(imgNumb,batnum);
    }
    );*/
    }

    /************************************************************************/
    /**
     * Highlights a selected image
     * @parameter selected image id
     * Applies opacity 0.4
     * @return void
    */
    function markImage(elementID)
    {
      $('#' + elementID + '').css({
            'opacity': '0.4',
            'filter': 'alpha(opacity=40)'
          });
    }

    
    /**
    * Helper function for isKeyPressed()
    * @parameter - array of selected images - highlighted_images
    *            - target image src
    *            - target element id
    * Checks if target image has already been selected
    * @return void
   */
    function checkExistance(params,src,id)
    {
      if(params.includes(src))
      {
        tempRemoved =  (params.splice(params.indexOf(src),1))[0];
        removeHighlight(id);
      }
      else{
        //console.log("Not marked");
        params.push(src);
        markImage(id);
        Shiny.onInputChange("clssfctn_slctd_img", src.substring(src.lastIndexOf("/") + 1, src.length ));
      }
    }

    /**
     * Function inprogress to fix the previous image Reference
    */
    function removedRef()
    {
      return tempRemoved;
    }

    /**
    * Handles all image panel click events
    * @parameter - event click/shiftKey
    *
    * Checks if event is shiftKey/click
    * Execute appropriate instructions based on event
    * @return void
    */
    function isKeyPressed(event) {

        // send message to Shiny
        var imageName = event.target.src;

      if (event.shiftKey) {
        checkExistance(highlighted_images, event.target.src, event.target.id);

      } else {

        vjsCall();
      }
    }

    /**
     * @function displayImages(a,b)
     * @description determines the images to be rendered
     * @parameter - number of images of render
     *           - batch number of the image lot
     * @returns void
     *
    */
    function displayImages(imgnumb,bat) {
      console.log("In displayImages()");
        removeImages();
        start = bat * imgnumb;
        end = start + imgnumb;
        result = imageArray.slice(start, end);
        dispImages(result);
    }

    function tester()
    {
      displayImages(9,0);
    }

    

   
    /************************************************************************/

    /************************************************************************/

    /**
     * @description - creates html component to display the images
     * @param {String} imageArray - an array of images
     * @returns {void} var src = ( ( imageArray[0].trim()).replace(/['"]+/g, ''));
    someText = src.replace(/(\r\n|\n|\r)/gm,"");

     */
    function pasteImages(imageArray) {

      console.log("In pasteImages");
      for (i = 0; i < imageArray.length; i++) {
        var liId = i;
        var img = new Image();
        var ul = document.getElementById('img_idnfctn');
        // img.onload = function() {
        img.src = ((imageArray[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
        console.log("img.src " + img.src);
        // Triming the double quotes passed on each image src
        img.alt = "Camera Trap";
        img.datamarked = 0;
        ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' +
        img.src + '"  marked="' + img.datamarked + '" src="' +
        img.src + '" alt="' + img.alt + '" /> </li>';
        // inserting an list of images uinside the ul tag
      }
    }

    /**
     * @description clears inner html components identified by elementId 'x'
     *
     */
    function removeImages() {
      console.log("In removeImages()");
      $("#x").html("");
    }

    /**
     *
     * @param {String} arry
     */
    function dispImages(arry) {
      console.log("IN dispImages()");
      pasteImages(arry);
    }

    /**
     * @description - indirect call to the createViewerComponent() function
     * @returns image view
     */
    function vjsCall() {
      console.log("In vjsCall()");
      createViewerComponent();
      return;
    }

    /**
     * @function createViewerComponent()
     * @description Function that creates the viewer component to view images
     * @returns viewer component
     */
    function createViewerComponent() {
      console.log("In ViewerJS() ");
      var viewer = new Viewer(document.getElementById('galley'), {
        url: 'data-original',
        title: function (image) {
          return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
        },
      });
    }



    /**
     * @function SelectedImages()
     * @returns an array with the currently selected images
    */
    function SelectedImages()
    {
      return highlighted_images;
    }

    /**
     * @function higlightAll()
     * @description selects all the panel images
     * @return highlighted_images
    */
      function higlightAll() {
        $("img").each(function (index) {
          $('#' + $(this).attr('id') + '').css({
            'opacity': '0.1',
            'filter': 'alpha(opacity=40)'
          });
          highlighted_images.push($(this).attr('src'));
          //console.log( index + " : " + "The SRC is : " + $( this ).attr('src'));
        });
        return highlighted_images;

      }

    /**
     * @function removeSelected()
     * @description deselects the currently selected images
     * @returns void
    */
      function removeSelected() {
        $("img").each(function (index) {
          $('#' + $(this).attr('id') + '').css({
            'opacity': '',
            'filter': ''
          });
          // highlighted_images.splice(highlighted_images.indexOf($( this ).attr('src')), 1);
        });
        highlighted_images.length = 0;
      }

    /**
     * @function sendDataToShinny()
     * @returns an array of selected images
     * @description sends the client selected image data back to server (Shinny)

      function sendDataToShinny(){
        if (highlighted_images === undefined || highlighted_images.length === 0) {
          alert("No Images Selected !!");
          return ;
        }
        else{
          const copy_selected_images = [...highlighted_images];
          removeSelected();
          return copy_selected_images;
        }
      }
    */