var can1,can2,ctx1,ctx2;

var canWidth,canHeight;

var lastTime; //上一帧执行的时间
var deltaTime; //两帧时间间隔

var bgImg = new Image(); //背景图片
var ane; //海葵
var fruit; //海葵果实

var mom; //鱼妈妈

var baby; //小鱼

var mx, my; //定义鼠标位置信息

var bigTail = []; // 大鱼尾巴图片数组
var bigEye = []; //大鱼眨眼睛图片数组
var bigBodyOrange = [];
var bigBodyBlue = [];

var babyTail = []; //小鱼尾巴图片数组
var babyEye = []; //小鱼眨眼睛图片数组
var babyBody = []; //小鱼身体图片数组

var data;
var wave;
var halo;

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

    baby = new babyObj();
    baby.init();

    mx = canWidth * 0.5;
    my  = canHeight * 0.5;

    for( var i = 0; i < 8; i++){ //初始化大小鱼尾巴图片数组
        babyTail[i] = new Image();
        bigTail[i] = new Image();
        babyTail[i].src = "./image/src/babyTail" + i + ".png";
        bigTail[i].src = "./image/src/bigTail" + i + ".png";
    }
    for(var i = 0; i <2; i++) {
        babyEye[i] = new Image();
        bigEye[i] = new Image();
        babyEye[i].src = "./image/src/babyEye" + i + ".png";
        bigEye[i].src = "./image/src/bigEye" + i + ".png";
    }
    for(var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = "./image/src/babyFade" + i + ".png";
    }
    for (var i = 0; i < 8; i ++) { //初始化大鱼身体变化图片数组
        bigBodyOrange[i] = new Image();
        bigBodyBlue[i] = new Image();
        bigBodyOrange[i].src = "./image/src/bigSwim" + i + ".png";
        bigBodyBlue[i].src = "./image/src/bigSwimBlue" + i + ".png";
    }
    data = new dataObj();
    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center";
    wave = new waveObj();
    wave.init();
}
function gameLoop() {
    window.requestAnimFrame(gameLoop);
    var now = Date.now();
    deltaTime = now - lastTime; //刷新间隔
    lastTime = now;
    if(deltaTime > 40) deltaTime = 40;
    drawBackground(); //绘制背景
    ane.draw(); //绘制海葵
    fruit.draw(); //绘制海葵果实
    fruit.fruitMonitor(); //监控当前屏幕海葵数量
    ctx1.clearRect(0, 0, canWidth, canHeight); // 清理掉上一帧的大鱼
    mom.draw(); //绘制大鱼
    momFruitsCollision(); //大鱼吃果实
    momBabyCollision(); //大鱼喂小鱼
    baby.draw(); //绘制小鱼
    data.draw(); // 绘制分值
    wave.draw();
    //console.log(deltaTime)
}
function onMouseMove(e) { //检测鼠标运动
    if( e.offSetX || e.layerX) {
        if(!data.gameOver) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }
}

