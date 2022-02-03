const cellIdprefix = 'game-board-cell-';
const rowIndexArray = ['A','B','C','D','E','F'];
const cellIndexArray = [1,2,3,4,5];
const shapeImageRootFilePath = "./assets/images/matchingImages/shapes/";
const enhancedLogging = false;
const flipCardFrontHideClassName = 'flip-card-front-hide';
const flipCardFrontShowClassName = 'flip-card-front-show';
const flipCardBackHideClassName = 'flip-card-back-hide';
const flipCardBackShowClassName = 'flip-card-back-show';
const pendingStatus = 'PENDING';
const matchedStatus = 'MATCHED';
const inPlayStatus = 'IN_PLAY';
const shapesFileNameArray = [
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
];
let playerInitialsStored = '***';
let shapeImageTagArray = [];
let spanImagesIdArray = [];
let shapesFileNameArray1 = [];
let shapesFileNameArray2 = [];

function addActionsToCards()
{
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
}

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

function getCalcDiffSeconds(time1,time2)
{
    let diffSeconds = 0;
    let splitTime1 = time1.split(":");
    let splitTime2 = time2.split(":");

    let hrs1 = splitTime1[0];
    let min1 = splitTime1[1];
    let sec1 = splitTime1[2];

    let hrs2 = splitTime2[0];
    let min2 = splitTime2[1];
    let sec2 = splitTime2[2];
    
    let hrsDiff = parseInt(hrs2) - parseInt(hrs1);
    let minDiff = parseInt(min2) - parseInt(min1);
    let secDiff = parseInt(sec2) - parseInt(sec1);

    console.log(`hrs1:${hrs1}|hrs2:${hrs2}|hrsDiff:${hrsDiff}`);
    console.log(`min1:${min1}|min2:${min2}|minDiff:${minDiff}`);
    console.log(`sec1:${sec1}|sec2:${sec2}|secDiff:${secDiff}`);
    let diffSeconds1 = parseInt(hrsDiff) * 60 * 60;
    let diffSeconds2 = parseInt(minDiff) * 60;
    diffSeconds = parseInt(secDiff) + diffSeconds1 + diffSeconds2;
    return diffSeconds;
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

function IsFrontShowing(cardImageClassValue)
{    
    return (cardImageClassValue === flipCardFrontShowClassName || cardImageClassValue === flipCardBackHideClassName)    
}

function clickOnCard(card)
{

    flipCard(card);

    let log = [];
    let stateArray = getGamePlayState();
    let cardMatchArray = []
    for (let imageIndex = 0;imageIndex < shapesFileNameArray.length;imageIndex++)
    {        
        cardMatchArray.push({
            Name: shapesFileNameArray[imageIndex].replace('.png','')
            ,Status: pendingStatus
            ,StatefulTagId1: "TBD"
            ,StatefulTagId2: "TBD"            
            ,IsFrontShowing1: false            
            ,IsFrontShowing2: false            
            ,ErrorMessage: "EMPTY"                              
        });
    }
    
    for (let cardMatchIndex = 0;cardMatchIndex < cardMatchArray.length;cardMatchIndex++)
    {        
        for(let stateIndex = 0; stateIndex < stateArray.length; stateIndex++)
        {
            let cardMatch = cardMatchArray[cardMatchIndex];
            let cardMatchName = '';
            if(cardMatch.Name != undefined)
            {
                cardMatchName = cardMatch.Name;
            }
            
            let stateNode = stateArray[stateIndex];
            let stateNodeId = '';
            if(stateNode.getAttribute('Id') != undefined)
            {
                stateNodeId = stateNode.getAttribute('Id');
            }

            let stateNodeName = '';
            let stateNodeCardPairNumber = '';
            if(stateNodeId.length > 0)
            {                
                let stateNodeNameSplit = stateNodeId.split('-');
                for(let splitIndex = 0;splitIndex < stateNodeNameSplit.length;splitIndex++)
                {
                    if(splitIndex === 0)
                    {
                        stateNodeName = stateNodeNameSplit[splitIndex]
                    }
                    else (splitIndex === stateNodeNameSplit.length - 1)
                    {
                        stateNodeCardPairNumber = stateNodeNameSplit[stateNodeNameSplit.length - 1]
                    }
                }       
            }

            if(stateNodeName === cardMatchName)
            {
                log.push(`*** match is found ***`)
                log.push(`Card Match Name: ${cardMatchName}`)
                log.push(`State Node Name: ${stateNodeName}`)
                log.push(`State Node Card Pair Number: ${stateNodeCardPairNumber}`)
                let stateNodeImageClass = '';
                let stateNodeInputValue = '';
                if(stateNode.nodeName === 'IMG')
                {
                    log.push("IS IMAGE TAG!");
                    stateNodeImageClass = stateNode.getAttribute("class");
                    log.push(stateNodeImageClass);
                    switch(parseInt(stateNodeCardPairNumber))
                    {
                        case 1:
                            {
                                cardMatch.IsFrontShowing1 = IsFrontShowing(stateNodeImageClass);
                                break;
                            }
                        case 2:
                            {
                                cardMatch.IsFrontShowing2 = IsFrontShowing(stateNodeImageClass);
                                break;
                            }
                        default:
                            {                                
                                cardMatch.ErrorMessage = "Error with Unknown Pairing Number!";
                                break;
                            }
                    }          
                }
                else if(stateNode.nodeName === "INPUT") {
                    log.push("IS INPUT TAG!");
                    stateNodeInputValue = stateNode.getAttribute("value");
                    log.push(stateNodeInputValue);
                    cardMatch.Status = stateNodeInputValue;
                    
                    switch(parseInt(stateNodeCardPairNumber))
                    {
                        case 1:
                            {
                                cardMatch.StatefulTagId1 = stateNodeId;                                
                                break;
                            }
                        case 2:
                            {
                                cardMatch.StatefulTagId2 = stateNodeId;                                
                                break;
                            }
                        default:
                            {                                
                                cardMatch.ErrorMessage = "Error with Unknown Pairing Number!";
                                break;
                            }
                    }
                }                               
            }
        }

        displayLog(log);
    }

    let howManyinPlayAndShowing = 0;
    for (let cardMatchIndex = 0;cardMatchIndex < cardMatchArray.length;cardMatchIndex++)
    { 
        let cardMatch = cardMatchArray[cardMatchIndex];
        if(cardMatch.Status === inPlayStatus)
        {
            console.log(cardMatch);
            if(cardMatch.IsFrontShowing1)
            {
                howManyinPlayAndShowing++;
            }
            if(cardMatch.IsFrontShowing2)
            {
                howManyinPlayAndShowing++;
            }          
        } 
    }

    console.log(howManyinPlayAndShowing);
    
    if(howManyinPlayAndShowing === 2)
    {
        let attemptCounter = document.getElementById('attempt-counter');
        addToCounter(attemptCounter);

        let matchFound = false;
        for (let cardMatchIndex = 0;cardMatchIndex < cardMatchArray.length;cardMatchIndex++)
        { 
            let cardMatch = cardMatchArray[cardMatchIndex];
            if(cardMatch.Status === inPlayStatus)
            {                
                if(cardMatch.IsFrontShowing1 && cardMatch.IsFrontShowing2)
                {
                    cardMatch.Status = matchedStatus;
                    let matchesCounter = document.getElementById('matches-counter');
                    addToCounter(matchesCounter);
                    matchFound = true;

                    setTimeout(() => {
                        let attemptCounter = document.getElementById('attempt-counter');
                        let attemptCounterValue = parseInt(attemptCounter.value);
                        let matchesCounter = document.getElementById('matches-counter');                        
                        let matchesCounterValue = parseInt(matchesCounter.value);
                        if (matchesCounterValue >= 15)
                        {
                            let startTime = document.getElementById('start-time');
                            let startTimeValue = startTime.value;
                            let endTimeValue  = getTime();
                            let diffSeconds = getCalcDiffSeconds(startTimeValue,endTimeValue)
                            console.log(`${diffSeconds} - diffSeconds`);

                            /* The score will be (matches over seconds) times (attempts over seconds) */
                            let scoreRatio = (matchesCounterValue / diffSeconds) * (attemptCounterValue / diffSeconds)
                            let rawScore = scoreRatio * 1000;
                            let finalScore = Math.round(rawScore);
                            alert(`Score: ${finalScore}`);
                        }
                    }, 1000); 
                }           
            } 
        }
        if(!matchFound)
        {
            let missesCounter = document.getElementById('misses-counter');
            addToCounter(missesCounter);
        }        

        setTimeout(() => {
            let items = getGamePlayState();
            for(let index = 0; index < items.length; index++)
            {            
                let node = items[index];
                let nodeValueAttr = '';
                if(node.nodeName === "INPUT")
                {
                    if(node.getAttribute('value') != undefined)
                    {
                        nodeValueAttr = node.getAttribute('value');
                    }
                    
                    if(nodeValueAttr.length > 0)
                    {                    
                        if(nodeValueAttr === inPlayStatus)
                        {
                            let card = document.getElementById(node.parentNode.getAttribute("Id"));
                            ensureCardFaceDown(card);
                        }
                    } 
                }                              
            }
        }, 1000); 
    }

    
    for (let cardMatchIndex = 0;cardMatchIndex < cardMatchArray.length;cardMatchIndex++)
    { 
        let cardMatch = cardMatchArray[cardMatchIndex];
        if(cardMatch.Status === matchedStatus)
        {
            let statefulTag1 = document.getElementById(cardMatch.StatefulTagId1);
            statefulTag1.value = cardMatch.Status;
            let statefulTag2 = document.getElementById(cardMatch.StatefulTagId2);
            statefulTag2.value = cardMatch.Status;
            console.log(cardMatch);                    
        } 
    }  
}

function ensureCardFaceDown(card)
{
    let isFrontShow = card.innerHTML.indexOf(flipCardFrontShowClassName) > 0;
        
    if(isFrontShow)
    {
        card.innerHTML = card.innerHTML.replace(flipCardFrontShowClassName,flipCardFrontHideClassName);
        card.innerHTML = card.innerHTML.replace(flipCardBackHideClassName,flipCardBackShowClassName);                      
    }      
}

function flipCard(card)
{
    let isFrontShow = card.innerHTML.indexOf(flipCardFrontShowClassName) > 0;
    let isBackShow = card.innerHTML.indexOf(flipCardBackShowClassName) > 0;
    let isInPlay = card.innerHTML.indexOf(inPlayStatus) > 0;
    
    if(isFrontShow && isInPlay)
    {
        card.innerHTML = card.innerHTML.replace(flipCardFrontShowClassName,flipCardFrontHideClassName);
        card.innerHTML = card.innerHTML.replace(flipCardBackHideClassName,flipCardBackShowClassName);                      
    }
    
    if(isBackShow && isInPlay)
    {
        card.innerHTML = card.innerHTML.replace(flipCardFrontHideClassName,flipCardFrontShowClassName); 
        card.innerHTML = card.innerHTML.replace(flipCardBackShowClassName,flipCardBackHideClassName);                       
    }   
}

function getGamePlayState()
{
    let log = [];
    let cardInfo = [];
    let gameBoard = document.getElementById('game-board');
    log.push(`Game Board Nodes Count: ${gameBoard.childNodes.length}`);
    
    for(let gameBoardIndex = 0; gameBoardIndex < gameBoard.childNodes.length;gameBoardIndex++)
    {
        let gameBoardChildNodes = gameBoard.childNodes[gameBoardIndex];
        log.push(`Game Board Region ${gameBoardIndex} Nodes Count: ${gameBoardChildNodes.childNodes.length}`);
        log.push(gameBoardChildNodes)
        for(let gameBoardRegionindex = 0; gameBoardRegionindex < gameBoardChildNodes.childNodes.length;gameBoardRegionindex++)
        {
            let gameBoardRegionNodes = gameBoardChildNodes.childNodes[gameBoardRegionindex];
            log.push(`Region Area ${gameBoardRegionindex} Nodes Count: ${gameBoardRegionNodes.childNodes.length}`);
            log.push(gameBoardRegionNodes)
            for(let gameBoardAreaindex = 0; gameBoardAreaindex < gameBoardRegionNodes.childNodes.length;gameBoardAreaindex++)
            {
                let gameBoardAreaNodes = gameBoardRegionNodes.childNodes[gameBoardAreaindex];
                log.push(`Area Block ${gameBoardAreaindex} Nodes Count: ${gameBoardAreaNodes.childNodes.length}`);
                log.push(gameBoardAreaNodes)
                for(let gameBoardBlockindex = 0; gameBoardBlockindex < gameBoardAreaNodes.childNodes.length;gameBoardBlockindex++)
                {
                    let gameBoardBlockNodes = gameBoardAreaNodes.childNodes[gameBoardBlockindex];
                    log.push(`Block Card ${gameBoardBlockindex} Nodes Count: ${gameBoardBlockNodes.childNodes.length}`);
                    log.push(gameBoardBlockNodes)
                    for(let gameBoardCardindex = 0; gameBoardCardindex < gameBoardBlockNodes.childNodes.length;gameBoardCardindex++)
                    {
                        let gameBoardCardNodes = gameBoardBlockNodes.childNodes[gameBoardCardindex];
                        log.push(`Card Info ${gameBoardCardindex} Nodes Count: ${gameBoardCardNodes.childNodes.length}`);
                        log.push(gameBoardCardNodes)
                        cardInfo.push(gameBoardCardNodes);
                    }
                }
            }
        }
    }

    displayLog(log);
    return cardInfo;
}

function displayLog(log)
{
    console.log(`Enhanced Logging Flag: ${enhancedLogging}`);
    if(enhancedLogging)
    {
        for(let logIndex = 0; logIndex < log.length; logIndex++)
        {
            let logText = log[logIndex];
            console.log(logText);
        }
    }    
}



function addToCounter(counter)
{
    let value = parseInt(counter.value)
    counter.value = value + 1;
}


function mixUpImages()
{
    for(let i = 0; i < 2; i++)
    {
        let numbers = []; 
        for (let imageIndex = 0; imageIndex < shapesFileNameArray.length; imageIndex++)
        {
            numbers.push([Math.random(),imageIndex]);
        }
        let numbersSort = numbers.sort();
        for (let imageIndex = 0; imageIndex < shapesFileNameArray.length; imageIndex++)
        {
            let randomNumber = numbersSort[imageIndex][0];
            let imageNumber = numbersSort[imageIndex][1];
            
            // console.log(`numbersSort[${imageIndex}][0]: ${randomNumber}`);
            // console.log(`numbersSort[${imageIndex}][1]: ${imageNumber}`);

            if(i === 0)
            {
                shapesFileNameArray1.push(shapesFileNameArray[imageNumber])
            }
            else
            {
                shapesFileNameArray2.push(shapesFileNameArray[imageNumber])
            }           
        }
    }
}

function main()
{
    mixUpImages();

    for(let i = 0; i < 2; i++)
    {
        let fileNameExtension = i + 1;
        let array = [];
        if(i === 0)
        {
            array = shapesFileNameArray1;
        }
        else
        {
            array = shapesFileNameArray2;
        } 

        for (let imageIndex = 0;imageIndex < array.length;imageIndex++)
        {
            // console.log(`Shapes File Name: ${shapesFileNameArray[imageIndex]}`);
    
            // Card Front Image Tag
            let cardFrontImageName = `${array[imageIndex].replace(".png","")}`;
            let cardFrontImageId = `${cardFrontImageName}-${fileNameExtension}`;
            let cardFrontImageFilePath = `${shapeImageRootFilePath}${array[imageIndex]}`;
            let cardFrontImageTag = `<img id="${cardFrontImageId}" src="${cardFrontImageFilePath}" alt="${cardFrontImageName}" class="flip-card-front-hide"/>`
            // console.log(`Card Front Image Name: ${cardFrontImageName}`);
            
            // Card Back Image Tag
            let cardBackImageName = `${array[imageIndex].replace(".png","-CardBack")}`;
            let cardBackImageId = `${cardBackImageName}-${fileNameExtension}`;
            let cardBackImageFilePath = `${shapeImageRootFilePath}CardBack.png`;
            let cardBackImageTag = `<img id="${cardBackImageId}" src="${cardBackImageFilePath}" alt="${cardBackImageName}" class="flip-card-back-show"/>`;
            // console.log(`Card Back Image Name: ${cardBackImageName}`);
    
            //Input Hidden Tag        
            let cardinputHiddenId = `${cardFrontImageName}-Input-${fileNameExtension}`;
            let cardinputHiddenTag = `<input id="${cardinputHiddenId}" type="hidden" value="${inPlayStatus}"/>`
    
            // Card Span Tag
            let cardSpanId = `${cardFrontImageName}-Span-${fileNameExtension}`;
            let cardSpanTag = `<span id="${cardSpanId}">${cardFrontImageTag}${cardBackImageTag}${cardinputHiddenTag}</span>`
            // console.log(`Card Span ID: ${cardSpanId}`);
               
    
            shapeImageTagArray.push(cardSpanTag);
            spanImagesIdArray.push(cardSpanId);
        }       
    }    
    
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
                
                let target = document.getElementById(this.id);                          
                clickOnCard(target);                            
            })       
        }
    }

    addActionsToCards();
}

main();