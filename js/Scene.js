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

}

Scene.prototype.set = function(snake, target, obstacle) {
    this.snake = snake;
    this.target = target;
    this.obstacle = obstacle;
}

Scene.prototype.init = function() {
    //把场景中的数据全部归位
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.snake.init() //贪吃蛇数据归位
    this.obstacle.init() //障碍物数据归位

    //在场景中画目标
    this.target.genRandomLocation()
    this.target.draw()

    //在场景中画障碍物
    this.obstacle.genRandomLocation(this.target)
        // console.log(localStorage.getItem("enableWall"))
    if (localStorage.getItem("enableWall") === "true") {
        console.log("墙被启动了")
        this.obstacle.enableWall()
    }
    this.obstacle.draw()

    //在场景中画贪吃蛇
    this.snake.initMaxScore();
    this.snake.draw()
}

Scene.prototype.gameOver = function() {
    console.log("游戏结束")
    document.getElementById("cur_score").innerHTML = "当前关卡得分：" + this.snake.targetNum;
    document.getElementById("his_score").innerHTML = "历史最高分：" + getMaxScore(parseInt(localStorage.getItem("type")));
    show('light');
}

//获取创建场景中的三个对象
Scene.prototype.getObjects = function() {
    let snake = this.snake;
    let target = this.target;
    let obstacle = this.obstacle;
    return { snake, target, obstacle }
}