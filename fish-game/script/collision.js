// 大鱼和果实碰撞
function momFruitsCollision() {
    if(!data.gameOver) {
        for ( var i = 0; i < fruit.num; i++) {
            if(fruit.alive[i] && fruit.l[i] > 15) {
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if(l < 900) {
                    // 果实被吃掉
                    data.fruitNum++;
                    fruit.alive[i] = false;
                    //大鱼改变颜色
                    mom.bigBodyCount++;
                    if(mom.bigBodyCount > 7) mom.bigBodyCount = 7;
                    data.double = 1;
                    if(fruit.fruitType[i] == "blue") {
                        data.double = 2;
                    }
                    wave.born(fruit.x[i], fruit.y[i]);
                    data.addScore();
                }
            }
        }
    }
}

// 大鱼和小鱼碰撞
function momBabyCollision() {
    var l = calLength2(mom.x, mom.y, baby.x, baby.y);
    if(!data.gameOver && l < 900 && data.fruitNum !== 0) {
        // 大、小鱼恢复
        baby.babyBodyCount = 0;
        //data.reset();
        mom.bigBodyCount = 0;
        // 更新得分
        data.printScore = data.score;
        data.fruitNum = 0;
        halo.born(baby.x, baby.y);
    }
}
