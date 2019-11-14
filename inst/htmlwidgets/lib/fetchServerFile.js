async function fetchServerFile(msg) {
    var result= await (await fetch(msg)).text(); 
    return result;
}