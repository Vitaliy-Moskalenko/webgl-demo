"use strict";

import engine from "../../engine/index.js";

class SceneFileParser {
    constructor(sceneFilePath) {
        this.mSceneXml = engine.text.get(sceneFilePath);
    }

    _getElements(tagElement) {
        var elements = this.mSceneXml.getElementsByTagName(tagElement);
        if(elements.length === 0)
            console.log("Warning: Level element[" + tagElement + "] not found.");
    
        return elements;
    }

    parseCamera() {
        var i;
        var cameraElement = this._getElements("Camera");
        var cx = cameraElement[0].getAttribute("CenterX") >> 0;
        var cy = cameraElement[0].getAttribute("CenterY") >> 0;
        var w  = cameraElement[0].getAttribute("Width") >> 0;
        var viewport = cameraElement[0].getAttribute("Viewport").split(" ");
        var bgColor  = cameraElement[0].getAttribute("BgColor").split(" ");

        for(i=0; i<4; ++i) {
            viewport[i] >> 0;
            bgColor[i] >> 0;
        } 

        var cam = new engine.Camera(vec2.fromValues(cx, cy), w, viewport);
        cam.setBackgroundColor(bgColor);

        return cam;
    }

    parseSquares(sqSet) {
        var elements = this._getElements("Square");
        var i, j, x, y, w, h, r, c, sq;

        for(i=0; i<elements.length; ++i) {
            // x = Number(elements.item(i).attributes.getNamedItem("PosX").value);
            x = elements.item(i).attributes.getNamedItem("PosX").value >> 0;
            y = elements.item(i).attributes.getNamedItem("PosY").value >> 0;        
            w = elements.item(i).attributes.getNamedItem("Width").value >> 0;
            h = elements.item(i).attributes.getNamedItem("Height").value >> 0;
            r = elements.item(i).attributes.getNamedItem("Rotation").value >> 0;
            c = elements.item(i).attributes.getNamedItem("Color").value.split(" ");

            sq = new engine.Renderable();            
            for(j=0; j<4; ++j) c[j] >> 0;

            sq.setColor(c);
            sq.getXform().setPosition(x, y);
            sq.getXform().setRotationDegree(r);
            sq.getXform().setSize(w, h);

            sqSet.push(sq); 
        }        
    }

    parseTextureSquares(sqSet) {
        var elements = this._getElements("TextureSquare");
        var i, j, x, y, w, h, r, c, t, sq;
        for(i=0; i<elements.length; ++i) {
            x = elements.item(i).attributes.getNamedItem("PosX").value >> 0;
            y = elements.item(i).attributes.getNamedItem("PosY").value >> 0;
            w = elements.item(i).attributes.getNamedItem("Width").value >> 0;
            h = elements.item(i).attributes.getNamedItem("Height").value >> 0;
            r = elements.item(i).attributes.getNamedItem("Rotation").value >> 0;
            c = elements.item(i).attributes.getNamedItem("Color").value.split(" ");
            t = elements.item(i).attributes.getNamedItem("Texture").value;

            sq = new engine.TextureRenderable(t);
            for(j=0; j<4; ++j) c[j] >> 0;

            sq.setColor(c);
            sq.getXform().setPosition(x, y);
            sq.getXform().setRotationDegree(r);
            sq.getXform().setSize(w, h);

            sqSet.push(sq);
        }
    }
}

export default SceneFileParser;