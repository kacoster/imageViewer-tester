HTMLWidgets.widget({

  name: 'viewerimgclssfctnud',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
     

    return {

      renderValue: function(x) {

       

       console.log("case classification module ");

           //readServerData(x.message);
           isKeyPressed();
           Shiny.addCustomMessageHandler("img_clssfctn_ud_batch_image_size",
              function(message) {
                imgClssfctnObj.setImagesNumber(parseInt(JSON.stringify(message)));
                console.log("Handler img_clssfctn_ud_batch_image_size " + parseInt(JSON.stringify(message)));
                 //readServerData(x.message);
                }
            );

            Shiny.addCustomMessageHandler("img_clssfctn_ud_img_clmn_numb",
              function(message) {
                imgClssfctnObj.setColumnNumb(parseInt(JSON.stringify(message)));
                console.log("Handler img_clssfctn_ud_img_clmn_numb : " + parseInt(JSON.stringify(message)));
                }
            );

            Shiny.addCustomMessageHandler("img_clssfctn_ud_fltr_button",
                function(mesg) {
                  console.log("Handler img_clssfctn_ud_fltr_button");
                  fetchServerData(x.message,x.componentID);
                }
            );
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
