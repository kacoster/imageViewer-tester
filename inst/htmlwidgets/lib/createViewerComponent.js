      /**
       * @description - creates html component to display the images
       * @param {String} ar - an array of images
       * @returns {void} var src = ( ( ar[0].trim()).replace(/['"]+/g, ''));
         someText = src.replace(/(\r\n|\n|\r)/gm,"");
       */
      function imgloop(ar) {

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
       * @function vjs()
       * @description Function that creates the viewer component to view images
       * @returns viewer component
       */
      function vjs() {
        console.log("In ViewerJS() ");
        var viewer = new Viewer(document.getElementById('galley'), {
          url: 'data-original',
          title: function (image) {
            return image.alt + ' (' + (this.index + 1) + '/' + this.length + ')';
          },
        });
      }


     