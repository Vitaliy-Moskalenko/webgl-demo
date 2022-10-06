"use strict";

class MapEntry {
    constructor(data) {
        this.mData = data;
        this.refCount = 1;
    }

    decRef() { this.refCount--; }
    incRef() { this.refCount++; }

    set(data) { this.mData = data; }
    data() { return this.mData; }

    canRemove() { return (this.refCount == 0); }
}

var mMap = new Map();
var mOutstandingPromises = [];

function has(path) { return mMap.has(path); }

function set(key, value) { mMap.get(key).set(value); }

function loadRequested(path) { mMap.set(path, new MapEntry(null)); }

function incRef(path) { mMap.get(path).incRef; }

function get(path) {     
    if(!has(path)) 
        throw new Error("Error [" + path + "]: not loaded.");

    return mMap.get(path).data();
}

/* Generic load function
    1. Fetch from server
    2. DecodeResource on the loaded package
    3. ParseResource on the decodedResource
    4. Store resource into the map
Push the promised operation into array  */
function loadDecodeParse(path, decodeResource, parseResource) {
    var fetchPromise = null;
    if(!has(path)) {
        loadRequested(path);
        fetchPromise = fetch(path)
            .then(res => decodeResource(res))
            .then(data => parseResource(data))
            .then(data => { return set(path, data) })
            .catch(err => { throw err });

        pushPromise(fetchPromise);
    }
    else {
        incRef(path);
    }

    return fetchPromise;
}    

function unload(path) {
    var entry = mMap.get(path);
    entry.decRef();
    if(entry.canRemove()) 
        mMap.delete(path);

    return entry.canRemove;
}

function pushPromise(p) { mOutstandingPromises.push(p); }

// Will block, wait for all outstanding promises complete
async function waitOnPromises() {
    await Promise.all(mOutstandingPromises);
    mOutstandingPromises = [];
}


export { has, get, set, loadRequested, incRef, loadDecodeParse, unload, pushPromise, waitOnPromises }