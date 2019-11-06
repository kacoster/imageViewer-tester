function imgloop(ar) {

    console.log("In imgloop");
    for (i = 0; i < ar.length; i++) {
      var liId = i;
      var img = new Image();
      var ul = document.getElementById('img_classification_module');
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
  for(int i = 0 ; i < 4 ; i++)
  {
      console.long 
  }