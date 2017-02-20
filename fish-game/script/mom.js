var momObj = function() {
    this.x;
    this.y;
    this.angle;
    this.bigTailTimer = 0;
    this.bigTailCount = 0;
    this.bigEyeTimer = 0;
    this.bigEyeCount = 0;
    this.bigEyeInterval = 1000;
    this.bigBodyCount = 0;
}

// 初始化大鱼
momObj.prototype.init = function() {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
}

// 绘制大鱼
momObj.prototype.draw = function() {

    // 追随鼠标
    this.x = lerpDistance(mx, this.x, 0.95);
    this.y = lerpDistance(my, this.y, 0.95);

    //计算角度差(atan2(y,x))
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;

    // 大鱼追随鼠标旋转
    this.angle = lerpAngle(beta, this.angle, 0.6);

    // 大鱼尾部动画
    this.bigTailTimer += deltaTime;
    if(this.bigTailTimer > 100) {
        this.bigTailCount = (this.bigTailCount + 1) % 8;
        this.bigTailTimer %= 100;
    }

    //大鱼眨眼睛
    this.bigEyeTimer += deltaTime;
    if(this.bigEyeTimer > this.bigEyeInterval) {
        this.bigEyeCount = (this.bigEyeCount + 1) % 2;
        this.bigEyeTimer %= this.bigEyeInterval;
        if(this.bigEyeCount == 0) {
            this.bigEyeInterval = Math.random() * 1500 + 3000;
        } else {
            this.bigEyeInterval = 80;
        }
    }

    // 绘制大鱼
    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    var bigTailCount = this.bigTailCount,
        bigEyeCount = this.bigEyeCount,
        bigBodyCount = this.bigBodyCount;
        if(data.double == 1) {
            ctx1.drawImage(bigBodyOrange[bigBodyCount], -bigBodyOrange[bigBodyCount].width * 0.5, -bigBodyOrange[bigBodyCount].height * 0.5);
        } else {
            ctx1.drawImage(bigBodyBlue[bigBodyCount], -bigBodyBlue[bigBodyCount].width * 0.5, -bigBodyBlue[bigBodyCount].height * 0.5);
        }
    ctx1.drawImage(bigTail[bigTailCount], -bigTail[bigTailCount].width * 0.5 + 30, -bigTail[bigTailCount].height * 0.5);
    ctx1.drawImage(bigEye[bigEyeCount], -bigEye[bigEyeCount].width * 0.5, -bigEye[bigEyeCount].height * 0.5);
    ctx1.restore();
}