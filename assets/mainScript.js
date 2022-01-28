const cellIdprefix = 'game-board-cell-';
const rowIndexArray = ['A','B','C','D','E','F'];
const cellIndexArray = [1,2,3,4,5];
let lock = true;
let playerInitialsStored = '***';

// let gameBoard = document.getElementById('game-board');

let shapesFileNameArray = [
    'BasicTrangle.png'
    ,'Bolt.png'
    ,'Circle.png'
    ,'DownArrow.png'
    ,'Heart.png'
    ,'Hexagon.png'
    ,'LeftArrow.png'
    ,'OtherTriangle.png'
    ,'Oval.png'
    ,'Pentagon.png'
    ,'RightArrow.png'
    ,'Square.png'
    ,'Star.png'
    ,'Unknown.png'
    ,'UpArrow.png'
]

let shapeImageTagArray = [];
let shapeImageRootFilePath = "./assets/images/matchingImages/shapes/";
let spanImagesIdArray = [];
for(let imageIndex = 0;imageIndex < shapesFileNameArray.length;imageIndex++)
{
    let imageName = `${shapesFileNameArray[imageIndex].replace(".png","")}`;
    let imageId = `${imageName}${'-1'}`;
    let imageFilePath = `${shapeImageRootFilePath}${shapesFileNameArray[imageIndex]}`;
    let imageTag = `<img id="${imageId}" src="${imageFilePath}" alt="${imageName}" class="flip-card-front-hide">`
    // console.log(imageTag);
    let cardbackImageName = `${shapesFileNameArray[imageIndex].replace(".png","-CardBack")}`;
    let cardbackImageId = `${cardbackImageName}${'-1'}`;
    let cardbackImageFilePath = `${shapeImageRootFilePath}CardBack.png`;
    let cardbackImageTag = `<img id="${cardbackImageId}" src="${cardbackImageFilePath}" alt="${cardbackImageName}" class="flip-card-back-show">`;
    let spanId = `${imageName}${'-Span-1'}`;
    let spanImageTags = `<span id="${spanId}">${imageTag}${cardbackImageTag}<span>`    
    shapeImageTagArray.push(spanImageTags);
    spanImagesIdArray.push(spanId);
}
for(let imageIndex = 0;imageIndex < shapesFileNameArray.length;imageIndex++)
{
    let imageName = `${shapesFileNameArray[imageIndex].replace(".png","")}`;
    let imageId = `${imageName}${'-2'}`;
    let imageFilePath = `${shapeImageRootFilePath}${shapesFileNameArray[imageIndex]}`;
    let imageTag = `<img id="${imageId}" src="${imageFilePath}" alt="${imageName}" class="flip-card-front-hide">`
    // console.log(imageTag);
    let cardbackImageName = `${shapesFileNameArray[imageIndex].replace(".png","-CardBack")}`;
    let cardbackImageId = `${cardbackImageName}${'-2'}`;
    let cardbackImageFilePath = `${shapeImageRootFilePath}CardBack.png`;
    let cardbackImageTag = `<img id="${cardbackImageId}" src="${cardbackImageFilePath}" alt="${cardbackImageName}" class="flip-card-back-show">`;
    let spanId = `${imageName}${'-Span-2'}`;
    let spanImageTags = `<span id="${spanId}">${imageTag}${cardbackImageTag}<span>`
    shapeImageTagArray.push(spanImageTags);
    spanImagesIdArray.push(spanId);
}

// console.log(imageTagArray.length);

let gameBoardImageIndex = 0;
for(let cellIndex = 0;cellIndex < cellIndexArray.length;cellIndex++)
{
    for(let rowIndex = 0;rowIndex < rowIndexArray.length;rowIndex++)
    {
        let gameBoardCellId = `${cellIdprefix}${rowIndexArray[rowIndex]}${cellIndexArray[cellIndex]}`;
        // console.log(gameBoardCellId);       
        let gameBoardCell = document.getElementById(gameBoardCellId);
        // console.log(gameBoardCell);
        gameBoardCell.innerHTML = shapeImageTagArray[gameBoardImageIndex];
        let gameBoardCellSpan = document.getElementById(spanImagesIdArray[gameBoardImageIndex]);
        gameBoardImageIndex++;
        gameBoardCellSpan.addEventListener('click', function() {
            if (lock) {
                alert("Start the game silly :)");
            }
            else
            {
                let target = document.getElementById(this.id);            
                flipCard(target);
                let attemptCounter = document.getElementById('attempt-counter');
                addToCounter(attemptCounter);
            }             
        })       
    }
}

let startButton = document.getElementById('start-button');
startButton.addEventListener('click',function(){   
    let statusBanner = document.getElementById('status=banner'); 
    statusBanner.value = "";  
    let playerInitials = document.getElementById('player-initials');
    if (playerInitials.value == undefined || playerInitials.value.length < 1)
    {
        let statusBanner = document.getElementById('status=banner'); 
        statusBanner.value = "Please enter your initials...";        
        return;
    }
    playerInitialsStored =  playerInitials.value;
    playerInitials.setAttribute("readonly",true);
    lock = false;
    let startButtonDiv = document.getElementById('start-button-div');        
    startButtonDiv.className = startButtonDiv.className.replace('start-button-show','start-button-hide');
    let startTime = document.getElementById('start-time');
    startTime.value = getTime();
    let startTimeDiv = document.getElementById('start-time-div');        
    startTimeDiv.className = startTimeDiv.className.replace('start-time-hide','start-time-show');
    let gameBoard = document.getElementById('game-board');        
    gameBoard.className = gameBoard.className.replace('game-board-hide','game-board-show');
    
})

function getTime()
{
    let today = new Date();  
    let hour = parseInt(today.getHours());
    let minute = parseInt(today.getMinutes());
    let second = parseInt(today.getSeconds());
    let hourText = padZero(hour);
    let minuteText = padZero(minute);
    let secondText = padZero(second);
    let time = `${hourText}:${minuteText}:${secondText}`
    return time;
}
function padZero(value)
{
    if(parseInt(value) > 9)
    {
        return value;
    }
    else
    {
        return `0${value}`
    }    
}
function flipCard(card)
{         
    let frontHide = 'flip-card-front-hide';
    let frontShow = 'flip-card-front-show';
    let backHide = 'flip-card-back-hide';
    let backShow = 'flip-card-back-show';
    let isFrontShow = card.innerHTML.indexOf(frontShow) > 0;
    let isBackShow = card.innerHTML.indexOf(backShow) > 0;
    if(isFrontShow)
    {
        card.innerHTML = card.innerHTML.replace(frontShow,frontHide);
        card.innerHTML = card.innerHTML.replace(backHide,backShow);                      
    }
    
    if(isBackShow)
    {
        card.innerHTML = card.innerHTML.replace(frontHide,frontShow); 
        card.innerHTML = card.innerHTML.replace(backShow,backHide);                       
    }    
}

function addToCounter(counter)
{
    let value = parseInt(counter.value)
    counter.value = value + 1;
}
