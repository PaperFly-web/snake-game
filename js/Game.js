function Game(can, context, scene) {

    this.canvas = can;
    this.ctx = context;
    this.scene = scene;
    this.handleIsComplete = [true, true]; //监听键盘的
    this.snake = null;
    this.target = null;
    this.obstacle = null;


    this.timer = null;
    this.openOrCloseBgAu = true;
}
Game.prototype.keyController = function(key) {
    if (key === "Enter" && snakeIsShow && this.handleIsComplete[0]) {
        this.timer = setInterval(() => {
            this.run()
        }, 150);
        //播放背景音乐
        backgroundAudio(true)
        this.handleIsComplete[0] = false;
        this.handleIsComplete[1] = true;
    } else if (key === " " && snakeIsShow && this.handleIsComplete[1]) {
        this.pause()
        backgroundAudio(false)
        this.handleIsComplete[0] = true;
        this.handleIsComplete[1] = false;
    } else if (key === "a") {
        this.openOrCloseBgAu = !this.openOrCloseBgAu;
        openOrCloseAudio(this.openOrCloseBgAu)
    }
}

//初始化本地  每个关卡的历史最高分
Game.prototype.init = function() {
    //获取本地存储的历史最高纪录
    let targerNum = [
        { "type": 1, "maxScore": 0 },
        { "type": 2, "maxScore": 0 },
        { "type": 3, "maxScore": 0 },
        { "type": 4, "maxScore": 0 },
        { "type": 5, "maxScore": 0 }
    ];
    if (localStorage.getItem("targetNum") == null) {
        //如果为空，就初始化存储一个
        localStorage.setItem("targetNum", JSON.stringify(targerNum));

    }
    this.handleIsComplete = [true, true];
}
Game.prototype.set = function(snake, target, obstacle) {
    this.snake = snake;
    this.target = target;
    this.obstacle = obstacle;
}

Game.prototype.run = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.target.draw()
    this.obstacle.draw()
    this.snake.update()
    this.snake.draw()
        //传入目标，如果吃到了，就更新目标在画布中的位置
    if (this.snake.eatTarget(this.target)) {
        audio(400.00);
        //更新目标的时候，不能和障碍物重合
        this.target.genRandomLocation(this.obstacle)
    }
    //检测是否有和身体发生碰撞和是否与障碍物有碰撞
    isOver = this.snake.checkCollision() || this.snake.collisionObstacle(this.obstacle);
    if (isOver) {
        this.gameOver()
        return;
    }
    this.scene.gameRun(this.snake.targetNum)
}

Game.prototype.pause = function() {
    clearInterval(this.timer)
}

Game.prototype.gameOver = function() {
    //结束背景音乐
    backgroundAudio(false);
    //播放游戏结束声音,-1代表结束
    audio(-1)
    setMaxScore(parseInt(localStorage.getItem("type")));
    this.pause();
    this.scene.gameOver();

}