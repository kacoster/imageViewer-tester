
  ar = [];
  resetSel = [];
  selected_images = [];
  tempRemove;
  result ; start;
  batnum = 0; // default batch Number
  imgNumb = 9; // default image size

  class ModuleViewer
  {

        constructor(batnum,imgNumb)
        {
            this.batnum = batnum;
            this.imgNumb = imgNumb;
            console.log("constructor");
        }

       docReady()
       {
           $(document).ready(function () {


                    console.log("v 0.9");
              //readServerData();
              $("#goButton").on("click", function () {
                  // send message to Shiny
                  Shiny.onInputChange("sources", sendDataToShinny());
              });

              $("#apply").on("click", function () {
                  // send message to Shiny
                  Shiny.onInputChange("sources", sendDataToShinny());
              });

              $("#selectAll").on("click", function () {
                  Shiny.onInputChange("sources", selectAll());
                  //selectAll();
              });

              $("#deSelectAll").on("click", function () {
                  deSelectAll();
              });

              $("#img_clssfctn_ud_nxt_bttn").on("click", function () {
              Shiny.onInputChange("next", next());
              });

              $("#img_clssfctn_ud_prvs_bttn").on("click", function () {
              Shiny.onInputChange("prev", prev());
              });

              /**********************************************************************/
              // For Testing Purposes
              $("#prev").on("click", function () {
                  prev();
              });
              $("#next").on("click", function () {
                  next();
              });
              /**********************************************************************/
              // var classifierViewer = new  ModuleViewer();

          });

       }

        readServerData(msg)
        {
            var csvfile = "" + msg + "";
            console.log("readServerData : " +  csvfile);
            loadDoc( csvfile, myFunction1);
        }


      setImgNumb(imgNumb)
        {

            this.imgNumb = imgNumb;
        }

        getImgNumb()
        {
            return this.imgNumb;
        }


        loadDoc(url, cFunction)
        {
            console.log("In loadDoc()");
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

        myFunction1(xhttp)
        {
            console.log("myFunction1()");
            ar = (xhttp.responseText.replace(/^\s*$[\n\r]{1,}/gm, '')).split(',');
            ar.splice(0, 1);
            ar[0] = ar[0].replace("Source", "");
            ar[0] = ar[ar.length - 1] + ar[0];
            ar.splice(ar.length - 1, 1);
            console.log("Number of Images : " + ar.length );

        /************************************************************************
         Shiny.addCustomMessageHandler("testmessage",
            function (message) {
                imgNumb = parseInt(JSON.stringify(message));
            }
            );

            Shiny.addCustomMessageHandler("testmsg",
            function (message) {
                batnum = parseInt(JSON.stringify(message));
                initial(imgNumb, batnum);
            }
            );
            ************************************************************************/

        // Read the batch Image Number from from slider
        Shiny.addCustomMessageHandler("batchImageSize",
            function(message) {
            //console.log() "btch_img_msg",

            imgNumb =  parseInt(JSON.stringify(message));
            initial(imgNumb,0);
            }

        );

        /*Shiny.addCustomMessageHandler("btch_num_msg",
        function(message) {
            batnum =  parseInt(JSON.stringify(message));
            initial(imgNumb,batnum);
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
        highliter(elementID)
        {
            $('#' + elementID + '').css({
                'opacity': '0.4',
                'filter': 'alpha(opacity=40)'
                });
        }

        /**
         * Removes Highlights a unselected image
         * @parameter selected image id
         * Removes opacity - reverts to original opacity
         * @return void
         */
        removeHighlight(elementID)
        {
            $('#' + elementID + '').css({
                'opacity': '',
                'filter': ''
                });
        }

        /**
         * Helper function for isKeyPressed()
         * @parameter - array of selected images - selected_images
         *            - target image src
         *            - target element id
         * Checks if target image has already been selected
         * @return void
         */
        handleExistance(params,src,id)
        {
            if(params.includes(src))
            {
            tempRemoved =  (params.splice(params.indexOf(src),1))[0];
            removeHighlight(id);
            }
            else{
            //console.log("Not marked");
            params.push(src);
            highliter(id);
            Shiny.onInputChange("image_name", src.substring(src.lastIndexOf("/") + 1, src.length ));
            }
        }

        /**
         * Function inprogress to fix the previous image Reference
         */
        removedRef()
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
        isKeyPressed(event)
        {

            // send message to Shiny
            var imageName = event.target.src;

            if (event.shiftKey) {
            handleExistance(selected_images, event.target.src, event.target.id);

            } else {

            myFunction();
            }
        }

        /**
         * @function initial(a,b)
         * @description determines the images to be rendered
         * @parameter - number of images of render
         *           - batch number of the image lot
         * @returns void
         *
         */
        initial(imgnumb,bat)
        {
            console.log("In initial()");
            clearImages();
            start = bat * imgnumb;
            end = start + imgnumb;
            result = ar.slice(start, end);
            callImges(result);
        }

        tester()
        {
            initial(9,0);
        }

        /**
         * @function getBatchNumber()
         * @description computes the total number of available batches
         * @constrains the number of images per batchimgNumb()
         * @return the total number of batches
         */
        getBatchNumber()
        {


            if((ar.length %  imgNumb)===0){
                return (ar.length / imgNumb);
            }
            else{
            return ((Math.floor(ar.length / imgNumb)) + 1);
            }
        }

        /**
         * @description computes and displays the next image batch
         *
         */
        next()
        {
          if(batnum < getBatchNumber()-1)
          {
            batnum++;
            initial(imgNumb, batnum);
          }else
          {
            initial(imgNumb, getBatchNumber()-1);
            batnum = getBatchNumber()-1;
          }
        }

        /**
         * @description computes and displays the previous image batch
         *
         */
        prev()
        {
          batnum--;
          if (batnum > 0 )
          {
            initial(imgNumb ,batnum);
          }else
          {
            initial(imgNumb, 0);
            batnum = 0;
          }
        }
        /************************************************************************/

        /************************************************************************/

        /**
         * @description - creates html component to display the images
         * @param {String} ar - an array of images
         * @returns {void} var src = ( ( ar[0].trim()).replace(/['"]+/g, ''));
         someText = src.replace(/(\r\n|\n|\r)/gm,"");

        */
        imgloop(ar)
        {

            console.log("In imgloop");
            for (i = 0; i < ar.length; i++) {
            var liId = i;
            var img = new Image();
            var ul = document.getElementById('x');
            // img.onload = function() {
            img.src = ((ar[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
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
        clearImages()
        {
            console.log("In clearImages()");
            $("#x").html("");
        }

        /**
         *
         * @param {String} arry
         */
        callImges(arry)
        {
            console.log("IN callImges()");
            imgloop(arry);
        }

        /**
         * @description - indirect call to the vjs() function
         * @returns image view
         */
        myFunction()
        {
            console.log("In myFunction()");
            vjs();
            return;
        }

        /**
         * @function vjs()
         * @description Function that creates the viewer component to view images
         * @returns viewer component
         */
        vjs()
        {
            console.log("In ViewerJS() ");
            var viewer = new Viewer(document.getElementById('galley'), {
            url: 'data-original',
            title: function (image) {
                return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
            },
            });
        }



        /**
         * @function getSelectedImages()
         * @returns an array with the currently selected images
         */
        getSelectedImages()
        {
            console.log("getSelected()");
            //return selected_images;
        }

        /**
         * @function selectAll()
         * @description selects all the panel images
         * @return selected_images
         */
        selectAll()
        {
            $("img").each(function (index) {
                $('#' + $(this).attr('id') + '').css({
                'opacity': '0.1',
                'filter': 'alpha(opacity=40)'
                });
                selected_images.push($(this).attr('src'));
                //console.log( index + " : " + "The SRC is : " + $( this ).attr('src'));
            });
            return selected_images;
        }

        /**
         * @function deSelectAll()
         * @description deselects the currently selected images
         * @returns void
         */
        deSelectAll()
        {
          $("img").each(function (index) {
              $('#' + $(this).attr('id') + '').css({
              'opacity': '',
              'filter': ''
              });
              // selected_images.splice(selected_images.indexOf($( this ).attr('src')), 1);
          });
          selected_images.length = 0;
        }

        /**
         * @function sendDataToShinny()
         * @returns an array of selected images
         * @description sends the client selected image data back to server (Shinny)
         */
        sendDataToShinny()
        {
            if (selected_images === undefined || selected_images.length === 0) {
                alert("No Images Selected !!");
                return ;
            }
            else{
                const copy_selected_images = [...selected_images];
                deSelectAll();
                return copy_selected_images;
            }
        }
  }

/*var v1 = new ModuleViewer(1,12);
console.log(v1.batnum);
console.log(v1.imgNumb);
console.log("ModuleViewer out");*/



