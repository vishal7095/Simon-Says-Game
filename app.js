 let gameSeq=[];
 let userSeq=[];

 let btns = ["red","yellow","green","purple"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false){
       console.log("Game is Started");
       started = true;

       levelUp();
    }
});

function gameFLash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
};

function userFLash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
};

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    //random btn choose
    gameFLash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFLash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset() {
    started = false;
    if(level > highestScore){
        highestScore = level;
        updateHighestScore();
    }
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function updateHighestScore() {
    let highestScoreElmt = document.querySelector("#highest-score");
    highestScoreElmt.innerText = `Highest Score: ${highestScore}`;
}