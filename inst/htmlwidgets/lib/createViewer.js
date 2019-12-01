
class ViewerComponent {

    constructor(moduleId) {
        this.moduleId = moduleId;
        this.ar = [];
        this.selected_images = [];
        this.tempRemoved = [];
        this.nextPrev = 0;
        this.result = [];
        this.batnum = 0;
        this.imgNumb = 50;
    }

    /* 
    * Function to read Server Data from Server-Side
    * @parameter msg A message from Shiny indication the csv file
    *
    */
    readServerData(msg) {  // datapath , batchNumber , loadSize
        console.log("readServerData");
        var csvfile = "" + msg + "";
        console.log("readServerData : " + csvfile );
        this.loadDoc( csvfile, this.processResponseText);
    }

    loadDoc(url, cFunction) {
        console.log("loadDoc");

        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Ready");
                cFunction(this);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
    
    processResponseText(xhttp) {
        console.log("myFunction1 ");
        console.log(this.ar.length);
        console.log((xhttp.responseText.replace(/^\s*$[\n\r]{1,}/gm, '')).split(','));
        this.ar = (xhttp.responseText.replace(/^\s*$[\n\r]{1,}/gm, '')).split(',');
        this.ar.splice(0, 1);
        this.ar[0] = this.ar[0].replace("Source", "");
        this.ar[0] = this.ar[this.ar.length - 1] + this.ar[0];
        this.ar.splice(this.ar.length - 1, 1);
        console.log(this.ar);
        alert("ImageNumber : " + this.imgNumb);
        Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
            1 + " / " + this.getBatchNumber());
        this.initial(this.imgNumb,0);
    }
    

    /*async processResponseText(csvfile)
    {
        this.ar = this.fetchServerFile(csvfile).split(',');
        this.ar.splice(0, 1);
        this.ar[0] = this.ar[0].replace("Source", "");
        this.ar[0] = this.ar[this.ar.length - 1] + this.ar[0];
        this.ar.splice(this.ar.length - 1, 1);
        console.log(this.ar);
        alert("ImageNumber : " + this.imgNumb);
        Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
            1 + " / " + this.getBatchNumber());
        this.initial(this.imgNumb,0);
    }*/

     
   /* async  fetchServerFile(msg) {
        let fetchresult = await (await fetch(msg)).text();
        console.log("fetchresult : " + fetchresult);
        //this.writeToArray(fetchresult.replace(/^\s*$[\n\r]{1,}/gm, ''));
        return new Promise(fetchresult.replace(/^\s*$[\n\r]{1,}/gm, ''));
    }*/

    /**
     * @function initial(a,b)
     * @description determines the images to be rendered
     * @parameter - number of images of render
     *           - batch number of the image lot
     * @returns void
     *
     */
    initial(imgnumb,bat) {
        this.clearImages(this.moduleId);
        start = bat * imgnumb;
        end = start + imgnumb;
        result = ar.slice(start, end);
        this.imgloop(result);
    }
    /**
     * @description - creates html component to display the images
     * @param {String} ar - an array of images
     * @returns {void} 
     */
    imgloop(ar) {
            
        console.log("moduleId : " + this.moduleId);
        this.clearImages();
        $(".pictures > li").css("background-color", "white");
        console.log("In imgloop");
        for (i = 0; i < this.ar.length; i++) {
            let liId = i;
            let img = new Image();
            let ul = document.getElementById(this.moduleIdm);
            img.src = ((ar[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
            // Triming the double quotes passed on each image src
            img.alt = "Camera Trap";
            img.datamarked = 0;
            ul.innerHTML += '<li ><img id="' + liId + '" data-original="' +
            img.src + '"  marked="' + img.datamarked + '" src="' +
            img.src + '" alt="' + img.alt + '" /> </li>';
            // inserting an list of images uinside the ul tag
        }
    }

    clearImages() {
        console.log("In clearImages() " + this.moduleId);
        $('#' + this.moduleId + '').html("");
        //$("#x").html("");
    }

    /**
     * @function displayImages(a,b)
     * @description determines the images to be rendered
     * @parameter - number of images of render
     *           - batch number of the image lot
     * @returns void
     *
    */
     displayImages(imgnumb,bat,arry) {

        console.log("In displayImages()");
        let startIndex , endIndex;
        this.clearImages();
        startIndex = bat * imgnumb;
        endIndex = startIndex + imgnumb;
        resultsArray = arry.slice(startIndex, endIndex);
        this.imgloop(resultsArray);
        //dispImages(resultsArray);
    }

    /*
    * @function getSelectedImages()
    * @returns an array with the currently selected images
    */
    getSelectedImages()
    {
        return this.selected_images;
    }

    /*
    * @function selectAll()
    * @description selects all the panel images
    * @return selected_images
    */
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

    /**
     * @function deSelectAll()
     * @description deselects the currently selected images
     * @returns void
     */
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

    /**
     * @function sendDataToShinny()
     * @returns an array of selected images
     * @description sends the client selected image data back to server (Shinny)
     */
    sendDataToShinny(){
        if (selected_images === undefined || selected_images.length === 0) {
            alert("No Images Selected !!");
            return ;
        }
        else{
            const copy_selected_images = [...selected_images];
            this.deSelectAll();
            return copy_selected_images;
        }
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


    getCurrClckdImg(state, imgsrc)
    {
        Shiny.onInputChange(state,imgsrc);
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
            this.tempRemoved =  (params.splice(params.indexOf(src),1))[0];
            this.removeHighlight(id);
            if(params.length > 0)
            {
                this.getCurrClckdImg("clssfctn_slctd_img",
                params[params.length -1].substring(
                src.lastIndexOf("/") + 1, src.length ));
            }else{
                this.getCurrClckdImg("clssfctn_slctd_img","");
            }
        }
        else {
            params.push(src);
            $(".pictures > li").css("background-color", "yellow");
            this.highliter(id);
            this.getCurrClckdImg("clssfctn_slctd_img",
            src.substring(src.lastIndexOf("/") + 1, src.length ));
        }
    }

    /**
     * Function inprogress to fix the previous image Reference
     */
    removedRef()
    {
        return this.tempRemoved;
    }

    /**
     * Handles all image panel click events
     * @parameter - event click/shiftKey
     *
     * Checks if event is shiftKey/click
     * Execute appropriate instructions based on event
     * @return void
     */
    isKeyPressed(event) {
        arrayClone(this.selected_images);
        // send message to Shiny
        //var imageName = event.target.src;

        if (event.shiftKey) {
            this.handleExistance(this.selected_images, event.target.src, event.target.id);
        } else {
            //clickEventStatus("0");
            objectOf("imgClassification");
            this.vjsCall();
        }
    }

    /**
     * @description - indirect call to the vjs() function
     * @returns image view
     */
    vjsCall() {
        this.vjs();
        return;
    }

    /**
     * @function vjs()
     * @description Function that creates the viewer component to view images
     * @returns viewer component
     */
    vjs() {
        var viewer = new Viewer(document.getElementById('galley'), {
            url: 'data-original',
            title: function (image) {
            return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
            },
        });
    }

    docReady(){

        $(document).ready(function () { 
            
            $("#apply").on("click", function () {
                Shiny.onInputChange("sources", 
                this.sendDataToShinny());
            });

            $("#selectAll").on("click", function () {
                Shiny.onInputChange("sources", 
                this.selectAll());
            });

            $("#deSelectAll").on("click", 
                function () {
                    this.deSelectAll();
            });

            $("#img_clssfctn_ud_nxt_bttn").on("click", 
                function () {
                    Shiny.onInputChange("next", 
                    this.next());
            });

            $("#img_clssfctn_ud_prvs_bttn").on("click", 
                function () {
                    Shiny.onInputChange("prev", 
                    this.prev());
            });
        });
   }

    setImagesNumber(numb)
    {
        this.imgNumb = numb;
    }


}