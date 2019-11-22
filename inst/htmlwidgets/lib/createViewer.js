    var createViewer = function(imgsArray,selected_images) {
        
        //this.viewerId = viewerId;
        this.imgsArray = imgsArray;
        this.selected_images = selected_images;
       
    }

    createViewer.prototype.docOnReady = function () {
      $(document).ready(function () {

          $("#apply").on("click", function () {
            Shiny.onInputChange("sources", sendDataToShinny());
          });

          $("#selectAll").on("click", function () {
            Shiny.onInputChange("sources", selectAll());
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

      });
    }

    createViewer.prototype.selectAll = function () {
      $("img").each(function (index) {
        $('#' + $(this).attr('id') + '').css({
          'opacity': '0.1',
          'filter': 'alpha(opacity=40)'
        });
        this.selected_images.push($(this).attr('src'));
      });
      return this.selected_images;  
    }

    createViewer.prototype.deSelectAll = function () {

      $("img").each(function (index) {
        $('#' + $(this).attr('id') + '').css({
          'opacity': '',
          'filter': ''
        });
      });
      this.selected_images.length = 0;

    }

    createViewer.prototype.getBatchNumber = function () {

      if(((this.imgsArray).length %  this.imgNumber)===0){
        return ((this.imgsArray).length / this.imgNumber);
      }
      else{
        return ((Math.floor((this.imgsArray).length / imgNumb)) + 1);
      }

    };

    createViewer.prototype.fetchServerFile = async function (msg) {
        console.log("In fetchServerFile()");
        let result= await (await fetch(msg)).text();
        return result.replace(/^\s*$[\n\r]{1,}/gm, '');
    };

    createViewer.prototype.processResponseText = function (csvfile) {

      console.log("In processResponseText()");
      this.batnum = 0;
      this.imgNumber = 20;
      let imgSize = await this.img_clssfctn_msg_handler();
      let textResult = await this.fetchServerFile(csvfile);
      this.imgsArray = (textResult).split(',');
      this.imgsArray.splice(0, 1);
      this.imgsArray[0] =  this.imgsArray[0].replace("Source", "");
      this.imgsArray[0] =  this.imgsArray[ this.imgsArray.length - 1] + this.imgsArray[0];
      this.imgsArray.splice( this.imgsArray.length - 1, 1);
      console.log(this.imgsArray);
      console.log("imgNumber before change  : " + this.imgNumber);
      this.imgNumber = imgSize;
      console.log("imgNumber After change  : " + this.imgNumber);
      Shiny.onInputChange("img_clssfctn_ud_btch_tckr", 
        1 + " / " + this.getBatchNumber());
      this.displayImages(0);
     // Read the batch Image Number from from slider : img_clssfctn_ud_btch_img_thrshld
    
    };

    createViewer.prototype.img_clssfctn_msg_handler = async function (){
          let imgSize ;
    Shiny.addCustomMessageHandler("img_clssfctn_ud_batch_image_size",
        function(message) {
            console.log("MESSAGE VALUE : " + message );

            imgSize =  parseInt(JSON.stringify(message));
        });
        console.log("imgSize in handler  : " + imgSize );

    return imgSize;
    }

    createViewer.prototype.handleExistance = function (params,src,id)
    {
      console.log("Line : " + 181);
      if(params.includes(src))
      {
        tempRemoved =  (params.splice(params.indexOf(src),1))[0];
        this.removeHighlight(id);
        if(params.length > 0)
        {
          this.getCurrClckdImg("clssfctn_slctd_img",
          params[params.length -1].substring(
            src.lastIndexOf("/") + 1, src.length ));
        }else{
          getCurrClckdImg("clssfctn_slctd_img","");
        }
      }
      else{
        console.log("Line : " + 188);
        params.push(src);
        $(".pictures > li").css("background-color", "yellow");
         this.highliter(id);
         this.getCurrClckdImg("clssfctn_slctd_img",
            src.substring(src.lastIndexOf("/") + 1, src.length ));
      }
    };

    createViewer.prototype.highliter = function (imgId)
    {
      console.log("Highting the Image");
      $('#' + imgId + '').css({
          'opacity': '0.4',
          'filter': 'alpha(opacity=40)'
        });
    };

    createViewer.prototype.removeHighlight = function (imgId)
    {
      $('#' + imgId + '').css({
        'opacity': '',
        'filter': ''
      });
    };

    createViewer.prototype.getCurrClckdImg = function (state, imgsrc)
    {
      Shiny.onInputChange(state,imgsrc);
    };

    createViewer.prototype.isKeyPressed = function (event) {

        this.arrayClone(selected_images);
        if (event.shiftKey) {
            this.handleExistance(this.selected_images, event.target.src, event.target.id);

        } else {
             objectOf("imgClassification");
             this.viewerComponent(this.viewerId);
          }
    };

    // createViewerComponent_rf2 , vjs() , createViewerComponent
    createViewer.prototype.viewerComponent = function () {
        var viewer = new Viewer(document.getElementById(this.galid), {
          url: 'data-original',
          title: function (image) {
            return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
          },
        });
      };

    createViewer.prototype.arrayClone =  function (param){
        selected_images_clone = [...param];
        //return selected_images_clone;
     };

    createViewer.prototype.objectOf = function (viewerType)
    {
      return viewerType;
    };

    createViewer.prototype.nextPrevClicked = function (status) // ATTENTION
    {
        nextPrev = status;
    };

    createViewer.prototype.getCurrClckdImg = function (state, imgsrc) // ATTENTION
    {
      Shiny.onInputChange(state,imgsrc);
    };

    function clickEventStatus(status)
    {
      clickStatus = status;
    };

    createViewer.prototype.removedRef = function  ()
    {
      return tempRemoved;
    };

    // imgloop
    createViewer.prototype.buildImages = function (arry) {
        console.log("In buildImages()");
        $(".pictures > li").css("background-color", "white");
        for (i = 0; i < arry.length; i++) {
          let liId = i;
          let img = new Image();
          let ul = document.getElementById(this.viewerId);
          img.src = ((arry[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
          img.alt = "Camera Trap";
          img.datamarked = 0;
          ul.innerHTML += '<li ><img id="' + liId + '" data-original="' +
          img.src + '"  marked="' + img.datamarked + '" src="' +
          img.src + '" alt="' + img.alt + '" /> </li>';
        }
    };

    createViewer.prototype.displayImages = function (bat) {
        console.log("In displayImages()");
        let startIndex , endIndex;
        this.clearImages();
        startIndex = bat * this.imgNumber;
        endIndex = startIndex + this.imgNumber;
        //console.log("bat * 10 : " +  this.batnum *10 + " Type of " + typeof(this.batnum) );
        //console.log("this.imgnumb * 5 : " + this.imgNumber *5 + " Type of " + typeof(this.imgNumber) );
        console.log("startIndex : " +  startIndex    + " Type of " + typeof(startIndex) );
        console.log("endIndex   : " +  endIndex  + " Type of " + typeof(endIndex) );
        resultsArray = this.imgsArray.slice(startIndex, endIndex);
        this.buildImages(resultsArray);
        
    };

    createViewer.prototype.clearImages = function () {
        //console.log("In clearImages()");
        $('#' + this.viewerId + '').html("");
        //$("#x").html("");
    };

    createViewer.prototype.getBatchNumber = function () {

        if((this.imgsArray.length %  this.imgNumber)===0){
            return (this.imgsArray.length / this.imgNumber);
        }
        else{
          return ((Math.floor(this.imgsArray.length / this.imgNumber)) + 1);
        }
    };

    createViewer.prototype.next = function () {
        this.nextPrevClicked("1");

        if(this.batnum < this.getBatchNumber()-1){
            this.batnum++;
               //console.log("Tester : " +   batnum + "/" + getBatchNumber());
            Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
                (this.batnum + 1) + " / " + this.getBatchNumber());
            this.clearImages();
            this.displayImages(this.batnum);

        }else{
           Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
             this.getBatchNumber() + " / " + this.getBatchNumber());
             this.clearImages();
             this.displayImages(this.getBatchNumber()-1);
             this.batnum = this.getBatchNumber()-1;
        }
    };

    createViewer.prototype.prev = function () {
        this.nextPrevClicked("1");
        this.batnum--;
        if (this.batnum > 0 ) {
           Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
              (this.batnum+1) + " / " + this.getBatchNumber());
              this.clearImages();
              this.displayImages(this.batnum);
        }else{
           Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
             1 + " / " + this.getBatchNumber());
             this.clearImages();
             this.displayImages(0);
             this.batnum = 0;
        }
    };

    //let classification = new createViewer('imgsArray','selected_images',1,50);
    //console.log(classification.getBatchNumber());
    //classification.processResponseText('img_clssfctn_ud.csv');
   // console.log(" Checking my Car : "+ car);





   