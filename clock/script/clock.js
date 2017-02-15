var c = document.getElementById("clock");
var ctx = c.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 300;
function drawBackground() {
    ctx.save();
    ctx.translate(r, r);
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.font = 18 * rem + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    hourNumbers.forEach(function (number, index) {
        var radius = 2 * Math.PI / 12 * index;
        var x = Math.cos(radius) * (r - 30 * rem);
        var y = Math.sin(radius) * (r - 30 * rem);

        ctx.fillText(number, x, y);
    });
    for (var i = 0; i < 60; i++) {
        var radius = 2 * Math.PI / 60 * i;
        var x = Math.cos(radius) * (r - 15 * rem);
        var y = Math.sin(radius) * (r - 15 * rem);
        ctx.beginPath();
        if (i % 5 === 0) {
            ctx.fillStyle = "#000";
            ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        } else {
            ctx.fillStyle = "#ccc";
            ctx.arc(x, y, 1 * rem, 0, 2 * Math.PI, false);
        }
        ctx.fill();
    }
}
function drawHour(hour, minute, second) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * minute;
    var srad = 2 * Math.PI / 12 / 60 / 60 * second;
    ctx.rotate(rad + mrad + srad);
    ctx.lineWidth = 7 * rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    ctx.restore();
}
function drawMin(minute, second) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minute;
    var srad = 2 * Math.PI / 60 / 60 * second;
    ctx.rotate(rad + srad);
    ctx.lineWidth = 3 * rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r + 43 * rem);
    ctx.stroke();
    ctx.restore();
}
function drawSec(second) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#c14543';
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.moveTo(-2 * rem, 20 * rem);
    ctx.lineTo(2 * rem, 20 * rem);
    ctx.lineTo(1, -r + 18 * rem);
    ctx.lineTo(-1, -r + 18 * rem);
    ctx.fill();
    ctx.restore();
}
function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.lineWidth = 1 * rem;
    ctx.arc(0, 0, 6 * rem, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
}

function drawClock() {
    ctx.clearRect(0, 0, width, height);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour, minute, second);
    drawMin(minute, second);
    drawSec(second);
    drawDot();
    ctx.restore();
}

drawClock()
setInterval(drawClock, 1000);