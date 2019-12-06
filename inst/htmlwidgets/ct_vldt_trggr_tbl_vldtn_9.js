HTMLWidgets.widget({

  name: 'ct_vldt_trggr_tbl_vldtn_9',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        if (x.componentID === "ct_vldt_img_trggr_tbl_vldtn_9")
        {
           console.log("ct_vldt_img_trggr_tbl_vldtn_9");
           readServerData_ct_vldt(x.message);
          /*Shiny.addCustomMessageHandler("ct_vldt_trggr_tbl_vldtn_9_button",
                function(mesg) {
                  console.log("Handler ct_vldt_trggr_tbl_vldtn_9_button");
                  readServerData_ct_vldt(x.message);
                }
            );*/

        }

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
