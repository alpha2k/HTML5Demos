
/*========================== GLOBAL VARIABLES ==================================*/
var stage;
var canvas;
var ctx;
var Mouse = {x:0,y:0}; //mouse 
var gridArea;
var gridX = 190;
var gridY = 80;
var gridRows = 18;
var gridCols = 10;
var gridWidth = 300;
var gridHeight = 480;
var gridCellWidth = 0;
var gridCellHeight = 0;
var currShape;
var nextShape;
var prevShape = new Object();

var shapeTicks = 36;
var levelCount = 0;
var rowClearTicks = 1;
var rowMoveTicks = 2;
var currShapeTickCount = 0;
var rowRemoveAnimation = false;
var allDropAnimation = false;
var endGame = false;
var removeRowList = new Array();
var rowRemoveCount = 0;
var rowRemoveMax = 5;
var shapeUpdateInProgress = false;
var pauseGameFlag = false;
var gameState = 0;

var angl = 0;
var angleTicksMax = 2;
var angleTicks = 0;

var scoreMax = 9999999999;
var score=0;
var level=0;
var highScore1=0;
var highScore2=0;
var highScore3=0;

var headImg = new Image();

var showBigGrowTextAimFlag = false;
var showBigGrowTextFlag = false;
var showBigGrowMsg = "";
var showBigGrowTicks = 0;

var rowFlashAnimFlag = false;
var rowFlashTicks = 0;

//time delays
var shapeUpdateDelay = 1500; //ms
var shapeUpdateLast = 0;

var splashUpdateDelay = 150; //ms
var splashUpdateLast = 0;

var bigGrowTextAnimDelay = 100;
var bigGrowTextAnimLast = 0;

var rowFlashAnimDelay = 2;
var rowFlashAnimLast = 0;


ShapeStateEnum = {
    ADD : 0,
    CLEAR : 1,
    BRICK : 2,
    MOVE_DOWN : 3,
    MOVE_LEFT : 4,
    MOVE_RIGHT : 5,
    ROTATE: 6,
    NONE: 7
};


MoveStateEnum = {
    OUT_OF_COLS : 0,
    OUT_OF_ROWS : 1,
    CAN_MOVE : 2,
    CANNOT_MOVE : 3
};

/*========================== SHAPES ==================================*/
var oShape = new Object();
oShape.pat = new Array(); 
oShape.pat[0] =  [[1,1],
                  [1,1]];
oShape.currPat = 0;
oShape.pivotRow = 0;
oShape.pivotCol = 0;
oShape.isFalling = true;
oShape.row = 0;
oShape.col = 0;

var z1Shape = new Object();
z1Shape.pat = new Array(); 
z1Shape.pat[0] =  [[2,1,0],
              [0,1,1]];
z1Shape.pat[1] = [[0,1],
               [2,1],
               [1,0]];
z1Shape.currPat = 0;
z1Shape.pivotRow = 0;
z1Shape.pivotCol = 0;
z1Shape.isFalling = true;
z1Shape.row = 0;
z1Shape.col = 0;


var z2Shape = new Object();
z2Shape.pat = new Array(); 
z2Shape.pat[0] = [[0,1,1],
                  [1,1,0]];
z2Shape.pat[1] = [[1,0],
                  [1,1],
                  [0,1]];
z2Shape.currPat = 0;
z2Shape.pivotRow = 0;
z2Shape.pivotCol = 0;
z2Shape.isFalling = true;
z2Shape.row = 0;
z2Shape.col = 0;


var l2Shape = new Object();
l2Shape.pat = new Array(); 
l2Shape.pat[0] = [[0,1],
                  [0,1],
                  [1,1]];

l2Shape.pat[1] = [[1,1,1],
                  [0,0,1]];
                  
l2Shape.pat[2] = [[1,1],
                  [1,0],
                  [1,0]];

l2Shape.pat[3] = [[1,0,0],
                  [1,1,1]];

l2Shape.currPat = 0;
l2Shape.pivotRow = 0;
l2Shape.pivotCol = 0;
l2Shape.isFalling = true;
l2Shape.row = 0;
l2Shape.col = 0;


var l1Shape = new Object();
l1Shape.pat = new Array(); 
l1Shape.pat[0] = [[1,0],
                  [1,0],
                  [1,1]];

l1Shape.pat[1] = [[0,0,1],
                  [1,1,1]];
                  
l1Shape.pat[2] = [[1,1],
                  [0,1],
                  [0,1]];

l1Shape.pat[3] = [[1,1,1],
                  [1,0,0]];

l1Shape.currPat = 0;
l1Shape.pivotRow = 0;
l1Shape.pivotCol = 0;
l1Shape.isFalling = true;
l1Shape.row = 0;
l1Shape.col = 0;


var iShape = new Object();
iShape.pat = new Array(); 
iShape.pat[0] =  [[2,1,1,1]];
iShape.pat[1] = [[2],
                 [1],
                 [1],
                 [1]];
iShape.currPat = 0;
iShape.pivotRow = 0;
iShape.pivotCol = 0;
iShape.isFalling = true;
iShape.row = 0;
iShape.col = 0;


var tShape = new Object();
tShape.pat = new Array(); 
tShape.pat[0] =  [[1,1,1],
                  [0,1,0]];
tShape.pat[1] = [[1,0],
                 [1,1],
                 [1,0]];
tShape.pat[2] = [[0,1,0],
                 [1,1,1]];
tShape.pat[3] = [[0,1],
                 [1,1],
                 [0,1]];
tShape.currPat = 0;
tShape.pivotRow = 0;
tShape.pivotCol = 0;
tShape.isFalling = true;
tShape.row = 0;
tShape.col = 0;



var x1Shape = new Object();
x1Shape.pat = new Array(); 
x1Shape.pat[0] =  [[1]];
x1Shape.currPat = 0;
x1Shape.pivotRow = 0;
x1Shape.pivotCol = 0;
x1Shape.isFalling = true;
x1Shape.row = 0;
x1Shape.col = 0;


var x2Shape = new Object();
x2Shape.pat = new Array(); 
x2Shape.pat[0] =  [[1,1]];
x2Shape.pat[1] =  [[1],
                   [1]];
x2Shape.currPat = 0;
x2Shape.pivotRow = 0;
x2Shape.pivotCol = 0;
x2Shape.isFalling = true;
x2Shape.row = 0;
x2Shape.col = 0;


var x3Shape = new Object();
x3Shape.pat = new Array(); 
x3Shape.pat[0] =  [[1,1,1]];
x3Shape.pat[1] =  [[1],
                   [1],
                   [1]];
x3Shape.currPat = 0;
x3Shape.pivotRow = 0;
x3Shape.pivotCol = 0;
x3Shape.isFalling = true;
x3Shape.row = 0;
x3Shape.col = 0;


var x4Shape = new Object();
x4Shape.pat = new Array(); 
x4Shape.pat[0] =  [[1,0],
                   [1,1]];
x4Shape.pat[1] =  [[0,1],
                   [1,1]];

x4Shape.pat[2] =  [[1,1],
                   [0,1]];
x4Shape.pat[3] =  [[1,1],
                   [1,0]];
x4Shape.currPat = 0;
x4Shape.pivotRow = 0;
x4Shape.pivotCol = 0;
x4Shape.isFalling = true;
x4Shape.row = 0;
x4Shape.col = 0;


var x5Shape = new Object();
x5Shape.pat = new Array(); 
x5Shape.pat[0] =  [[0,1,0],
                   [1,1,1],
                    [0,1,0]];
x5Shape.currPat = 0;
x5Shape.pivotRow = 0;
x5Shape.pivotCol = 0;
x5Shape.isFalling = true;
x5Shape.row = 0;
x5Shape.col = 0;


var x6Shape = new Object();
x6Shape.pat = new Array(); 
x6Shape.pat[0] =  [[1,0,1],
                   [1,1,1]];
x6Shape.pat[1] =  [[1,1],
                   [0,1],
                   [1,1]];
x6Shape.pat[2] =  [[1,1,1],
                   [1,0,1]];
x6Shape.pat[3] =  [[1,1],
                   [1,0],
                   [1,1]];
x6Shape.currPat = 0;
x6Shape.pivotRow = 0;
x6Shape.pivotCol = 0;
x6Shape.isFalling = true;
x6Shape.row = 0;
x6Shape.col = 0;


/*========================== INITIALIZE STUFF ==================================*/

function init()
{
	if(!(!!document.createElement('canvas').getContext)){
				var wrapper = document.getElementById("canvasWrapper");
				wrapper.innerHTML = "Your browser does not support " +
				"the HTML5 Canvas element";
				return;
	}
 
	//get a reference to the canvas element
	canvas = document.getElementById("stage");
  ctx=canvas.getContext("2d");
  headImg.src = "headImg.png";
  headImg.onload = function() {
    gameInit();
      window.addEventListener('keydown',doKeyDown,true);

    canvas.onmousemove = mouseMoveHandler;
    canvas.onmousedown = mouseClickHandler;

    //setInterval(tick,1000 / 25);
       
    (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }());
 
 
    (function animloop(){
      requestAnimationFrame(animloop);
      tick();
    })();
    
  };
  
}

var lastTime = 0;
function calculateFps()
{
    var now = (+new Date);
    var timeDiff = (now - lastTime); //infinity is not cool
    if(timeDiff !== 0){
        fps = 1000 / (now - lastTime);
    }
    else{
        fps = 60;//max FPS lets say...
    }
    lastTime = now;
    return fps;
}   


function canUpdate(maxUpdateDelay, lastUpdate)
{
    var now = (+new Date);
    var timeDiff = (now - lastUpdate);
    if(timeDiff > maxUpdateDelay){
        return true;
    }
    return false;
}

function gameInit()
{
    gameState = 0;
    levelCount = 1;
    endGame = false;
    nextShape = null;
    loadTopScores();
    gridArea = createGrid(gridRows, gridCols);
    shapeTicks = 36;
    currShapeTickCount  = shapeTicks - 1;
    rowRemoveCount  = 0;
    level = 1;
    spawnNewShape();
    createButtons();   
}

function gameReset()
{
  currShape = null;
  nextShape = null;
  shapeTicks = 36;
  levelCount = 0;
  rowClearTicks = 1;
  rowMoveTicks = 2;
  currShapeTickCount  = shapeTicks - 1;
  rowRemoveAnimation = false;
  allDropAnimation = false;
  endGame = false;
  rowRemoveCount = 0;
  rowRemoveMax = 5;
  shapeUpdateInProgress = false;
  pauseGameFlag = false;
  gameState = 0;
  angl = 0;
  angleTicksMax = 2;
  angleTicks = 0;
  score=0;
  level=1;

  showBigGrowTextAimFlag = false;
  showBigGrowMsg = "";
  showBigGrowTicks = 0;
  showBigGrowTextFlag = false;

  rowFlashAnimFlag = false;
  rowFlashTicks = 0;

  //time delays
 shapeUpdateLast = 0;
 splashUpdateLast = 0;
 bigGrowTextAnimLast = 0;
 rowFlashAnimLast = 0;

   loadTopScores();

  for(i=0; i<gridRows; i++){
    removeRowList[i] = false;
    for(j=0; j<gridCols; j++){
      gridArea[i][j].isBricked = false;
      gridArea[i][j].isOccupied = false;
    }
  }
}


function startGame()
{
  spawnNewShape();
  drawGrid(gridArea, gridWidth, gridHeight, gridX, gridY, gridRows,gridCols);  
}

/*========================== INTERFACE STUFF ==================================*/

function doKeyDown(evt){

   if(rowFlashAnimFlag === true) return;

   resetButtons();

  switch (evt.keyCode) {
    case 87:  /* W was pressed */ 
    case 38:  /* Up arrow was pressed */      
      if(endGame || pauseGameFlag) return;
      updateShape(ShapeStateEnum.ROTATE);
      redraw(ShapeStateEnum.ROTATE);
      break;
    case 83:  /* S was pressed */ 
    case 40:  /* Down arrow was pressed */
      if(endGame || pauseGameFlag) return;
      updateShape(ShapeStateEnum.MOVE_DOWN);
      redraw(ShapeStateEnum.MOVE_DOWN);
      break;
    case 65:  /* A was pressed */ 
    case 37:  /* Left arrow was pressed */
      if(endGame || pauseGameFlag) return;
      updateShape(ShapeStateEnum.MOVE_LEFT);
      redraw(ShapeStateEnum.MOVE_LEFT);
      break;
    case 68:  /* D was pressed */ 
    case 39:  /* Right arrow was pressed */
      if(endGame || pauseGameFlag) return;
      updateShape(ShapeStateEnum.MOVE_RIGHT);
      redraw(ShapeStateEnum.MOVE_RIGHT);
      break;
    default:
      break;
  }
}

        
/*========================== MAIN GAME STUFF ==================================*/

//function called by the Tick instance at a set interval
function tick()
{
    if(endGame) return;
        
    var currFps = calculateFps();
    var angleTicksMaxUpdate = Math.ceil(currFps * (angleTicksMax / 25)); //update relative to 25 frames  

    if(gameState === 0){
      angleTicks++;
      if(canUpdate(splashUpdateDelay, splashUpdateLast)){
            splashUpdateLast = (+ new Date);
            angl = angl + 10;
            angleTicks = 0;
            if(angl > 360){
              angl = 0;
            }
            drawSplashScreen();
            displayButtons();            
       }
        return;
    }
    
    if(pauseGameFlag){
      return;
    } 

    if(shapeUpdateInProgress === true){
      return;
    }

    if(rowFlashAnimFlag === true){
      updateGrid();
      return;
    }

    if(rowRemoveAnimation === true){
        removeRowElementFromGrid(removeRowList, 2);
        updateGrid();
        return;
    }

    if(allDropAnimation === true){
        dropBricksToFill(removeRowList);
        updateGrid();      
        return;
    }
    
    
    if(showBigGrowTextAimFlag === true){     
                if(canUpdate(bigGrowTextAnimDelay, bigGrowTextAnimLast)){
                    updateGrid();      
                }
                return;
    }

    var shapeTicksMaxUpdate = Math.ceil(currFps * (shapeTicks / 25)); //update relative to 25 frames
       
    currShapeTickCount++;
    if(canUpdate(shapeUpdateDelay, shapeUpdateLast)){
        currShapeTickCount = 0;
        shapeUpdateLast = (+ new Date);
        updateState(ShapeStateEnum.MOVE_DOWN);
        redraw(ShapeStateEnum.MOVE_DOWN);
       }
    /*else if(showBigGrowTextAimFlag === true){

      if(canUpdate(bigGrowTextAnimDelay, bigGrowTextAnimLast)){
        updateGrid();      
        return;
      }
    }*/

    removeRowList = isAnyLineComplete(gridArea, gridRows, gridCols);

    if(frstRowContainsBrick() === true){
      endGame = true;
      gameState = 3;
      drawGrayOut();
      grayOutMessageBox("GAME OVER", "Your score is: " + score);
      displayButtons();

    }
}

function updateState(aShapeAction)
{
  updateShape(aShapeAction);  
}

function updateShape(shapeAction)
{
    shapeUpdateInProgress = true;

   if(prevShape !== null && currShape !== null){
        copyShape(currShape, prevShape);
          
        if(shapeAction === ShapeStateEnum.MOVE_DOWN){
           currShape.row += 1;
        }
        else if (shapeAction === ShapeStateEnum.MOVE_LEFT){
            currShape.col -= 1;
            if(currShape.col < 0){
                currShape.col += 1;
            }
        }
        else if (shapeAction === ShapeStateEnum.MOVE_RIGHT){
            currShape.col += 1;
            if(currShape.col + currShape.pat[currShape.currPat][0].length > gridCols){
               currShape.col -= 1;
            }
        }
        else if (shapeAction === ShapeStateEnum.ROTATE){
            var lenPat = currShape.pat.length;
            currShape.currPat = ((currShape.currPat + 1) % lenPat);
            //if after rotate any part goes out, adjust
            if(currShape.col + currShape.pat[currShape.currPat][0].length > gridCols){
                currShape.col = gridCols - currShape.pat[currShape.currPat][0].length;
            }

            if(currShape.row + currShape.pat[currShape.currPat].length > gridRows){
                currShape.row  = gridRows - currShape.pat[currShape.currPat].length;
            }

            if(currShape.col < 0){
                currShape.col = 0;
            }
        }
   } 
   else{
     spawnNewShape();
   }
}

function redraw(aShapeAction)
{
    var shapeMoveCheck = canShapeMove(currShape, aShapeAction);
    if(shapeMoveCheck === MoveStateEnum.CAN_MOVE){
        setShapeState(prevShape, prevShape.row ,prevShape.col, ShapeStateEnum.CLEAR);
        setShapeState(currShape, currShape.row ,currShape.col, ShapeStateEnum.ADD);   
    }
    else if(shapeMoveCheck === MoveStateEnum.OUT_OF_ROWS){
        setShapeState(prevShape, prevShape.row ,prevShape.col, ShapeStateEnum.BRICK);
        currShape = null;
        spawnNewShape();
        setShapeState(currShape, currShape.row ,currShape.col, ShapeStateEnum.ADD); 
    }
    else if(shapeMoveCheck === MoveStateEnum.OUT_OF_COLS){
      setShapeState(prevShape, prevShape.row ,prevShape.col, ShapeStateEnum.CLEAR);
      setShapeState(prevShape, prevShape.row ,prevShape.col, ShapeStateEnum.ADD);
    }
    else if(shapeMoveCheck === MoveStateEnum.CANNOT_MOVE){
      copyShape(prevShape,currShape);
      setShapeState(prevShape, prevShape.row ,prevShape.col, ShapeStateEnum.CLEAR);
      setShapeState(prevShape, prevShape.row ,prevShape.col, ShapeStateEnum.ADD);
    }
      shapeUpdateInProgress = false;

     updateGrid();
}

function updateGrid()
{
   ctx.clearRect(0,0, canvas.width, canvas.height); // clear canvas
   drawGrid(gridArea, gridWidth, gridHeight, gridX, gridY, gridRows, gridCols);
   displayButtons();
   drawhud();

     if(rowFlashAnimFlag === true){
      if(canUpdate(rowFlashAnimDelay, rowFlashAnimLast)){
        rowFlashAnimLast = (+ new Date);
        doRowFlashAnimation(removeRowList);
      }
    }
    
     if(showBigGrowTextAimFlag === true){
          showBigGrowMsg = "Level Up!";
          //if(canUpdate(bigGrowTextAnimDelay, bigGrowTextAnimLast)){
              bigGrowTextAnimLast = (+ new Date);
              showBigGrowTicks++;
          //}
          bigGrowText(showBigGrowMsg);
    }
}

/*========================== SHAPE STUFF ==================================*/

function getRandomShape()
{
    var randShape = 0;

    if(level < 3){
      randShape = Math.floor(Math.random() * (7));
    }
    else{
      randShape = Math.floor(Math.random() * (13));
    }

    var randShapeColor = Math.floor(Math.random() * (7));

    if(randShape === 0 ){
        z1Shape.colorStyle = randShapeColor;
        return z1Shape;
    }
    else if(randShape === 1){
        iShape.colorStyle = randShapeColor;
        return iShape;
    }
    else if(randShape === 2){
        tShape.colorStyle = randShapeColor;
        return tShape;
    }
    else if(randShape === 3){
        z2Shape.colorStyle = randShapeColor;
        return z2Shape;
    }
    else if(randShape === 4){
        l1Shape.colorStyle = randShapeColor;
        return l1Shape;
    }
    else if(randShape === 5){
        l2Shape.colorStyle = randShapeColor;
        return l2Shape;
    }
    else if(randShape === 6){
        oShape.colorStyle = randShapeColor;
        return oShape;
    }
    else if(randShape === 7){
        x1Shape.colorStyle = randShapeColor;
        return x1Shape;
    } 
    else if(randShape === 8){
        x2Shape.colorStyle = randShapeColor;
        return x2Shape;
    }
    else if(randShape === 9){
        x3Shape.colorStyle = randShapeColor;
        return x3Shape;
    }  
    else if(randShape === 10){
        x4Shape.colorStyle = randShapeColor;
        return x4Shape;
    } 
    else if(randShape === 11){
        x5Shape.colorStyle = randShapeColor;
        return x5Shape;
    }
    else if(randShape === 12){
        x6Shape.colorStyle = randShapeColor;
        return x6Shape;
    }  
    else{
        z1Shape.colorStyle = randShapeColor;
        return z1Shape;
    }
}

function spawnNewShape()
{
    if(nextShape === null){
      nextShape = getRandomShape();
    }
     currShape = nextShape;
     nextShape = getRandomShape();
     currShape.row = 0;
     randGridCol = Math.floor(Math.random() * (gridCols - currShape.pat[currShape.currPat][0].length));
     currShape.col = randGridCol;
     copyShape(currShape, prevShape);
}

function copyShape(aSrcShape, aTargetShape)
{
    aTargetShape.currPat = aSrcShape.currPat;
    aTargetShape.pat = aSrcShape.pat;
    aTargetShape.colorStyle = aSrcShape.colorStyle;
    aTargetShape.pivotRow = aSrcShape.pivotRow;
    aTargetShape.pivotCol = aSrcShape.pivotCol;  
    aTargetShape.isFalling = aSrcShape.isFalling;  
    aTargetShape.row = aSrcShape.row;
    aTargetShape.col = aSrcShape.col;   
}

function rotateCurrentShape()
{
    var lenPat = currShape.pat.length;
    currShape.currPat = (currShape.currPat + 1) % lenPat;
}


function canShapeMove(aShape, aShapeAction)
{
    if(aShape === null) return MoveStateEnum.CANNOT_MOVE;
    
    aGridCellRow = aShape.row;
    aGridCellCol = aShape.col;

    var currentShapePattern = aShape.pat[aShape.currPat];
    
    for(var i=0; i<currentShapePattern.length; i++){
        var entry = currentShapePattern[i];
        for(var j=0; j<entry.length; j++){
            if(currentShapePattern[i][j] > 0){
                gridPosRow = aGridCellRow + (i - aShape.pivotRow);
                gridPosCol = aGridCellCol + (j - aShape.pivotCol);
                if(gridPosRow < 0 ||  gridPosRow >= gridRows){
                    return MoveStateEnum.OUT_OF_ROWS;
                } 
                if (gridPosCol < 0 || gridPosCol >= gridCols){
                    return MoveStateEnum.OUT_OF_COLS;
                }
                if(gridArea[gridPosRow][gridPosCol].isBricked === true){
                    if(aShapeAction === ShapeStateEnum.MOVE_DOWN){
                        return MoveStateEnum.OUT_OF_ROWS;
                    }
                    else{
                        return MoveStateEnum.CANNOT_MOVE;   
                    }
                }
            }
        }
    }
    return MoveStateEnum.CAN_MOVE;
}


function setShapeState(aShape, aGridCellRow, aGridCellCol, sState)
{
    if(aShape === null) return;

    var currentShapePattern = aShape.pat[aShape.currPat];
    for(var i=0; i<currentShapePattern.length; i++){
        var entry = currentShapePattern[i];
        for(var j=0; j<entry.length; j++){
            if(currentShapePattern[i][j] > 0){
                gridPosRow = aGridCellRow + (i - aShape.pivotRow);
                gridPosCol = aGridCellCol + (j - aShape.pivotCol);
                if(gridPosRow >= 0 &&  gridPosRow < gridRows && 
                    gridPosCol >=0 && gridPosCol < gridCols){
                    if(sState === ShapeStateEnum.BRICK){
                        gridArea[gridPosRow][gridPosCol].isBricked = true;
                        gridArea[gridPosRow][gridPosCol].colorStyle = aShape.colorStyle;
                    }
                    else if(sState === ShapeStateEnum.ADD){
                        gridArea[gridPosRow][gridPosCol].isOccupied = true;
                        gridArea[gridPosRow][gridPosCol].colorStyle = aShape.colorStyle;
                    }
                    else if(sState === ShapeStateEnum.CLEAR){
                        gridArea[gridPosRow][gridPosCol].isOccupied = false;
                        gridArea[gridPosRow][gridPosCol].colorStyle = -1;
                    }
                }
            }
        }
    }
}


/*========================== GRID STUFF ==================================*/

function isAnyLineComplete(aGridArea, aRows, aCols)
{
    var rowList = new Array();
    var filledRowCount = 0;
    var colFillCount = 0;
    for(i=0; i<aRows; i++){
      colFillCount = 0;
       for(j=0; j<aCols; j++){
            if(aGridArea[i][j].isBricked === true){
                colFillCount++;
            }
       }
       if(colFillCount === gridCols){
           
            rowRemoveCount++;
            if(rowRemoveCount >= rowRemoveMax){
                rowRemoveCount = 0;
                level++;
                // showBigGrowTextAimFlag = true;
                showBigGrowTextFlag = true;
                shapeUpdateDelay = shapeUpdateDelay - 100;
                if(shapeUpdateDelay < 100){
                  shapeUpdateDelay = 100;
                }
            }
            rowList[i] = true;
            rowFlashAnimFlag = true;
            filledRowCount++;
            //showBigGrowTextFlag = true;
            //rowRemoveAnimation = true;
            //showBigGrowTextAimFlag = true;
       }
       else{
            rowList[i] = false;
       }
    }

    if(filledRowCount === 1){
       score = score + 250;
    }
    else if(filledRowCount === 2){
      score = score + 250 + 500;
    }
    else if(filledRowCount === 3){
      score = score + 250 + 1000;
    }
    else if(filledRowCount === 4){
      score = score + 250 + 2000;
    }

    return rowList;
}

function removeRowElementFromGrid(aRowList, aNumElements)
{
    for(i=0; i<aRowList.length; i++){
        if(aRowList[i] === true){
            var colCount = 0;
            for(j=0; j<gridCols; j++){
                if(gridArea[i][j].isBricked === true){
                    colCount++;
                    gridArea[i][j].isOccupied = false;
                    gridArea[i][j].isBricked = false;
                    if(colCount >= aNumElements) break;
                }
            }
            if(colCount === 0){
                rowRemoveAnimation = false;
                allDropAnimation = true;
                break;
            }
        }
    }
}


function doRowFlashAnimation(aRowList)
{
  if(rowFlashAnimFlag === false) return;

  var rowFlashTicksMax = 3;
  rowFlashTicks++;
  if(rowFlashTicks > rowFlashTicksMax){
    rowFlashAnimFlag = false;
    rowFlashTicks = 0;
    rowRemoveAnimation = true;
    tick();
    return;
  }

var cellWidth = gridWidth / gridCols;
var cellHeight = gridHeight / gridRows;

  for(i=0; i<aRowList.length; i++){
    if(aRowList[i] === true){
      for(j=0;j<gridCols; j++){
        var posX = gridX;
        var posY = gridY + (cellHeight * i);
        ctx.fillStyle = "rgba(200,200,200," + rowFlashTicks / 20 + ")";
        ctx.fillRect(posX, posY, cellWidth * gridCols, cellHeight);
      }
    }
  }
}


function frstRowContainsBrick()
{
  for(j=0;j<gridCols;j++){
    if(gridArea[0][j].isBricked === true){
      return true;
    }
  }

  return false;
}

function dropBricksToFill(aRowList)
{
    for(i=aRowList.length-1; i > 0; i--){
        if(aRowList[i] === true && i !== 0){
            var topFillRow = -1;
            for(k=i;k>=0;k--){
                if(aRowList[k] === false){
                    topFillRow = k;
                    break;
                }
            }

            if(topFillRow >= 0){
                for(j=0; j<gridCols; j++){
                    if(gridArea[topFillRow][j].isBricked === true){
                        gridArea[i][j].isBricked = gridArea[topFillRow][j].isBricked;
                        gridArea[topFillRow][j].isBricked = false;
                        gridArea[i][j].isOccupied = gridArea[topFillRow][j].isOccupied;
                        gridArea[topFillRow][j].isOccupied = false;

                        gridArea[i][j].colorStyle = gridArea[topFillRow][j].colorStyle;
                        gridArea[topFillRow][j].colorStyle = -1;
                    }
                }
                aRowList[i] = false;
                aRowList[topFillRow] = true; 
            }
        }
    }
    allDropAnimation = false;
    
    if(showBigGrowTextFlag){
        showBigGrowTextFlag = false;
        showBigGrowTextAimFlag = true;
    }
}


function createGridCell()
{
    var gridCell = new Object();
    gridCell.isOccupied = false;
    gridCell.isBricked = false;
    gridCell.colorStyle = -1;
    gridCell.block = null;
    return gridCell;
}

function createGrid(aRows, aCols)
{
    var grid = new Array(aRows);  
    for (i = 0; i < aRows; i++) {  
      grid[i] = new Array(aCols);  
      for (j = 0; j < aCols; j++) {  
        grid[i][j] = createGridCell();  
      }  
    } 
    return grid;
}

function getRandomNumber(start, end)
{
  return (Math.floor((Math.random() * (end-start))) + start);
}


function drawShape(aShape, x,y, aWidth, aHeight, aColor)
{
  if(aShape === null) return;

   var currentShapePattern = aShape.pat[0];
    var currx = x;
    var curry = y;
    for(var i=0; i<currentShapePattern.length; i++){
        var entry = currentShapePattern[i];
        for(var j=0; j<entry.length; j++){
            if(currentShapePattern[i][j] > 0){
              drawBrick(currx, curry, aWidth, aHeight,aColor);
            }
            //advance rect dim
            currx = currx + aWidth;
        }
        currx = x;
        curry = curry + aHeight;
      }
}

function drawShapeBrick(x, y, aWidth, aHeight, aColorStyle)
{
    doShadowOn("rgba(0,0,0,0.5)");
    
    var radgrad4 = ctx.createLinearGradient(x+1,y+1,x+aWidth,y+aHeight);

    if(aColorStyle === 0){
      radgrad4.addColorStop(0, 'rgba(228,125,125,1)');
      radgrad4.addColorStop(0.75, 'rgba(118,20,20,1)');
      radgrad4.addColorStop(1, 'rgba(118,15,15,0.8)');
    }
    else if(aColorStyle === 1){
      radgrad4.addColorStop(0, 'rgba(125,228,125,1)');
      radgrad4.addColorStop(0.75, 'rgba(25,128,25,1)');
      radgrad4.addColorStop(1, 'rgba(25,128,25,0.8)');
    }
    else if(aColorStyle === 2){
      radgrad4.addColorStop(0, 'rgba(125,125,228,1)');
      radgrad4.addColorStop(0.75, 'rgba(45,45,148,1)');
      radgrad4.addColorStop(1, 'rgba(45,45,148,0.8)');
    }
    else if(aColorStyle === 3){
      radgrad4.addColorStop(0, 'rgba(228,125,125,1)');
      radgrad4.addColorStop(0.75, 'rgba(128,25,25,1)');
      radgrad4.addColorStop(1, 'rgba(128,25,25,0.8)');
    }
    else if(aColorStyle === 4){
      radgrad4.addColorStop(0, 'rgba(125,228,228,1)');
      radgrad4.addColorStop(0.75, 'rgba(28,125,125,1)');
      radgrad4.addColorStop(1, 'rgba(28,125,125,0.8)');
    }
    else if(aColorStyle === 5){
      radgrad4.addColorStop(0, '#dfd43e');
      radgrad4.addColorStop(0.75, 'rgba(130,125,28,1)');
      radgrad4.addColorStop(1, 'rgba(130,125,28,0.8)');
    }
    else if(aColorStyle === 6){
      radgrad4.addColorStop(0, 'rgba(230,125,230,1)');
      radgrad4.addColorStop(0.75, 'rgba(125,28,125,1)');
      radgrad4.addColorStop(1, 'rgba(125,28,125,0.8)');
    }
    else{
      radgrad4.addColorStop(0, 'rgba(200,200,125,1)');
      radgrad4.addColorStop(0.75, 'rgba(128,125,125,1)');
      radgrad4.addColorStop(1, 'rgba(128,125,125,0.8)');
    }
    
   ctx.lineWidth = 0.5;
    ctx.fillStyle=radgrad4;
    ctx.fillRect(x,y,aWidth, aWidth);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle="#220000";
    ctx.strokeRect(x,y,aWidth, aWidth);
    
    doShadowOff();
}


function drawBrick(x, y, aWidth, aHeight, aColor)
{
    ctx.fillStyle=aColor;
    ctx.fillRect(x,y,aWidth, aWidth);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle="#114411";
    ctx.strokeRect(x,y,aWidth, aWidth);
    ctx.lineWidth = 1; 
}


function  drawGrid( aGrid,  aWidth, aHeight,  x,  y,  aRows,  aCols)
{
        var cellWidth = aWidth / aCols;
        var cellHeight = aHeight / aRows;
        
        gridCellWidth = cellWidth;
        gridCellHeight = cellHeight;

        gridX = x;
        gridY = y;
        
        ctx.fillStyle="#888899";
        ctx.fillRect(gridX-4,gridY-4,gridWidth+8, gridHeight+10);

        ctx.fillStyle="#222222";
        ctx.fillRect(gridX,gridY,gridWidth, gridHeight+4);

        for(i=0; i<aRows; i++){
            for(j=0; j<aCols; j++){
                var posX = x + (cellWidth  * j);
                var posY = y + (cellHeight * i);
         
                ctx.lineWidth = 0.5;
                ctx.strokeStyle="#333333";
                ctx.strokeRect(posX,posY,cellWidth, cellHeight);
              }
        }
       
        for(i=0; i<aRows; i++){
            for(j=0; j<aCols; j++){
                posX = x + (cellWidth  * j);
                posY = y + (cellHeight * i);
                
                    
                if(gridArea[i][j].isBricked === true){
                    drawShapeBrick(posX,posY,cellWidth, cellHeight, gridArea[i][j].colorStyle);
                }
                else if(gridArea[i][j].isOccupied === true){
                    drawShapeBrick(posX,posY,cellWidth, cellHeight, gridArea[i][j].colorStyle);
                }
            }
        }
        
        roundedStrokeRect(gridX-8,gridY-8,gridWidth+16, gridHeight+20, 20, "#555555", 12, true, true, 'rgba(170,170,170,1)', 'rgba(85,85,85,1)');
        
        ctx.save();
        ctx.scale(0.6,0.6);
        ctx.drawImage(headImg, 314, 4);
        ctx.scale(1,1);
        ctx.restore();

       
}


function drawhud()
{
  labelStyle2(5,80,125,30,"Level","rgba(250,250,250,1)",level, "rgba(0,0,0,1)", false);
  labelStyle2(5,170,125,30,"Score","rgba(250,250,250,1)",score, "rgba(0,0,0,1)", false);
  labelStyle2(535,80,125,100,"Next","rgba(250,250,250,1)","", "rgba(0,0,0,1)", true);
  displayTopScores();
  drawShape(nextShape, 535+30,80+20, 20, 20, "#aaaaaa");
}

//------------------------- Text Stuff -----------------------------

//Write a text string to canvas
function displayText(x, y, msg, aFont, aColor, aShadowOn, aStrokeOn, aTextAlign)
{
           if(aShadowOn){
               doShadowOn("rgba(0,0,0,0.5)");
            }
            else{
              doShadowOff();
            }
            ctx.font = aFont;
            ctx.fillStyle = aColor; // text color
            ctx.textAlign = aTextAlign;
            ctx.fillText(msg, x, y);
            if(aStrokeOn){
                 ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(228,228,245,1)";
                ctx.strokeText(msg, x, y);
            }
          doShadowOff();
}



function roundedRect(x,y,w,h,r, aColor, aLineWidth, doShadow, doGrad, aGradCol1, aGradCol2) {
    if (typeof r === "undefined") {
        r = 5;
    }

    if(doShadow) doShadowOn("rgba(130,130,130,0.5)");
        
    ctx.beginPath();

    var grad = ctx.createLinearGradient(x+(w/2),y,x+(w/2),y+h);
    grad.addColorStop(0, aGradCol1);
    grad.addColorStop(1, aGradCol2);

    if(doGrad){
      ctx.fillStyle = grad;
    }
    else{
      ctx.fillStyle = aColor;  
    }
    
    ctx.lineWidth = aLineWidth;
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 0.5;
}


function doShadowOn(aColor)
{
    ctx.shadowBlur=8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowColor=aColor;
}


function doShadowOff()
{
  ctx.shadowBlur=0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor="rgba(0,0,0,0)";
}

function roundedStrokeRect(x,y,w,h,r, aColor, aLineWidth, doShadow, doGrad, aGradCol1, aGradCol2) {
    if (typeof r === "undefined") {
        r = 5;
    }
    
    if(doShadow){
      doShadowOn("rgba(130,130,130,0.5)");
    }
  
    var grad = ctx.createLinearGradient(x,y,x+w,y+h);
    grad.addColorStop(0, aGradCol1);
    grad.addColorStop(1, aGradCol2);
                
    ctx.beginPath();

    if(doGrad){
      ctx.strokeStyle = grad;
    }
    else{
      ctx.strokeStyle = aColor; 
    }
    ctx.lineWidth = aLineWidth;
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 0.5;

    doShadowOff();
}

//5,80,125,80
function labelStyle1(x,y,w,h, aColor, htext, htextColor)
{
  ctx.strokeStyle = aColor;
  ctx.strokeRect(x,y, w, h);
  ctx.fillStyle = aColor;
  ctx.fillRect(x,y, w, 20);
  displayText(x+2, y+18-2, htext, "Bold 18px Arial", htextColor, false, false, "start");
}


function textLabel(x,y,w,h, aLabelColor, aText, aTextColor, aTextHt, doBold)
{
  var metrics = ctx.measureText(aText);
  var width = metrics.width;
  var theight = aTextHt;
  var averageCharWidth = width / aText.length;
  var padding = 5; //pixels
  var charsToWrap = Math.floor((w-10) / Math.ceil(averageCharWidth));
  var previousBreakCharPos = -1;
  var previousCharPosStart = 0;
  var currCharCount=0;
  var lineCount = 0;
  var doBreak = false;

  var fontStyle = "";
  if(doBold){
     fontStyle = "Bold";
  }

  if(aLabelColor !== null){
    ctx.fillStyle = aLabelColor;
    ctx.fillRect(x,y,w,h);
  }

  for(i=0; i<aText.length;i++){
      currCharCount++;
      doBreak = false;
      if(aText.charAt(i) === ' ' || aText.charAt(i) === '\n'  || aText.charAt(i) === '\r' || aText.charAt(i) === '\t'){
        previousBreakCharPos = i;
        if(aText.charAt(i) === '\n'  || aText.charAt(i) === '\r'){
          doBreak = true;
        }
      }
      if(currCharCount > charsToWrap || i === aText.length-1 || doBreak){
        var htext = aText.substring(0,i);
        if(i === aText.length-1){
          previousBreakCharPos = aText.length;
        }
        if(previousBreakCharPos > 0){
           htext = aText.substring(previousCharPosStart, previousBreakCharPos);
           previousCharPosStart = previousBreakCharPos+1;
        }
        lineCount++;

        displayText(x+5, y+(theight * lineCount), htext, fontStyle + " " +theight+"px Arial", aTextColor, false, false, "start");
        currCharCount = 0;
      }
  }
}


function labelStyle2(x,y,w,h, htext, htextColor, aContentText, aContentTextColor, doStroke)
{
  var poff = 5;
  if(!doStroke){
    roundedRect(x, y, w,h,2, "#000", 1,false, true, 'rgba(210,210,210,1)', 'rgba(85,85,85,1)');
  }
  else{
    roundedStrokeRect(x, y, w,h,2, "#000", 5,false, true, 'rgba(210,210,210,1)', 'rgba(85,85,85,1)');
  }
  displayText(x+2, y-2-poff, htext, "Bold 18px Arial", htextColor, false, false, "start");
  displayText(x+(w/2), y+(h/2)+4, aContentText, "Bold 18px Arial", aContentTextColor, false, false, "center");
}




function bigGrowText(aMsg)
{
 if(!showBigGrowTextAimFlag === true) return;
 var maxTick = 10;

  if(showBigGrowTicks > maxTick) {
    showBigGrowTicks = 0;
    showBigGrowTextAimFlag = false;
    return;
  }

  //ctx.save();
  var alpha = 1;
  if(showBigGrowTicks > 4){
    alpha = 1 - ((showBigGrowTicks) / maxTick);
  }
  var alphaf = alpha.toFixed(1);
  //console.log("alpha " + alphaf);
  //alphaf = 0.4;
  displayText(gridX+(gridWidth/2), gridY+(gridHeight/2), aMsg, "Bold 25px Arial", "rgba(250, 250, 250, "+alphaf+")", false, false, "center");
  //ctx.restore();
}

function drawGrayOut()
{
  ctx.fillStyle = "rgba(120,120,190,0.65)";
  ctx.fillRect(0,0,canvas.width, canvas.height);
}


function grayOutMessageBox(aHeading, aMessage)
{
  doShadowOn();
  var aw = canvas.width;
  var ah = canvas.height / 4 + 50;
  var grad = ctx.createLinearGradient(0, canvas.height / 2  -  ah / 2, aw, ah);
  grad.addColorStop(0, "#223");
  grad.addColorStop(0.40, "#bbb");
  grad.addColorStop(0.60, "#bbb");
  grad.addColorStop(1, "#223");

  ctx.fillStyle = grad;
  ctx.fillRect(0, canvas.height / 2  -  ah / 2, aw, ah);
  doShadowOff();

  displayText(canvas.width / 2, (canvas.height / 2  -  ah / 2) + 20 , ""+aHeading+"", "Bold 18px Arial", "#800", false, false, "center");

  var metrics = ctx.measureText(aMessage);
  var width = metrics.width;
  var labelWidth = 500;
  var leftOffset = 160;
  if(width < labelWidth){
    labelWidth = 300;
    leftOffset = 100;

  }

  textLabel(canvas.width / 2 - leftOffset, (canvas.height / 2  -  ah / 2) + 30, labelWidth ,150, null, aMessage, "#339", 14, false);
}


function mouseMoveHandler(e)
{
  var loc = WindowToCanvas(e.clientX, e.clientY);
  var butHover = checkButtonHover(buttonList, loc.x, loc.y);
  displayButtons();
}

function mouseClickHandler(e)
{
  var loc = WindowToCanvas(e.clientX, e.clientY);
  checkButtonHit(buttonList, loc.x, loc.y);
  displayButtons();  
}

function WindowToCanvas(x,y)
{
    var bbox = canvas.getBoundingClientRect();
    return {
          x: x-bbox.left * (canvas.width / bbox.width),
          y: y-bbox.top * (canvas.height / bbox.height)
    };
}

//----------- drawButton

var buttonList = new Array();

function setPause()
{
  pauseGameFlag = true;
  gameState = 2;
  drawGrayOut();
  grayOutMessageBox("GAME PAUSED", "");
}

function showHelp()
{
  pauseGameFlag = true;
  gameState = 2;
  drawGrayOut();
  grayOutMessageBox("HELP", "Move/rotate and place falling shapes to complete horizontal lines with no gaps.\nThis will clear that line and you will score points\n\nMove Left: Left Arrow / A\nMove Right: Right Arrow / D\nMove Down: Down Arrow / S\nRotate Shape:  Up Arrow / W");
}

function unsetPause()
{
  pauseGameFlag = false;
  gameState = 1;
  updateGrid();
}

function setExitGame()
{
  //alert("setEndGame");
  gameState = 4;
  pauseGameFlag = true;
  drawGrayOut();
  grayOutMessageBox("CONFIRM", "Do you want to exit the game?");
}

function startGameClick()
{
  gameState = 1;
  updateGrid();
}

function replayGame()
{
    checkAndAddScore(score);
    gameReset();
    gameState = 1;
    //gameStart();
    tick();
}

function goToSplash()
{
    checkAndAddScore(score);
    gameReset();
    tick();
}

function createButtons(){
  createButton(buttonList, canvas.width - 230,canvas.height - 150, 160,80, "Start Game", "red", "red", startGameClick,0);
  createButton(buttonList, canvas.width - 140,canvas.height - 200, 110,40, "Help", "red", "red", showHelp,1);
  createButton(buttonList, canvas.width - 140,canvas.height - 150, 110,40, "Pause", "red", "red", setPause,1);
  createButton(buttonList, canvas.width - 140,canvas.height - 100, 110,40, "Exit Game", "red", "red", setExitGame,1);
  createButton(buttonList, canvas.width / 2  - 55, canvas.height/2 + 50, 110,40, "Resume", "red", "red", unsetPause,2);
  createButton(buttonList, canvas.width / 2  - 120, canvas.height/2 + 20, 150, 40, "Play Again", "red", "red", replayGame,3); //end game
  createButton(buttonList, canvas.width / 2  + 50, canvas.height/2 + 20, 60,40, "Quit", "red", "red", goToSplash,3);
  createButton(buttonList, canvas.width / 2  - 60, canvas.height/2 + 20, 50,40, "Yes", "red", "red", goToSplash,4); //exit game
  createButton(buttonList, canvas.width / 2  + 20, canvas.height/2 + 20, 50,40, "No", "red", "red", unsetPause,4);
}

function createButton(aButtonList, x,y,w,h,aText,aColor,aTextColor, aHitFunction, aGameState)
{
  var button = new Object();
  button.x = x;
  button.y = y;
  button.w = w;
  button.h = h;
  button.text = aText;
  button.textColor = aTextColor;
  button.color = aColor;
  button.visible = true;
  button.enabled = true;
  button.state = 0;
  button.gameState = aGameState;
  button.hitFunction = aHitFunction;

  aButtonList[aButtonList.length] = button;
}

function checkButtonHit(buttonList,x,y)
{
  for(i=0; i<buttonList.length;i++){
      if(buttonList[i].enabled === true && buttonList[i].gameState === gameState){
        if(x > buttonList[i].x && x < buttonList[i].x + buttonList[i].w){
            if(y > buttonList[i].y && y < buttonList[i].y + buttonList[i].h){
                buttonList[i].state = 0;
                buttonList[i].hitFunction();
                return i;
            }
        }
      }
  }
  return -1;
}


function checkButtonHover(buttonList,x,y)
{
  var ret = -1;
  for(i=0; i<buttonList.length;i++){
      if(buttonList[i].enabled === true && buttonList[i].gameState === gameState){
        buttonList[i].state = 0;
        if(x > buttonList[i].x && x < buttonList[i].x + buttonList[i].w){
            if(y > buttonList[i].y && y < buttonList[i].y + buttonList[i].h){
                document.getElementById("canvasWrapper").style.cursor = 'pointer';
                buttonList[i].state = 1;
                ret = i;
            }
        }
      }
  }
  if(ret < 0) 
      document.getElementById("canvasWrapper").style.cursor = 'default';
  return ret;
}


function resetButtons()
{
  for(i=0; i<buttonList.length;i++){
        if(buttonList[i].enabled === true && buttonList[i].gameState === gameState){
          buttonList[i].state = 0;
      }
    }
}

function displayButtons()
{
  for(i=0; i<buttonList.length;i++){
       if(buttonList[i].enabled === true && buttonList[i].gameState === gameState){
              drawButton(buttonList[i].x, buttonList[i].y,
                   buttonList[i].w, buttonList[i].h, 
                   buttonList[i].state, buttonList[i].text, 20); 

      }
  }
}


function drawButton(x,y,w,h, aState, aText, aTextSize)
{

    var aButtonColor = "#fdd638";
    var aButtonColorHover = "#fdb02a";
    var aTextColor ="#000";
     
    var grad = ctx.createLinearGradient(x+w/2,y,x+w/2,y+h);
    if(aState === 0){
      grad.addColorStop(0, "rgba(250,250,250,0.15)");
      grad.addColorStop(0.5, "rgba(250,250,250,0.5)");
      grad.addColorStop(1, "rgba(0,0,0,0.05)");
      ctx.strokeStyle = "#ddd";
    }
    else{
      grad.addColorStop(0, "rgba(250,250,250,0.8)");
      grad.addColorStop(0.4, "rgba(250,250,250,0.05)");
      grad.addColorStop(0.9, "rgba(250,250,250,0.8)");
      grad.addColorStop(1, "rgba(0,0,0,0.05)");
       ctx.strokeStyle = "#ddd";
    } 


    if(aState ===0){
      ctx.fillStyle = aButtonColor;
      ctx.fillRect(x,y,w,h);
    }
    else{
       ctx.fillStyle = aButtonColorHover;
       ctx.fillRect(x,y,w,h);
    }

    displayText(x+w/2, y+h/2 + 4, aText, "Bold "+aTextSize+"px Arial", aTextColor, false, false, "center");

    ctx.lineWidth = 2;
    ctx.strokeRect(x,y,w,h);

    if(aState ===0){
       ctx.beginPath();
       ctx.lineWidth=3;
       ctx.strokeStyle="rgba(250,250,250,0.75)";
       ctx.moveTo(x+2, y+2);
       ctx.lineTo(x+2, y+h-2);
       ctx.lineTo(x+2, y+2);
       ctx.lineTo(x+w-2, y+2);
       ctx.stroke();
       ctx.closePath();

       ctx.beginPath();
       ctx.lineWidth=3;
       ctx.strokeStyle="rgba(2,2,2,0.75)";
       ctx.moveTo(x+w-2, y+2);
       ctx.lineTo(x+w-2, y+h-2);
       ctx.lineTo(x+2, y+h-2);
       ctx.stroke();
       ctx.closePath();
     }
     else{
         ctx.beginPath();
       ctx.lineWidth=3;
       ctx.strokeStyle="rgba(2,2,2,0.75)";
       ctx.moveTo(x+2, y+2);
       ctx.lineTo(x+2, y+h-2);
       ctx.lineTo(x+2, y+2);
       ctx.lineTo(x+w-2, y+2);
       ctx.stroke();
       ctx.closePath();

       ctx.beginPath();
       ctx.lineWidth=3;
       ctx.strokeStyle="rgba(250,250,250,0.75)";
       ctx.moveTo(x+w-2, y+2);
       ctx.lineTo(x+w-2, y+h-2);
       ctx.lineTo(x+2, y+h-2);
       ctx.stroke();
       ctx.closePath();
     }

    doShadowOff();
}


  var welcomeText1 = "How to play? \n\nMove/rotate and place random falling shapes to complete horizontal lines with no gaps.\nThis will clear that line and you will score points.\n\nDon't let the shapes stack to the top";
  
  var welcomeText2 = "Controls:\n\n Move Left:  Left Arrow / A \n Move Right:  Right Arrow / D\n Move Down:  Down Arrow / S\n Rotate Shape:  Up Arrow / W";


function drawSplashScreen(){
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  var ang = angl;
  var gcol = "#222233";
  ctx.save(); 
  ctx.translate(450,190);
  ctx.rotate((35+ang) * Math.PI / 180);
  drawShape(z1Shape, 0,0, 30,30, gcol);
  ctx.restore();

  ctx.save(); 
  ctx.translate(540,190);
  ctx.rotate((90+ang) * Math.PI / 180);
  drawShape(iShape, 0,0, 20,20, gcol);
  ctx.restore();

  ctx.save(); 
  ctx.translate(450,320);
  ctx.rotate((15+ang) * Math.PI / 180);
  drawShape(x6Shape, 0,0, 30,30, gcol);
  ctx.restore();

  ctx.save(); 
  ctx.translate(580,270);
  ctx.rotate((215+ang) * Math.PI / 180);
  drawShape(l1Shape, 0,0, 30,30, gcol);
  ctx.restore();

  ctx.save(); 
  ctx.translate(610,320);
  ctx.rotate((76+ang) * Math.PI / 180);
  drawShape(oShape, 0,0, 30, 30, gcol);
  ctx.restore();

ang = 0;

  ctx.save(); 
  ctx.translate(450,190);
  ctx.rotate((35+ang) * Math.PI / 180);
  drawShape(z1Shape, 0,0, 30,30, "#feff34");
  ctx.restore();

  ctx.save(); 
  ctx.translate(540,190);
  ctx.rotate((90+ang) * Math.PI / 180);
  drawShape(iShape, 0,0, 20,20, "#cdfe30");
  ctx.restore();

  ctx.save(); 
  ctx.translate(450,320);
  ctx.rotate((15+ang) * Math.PI / 180);
  drawShape(x6Shape, 0,0, 30,30, "#0362d0");
  ctx.restore();

  ctx.save(); 
  ctx.translate(580,270);
  ctx.rotate((215+ang) * Math.PI / 180);
  drawShape(l1Shape, 0,0, 30,30, "#23ffcc");
  ctx.restore();

  ctx.save(); 
  ctx.translate(610,320);
  ctx.rotate((76+ang) * Math.PI / 180);
  drawShape(oShape, 0,0, 30, 30, "#df0000");
  ctx.restore();

  ctx.drawImage(headImg, 94, 64);

  textLabel(20, 200, 380, 160, "rgba(56,56,76,0.5)", welcomeText1, "#f6f5cc", 17, false);
  textLabel(20, 430, 380, 110, "rgba(56,56,76,0.5)", welcomeText2, "#f6f5cc", 17, false);

  ctx.strokeStyle = "#070";
  ctx.strokeRect(0,0,canvas.width,canvas.height);
}

  function checkLocalStorage()
  {
      if (typeof(localStorage) == 'undefined'){
          return false;
      }
      return true;
  }


  function checkAndAddScore(aScore)
  {
     if(!checkLocalStorage()) return;
      
     var smallest = 0;
     var smallestKey  = 0;
     var notPresent = true;
     for(var i=0; i<localStorage.length; i++){
         var anItem = localStorage.getItem(""+i);
         if(parseInt(aScore, 10) === parseInt(anItem, 10)){
            notPresent = false;
         }
         if(i===0) {
            smallest = anItem;
            smallestKey = i;
         }
         else{
             if(parseInt(smallest, 10) > parseInt(anItem, 10)){
                smallest = anItem;
                smallestKey = i;
             }
         }
     }

     if(localStorage.length < 3 && notPresent){
        localStorage.setItem(localStorage.length, aScore);
     }
     else{
        if((parseInt(aScore, 10) > parseInt(smallest, 10)) && notPresent){
            if(localStorage.length === 3){
               localStorage.removeItem(smallestKey);
            }
            localStorage.setItem(smallestKey, aScore);
         }
     }
}

var scoreArray = new Array();
function loadTopScores()
{
  if(!checkLocalStorage()) return;
 //localStorage.clear();
    for(var i=0; i<localStorage.length; i++){
        scoreArray[i] = localStorage.getItem(""+i);
    }
    scoreArray.sort(function(a,b){return b-a;});
}

function displayTopScores()
{
   var x = 5;
   var y = 250;

    labelStyle2(5,250,125,100,"Your Best","rgba(250,250,250,1)","", "rgba(0,0,0,1)", true);

    for(i=0; i<scoreArray.length; i++){
         displayText(x+5, y+26 + (20 * i), (i+1) + ". " + scoreArray[i], "Bold 16px Arial", "rgba(250,250,250,1)", false, false, "start");
    }
}
