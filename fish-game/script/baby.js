var babyObj = function() {
    this.x;
    this.y;
    this.angle;
    this.babyTailTimer = 0;
    this.babyTailCount = 0;
    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}

babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 - 50;
    this.angle = 0;
}

babyObj.prototype.draw = function() {
    if(!data.gameOver) {
        // 小鱼跟随大鱼
        var l = calLength2(mom.x, mom.y, baby.x, baby.y);
        if(l > 6400) {
            this.x = lerpDistance(mom.x, this.x, 0.98);
            this.y = lerpDistance(mom.y, this.y, 0.98);
        }

        // 小鱼跟随大鱼旋转
        var deltaY = mom.y - this.y;
        var deltaX = mom.x - this.x;
        var beta = Math.atan2(deltaY, deltaX) + Math.PI;
        this.angle = lerpAngle(beta, this.angle, 0.6);
        
        // 小鱼尾部动画
        this.babyTailTimer += deltaTime;
        if(this.babyTailTimer > 50) {
            this.babyTailCount = (this.babyTailCount + 1) % 8; // 0~7
            this.babyTailTimer %= 50; // 0~49
     }
    }

     // 小鱼眨眼睛
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if(this.babyEyeCount == 0) {
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.babyEyeInterval = 50;
        }
    }

    // 小鱼身体变白(game over)
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 300) {
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if(this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            //game over
            data.gameOver = true;
        }
    }

    // 绘制小鱼
    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    var babyTailCount = this.babyTailCount,
        babyEyeCount = this.babyEyeCount,
        babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);
    ctx1.restore();
}
