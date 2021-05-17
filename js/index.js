let ioc = new IOC();
let { scene, game, snake, target, obstacle } = ioc.getObjects();
scene.set(snake, target, obstacle);
game.set(snake, target, obstacle);

//监听键盘事件
window.addEventListener('keydown', (event) => {
    const key = event.key.replace('Arrow', '');
    game.keyController(key);
    // 控制贪吃蛇的方向
    //先判断是否需要改变方向
    snake.isChangeDirection(key) === true ? snake.changeDirection(key) : true;
})

//设置关卡难度，进入游戏场景
function setParam(type, enableWall, obstacleNum) {
    console.log("当前关卡", type)
    localStorage.setItem("type", type);
    localStorage.setItem("enableWall", enableWall);
    localStorage.setItem("obstacleNum", obstacleNum);
    game.init()
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