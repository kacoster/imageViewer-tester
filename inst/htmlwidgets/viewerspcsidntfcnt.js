HTMLWidgets.widget({

  name: 'viewerspcsidntfcnt',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        console.log("case identification module ...");

        // TODO: code to render the widget, e.g.
        Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_1",
          function(msg) {
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