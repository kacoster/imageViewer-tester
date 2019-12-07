class ViewerComponent {

    constructor(batnum,imgNumb,columnSize,moduleId)
    {
        this.columnSize = columnSize;
        this.batnum = batnum;
        this.imgNumb = imgNumb;
        this.moduleId =moduleId;
        this.imgArray = [];
        this.selected_images = [];
        this.nextPrev = "0";
        this.result = [];
        this.tempRemoved ="";
    }

    setImagesNumber(numb)
    {
      this.imgNumb = numb;
    }

    setColumnNumb(numb)
    {
        this.columnSize = numb;
        this.setCol();
    }

    highliter(elementID)
    {
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
    setCol(){

        $('.pictures > li').css({
                'width' : 'calc(100% /' + this.columnSize +')'
            });
    }

    getCurrClckdImg(state, imgsrc)
    {
        Shiny.onInputChange(state,imgsrc);
    }

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
        //this.callImges(this.result);
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
        this.nextPrevClicked("1");
    
        if(this.batnum < this.getBatchNumber()-1){
              this.batnum++;
              Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
              (this.batnum+1) + " / " + this.getBatchNumber());
              console.log("batch Number : " + this.batnum);
              this.displayImages(this.imgNumb, this.batnum);
    
          }else{
            Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
              this.getBatchNumber() + " / " + this.getBatchNumber());
            this.displayImages(this.imgNumb, this.getBatchNumber()-1);
            this.batnum = this.getBatchNumber()-1;
          }
    }

    prev() {
        console.log("Prev Clicked");
           this.nextPrevClicked("1");
           this.batnum--;
        if (this.batnum > 0 ) {
           Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
              (this.batnum+1) + " / " + this.getBatchNumber());
            console.log("batch Number : " + this.batnum);
    
          this.displayImages(this.imgNumb ,this.batnum);
        }else{
           Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
             1 + " / " + this.getBatchNumber());
          this.displayImages(this.imgNumb, 0);
          this.batnum = 0;
        }
    }

    trimSRC(selctdImgAry)
    {
        let i = 0;
        let tempArray = [];
        for(i;i < selected_images.length;i++)
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
    vjs() {
        var viewer = new Viewer(document.getElementById('galley'), {
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
        return this.trimSRC(getSelectedImages());
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
}


/*readServerData(msg) {  // datapath , batchNumber , loadSize
    let csvfile = "" + msg + "";
    this.loadDoc( csvfile, myFunction1);
}

loadDoc(url, cFunction) {

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

myFunction1(xhttp) {
    let arry =[];
    arry = (xhttp.responseText.replace(/^\s*$[\n\r]{1,}/gm, '')).split(',');
    arry.splice(0, 1);
    arry[0] = arry[0].replace("Source", "");
    arry[0] = arry[arry.length - 1] + arry[0];
    arry.splice(arry.length - 1, 1);
    console.log(arry);
    return arry;
    /*Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
            1 + " / " + getBatchNumber());
    initial(imgNumb,0);

  }*/