import * as map from "../core/resource_map.js";

var unload = map.unload;
var has    = map.has;
var get    = map.get;

var mParser = new DOMParser();

function decodeXML(data) {
    return data.text();
}

function parseXML(text) {
    return mParser.parseFromString(text, "text/xml");
}

function load(path) { // console.log("xml.js:17 Try to load  " + path);
    return map.loadDecodeParse(path, decodeXML, parseXML);
}

export { has, get, load, unload }