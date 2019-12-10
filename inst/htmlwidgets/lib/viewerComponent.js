class ViewerComponent {

    constructor(batnum,imgNumb,columnSize,moduleId,csvfile)
    {
        this.columnSize = columnSize;
        this.batnum = batnum;
        this.imgNumb = imgNumb;
        this.moduleId =moduleId;
        this.csvfile = csvfile;
        this.imgArray = [];
        this.selected_images = [];
        this.nextPrev = "0";
        this.result = [];
        this.tempRemoved ="";
    }
    
   
    loadFile(filename) {
      let result = null;
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", filename, false);
      xmlhttp.send();
      if (xmlhttp.status==200) {
        result = (xmlhttp.responseText).replace(/^\s*$[\n\r]{1,}/gm, '');
      }
      return result;
    }
  
    readServerData(response) {
      // let response = this.loadFile(this.csvfile);
      if(response === null )
      {
        alert(" Error in reading your images.Please check if all requirements are provided.");
      }
      else{
        this.imgArray = response.split(',');
        this.imgArray.splice(0, 1);
        this.imgArray[0] = this.imgArray[0].replace("Source", "");
        this.imgArray[0] = this.imgArray[this.imgArray.length - 1] + this.imgArray[0];
        this.imgArray.splice(this.imgArray.length - 1, 1);

        if(this.moduleId === "img_clssfctn_ud")
        {
          Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
          1 + " / " + this.getBatchNumber());
        }
      }
      this.imgloop(this.displayImages(this.imgNumb,0));
    }

    initializeImgArray(array)
    {
      this.imgArray = [...arr];
    }

    highliter(elementID)
    {
        console.log("In Highlighter");
        $('#' + elementID + '').css({
            'opacity': '0.4',
            'filter': 'alpha(opacity=40)'
            });
    }

    removeHighlight(elementID)
    {
        $('#' + elementID + '').css({
            'opacity': '',
            'filter': ''
            });
    }
    /** Not Yet Generic */
    setCol(){
      let className = $('#' + this.moduleId + '').attr('class'); 
      console.log("Class Name : " + className);
      $('.' + className + ' > li').css({
              'width' : 'calc(100% /' + this.columnSize +')'
      });
    }

    /*** return the ul element class Name */
    getULClass()
    {

    }

    getCurrClckdImg(state, imgsrc)
    {
        Shiny.onInputChange(state,imgsrc);
    }

    /** Not Yet Generic */
    handleExistance(params,src,id)
    {

        if(params.includes(src))
        {
            this.tempRemoved =  (params.splice(params.indexOf(src),1))[0];
            this.removeHighlight(id);
            if(params.length > 0)
            {
                console.log(this.getTrimedSelectedImages().toString());
                this.getCurrClckdImg("clssfctn_slctd_img",this.getTrimedSelectedImages().toString());
            }else{
                this.getCurrClckdImg("clssfctn_slctd_img","");
            }
        }
        else{
            params.push(src);
            $(".pictures > li").css("background-color", "yellow");
            this.highliter(id);
            console.log(this.getTrimedSelectedImages().toString());
            this.getCurrClckdImg("clssfctn_slctd_img",this.getTrimedSelectedImages().toString());
        }
    }

    removedRef()
    {
        return this.tempRemoved;
    }

    displayImages(imgnumb,bat) {
        console.log("Display Images");
        this.clearImages();
        let start ,end;
        start = bat * imgnumb;
        end = start + imgnumb;
        this.result = this.imgArray.slice(start, end);
        return this.result;
        //this.imgloop(this.result);
    }

    getBatchNumber()
    {
        if((this.imgArray.length %  this.imgNumb)===0){
            return (this.imgArray.length / this.imgNumb);
        }
        else{
        return ((Math.floor(this.imgArray.length / this.imgNumb)) + 1);
        }
    }
    // We need a function that maps to diff modules
    next() {
        console.log("Next Clicked");
        nextPrevClicked("1");

        if(this.batnum < this.getBatchNumber()-1){
              this.batnum++;
              Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
              (this.batnum+1) + " / " + this.getBatchNumber());
              console.log("batch Number : " + this.batnum);
              this.imgloop(this.displayImages(this.imgNumb, this.batnum));
              this.selected_images.length = 0;
              this.getCurrClckdImg("clssfctn_slctd_img","");
    
          }else{
            Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
              this.getBatchNumber() + " / " + this.getBatchNumber());
            this.imgNumb(this.displayImages(this.imgNumb, this.getBatchNumber()-1));
            this.batnum = this.getBatchNumber()-1;
            this.selected_images.length = 0;
            this.getCurrClckdImg("clssfctn_slctd_img","");
          }
    }

    prev() {
        console.log("Prev Clicked");
           nextPrevClicked("1");
           this.batnum--;
        if (this.batnum > 0 ) {
           Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
              (this.batnum+1) + " / " + this.getBatchNumber());
            console.log("batch Number : " + this.batnum);
          this.imgloop(this.displayImages(this.imgNumb ,this.batnum));
          this.selected_images.length = 0;
          this.getCurrClckdImg("clssfctn_slctd_img","");
        }else{
           Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
             1 + " / " + this.getBatchNumber());
          this.imgloop(this.displayImages(this.imgNumb, 0));
          this.selected_images.length = 0;
          this.getCurrClckdImg("clssfctn_slctd_img","");
          this.batnum = 0;
        }
    }

    trimSRC(selctdImgAry)
    {
        let i = 0;
        let tempArray = [];
        for(i;i < this.selected_images.length;i++)
        {
            let newSRC = selctdImgAry[i].substring(selctdImgAry[i].lastIndexOf("/") + 1, 
                selctdImgAry[i].length );
            tempArray[i] = newSRC;
        }
        return tempArray;
    }

    clearImages() {
        console.log("In clearImages() " + this.moduleId);
        $('#' + this.moduleId + '').html("");
    }

    // See if this indeed should ne var 
    vjs(elementID) {
        console.log("vjs : " + elementID);
        var viewer = new Viewer(document.getElementById(elementID), {
            url: 'data-original',
            title: function (image) {
            return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
            },
        });
    }

   
    getSelectedImages()
    {
        // src.substring(src.lastIndexOf("/") + 1, src.length )
        //console.log(selected_images);
        return this.selected_images;
    }

    getTrimedSelectedImages()
    {
        return this.trimSRC(this.getSelectedImages());
    }

    // This is specific to tag #
    selectAll() {
      $("img").each(function (index) {
        $('#' + $(this).attr('id') + '').css({
          'opacity': '0.1',
          'filter': 'alpha(opacity=40)'
        });
        this.selected_images.push($(this).attr('src'));
      });
      return this.selected_images;

    }

    deSelectAll() {
      $("img").each(function (index) {
        $('#' + $(this).attr('id') + '').css({
          'opacity': '',
          'filter': ''
        });
        // selected_images.splice(selected_images.indexOf($( this ).attr('src')), 1);
      });
      this.selected_images.length = 0;
    }

    sendDataToShinny(){
      if (this.selected_images === undefined || this.selected_images.length === 0) {
        alert("No Images Selected !!");
        return ;
      }
      else{
        const copy_selected_images = [...this.selected_images];
        this.deSelectAll();
        return copy_selected_images;
      }
    }

    imgloop(ar) {
      //$(".pictures > li").css("width", "calc(100% / " + columnSize + ")");
      this.liWhiteBackground();
      console.log("Module Id in imgloop " + this.moduleId);
      let ul = document.getElementById(this.moduleId);
      for (let i = 0; i < ar.length; i++) {
        let liId = i+"_"+this.moduleId;
        let img = new Image();
        img.src = ((ar[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
        img.alt = "Camera Trap";
        img.datamarked = 0;
        ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' + img.src + '"  marked="' + img.datamarked + '" src="' + img.src + '" alt="' + img.alt + '" /> </li>';
        this.setCol();
      }
      //$(".pictures > li").css("background-color", "yellow");
      //$('#'+this.moduleId +'').html($(ul).attr('onmousedown="' + this.isKeyPressed(event) +'"' ));
    }

    changeCSS(element)
    {
      $('.'+ element ).css("list-style", none);
      $('.'+ element ).css("margin", 0);
      $('.'+ element ).css("max-width", "500rem");
      $('.'+ element ).css("padding", 0);

      /*$('.'+ element ).css({
        'list-style' : 'none',
        'margin' : '0',
        'max-width' : '500rem',
        'padding' : ' 0'
      });*/

      $('.'+ element + '> li').css("border", "2px solid white");
      $('.'+ element + '> li').css("float", "left");
      $('.'+ element + '> li').css("float", "left");

      $('.'+ element + '> li').css({
        'border' : '2px solid white',
        'float' : 'left',
        'width' : 'calc(100% /' + this.columnSize +')',
        'height' : 'calc(100% /' + this.columnSize +')',
        'margin' : '0 -1px -1px 0',
        'overflow' : 'hidden',
      });

      $('.'+ element + '> li > img').css({
        'cursor' : 'pointer',
        'width' : '100%',
        'overflow' : 'hidden'
      });
    }

    liWhiteBackground()
    {
      $(".pictures > li").css("background-color", "white");
    }

    /**
   * @description - indirect call to the vjs() function  
   * @returns image view myFunction
   */
   callvjs(elementId) {   
    this.vjs(elementId);
    return;
  }

  isKeyPressed(event) {
    console.log(" isKeyPressed(event)");
    console.log("event.target.src : " + event.target.src);
     arrayClone(this.selected_images);
    if (event.shiftKey) {
      console.log(" isKeyPressed : event.shiftKey");
      this.handleExistance(this.selected_images, event.target.src, event.target.id);
    } else {
      console.log(" isKeyPressed : " + event.click);
      objectOf("imgClassification");
      this.callvjs();
    }
  }
}

