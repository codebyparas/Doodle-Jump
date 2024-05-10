// Board
let board;
let boardWidth = 360;
let boardHeight = 576;
let context;

// Doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth/2 - doodlerWidth/2;
let doodlerY = boardHeight*7/8 - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

// Physics
let velocityX = 0;
let velocityY = 0;  // Doodler Jump Speed
let initialVelocityY = -8;  // Starting Velocity Y
let gravity = 0.4;

// Platforms
let platformArray = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;

let doodler = {
    img : null,
    x : doodlerX,
    y : doodlerY,
    width : doodlerWidth,
    height : doodlerHeight
}

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");  // Used for Drawing on the Board

    // Draw Doodler
    // context.fillStyle = "green";
    // context.fillRect(doodler.x, doodler.y, doodler.width, doodler.height);

    // Load Images
    doodlerRightImg = new Image();
    doodlerRightImg.src = "./doodler-right.png";
    doodler.img = doodlerRightImg;
    doodlerRightImg.onload = function(){
        context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
    }

    doodlerLeftImg = new Image();
    doodlerLeftImg.src = "./doodler-left.png";

    platformImg = new Image;
    platformImg.src = "./platform.png";

    velocityY = initialVelocityY;
    placePlatforms();
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDoodler);
}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // Doodler
    doodler.x += velocityX;
    if(doodler.x > boardWidth){
        doodler.x = 0;
    }else if(doodler.x + doodler.width < 0){
        doodler.x = boardWidth;
    }
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);

    velocityY += gravity;
    doodler.y += velocityY;

    // Platforms
    for(let i = 0; i < platformArray.length; i++){
        let platform = platformArray[i];
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }
}

function moveDoodler(e){
    if(e.code == "ArrowRight" || e.code =="KeyD"){
        velocityX = 4;
        doodler.img = doodlerRightImg;
    }else if(e.code == "ArrowLeft" || e.code == "KeyA"){
        velocityX = -4;
        doodler.img = doodlerLeftImg;
    }
}

function placePlatforms(){
    platformArray = [];

    // Starting Platforms
    let platform = {
        img : platformImg,
        x : boardWidth/2,
        y : boardHeight - 50,
        width : platformWidth,
        height : platformHeight
    }

    platformArray.push(platform);

    platform = {
        img : platformImg,
        x : boardWidth/2,
        y : boardHeight - 150,
        width : platformWidth,
        height : platformHeight
    }

    platformArray.push(platform);
}