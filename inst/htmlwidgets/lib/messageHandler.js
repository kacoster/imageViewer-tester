function img_clssfctn_msg_handler(){
    let imgSize ;
    Shiny.addCustomMessageHandler("img_clssfctn_ud_batch_image_size",
        function(message) {
            imgSize =  parseInt(JSON.stringify(message));
        });

    return imgSize;
}

