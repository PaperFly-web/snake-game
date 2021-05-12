let ioc = new IOC();
let { scene, game, snake, target, obstacle } = ioc.getObjects();
scene.set(snake, target, obstacle)
game.set(snake, target, obstacle)




//是否对这次的开始或者结束键盘处理完毕，以防频繁按键，导致没来得及处理上次的按键事件
let handleIsComplete = [true, true];
let timer = null;
let openOrCloseBgAu = true;
//键盘控制游戏开始结束
window.addEventListener('keydown', (event) => {
    const direction = event.key.replace('Arrow', '')
        // console.log("键盘按的键", "." + direction + ".")
    if (direction === "Enter" && snakeIsShow && handleIsComplete[0]) {

        timer = setInterval(() => {
            game.start(timer)
        }, 150)

        //播放背景音乐
        backgroundAudio(true)
        handleIsComplete[0] = false;
        handleIsComplete[1] = true;
    } else if (direction === " " && snakeIsShow && handleIsComplete[1]) {

        game.pause(timer)
        backgroundAudio(false)
        handleIsComplete[0] = true;
        handleIsComplete[1] = false;
    } else if (direction === "a") {
        openOrCloseBgAu = !openOrCloseBgAu;

        openOrCloseAudio(openOrCloseBgAu)
    }

    // 控制贪吃蛇的方向
    //先判断是否需要改变方向
    if (snake.isChangeDirection(direction)) {
        snake.changeDirection(direction)
    }
    console.log("是否改变方向", snake.isChangeDirection(direction))
})





//设置关卡难度，进入游戏场景
function setParam(type, enableWall, obstacleNum) {
    console.log("当前关卡", type)
    localStorage.setItem("type", type);
    localStorage.setItem("enableWall", enableWall);
    localStorage.setItem("obstacleNum", obstacleNum);
    //重新开始一个游戏，数据归位
    handleIsComplete = [true, true];
    scene.init()

}


function setMaxScore(type) {
    //获取本地存储的历史最高纪录
    let target = localStorage.getItem("targetNum");

    target = JSON.parse(target);
    console.log(target)
    for (let i = 0; i < target.length; i++) {
        if (target[i].type + "" === type + "") {
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