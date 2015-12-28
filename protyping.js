// simple protyping engine powered by html5
// require jQuery
// global
var BlcsGlobal = {};
BlcsGlobal.Protyping = {};
// enter function
function ProtypingOn(protyping, canvasId) {
	// get canvas and context
	var canvas = document.getElementById(canvasId);
	var context = canvas.getContext('2d');
	BlcsGlobal.Protyping.canvas = canvas;
	BlcsGlobal.Protyping.context = context;
	// get first page
	var firstPage = protyping[protyping['index']];
	// draw first page
	StartPage(firstPage);
	// set listener
	canvas.onclick = DoClick;
	// store page list to global
	BlcsGlobal.Protyping.page = [];
	for (var n in protyping) {
		BlcsGlobal.Protyping.page[n] = protyping[n];
	}
}
// start to draw a page
function StartPage(page) {
	// clear
	ClearConfig();
	// read page configure
	BlcsGlobal.Protyping.imgLoad = page[1].length;
	BlcsGlobal.Protyping.pos = page[2].slice();
	BlcsGlobal.Protyping.cmd = page[3].slice();
	// set title
	$('title').text(page[0]);
	// load img
	for (var i = 0; i < page[1].length; i ++) {
		// read resource path
		src = page[1][i];
		// load image
		BlcsGlobal.Protyping.img[i] = new Image();
		BlcsGlobal.Protyping.img[i].onload = function () {
			BlcsGlobal.Protyping.imgLoad --;
		}
		BlcsGlobal.Protyping.img[i].src = src;
	}
	// set interval to draw
	BlcsGlobal.Protyping.drawid = setInterval(function () {
		if (BlcsGlobal.Protyping.imgLoad === 0) {
			DrawPage();
		}
	}, 50);
}
// draw a page
function DrawPage() {
	// alias
	var canvas = BlcsGlobal.Protyping.canvas;
	var context = BlcsGlobal.Protyping.context;
	var img = BlcsGlobal.Protyping.img;
	var pos = BlcsGlobal.Protyping.pos;
	var cmd = BlcsGlobal.Protyping.cmd;
	// clear canvas
	var oldStyle = context.fillStyle;
	context.fillStyle = '#F0F0F2';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = oldStyle;
	// draw images
	for (var i = 0; i < img.length; i ++) {
		if (pos[i].length === 2) {
			context.drawImage(img[i], pos[i][0], pos[i][1]);
		} else if (pos[i].length === 4) {
			context.drawImage(img[i], pos[i][0], pos[i][1], pos[i][2], pos[i][3]);
		}
	}
}
// do click
function DoClick(event) {
	// get click point
	var x = event.offsetX;
	var y = event.offsetY;
	// alias
	var cmd = BlcsGlobal.Protyping.cmd;
	var pos = BlcsGlobal.Protyping.pos;
	var img = BlcsGlobal.Protyping.img;
	// search for bind command
	for (var i = 0; i < cmd.length; i ++) {
		var curCmd = cmd[i];
		var curX = pos[i][0];
		var curY = pos[i][1];
		if (pos[i].length === 2) {
			curWidth = img[i].width;
			curHeight = img[i].height;
		} else if (pos[i].length === 4) {
			curWidth = pos[i][2];
			curHeight = pos[i][3];
		}
		if (x > curX && x < curX + curWidth && y > curY && y < curY + curHeight) {
			if (curCmd === null) { break; }
			switch(curCmd.cmd) {
				case 'goto':
					if (BlcsGlobal.Protyping.page[curCmd.val].length > 0) {
						StartPage(BlcsGlobal.Protyping.page[curCmd.val]);
					}
					break;
			}
		}
	}
}
// clear configure
function ClearConfig() {
	// stop draw interval
	clearInterval(BlcsGlobal.Protyping.drawid);
	BlcsGlobal.Protyping.drawid = null;
	// clear image configure
	BlcsGlobal.Protyping.img = [];
	BlcsGlobal.Protyping.imgLoad = 0;
	BlcsGlobal.Protyping.pos = [];
	BlcsGlobal.Protyping.cmd = [];
}