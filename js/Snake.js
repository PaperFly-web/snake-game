function Snake(size = 10, canvasOptions) {
    this.x = size
    this.y = size
    this.size = size
    this.xSpeed = size * 1
    this.ySpeed = 0
    this.targetNum = 0
    this.tails = []
    this.canvasOptions = canvasOptions
}

//把贪吃蛇数据初始化，归位
Snake.prototype.init = function() {
    this.x = this.size
    this.y = this.size
    this.xSpeed = this.size * 1
    this.ySpeed = 0
    this.targetNum = 0
    this.tails = []
}

//绘制蛇
Snake.prototype.draw = function() {
    //通过解构，拿到ctx
    const { ctx } = this.canvasOptions
    ctx.fillStyle = '#fff'

    //绘制身体
    for (let i = 0; i < this.tails.length; i++) {
        const { x, y } = this.tails[i]
        ctx.fillRect(x, y, this.size, this.size)
    }
    // console.log("身体长度", this.tails.length)
    //绘制头部
    ctx.fillRect(this.x, this.y, this.size, this.size)
}

Snake.prototype.update = function() {
    for (let i = 0; i < this.tails.length - 1; i++) {
        this.tails[i] = this.tails[i + 1]
    }
    //如果有分数大于0，那么就代表有身体部分了，就给身体部分添加数据
    if (this.targetNum > 0) {
        this.tails[this.targetNum - 1] = { x: this.x, y: this.y }
    }
    //更新头部x和y
    this.x += this.xSpeed
    this.y += this.ySpeed

    const { width, height } = this.canvasOptions.canvas

    //如果头部超出画布，就从另一个方向出来
    if (this.x > width) {
        this.x = 0
    }

    if (this.y > height) {
        this.y = 0
    }

    if (this.x < 0) {
        this.x = width
    }

    if (this.y < 0) {
        this.y = height
    }
}

//监听键盘的，改变蛇的方向
Snake.prototype.changeDirection = function(direction) {
    switch (direction) {
        case 'Up':
            this.xSpeed = 0
            this.ySpeed = -size * 1
            break
        case 'Down':
            this.xSpeed = 0
            this.ySpeed = size * 1
            break
        case 'Left':
            this.xSpeed = -size * 1
            this.ySpeed = 0
            break
        case 'Right':
            this.xSpeed = size * 1
            this.ySpeed = 0
            break
    }
}

Snake.prototype.eatTarget = function(target) {
    //只有头部吃到了，才算吃到
    if (this.x === target.x && this.y === target.y) {
        this.targetNum++;

        return true
    }
    return false
}

//检测是否与障碍物有碰撞
Snake.prototype.collisionObstacle = function(obstacle) {
    for (let i = 0; i < obstacle.num; i++) {
        if (this.x === obstacle.x[i] && this.y === obstacle.y[i]) {
            return true
        }
    }
    return false
}

Snake.prototype.checkCollision = function() {
    //检测头部是否和身体的任意部分有重合，一但有重合视为与身体发生了碰撞，归位数据
    for (let i = 0; i < this.tails.length; i++) {
        if (this.x === this.tails[i].x && this.y === this.tails[i].y) {
            return true;
        }
    }
    return false;
}


//初始化本地  每个关卡的历史最高分
Snake.prototype.initMaxScore = function() {
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
}