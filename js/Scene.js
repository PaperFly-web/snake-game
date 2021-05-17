function Scene(canvas, ctx, size) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.size = size; //小方块的大小
    //计算出画出多少行和列
    rows = canvas.height / this.size
    columns = canvas.width / this.size
    this.snake = null;
    this.target = null;
    this.obstacle = null;
    this.n = 2.5; //控制字体大小
    this.fontSize = this.size * this.n;
}

Scene.prototype.set = function(snake, target, obstacle) {
    this.snake = snake;
    this.target = target;
    this.obstacle = obstacle;
}

Scene.prototype.init = function() {
    //把场景中的数据全部归位
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameRun(0);
    this.snake.init(); //贪吃蛇数据归位
    this.obstacle.init(); //障碍物数据归位
    //在场景中画目标
    this.target.genRandomLocation();
    this.target.draw();
    //在场景中画障碍物
    this.obstacle.genRandomLocation(this.target);
    if (localStorage.getItem("enableWall") === "true") {
        console.log("墙被启动了");
        this.obstacle.enableWall();
    }
    this.obstacle.draw();
    this.snake.draw();
}
Scene.prototype.gameRun = function(score) {
    this.ctx.globalAlpha = 0.4;
    this.ctx.font = 'normal bold ' + this.fontSize + 'px sans-serif';
    this.ctx.fillStyle = "#fff"; //设置颜色
    this.ctx.fillText("Score:" + score, this.canvas.width - this.fontSize * 5, this.fontSize * 2);
    this.ctx.globalAlpha = 1;
}

Scene.prototype.gameOver = function() {
    console.log("游戏结束")
    const { width, size } = getWidthAndHeightAndSize();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = 'normal bold ' + this.fontSize + 'px sans-serif';
    this.ctx.fillText("当前关卡得分：" + this.snake.targetNum, width / 2 - size * 4 * this.n, width / 4);
    this.ctx.fillText("历史最高分：" + getMaxScore(parseInt(localStorage.getItem("type"))), width / 2 - size * 4 * this.n, width / 4 + this.fontSize * 2);
    this.ctx.font = size * 3 + "px Arial";
    this.ctx.fillStyle = "#55c4d0"; //设置颜色
    this.ctx.strokeStyle = "#55c4d0"; //设置颜色
    this.ctx.rect(width / 2 - size * 6.5, width / 2 + size * 4, size * 13, size * 6); //路径
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.fillStyle = "#fff"; //设置颜色
    this.ctx.fillText("再来一局", width / 2 - size * 6, width / 2 + size * 8);
    this.canvas.addEventListener("click", (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        this.ctx.isPointInPath(x, y);
        //填充矩形
        this.ctx.fillStyle = "coral"; //设置颜色
        console.log("点击画布的位置", x, y, this.ctx.isPointInPath(x, y))
        if (this.ctx.isPointInPath(x, y)) {
            show('checkup_box'), hideSnakeMain()
        }
    })
}