function buildQuery(query, translator){
    const result = [];

    const params = Object.keys(query);
    const toTranslate = Object.keys(translator);

    for(const param of params){
        const queryName = param;
        if(toTranslate.includes(param)) queryName = toTranslate[param];

        result.push(`${queryName}=${query[param]}`);
    }

    return "?" + result.join('&');
}

function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi, 
           function (match) {
                return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
           });
 }

module.exports = { buildQuery, unicodeToChar };