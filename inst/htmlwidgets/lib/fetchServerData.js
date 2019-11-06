
    /**
     * Function to read Server Data from Server-Side
     * @parameter msg A message from Shiny indication the csv file
    */


     var dataArray = [];
    function readServerData(serverCSV) {
        // datapath , batchNumber , loadSize
        console.log("1");
        console.log("In readServerData()");
        var csvfile = "" + serverCSV+ "";
        console.log("readServerData : " +  csvfile);
        console.log("End of readServerData");
        return (loadDoc( csvfile, myFunction1));
       // return
    }

    function loadDoc(url, cFunction) {
        console.log("2");
        console.log("In loadDoc()");
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                cFunction(this);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
        console.log("End of loadDoc");
    }

    /**
     *
    */
    function myFunction1(xhttp) {

        console.log("3");
        console.log("In myFunction1()");
        dataArray = (xhttp.responseText.replace(/^\s*$[\n\r]{1,}/gm, '')).split(',');
        dataArray.splice(0, 1);
        dataArray[0] = dataArray[0].replace("Source", "");
        dataArray[0] = dataArray[dataArray.length - 1] + dataArray[0];
        dataArray.splice(dataArray.length - 1, 1);
        console.log("Number of Images : " + dataArray.length );
        //console.log("Number of Images : " + dataArray );
        console.log("End of myFunction1");
        return dataArray;
       // return getServerData(dataArray);
        //return getServerData(array);
        ///return dataArray;
    }

    function getServerData()
    {
        var data = [...array];
        //console.log("Number of Images : " + data );
        return data;
    }
