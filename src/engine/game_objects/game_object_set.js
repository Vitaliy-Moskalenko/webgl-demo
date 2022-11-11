"use strict";

import GameObject from "./game_object";

class GameObjectSet {
    constructor() {
        this.mSet = [];
    }

    getSize() { return this.mSet.length; }

    getObjectAt(index) { return this.mSet[index]; }

    addToSet(obj) {
        this.mSet.push(obj);
    }

    removeFromSet(obj) {
        var index = this.mSet.indexOf(obj);
        if(index > -1) 
            this.mSet.splice(index, 1);
    }

    update() {
        var i;
        for(i=0; i<this.mSet.length; i++)
            this.mSet[i].update();
    }

    draw(camera) {
        var i;
        for(i=0; i<this.mSet.length; i++)
            this.mSet[i].draw(camera);
    }





}

export default GameObjectSet;