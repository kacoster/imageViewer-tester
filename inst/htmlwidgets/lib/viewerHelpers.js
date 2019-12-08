function fetchServerData(csvfile,moduleId)
{
    if(moduleId === "img_clssfctn_ud")
    {
        var imgClssfctnObj = new ViewerComponent(0,50,5,"img_clssfctn_ud",csvfile);
        imgClssfctnObj.readServerData();
    }
}