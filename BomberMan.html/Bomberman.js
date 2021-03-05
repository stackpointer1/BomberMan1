var gameContainer=document.getElementById("container");
var count=1;
var gameMatrix=[];
var score=0;
for(var i=1;i<=81;i++){
    var div=document.createElement("DIV");
    div.className="cell";
    div.setAttribute("id","cell_"+count);
    gameContainer.append(div);
    gameMatrix[i]="";
    count++;
}
// var id=document.getElementById("container");
// console.log(id);

let gameActive=true;
let random=[]

//Random 10 Number selection for bombs
var j = 1;
while (j <=10) {
    var number = Math.floor((Math.random() * 81)+1);
    const numberExist = random.some((sp) => sp ==number);
    if (numberExist == false) {
        random[j] = number;
        j++;
    }
}
//console.log(random);

function displayBombs(){
    for(var i=1;i<=10;i++){
        var bombCell=document.getElementById("cell_"+random[i]);
        bombCell.style.backgroundImage= "url('https://img.icons8.com/emoji/48/000000/bomb-emoji.png')";
        bombCell.style.backgroundColor="red";
    }
}

function handleCellPlayed(clickedCell,clickedCellIndex){
    for(var k=1;k<=10;k++){
        if(clickedCellIndex==random[k]){
            clickedCell.style.backgroundImage="url('https://img.icons8.com/emoji/48/000000/bomb-emoji.png')";
            displayBombs();
            document.getElementById("resultDisplay").innerHTML="game over";
            gameActive=false;
            return;  
        }
    }
    gameMatrix[clickedCellIndex]="1";
    // console.log(gameMatrix);
    clickedCell.innerHTML="1";
    clickedCell.style.backgroundColor="green";
    score++;
    document.getElementById("gameScore").innerHTML=score;
    if(score==71){
        document.getElementById("resultDisplay").innerHTML="Win";
        gameActive=false;
        return;
    }

}



function handleCellClick(clickedCellEvent){
    const clickedCell=clickedCellEvent.target;
    console.log(clickedCell);//gives whole element cool!

    var Str=clickedCell.getAttribute("id");
    var intValue=Str.match(/(\d+)/); 
    const clickedCellIndex=intValue[0];

    console.log(clickedCellIndex);
    if(gameMatrix[clickedCellIndex]!="" || !gameActive){
        return;
    }

    handleCellPlayed(clickedCell,clickedCellIndex);
}


document
.querySelectorAll(".cell")
.forEach((cell)=>cell.addEventListener("click",handleCellClick));


function restartGame(){

    for(var i=1;i<=81;i++){
        gameMatrix[i]="";
        var cell=document.getElementById("cell_"+i);
        cell.innerHTML="";
        cell.style.backgroundImage="";
        cell.style.background="";
        score=0;
        gameActive=true;
        document.getElementById("resultDisplay").innerHTML="";
        document.getElementById("gameScore").innerHTML=score;
        
    }
}