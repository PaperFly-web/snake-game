//生成画布中的随机位置
function randomNum(canvasOptions, size) {
    const { rows, columns } = canvasOptions

    x = (Math.floor(Math.random() * (columns) - 1) + 1) * size
    y = (Math.floor(Math.random() * (rows) - 1) + 1) * size

    if (this.x == 0) {
        this.x = size;
    }
    if (this.y == 0) {
        this.y = size
    }
    if (this.x >= size * (columns - 2)) {
        this.x = size * (columns - 2);
    }
    if (this.y >= size * (rows - 2)) {
        this.y = size * (rows - 2);
    }

    return { x, y }
}