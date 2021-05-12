function IOC() {
    this.canvas = document.querySelector('.canvas')
    this.ctx = this.canvas.getContext('2d')
    const { size, height, width } = getWidthAndHeightAndSize()
    console.log(getWidthAndHeightAndSize())
    this.size = size;
    this.canvas.width = width;
    this.canvas.height = height;

    //计算出画出多少行和列
    rows = this.canvas.height / this.size
    columns = this.canvas.width / this.size
    this.scene = new Scene(this.canvas, this.ctx, this.size);
    this.snake = new Snake(this.size, { "canvas": this.canvas, "ctx": this.ctx })
    this.target = new Target(this.size, { "canvas": this.canvas, "ctx": this.ctx, rows, columns })
    this.obstacle = new Obstacle(this.size, { "canvas": this.canvas, "ctx": this.ctx, rows, columns })
    this.game = new Game(this.canvas, this.ctx, this.scene)

}

IOC.prototype.getObjects = function() {
    let snake = this.snake;
    let target = this.target;
    let obstacle = this.obstacle;
    let game = this.game;
    let scene = this.scene;
    let size = this.size;

    return { "canvas": this.canvas, "ctx": this.ctx, size, snake, target, obstacle, game, scene }
}