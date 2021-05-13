function Target(size, canvasOptions) {
    this.x
    this.y
    this.size = size
    this.canvasOptions = canvasOptions
}

//更新目标在画布中的位置
Target.prototype.genRandomLocation = function(obstacle) {
    let xy = randomNum(this.canvasOptions, this.size)
    if (obstacle != null) { //初始化的时候不需要检测
        //更新画布的时候，目标不能和障碍物重合
        for (let i = 0; i < obstacle.num; i++) {
            while (xy.x === obstacle.x[i] && xy.y === obstacle.y[i]) {
                console.log("目标更新后和障碍物重合", xy)
                i = -1;
                xy = randomNum(this.canvasOptions, this.size)
            }
        }
    }
    const { x, y } = xy;
    console.log("目标生成的随机位置", xy)
    this.x = x;
    this.y = y;

}

Target.prototype.draw = function() {
    const { ctx } = this.canvasOptions
    ctx.fillStyle = '#e83333'
    ctx.fillRect(this.x, this.y, this.size, this.size)
}