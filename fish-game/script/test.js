window.onload = function() {
    var canvas = document.getElementById('can1');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = "./image/background.jpg";
    img.onload = function () {
    ctx.drawImage(img,0,0);
    }
}