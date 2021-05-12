const AUDIO_BACKGROUND = new Audio('audio/background.mp3');
const AUDIO_OVER = new Audio('audio/over.mp3');
let AUDIO_VOLUME = 1;

function getWidthAndHeightAndSize() {
    height = document.body.clientHeight;
    width = document.body.clientWidth;

    wh = Math.min(height, width); //去宽和高中的最小值

    wh = Math.floor(wh * 4 / 7);
    size = Math.floor(wh / 40);
    wh = wh - wh % size; //高和宽变成size的整数倍
    return { size, "height": wh, "width": wh }
}
//生成画布中的随机位置
function randomNum(canvasOptions, size) {
    const { rows, columns } = canvasOptions
    // console.log("utils接收到的数据", canvasOptions, size)

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

//开启还是关闭音乐
function openOrCloseAudio(flag) {
    if (flag) {
        AUDIO_VOLUME = 1;
        backgroundAudio(true)

    } else {
        backgroundAudio(false)
        AUDIO_VOLUME = 0;
    }

}

function audio(fre) {
    if (fre == -1) {
        AUDIO_OVER.volume = AUDIO_VOLUME;
        AUDIO_OVER.play();
        return;
    }
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!window.AudioContext) {
        alert('当前浏览器不支持Web Audio API');
        return;
    }

    // 创建新的音频上下文接口
    var audioCtx = new AudioContext();

    // // 发出的声音频率数据，表现为音调的高低
    // var arrFrequency = [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];


    // 当前频率
    var frequency = fre;


    // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
    var oscillator = audioCtx.createOscillator();
    // 创建一个GainNode,它可以控制音频的总音量
    var gainNode = audioCtx.createGain();
    // 把音量，音调和终节点进行关联
    oscillator.connect(gainNode);
    // audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
    gainNode.connect(audioCtx.destination);
    // 指定音调的类型，其他还有square|triangle|sawtooth
    oscillator.type = 'sine';
    // 设置当前播放声音的频率，也就是最终播放声音的调调
    oscillator.frequency.value = frequency;
    // 当前时间设置音量为0
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    // 0.01秒后音量为1
    gainNode.gain.linearRampToValueAtTime(AUDIO_VOLUME, audioCtx.currentTime + 0.01);
    // 音调从当前时间开始播放
    oscillator.start(audioCtx.currentTime);
    // 1秒内声音慢慢降低，是个不错的停止声音的方法
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
    // 1秒后完全停止声音
    oscillator.stop(audioCtx.currentTime + 1);
}



function backgroundAudio(playOrPause) {
    // 创建<audio>标签(参数:音频文件路径)
    AUDIO_BACKGROUND.volume = 0.4 * AUDIO_VOLUME;
    if (playOrPause) {
        AUDIO_BACKGROUND.play();
        AUDIO_BACKGROUND.loop = true;
        // AUDIO.volume = 4;
    } else {
        AUDIO_BACKGROUND.pause();
        AUDIO_BACKGROUND.currentTime = 0;
    }

}


//html的dom操作js
function show(data) {
    document.getElementById(data).style.display = 'block';
}

function hide(data) {
    document.getElementById(data).style.display = 'none';

}

let snakeIsShow = false; //用来判断是否进入游戏界面
//贪吃蛇主页显示与否，以防不在游戏界面的时候，就让游戏开始了
function showSnakeMain() {
    document.getElementById('snake_main').style.display = 'block';
    snakeIsShow = true;
}

function hideSnakeMain() {
    snakeIsShow = false;
    document.getElementById('snake_main').style.display = 'none';
}



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
