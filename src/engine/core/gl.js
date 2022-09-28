"use strict";

var mCanvas = null;
var mGL     = null;

function getGL() { return mGL; }

function init(htmlCanvasId) {
	var canvas = document.getElementById(htmlCanvasId);
	if(canvas == null)
		throw new Error("Engine init: [" + htmlCanvasId + "] HTML element id not found.");
	
	mGL = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");
	
	if(mGL === null) {
		document.write("<br>WebGL2 is not supported!<br>");
		return;
	}	
}

export { init, getGL } 