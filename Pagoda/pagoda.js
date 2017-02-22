$(document).ready(function() {
	var stage = document.getElementById('pagoda');

	document.body.addEventListener('mousemove', _.debounce(e => {
	var xOrigin = stage.offsetWidth / 2;
	var yOrigin = stage.offsetHeight / 2;
	var xRot = (e.clientY - yOrigin) / yOrigin*-7+15;
	var yRot = (e.clientX - xOrigin) / xOrigin * 20;
	stage.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg)`;
	}), 500);

});