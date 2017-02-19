$(document).ready(function() {
var stage = document.getElementById('hi');

document.body.addEventListener('mousemove', _.debounce(e => {
    var xOrigin = stage.offsetWidth / 2;
    var yOrigin = stage.offsetHeight / 2;
    var xRot = (e.clientY - yOrigin) / yOrigin * -70 + 10;
    var yRot = (e.clientX - xOrigin) / xOrigin * 160;
    stage.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg)`;
}), 500);


});