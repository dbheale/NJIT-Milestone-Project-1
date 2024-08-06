const shapeImageRootFilePath = "./assets/images/matchingImages/shapes/";
const shapesFileNameArray = [
    'BasicTrangle.png' ,'Bolt.png' ,'Circle.png' ,'DownArrow.png'
    ,'Heart.png' ,'Hexagon.png' ,'LeftArrow.png' ,'OtherTriangle.png'
    ,'Oval.png' ,'Pentagon.png' ,'RightArrow.png' ,'Square.png'
    ,'Star.png' ,'Unknown.png' ,'UpArrow.png'
];
const defaultImage = shapeImageRootFilePath + "CardBack.png";

let shapeImages = [];
let validImageState = new Array(shapesFileNameArray.length * 2);
let card1; // state for the first card clicked
let card2; // state for second card clicked
let activeTimeout; // used to see if two cards were clicked and the timeout is pending

function mixUpImages()
{
    // double and flatten source images
    shapeImages = shapesFileNameArray.flatMap(fileName => [fileName, fileName]);

    // mix'em up
    for (let i = shapeImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shapeImages[i], shapeImages[j]] = [shapeImages[j], shapeImages[i]];
    }
}

function quitGame()
{
    window.opener = self;
    window.close();
}

function startOver()
{
    main();
}

function getTime()
{
    let today = new Date();
    let hour =   ensureTwoDigits(today.getHours());
    let minute = ensureTwoDigits(today.getMinutes());
    let second = ensureTwoDigits(today.getSeconds());
    return `${hour}:${minute}:${second}`;
}

function ensureTwoDigits(value)
{
    return value.toString().padStart(2, '0');
}

function cardClicked(tileElement, tileIndex) {
    if(!card1){
        card1 = {tileIndex, tileElement};
        tileElement.src = shapeImageRootFilePath + shapeImages[tileIndex];
        tileElement.classList.add('active');
        return;
    }
    if(!card2){
        document.getElementById('attempt-counter').value++;

        card2 = {tileIndex, tileElement};
        tileElement.src = shapeImageRootFilePath + shapeImages[tileIndex];
        tileElement.classList.add('active');
        activeTimeout = setTimeout(() => {

            if(shapeImages[card1.tileIndex] === shapeImages[card2.tileIndex]){
                validImageState[card1.tileIndex] = true;
                validImageState[card2.tileIndex] = true;
                document.getElementById('matches-counter').value++;
                if(validImageState.every(item => item === true)){
                    document.getElementById('status-banner').value = `You win! It only took you ${document.getElementById('attempt-counter').value} tries.`
                }
            }else{
                card1.tileElement.src = defaultImage;
                card2.tileElement.src = defaultImage;
                card1.tileElement.classList.remove('active');
                card2.tileElement.classList.remove('active');
                document.getElementById('misses-counter').value++;
            }
            card1 = null;
            card2 = null;
            activeTimeout = null; // reset for clicking

        },1000)
    }
}

function addCards() {

    mixUpImages();

    let board = document.getElementById("game-board-main");

    board.innerHTML = '';

    for (let i = 0; i < shapeImages.length; i++) {
        const newTile = document.createElement('img');

        newTile.src = defaultImage;

        newTile.className = 'playing-card';

        newTile.addEventListener('click', function (event) {
            // if it's showing two cards, ignore the click.
            if(activeTimeout){
                return;
            }

            // The element that was clicked
            const clickedElement = event.target;

            // Check if the clicked element has the specific class
            if (!clickedElement.classList.contains('active')) {
                cardClicked(newTile, i);
            }
        })

        board.appendChild(newTile);
    }
}

function main(initialLoad = false)
{
    if (document.getElementById('player-initials').value.length > 0) {
        validImageState.fill(false);
        document.getElementById('start-time').value = getTime();
        addCards();
        return;
    }

    if(!initialLoad){
        alert("Please enter your name before starting the game.");
    }
}

main(true);
