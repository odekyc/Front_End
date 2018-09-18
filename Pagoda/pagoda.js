$(document).ready(function() {
	var stage = document.getElementById('pagoda');

	document.body.addEventListener('mousemove', _.debounce(e => {
	var xOrigin = stage.offsetWidth / 2;
	var yOrigin = stage.offsetHeight / 2;
	var xRot = (e.clientY - yOrigin) / yOrigin*-2+10;
	var yRot = (e.clientX - xOrigin) / xOrigin * 12;
	stage.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg)`;
	}), 500);

});