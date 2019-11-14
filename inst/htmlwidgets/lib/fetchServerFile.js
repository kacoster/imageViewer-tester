async function fetchServerFile(msg) {
    var result= await (await fetch(msg)).text(); 
    console.log("In fetchServerFile : " + result);
    return result;
}