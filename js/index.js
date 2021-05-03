const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
const size = 10 //小方块的大小

//计算出画出多少行和列
const rows = canvas.height / size
const columns = canvas.width / size






let isOver = false; //游戏是否结束

let snake = new Snake(size, { canvas, ctx })
let target = new Target(size, { canvas, ctx, rows, columns })
let obstacle = new Obstacle(size, { canvas, ctx, rows, columns })
let timer = null

//用于存储每个关卡历史最高分
let targerNum = [];
let type //当前是在哪个关卡
function init() {
    //初始化画布
    target.genRandomLocation()
    target.draw()

    obstacle.genRandomLocation(target)
    console.log(localStorage.getItem("enableWall"))
    if (localStorage.getItem("enableWall") === "true") {
        console.log("墙被启动了")
        obstacle.enableWall()
    }
    obstacle.draw()

    snake.initMaxScore();
    snake.draw()
}




function start() {
    timer = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        target.draw()
        obstacle.draw()
        snake.update()
        snake.draw()

        //传入目标，如果吃到了，就更新目标在画布中的位置
        if (snake.eatTarget(target)) {
            audio(400.00);
            //更新目标的时候，不能和障碍物重合
            target.genRandomLocation(obstacle)
        }
        //检测是否有和身体发生碰撞和是否与障碍物有碰撞
        isOver = snake.checkCollision() || snake.collisionObstacle(obstacle);
        if (isOver) {
            //结束背景音乐
            backgroundAudio(false);
            //播放游戏结束声音
            audio(-1);

            setMaxScore();
            gameOver();
            //弹窗
            show('light');
        }
        document.getElementById('score').innerText = snake.targetNum
    }, 150)
}




//游戏结束
function gameOver() {
    console.log("游戏结束")
    document.getElementById("cur_score").innerHTML = "当前关卡得分：" + snake.targetNum;
    document.getElementById("his_score").innerHTML = "历史最高分：" + getMaxScore(this.type);
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    clearInterval(timer)
    snake.init() //贪吃蛇数据归位
    obstacle.init() //障碍物数据归位
    init()
}


//设置关卡难度
function setParam(type, enableWall, obstacleNum) {
    console.log("当前关卡", type)
    this.type = type;
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    localStorage.setItem("enableWall", enableWall);
    localStorage.setItem("obstacleNum", obstacleNum);
    snake.init() //贪吃蛇数据归位
    obstacle.init()
    init()

}



function setMaxScore() {
    //获取本地存储的历史最高纪录
    let target = localStorage.getItem("targetNum");

    target = JSON.parse(target);
    console.log(target)
    for (let i = 0; i < target.length; i++) {
        if (target[i].type + "" === this.type + "") {
            target[i].maxScore = snake.targetNum > parseInt(target[i].maxScore) ? snake.targetNum : parseInt(target[i].maxScore);
            console.log("当前关卡历史最高分", target[i].maxScore)
            break;
        }
    }

    localStorage.setItem("targetNum", JSON.stringify(target));
}

function getMaxScore(type) {

    //获取本地存储的历史最高纪录

    let target = JSON.parse(localStorage.getItem("targetNum"));

    for (let i = 0; i < target.length; i++) {
        if (target[i].type + "" === type + "") {
            return parseInt(target[i].maxScore);
        }
    }
    return 0;
}