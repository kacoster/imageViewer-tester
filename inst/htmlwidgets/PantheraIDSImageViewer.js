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
          console.log("CASE : classification module ");
          //readServerData(x.message);
           readServerData(x.message);
          //console.log("Server Data : " + getServerData());
          //var classifierViewer = new  ModuleViewer(285);
          //classifierViewer.docReady();
         // initial(9,1,readServerData(x.message));
          //classifierViewer.readServerData(x.message);
          //classifierViewer.imgloop(classifierViewer.initial(9,0));
        }
        else{

          console.log("CASE : identification module");
          //var classifierViewer1 = new  ModuleViewer(10);
          //classifierViewer1.docReady();
          //classifierViewer1.readServerData(x.message);
        }

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    }
  }
});
