function Obstacle(size, canvasOptions) {
    this.x = []
    this.y = []
    this.num = parseInt(localStorage.getItem("obstacleNum"))
    this.initNum = this.num //这个是最初的num，因为this.num要变化，所以这个方便后面获取
    this.size = size
    this.canvasOptions = canvasOptions
}


//障碍物数据归位
Obstacle.prototype.init = function() {
    this.x = []
    this.y = []
    this.num = parseInt(localStorage.getItem("obstacleNum"));
    this.initNum = this.num;
}

//更新障碍物在画布中的位置
Obstacle.prototype.genRandomLocation = function(target) {

    let xy;
    for (let i = 0; i < this.num; i++) {
        xy = randomNum(this.canvasOptions, this.size)

        //障碍物不能和目标重合
        while (xy.x === target.x && xy.y === target.y) {
            xy = randomNum(this.canvasOptions, this.size)
        }
        const { x, y } = xy;
        this.x.push(x)
        this.y.push(y)

    }

}


let flag = true; //方便我的打印
Obstacle.prototype.draw = function() {
    const { ctx } = this.canvasOptions

    for (let i = 0; i < this.initNum; i++) {
        ctx.fillStyle = '#FFFF66'
        ctx.fillRect(this.x[i], this.y[i], this.size, this.size)
        if (flag) {
            console.log("障碍物的位置", this.x[i], this.y[i])

        }

    }
    flag = false

    //画墙
    for (let i = this.initNum; i < this.num; i++) {
        ctx.fillStyle = '#333333'
        ctx.fillRect(this.x[i], this.y[i], this.size, this.size)
    }

}

//给画布添加墙
Obstacle.prototype.enableWall = function() {
    const { rows, columns } = this.canvasOptions
    this.num += (rows * 2 + columns * 2);
    for (let i = 0; i < columns; i++) {
        this.x.push(i * this.size)
        this.y.push(0)
        this.x.push(i * this.size)
        this.y.push(this.size * (rows - 1))
    }

    for (let i = 0; i < rows; i++) {
        this.x.push(0)
        this.y.push(i * this.size)
        this.x.push(this.size * (columns - 1))
        this.y.push(i * this.size)
    }
}