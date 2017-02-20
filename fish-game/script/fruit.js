var fruitObj = function () {
    this.alive = [];
    this.x = [];
    this.y = [];
    this.l = []; //果实宽度
    this.speed = []; //果实上漂的速度
    this.fruitType = [];
    this.orange = new Image();
    this.blue = new Image();
}
fruitObj.prototype.num = 30; //果实数量

// 初始化
fruitObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.speed[i] = Math.random() * 0.017 + 0.003; //[0.003, 0.02)
        this.fruitType[i] = "";
    }
    this.orange.src = "./image/orange.png";
    this.blue.src = "./image/blue.png";
}

//绘画海葵
fruitObj.prototype.draw = function () {
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            //找到海葵，生长果实，往上飘
            if(this.fruitType[i] == "blue") {
                var pic = this.blue;
            } else {
                var pic = this.orange;
            }
            if (this.l[i] <= 15) {
                this.l[i] += this.speed[i] * deltaTime;
            } else {
                this.y[i] -= this.speed[i] * 5 * deltaTime;
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            //果实漂出窗口，回收
            if (this.y[i] < 10) {
                this.alive[i] = false;
            }
        }

    }
}

//海葵果实生长
fruitObj.prototype.born = function (i) {
    var aneId = Math.floor(Math.random() * ane.num);
    this.x[i] = ane.x[aneId];
    this.y[i] = canHeight - ane.len[aneId];
    this.l[i] = 0;
    this.alive[i] = true;

fruitObj.prototype.dead = function(i) {
    this.alive[i] = false;
}

    // 结出蓝色或者橙色果实
    var ran = Math.random();
    if(ran < 0.2) {
        this.fruitType[i] = "blue";
    } else {
        this.fruitType[i] = "orange";
    }
}

//监控当前屏幕果实数量
fruitObj.prototype.fruitMonitor = function() {
    var num = 0;
    for(var i = 0; i < fruit.num; i++) {
        if(fruit.alive[i]) num++;
    }
    if(num < 20) {
        sendFruit();
        return;
    }
}

//判断果实状态
function sendFruit() {
    for(var i =0; i < fruit.num; i++) {
        if(!fruit.alive[i]) {
            fruit.born(i);
            return;
        }
    }
}

//更新屏幕海葵果实数量
fruitObj.prototype.update = function () {
    var num = 0;
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) num++;
    }
}