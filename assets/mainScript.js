const cellIdprefix = 'game-board-cell-';
const rowIndexArray = ['A','B','C','D','E','F'];
const cellIndexArray = [1,2,3,4,5];

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
            let target = document.getElementById(this.id);
            
            let frontHide = 'flip-card-front-hide';
            let frontShow = 'flip-card-front-show';
            let backHide = 'flip-card-back-hide';
            let backShow = 'flip-card-back-show';
            let isFrontShow = target.innerHTML.indexOf(frontShow) > 0;
            let isBackShow = target.innerHTML.indexOf(backShow) > 0;
            if(isFrontShow)
            {
                target.innerHTML = target.innerHTML.replace(frontShow,frontHide);
                target.innerHTML = target.innerHTML.replace(backHide,backShow);                      
            }
            
            if(isBackShow)
            {
                target.innerHTML = target.innerHTML.replace(frontHide,frontShow); 
                target.innerHTML = target.innerHTML.replace(backShow,backHide);                       
            }    
        })       
    }
}