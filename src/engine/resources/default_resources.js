"use strict";

import * as font from "./font.js";
import * as map from "../core/resource_map.js";

var defaultFont = "assets/fonts/system_default_font";

function init() {
    var loadPromise = new Promise(
        async function(resolve) {
            await Promise.all([ font.load(defaultFont) ]);
            resolve();
        }).then(
            function resolve() { /* Nothing to do for font */ }
        );

    map.pushPromise(loadPromise);
}

function getDefaultFontName() { return defaultFont; }

function cleanUp() {
    font.unload(defaultFont);
}

export {
    init, cleanUp, 
    getDefaultFontName
}