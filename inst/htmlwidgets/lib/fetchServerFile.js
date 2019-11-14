async function fetchServerFile(msg) {
    var result= await (await fetch(msg)).text(); 
    return result.replace(/^\s*$[\n\r]{1,}/gm, '');
}