alert("The object of the game is to remember the pattern as far as you can and get the high score. A color will flash. Press that color to repeat the sequence. The unit will add another color to the sequence which you then repeat by pressing in the correct order. The unit will continue to add colors after you successfully repeat the sequence back. When you don't complete a sequence successfully, the unit will reset the game and display your score by flashing certain lights. Play again and see how far you can get.")
let gameseq = [];
let userseq = [];
let start = document.querySelector(".start");

let btns = ["green" , "red" , "yellow" , "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

start.addEventListener("click" , function () {
    if (started == false){
        console.log("game is started");
        started = true;
        levelUP();
        document.querySelector(".start").style.backgroundColor="gray";
    }
});


function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash")
    },250);
}

function levelUP(){
    userseq = [];
    level ++;
    h2.innerText = `Level ${level}`;


    let random = Math.floor(Math.random() * 4);
    let randcolor = btns[random];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    btnFlash(randbtn);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    document.querySelector(".start").style.backgroundColor="rgb(6, 243, 243)";
}


let Score = [];
let p = document.querySelector("p")

function highscore(Score) {
    let high = 0;
    for(let i=0;i<Score.length;i++){
        if(Score[i] > high){
            high = Score[i];
        }
    }
    p.innerText = `HIGHEST SCORE = ${high}`
}


function check(idx) {
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelUP,1000);
        }
    }else{
        let score = level * 10;
        h2.innerHTML = `Game Over<br> <em> YOUR SCORE => </em> <b>${score}</b> <br> Press Any Key To Reset The Game`;
        Score.push(score);
        highscore(Score);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "black";
        },1300);
        reset();
    }
}


function btnPress() {
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    check(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");

for(btn of allbtns){
    btn.addEventListener("click" , btnPress);
}