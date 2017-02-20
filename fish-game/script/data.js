var dataObj = function() {
    this.double = 1;
    this.fruitNum = 0;
    this.score = 0;
    this.printScore = 0;
    this.gameOver = false;
    this.alpha = 0;
}

// dataObj.prototype.reset = function() {
//     this.fruitNum = 0;
//     this.double = 1;
// }

// 绘制分值
dataObj.prototype.draw = function() {
    var w = can1.width;
    var h = can1.height;
    ctx1.save();
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "#fff";
    ctx1.fillStyle = "#fff";
    ctx1.fillText("SCORE: " + this.printScore, w * 0.5, h -20);
    if(this.gameOver) {
        this.alpha += deltaTime * 0.001;
        if(this.alpha > 1) this.alpha = 1;
        ctx1.fillStyle = "rgba(255, 255, 255," + this.alpha + ")";
        ctx1.fillText("GAME OVER", w * 0.5, h * 0.5);
    }
    ctx1.restore();
}

// 得分
dataObj.prototype.addScore = function() {
    this.score += this.double * 10;
}
