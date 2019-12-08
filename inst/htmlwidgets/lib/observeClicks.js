var hasSelectProp = ["img_clssfctn_ud"];


function isKeyPressed(event,moduleId) {
    //var viewerId+"Obj" = new 
      console.log(" isKeyPressed(event)");
       arrayClone(imgClssfctnObj.selected_images);
       if(hasSelectProp.includes(viewerId))
       {
            if (event.shiftKey) {
                console.log(" isKeyPressed : event.shiftKey");
                imgClssfctnObj.handleExistance(imgClssfctnObj.selected_images, 
                    event.target.src, event.target.id);
            } else {
                console.log(" isKeyPressed : event.click");
                objectOf(moduleId);
                myFunction();
            }
       }
       else{

       }
      
  }