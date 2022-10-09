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

function cleanUp() {
	if((mGL == null) || (mCanvas == null))
		throw new Error("Engine cleanup: system is not initialized.");

	mGL = null;

	mCanvas.style.position = "fixed";
	mCanvas.style.backgroundColor = "rgba(200, 200, 200, 0.5)";
	mCanvas = null;

	document.body.innerHTML += "<br><br><h1>End of the Game!</h1><h3>GL System Shut Down";
}

export { init, getGL, cleanUp }