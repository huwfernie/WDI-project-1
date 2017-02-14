console.log('Hello Huw');




$(() => {

  const x = 6;  // x and y are the number of boxes to make
  const y = 6;  // on the board

  let xElements = null;  // these are the elements needed to make
  let yElements = null;  // the boxes
  makeBoard();

// run this on load!!
  const player1 = {name: 'Player 1', score: 0, color: '#e7e729'};
  const player2 = {name: 'Player 2', score: 0, color: '#c51414'};
  //const squares = {};
  //const players = ['Aplayer 1','Bplayer 2'];
  let playerNow = 1;
  let playerNowName = null;
  let playerNowColor = null;
  let playCount = null;
  //const playerScores = [0,0];
  const $active = $('.active');
  const $reset = $('#resetButton');
  const $topBar = $('.topBar');
  const $sideBar = $('.sideBar');
  //const $update = $('.update');
  const $middle = $('#middle');
  const $middleEdit = $('#middleEdit');
  const $right = $('#right');
  const $left = $('#left');
  let freeGo = 0;
  const $startAgain = $('#startAgain');

  const $startGame = $('#startGame');
  // change this when more than one tile.
  // const $board = $('.board'); not used any more
  const $centerpiece = $('.centerpiece');

  $centerpiece.html('4'); // get rid of this later, it puts 4's into each centerpiece

  // create an anon. function for each click on the sideBar
  // and-or top-bar
  $active.on('click', function(e) {
    //console.log(`clickeroo`);
    if (amIActive(e)) {                 // if bar is clickable : active
      changeBarClassesAfterClick(e);    // change class from active to clicked

      lowerTheClass(e); // reads the html number and lowers it!

      changePlayer();
      changeCursor();

      whoWins();
    }// end of amIActive
  });// end of $active.on(...


  // add a listener to the reset button
  $reset.on('click', function() {
    //playThis(`sounds/pen.m4a`); //play sound
    reset();
  });

  $startGame.on('click', function() {
    console.log('click start');
    let temp = $('#player1').val();
    console.log(temp);
    if (temp) {
      player1.name = temp;
    }
    temp = $('#player2').val();
    if (temp) {
      player2.name = temp;
    }
    console.log(player1);
    updatePlayerScores();
    $middle.html(`New Game - You're up `);
    $middleEdit.html(player1.name);
    $('.welcome').slideUp(700);
    $('.game').css('display', 'block');
  });

  $startAgain.on('click', function() {
    location.reload();
  });



































  // All the functions now! -------------------------------

  function amIActive(e) {
    if ($(e.target).hasClass('active')) {
      return true;
    } else {
      return false;
    }
  } // end of amIActive function

  function reset() {
    console.log(`reset button`);
    $topBar.removeClass('clicked');
    $topBar.addClass('active');
    $sideBar.removeClass('clicked');
    $sideBar.addClass('active');
    $centerpiece.html(`4`);
    $centerpiece.css('visibility', 'hidden');
    player1.score = 0;
    player2.score = 0;
    updatePlayerScores();
    playerNow = 1;
  }// end of reset function

  function changeBarClassesAfterClick(e) {
    console.log(`changeClassesAfterClick`);
    playThis(`sounds/pen.m4a`); //play sound
    $(e.target).addClass('clicked');
    $(e.target).removeClass('active');
  }



  // function that plays anything with the file path passed to is as (audio)
  function playThis(audio) {
    console.log(`audio is ${audio}`);
    audio = new Audio(audio);
    console.log(audio);
    audio.play();
  }





  function lowerTheClass(e) {
    if ( $(e.target).hasClass('topBar')  ) {
      // change html of elements with id +- xElements
      console.log(`what is my topBar ID?`);
      const temp = $(e.target).attr('id');
      console.log(`how about .. ${temp}`);

      console.log(`above`);
      const aboveMe = parseInt(temp) - xElements;
      const $aboveMe = $(`#${aboveMe}`);
      let upScore = $aboveMe.html();
      upScore--;
      $aboveMe.html(upScore);
      if (upScore === 0){
        claimSquare($aboveMe);
      }

      console.log(`below`);
      const belowMe = parseInt(temp) + xElements;
      const $belowMe = $(`#${belowMe}`);
      let downScore = $belowMe.html();
      downScore--;
      $belowMe.html(downScore);
      if (downScore === 0){
        claimSquare($belowMe);
      }
    } else {
      // change html of elements with id +- 1
      console.log(`what is my sideBar ID?`);
      const temp = $(e.target).attr('id');
      console.log(`how about .. ${temp}`);
      //
      const leftOfMe = parseInt(temp) - 1;
      const $leftOfMe = $(`#${leftOfMe}`);
      let leftScore = $leftOfMe.html();
      leftScore--;
      $leftOfMe.html(leftScore);
      if (leftScore === 0){
        claimSquare($leftOfMe);
      }
      //
      console.log(`rightOfMe`);
      const rightOfMe = parseInt(temp) + 1;
      const $rightOfMe = $(`#${rightOfMe}`);
      let rightScore = $rightOfMe.html();
      rightScore--;
      $rightOfMe.html(rightScore);
      if (rightScore === 0){
        claimSquare($rightOfMe);
      }
    }
  }

  // playerIndex = 0; // Why is this here!!!!???????

  function changePlayer() {
    playCount = playCount + 1 - freeGo;
    //playerIndex = playCount%2;
    //console.log(`player index is ${playerIndex}`);
    if (playCount%2 === 1) {
      playerNowName = player2.name;
      playerNowColor = player2.color;
      playerNow = 2;
      //alert(playerNowName);
    } else {
      playerNowName = player1.name;
      playerNowColor = player1.color;
      playerNow = 1;
      //alert(playerNowName);
    }

    if (freeGo === 1) {
      $middle.html(`Play again `);
    } else {
      $middle.html(`Lets Go `);
      $middleEdit.html(`${playerNowName}`);
    }
    freeGo = 0;
  }

  function changeCursor() {
    if (playerNow === 2){
      console.log('changeCursor');
      $('.megaBoard').css('cursor', 'url(images/pencilMediumRed.png) 10 113,url(images/pencilSmallRed.png) 4 30,auto');
    } else {
      $('.megaBoard').css('cursor', 'url(images/pencilMedium.png) 10 113,url(images/pencilSmall.png) 4 30,auto');
    }
  }

  function claimSquare(thisOne) {
    // playerScores[playerNow]
    freeGo = 1;
    const initial = ((playerNowName).split(''))[0];
    thisOne.html(initial);
    thisOne.css('visibility', 'visible');
    thisOne.css('color', playerNowColor);
    if (playerNow === 2) {
      player2.score += 1;
    } else {
      player1.score += 1;
    }
    updatePlayerScores();

  }

  function updatePlayerScores() {
    $left.html(`${player1.name} score : ${player1.score}`);
    $right.html(`${player2.name} score : ${player2.score}`);
  }

  function whoWins(){
    if (player1.score + player2.score === ( x*y ) ){  // all squares guessed
      console.log(`we have a winner`);
      $middleEdit.html('');
      if (player1.score === player2.score) {
        $middle.html('We have a draw!!!');
        playThis(`sounds/trumpet.mp3`);
      } else if (player1.score > player2.score) {
        $middle.html(`${player1.name} wins`);
        playThis(`sounds/tada.mp3`);
      } else { // player[1] > player[0]
        $middle.html(`${player2.name} wins`);
        playThis(`sounds/pen.mp3`);
      }
      $left.html(player1.score);
      $right.html(player2.score);
    }
  } // end of whoWins



 // End of funcitons, this space is for the funnky stuff!! -----------------

 //this is some funky stuff, don't expect it to be here forever!! ----------
  function makeBoard() {


   // takes x and y and sets xElements and yElements
    xElements = 1 + (2*x);
    yElements = 1 + (2*y);



    console.log(xElements);  //test
    console.log(yElements);  // test

    let idCount = 1;  // counter for giving each element a unique id

   // the start of the bit that makes the mega-board board!

   //board width = 10 + 135 + 10 px + 145 for each new square

    const boardWidth = 80 + ((x-1)*70);
    const boardHeight = 80 + ((y-1)*70);

    $('.megaBoard').css('width', `${boardWidth}px`);
    $('.megaBoard').css('height', `${boardHeight}px`);


    const evenRow = ['node','topBar'];
    const oddRow = ['sideBar','centerpiece'];

   //create the board before here! ------------------------------------------

    for (let i=0; i<yElements; i++) {
    // console.log(`y nodes(i): ${i}`);
      let thisDiv = null;
      let aIndex = null;
      for (let j=0; j<xElements; j++) {
        // console.log(`x nodes(j): ${j}`);
        // Create the div's here
        if (i%2 === 0) { // even rows - 0,2,4,6...
          if (j%2 === 0) {
            aIndex = 0;
          } else {
            aIndex = 1;
          }
          thisDiv =  evenRow[aIndex];
        } else { // odd rows - 1,3,5,7...
          // console.log(`j is now ${j}`);
          if (j%2 === 0) {
            aIndex = 0;
          } else {
            aIndex = 1;
          }
          thisDiv =  oddRow[aIndex];
        }


        // finally create the div with class of thisDiv and id of idCount
        console.log(`buliding you a ${thisDiv} with id ${idCount}`);
        $('.megaBoard').append(`<div class=${thisDiv} id=${idCount}>`);
      // console.log(`id count ${idCount}`);
        idCount++;
      }
      // add the "active" class to sidebars and topBars so the onClick's are added
      $('.sideBar').addClass('active');
      $('.topBar').addClass('active');
    }
  } // end of make board




  $('.welcome').css('height', $(document).height());
  //$('.game').css("height", $(document).height());




}); // end of on-load
