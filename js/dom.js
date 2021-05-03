//html的dom操作js
function show(data) {
    document.getElementById(data).style.display = 'block';
}

function hide(data) {
    document.getElementById(data).style.display = 'none';

}

//贪吃蛇主页显示与否
function showSnakeMain() {
    document.getElementById('snake_main').style.display = 'block';
}

function hideSnakeMain() {
    document.getElementById('snake_main').style.display = 'none';
}


//开始和暂停键
const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
startBtn.addEventListener('click', () => {
    start()
        //播放背景音乐
    backgroundAudio(true)
})

pauseBtn.addEventListener('click', () => {
    clearInterval(timer)
    backgroundAudio(false)
})

window.addEventListener('keydown', (event) => {
    const direction = event.key.replace('Arrow', '')
    snake.changeDirection(direction)
})


//检测并设置用户自定义数据
function checkAndSetUserCustom() {
    let num = document.getElementById("obstacleNum").value;
    let enableWall = document.getElementById("enableWall").value;
    console.log("用户自定义关卡难度", num, enableWall)
    if (num >= 1 && num <= 100) {
        setParam(5, enableWall == "true", parseInt(num));
        showSnakeMain();
        return true;
    }
    return false;
}