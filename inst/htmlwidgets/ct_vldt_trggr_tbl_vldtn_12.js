HTMLWidgets.widget({

  name: 'ct_vldt_trggr_tbl_vldtn_12',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {
           //console.log("ct_vldt_img_trggr_tbl_vldtn_12");
           //console.log("x.message : " + x.message);
           //console.log("x.componentID : " + x.componentID);
           
          Shiny.addCustomMessageHandler("ct_vldt_trggr_tbl_vldtn_12_pll_indvdl_button",
                function(mesg) {
                  //console.log("Handler ct_vldt_trggr_tbl_vldtn_12_pll_indvdl_button");
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
