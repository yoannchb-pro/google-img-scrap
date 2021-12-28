const got = require('got');
const { FastHTMLParser } = require('fast-html-dom-parser');

const { GOOGLE_CONSTANT } = require('./constant/GOOGLE_CONSTANT');
const { GOOGLE_QUERY } = require('./constant/query/GOOGLE_QUERY');
const { TRANSLATOR } = require("./constant/translator/TRANSLATOR");
const EXTENSIONS = require('./constant/extensions/IMAGES_EXTENSIONS.json');

const { buildQuery, unicodeToChar } = require('./utils/UTILS');

//verify good configuration
function verify(config){
    if(!config.search || config.search.trim() == "") throw "'search' can not be empty";

    if(config.query){
        const queryToVerify = Object.keys(GOOGLE_QUERY);
    
        for(const key of Object.keys(config.query)){
            if(!queryToVerify.includes(key)) throw `Invalide query name '${key}'`;

            const VALUES = Object.values(GOOGLE_QUERY[key]);
            const ACTUAL_VALUE = config.query[key];
            if(!VALUES.includes(ACTUAL_VALUE)) throw `'${ACTUAL_VALUE}' is not a valide argument for the query : '${key}'`;
        };
    }
};

//verify imag extension
function containImage(content = ""){
    for(const EXTENSION of EXTENSIONS){
        if(content.includes(EXTENSION)) return true;
    }

    return false;
}

//parse HTML
async function parse(url){
    const result = [];

    const response = await got(url, {
        headers: GOOGLE_CONSTANT.headers
    });
    const parser = new FastHTMLParser(response.body);

    const scripts = parser.getElementsByTagName('script');

    if(!scripts) return result;

    for(const script of scripts){
        const body = script.innerHTML;

        const valide = containImage(body);

        if(valide){
            const regex = /\["(http.+?)",(\d+),(\d+)\]/gi;

            let res = null;

            while((res = regex.exec(body)) != null){
                if(res.length >= 4 && res[1].match(/http/gi).length < 2) result.push({
                    url: unicodeToChar(res[1]),
                    height: res[2],
                    width: res[3]
                });
            }
        }
    }

    return result;
};

//main
async function GOOGLE_IMG_SCRAP(config = {}){
    //verify config
    verify(config);

    //exclude domains
    const EXCLUDE_DOMAINS = [];
    if(config.excludeDomains) config.excludeDomains.forEach((domain) => EXCLUDE_DOMAINS.push(`-site:${domain}`));

    //domains
    const DOMAINS = [];
    if(config.domains) config.domains.forEach((domain) => DOMAINS.push(`site:"${domain}"`));

    //building url
    const QUERY = Object.assign(GOOGLE_CONSTANT.forceGoogleImage, {
        [GOOGLE_CONSTANT.queryParam]: Object.values(config.query || {}).join(','),
        q: encodeURIComponent(config.search + " " + EXCLUDE_DOMAINS.join(" ") + " " + DOMAINS.join(' OR ')),
    });

    const CUSTOM_PARAM = config.custom ? `&${config.custom}` : "";
    const SAFE_SEARCH = config.safeSearch ? `&safe=active` : "";

    const URL = GOOGLE_CONSTANT.url + buildQuery(QUERY, TRANSLATOR) + CUSTOM_PARAM + SAFE_SEARCH;

    //parsing
    const result = await parse(URL);

    //result
    return {url: URL, result: result};
};

module.exports = { GOOGLE_IMG_SCRAP , GOOGLE_QUERY };