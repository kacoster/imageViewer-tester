HTMLWidgets.widget({

  name: 'PantheraIDSImageViewer',

  type: 'output',


  /**
   * Factory Function
   * @params el -  , width , height
  */

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

    renderValue: function(x) {

      /**
       * Calling readServerData function
       * Passing the filePath parameter as an argument
      */


      if(x.componentID === "img_clssfctn_ud")
      {
        let classification = new createViewer('imgsArray','selected_images',1,50,x.componentID);
        classification.processClsfctnResponseText(x.message);
        console.log("CASE : classification module ");
        //processClsfctnResponseText(x.message);
      }
      else if (x.componentID === "spcs_idntfctn_id_rf_1")
      {
        let spcsIdntfctn1 = new createViewer('imgsArray','selected_images',1,20,x.componentID);
        spcsIdntfctn1.processClsfctnResponseText(x.message);
        console.log("CASE : spcs_idntfctn_id_rf_1 ");
        //processIdnfctn1ResponseText(x.message);
      }
      else
      {
        let spcsIdntfctn2 = new createViewer('imgsArray','selected_images',2,20,x.componentID);
        spcsIdntfctn2.processClsfctnResponseText(x.message);
        console.log("CASE : spcs_idntfctn_id_rf_1 ");
        //processIdnfctn2ResponseText(x.message);
      }

    },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
