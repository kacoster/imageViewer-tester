var imgClssfctnObj = new ViewerComponent(0,50,5,"img_clssfctn_ud",csvfile);
function fetchServerData(csvfile,moduleId)
{
    if(moduleId === "img_clssfctn_ud")
    {
        
        imgClssfctnObj.readServerData();
    }
}