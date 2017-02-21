var dustObj = function() {
    this.x = [];
    this.y = [];
    this.amp = [];
    this.no = [];
    this.angle;
}
dustObj.prototype.num = 50;
dustObj.prototype.init = function() {
    for(var i = 0; i < this.num; i++) {
        this.x[i] = Math.random() * canWidth;
        this.y[i] = Math.random() * canHeight;
        this.amp[i] = 20 + Math.random() * 20;
        this.no[i] = Math.floor(Math.random() * 7);
    }
    this.angle = 0;
}
dustObj.prototype.draw = function() {
    this.angle += deltaTime * 0.001;
    var l = Math.sin(this.angle);
    for(var i = 0; i < this.num; i++) {
        var no = this.no[i];
        ctx1.drawImage(dustPic[no], this.x[i] + this.amp[i] * l, this.y[i]);
    }
}