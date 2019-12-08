
function fetchServerData(csvfile,moduleId)
{
    var imgClssfctnObj = new ViewerComponent(0,50,5,"img_clssfctn_ud",csvfile);
    if(moduleId === "img_clssfctn_ud")
    {
        imgClssfctnObj.readServerData();
    }
}