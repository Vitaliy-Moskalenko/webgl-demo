"use strict";

import * as map from "../core/resource_map.js";

var unload = map.unload;
var has    = map.has;
var get    = map.get;

function decodeText(data) {
    return data.text;
}

function parseText(text) {
    return text;
}

function load(path) {
    return map.loadDecodeParse(path, decodeText, parseText);
}

export { has, get, load, unload }