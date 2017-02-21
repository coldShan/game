//绘制海葵

var aneObj = function() {
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.amp = [];
    this.angle = 0;
}
aneObj.prototype.num = 50; //50束海葵
aneObj.prototype.init = function() {
    for(var i =0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20; //海葵位置(横坐标,间距)
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 5 + 50;
    }
}
aneObj.prototype.draw = function(){
    this.angle += deltaTime * 0.001;
    var l =Math.sin(this.angle);
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 17;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154e";
    for(var i = 0; i < this.num; i++) {
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 80, this.headx[i], this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
}
