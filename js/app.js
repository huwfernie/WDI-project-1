console.log('Hello Huw');
$(() => {


  var dots = dots || {};

  dots.x = 6;  // x and y are the number of boxes to make
  dots.y = 6;  // on the board

  dots.xElements = null;  // these are the elements needed to make
  dots.yElements = null;  // the boxes
  makeBoard();

// run this on load!!
  dots.player1 = {name: 'Player 1', score: 0, color: '#e7e729'};
  dots.player2 = {name: 'Player 2', score: 0, color: '#c51414'};
  dots.playerNow = 1;
  dots.playerNowName = null;
  dots.playerNowColor = null;
  dots.playCount = null;
  dots.$active = $('.active');
  dots.$reset = $('#resetButton');
  dots.$topBar = $('.topBar');
  dots.$sideBar = $('.sideBar');
  dots.$middle = $('#middle');
  dots.$middleEdit = $('#middleEdit');
  dots.$right = $('#right');
  dots.$left = $('#left');
  dots.freeGo = 0;
  dots.$startAgain = $('#startAgain');

  dots.$startGame = $('#startGame');
  dots.$centerpiece = $('.centerpiece');

  dots.$centerpiece.html('4'); // get rid of this later, it puts 4's into each centerpiece

  // create an anon. function for each click on the sideBar
  // and-or top-bar
  dots.$active.on('click', function(e) {
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
  dots.$reset.on('click', function() {
    reset();
  });

  dots.$startGame.on('click', function() {
    console.log('click start');
    let temp = $('#player1').val();
    console.log(temp);
    if (temp) {
      dots.player1.name = temp;
    }
    temp = $('#player2').val();
    if (temp) {
      dots.player2.name = temp;
    }
    console.log(dots.player1);
    updatePlayerScores();
    dots.$middle.html(`New Game - You're up `);
    dots.$middleEdit.html(dots.player1.name);
    $('.welcome').slideUp(700);
    $('.game').css('display', 'block');
  });

  dots.$startAgain.on('click', function() {
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
    dots.$topBar.removeClass('clicked');
    dots.$topBar.addClass('active');
    dots.$sideBar.removeClass('clicked');
    dots.$sideBar.addClass('active');
    dots.$centerpiece.html(`4`);
    dots.$centerpiece.css('visibility', 'hidden');
    dots.player1.score = 0;
    dots.player2.score = 0;
    updatePlayerScores();
    dots.playerNow = 1;
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
      // change html of elements with id +- dots.xElements
      console.log(`what is my topBar ID?`);
      const temp = $(e.target).attr('id');
      console.log(`how about .. ${temp}`);

      console.log(`above`);
      const aboveMe = parseInt(temp) - dots.xElements;
      const $aboveMe = $(`#${aboveMe}`);
      let upScore = $aboveMe.html();
      upScore--;
      $aboveMe.html(upScore);
      if (upScore === 0){
        claimSquare($aboveMe);
      }

      console.log(`below`);
      const belowMe = parseInt(temp) + dots.xElements;
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
    dots.playCount = dots.playCount + 1 - dots.freeGo;
    //playerIndex = playCount%2;
    //console.log(`player index is ${playerIndex}`);
    if (dots.playCount%2 === 1) {
      dots.playerNowName = dots.player2.name;
      dots.playerNowColor = dots.player2.color;
      dots.playerNow = 2;
      //alert(playerNowName);
    } else {
      dots.playerNowName = dots.player1.name;
      dots.playerNowColor = dots.player1.color;
      dots.playerNow = 1;
      //alert(playerNowName);
    }

    if (dots.freeGo === 1) {
      dots.$middle.html(`Play again `);
    } else {
      dots.$middle.html(`Lets Go `);
      dots.$middleEdit.html(`${dots.playerNowName}`);
    }
    dots.freeGo = 0;
  }

  function changeCursor() {
    if (dots.playerNow === 2){
      console.log('changeCursor');
      $('.dots.megaBoard').css('cursor', 'url(images/pencilMediumRed.png) 10 113,url(images/pencilSmallRed.png) 4 30,auto');
    } else {
      $('.megaBoard').css('cursor', 'url(images/pencilMedium.png) 10 113,url(images/pencilSmall.png) 4 30,auto');
    }
  }

  function claimSquare(thisOne) {
    // playerScores[playerNow]
    dots.freeGo = 1;
    const initial = ((dots.playerNowName).split(''))[0];
    thisOne.html(initial);
    thisOne.css('visibility', 'visible');
    thisOne.css('color', dots.playerNowColor);
    if (dots.playerNow === 2) {
      dots.player2.score += 1;
    } else {
      dots.player1.score += 1;
    }
    updatePlayerScores();

  }

  function updatePlayerScores() {
    dots.$left.html(`${dots.player1.name} score : ${dots.player1.score}`);
    dots.$right.html(`${dots.player2.name} score : ${dots.player2.score}`);
  }

  function whoWins(){
    if (dots.player1.score + dots.player2.score === ( dots.x*dots.y ) ){  // all squares guessed
      console.log(`we have a winner`);
      dots.$middleEdit.html('');
      if (dots.player1.score === dots.player2.score) {
        dots.$middle.html('We have a draw!!!');
        playThis(`sounds/trumpet.mp3`);
      } else if (dots.player1.score > dots.player2.score) {
        dots.$middle.html(`${dots.player1.name} wins`);
        playThis(`sounds/tada.mp3`);
      } else { // player[1] > player[0]
        dots.$middle.html(`${dots.player2.name} wins`);
        playThis(`sounds/tada.mp3`);
      }
      dots.$left.html(dots.player1.score);
      dots.$right.html(dots.player2.score);
    }
  } // end of whoWins



 // End of funcitons, this space is for the funnky stuff!! -----------------

 //this is some funky stuff, don't expect it to be here forever!! ----------
  function makeBoard() {


   // takes x and y and sets dots.xElements and dots.yElements
    dots.xElements = 1 + (2*dots.x);
    dots.yElements = 1 + (2*dots.y);



    console.log(dots.xElements);  //test
    console.log(dots.yElements);  // test

    let idCount = 1;  // counter for giving each element a unique id

   // the start of the bit that makes the mega-board board!

   //board width = 10 + 135 + 10 px + 145 for each new square

    const boardWidth = 80 + ((dots.x-1)*70);
    const boardHeight = 80 + ((dots.y-1)*70);

    $('.megaBoard').css('width', `${boardWidth}px`);
    $('.megaBoard').css('height', `${boardHeight}px`);


    const evenRow = ['node','topBar'];
    const oddRow = ['sideBar','centerpiece'];

   //create the board before here! ------------------------------------------

    for (let i=0; i<dots.yElements; i++) {
    // console.log(`y nodes(i): ${i}`);
      let thisDiv = null;
      let aIndex = null;
      for (let j=0; j<dots.xElements; j++) {
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
