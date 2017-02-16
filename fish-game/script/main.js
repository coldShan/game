var can1,can2,ctx1,ctx2;

var canWidth,canHeight;

var lastTime; //上一帧执行的时间
var deltaTime; //两帧时间间隔

var bgImg = new Image(); //背景图片
var ane; //海葵
var fruit; //海葵果实

var mom; //鱼妈妈

var mx, my; //定义鼠标位置信息

document.body.onload = game;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameLoop();
}
function init() {
    //获得canvas context
    can1 = document.getElementById("canvas1"); //前面的画布(fishes, dust, UI, circle)
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById("canvas2"); //后面的画布 (background, ane, fruits)
    ctx2 = can2.getContext('2d');
    can1.addEventListener('mousemove', onMouseMove, false);
    bgImg.src = "./image/background.jpg";
    canWidth = can2.width;
    canHeight = can2.height;
    //drawBackground(); //绘制背景
   
    ane = new aneObj(); //初始化海葵
    ane.init();

    fruit = new fruitObj(); //初始化海葵果实
    fruit.init();

    mom = new momObj(); //初始化鱼妈妈
    mom.init();

    mx = canWidth * 0.5;
    my  = canHeight * 0.5;
}
function gameLoop() {
    window.requestAnimFrame(gameLoop);
    var now = Date.now();
    deltaTime = now - lastTime; //刷新间隔
    lastTime = now;
    drawBackground(); //绘制背景
    ane.draw(); //绘制海葵
    fruit.draw(); //绘制海葵果实
    fruit.fruitMonitor(); //监控当前屏幕海葵数量
    ctx1.clearRect(0, 0, canWidth, canHeight); // 清理掉上一帧的大鱼
    mom.draw(); //绘制大鱼
    //console.log(deltaTime)
}
function onMouseMove(e) {
    if( e.offSetX || e.layerX) {
        mx = e.offSetX == undefined ? e.layerX : e.offSetX;
        my = e.offSetY == undefined ? e.layerY : e.offSetY;
    }
}

