var dots = dots || {};


dots.setup = function() {

  console.log(`huw`);
  console.log(`setup`);
  console.log(this);

  dots.x = 6;  // x and y are the number of boxes to make
  dots.y = 6;  // on the board

  dots.xElements = null;  // these are the elements needed to make
  dots.yElements = null;  // the boxes
  dots.makeBoard;

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
    console.log(`clickeroo`);
    if (dots.amIActive(e)) {                 // if bar is clickable : active
      dots.changeBarClassesAfterClick(e);    // change class from active to clicked
      dots.lowerTheClass(e);                 // reads the html number and lowers it!
      dots.changePlayer();
      dots.changeCursor();
      dots.whoWins();
    }// end of amIActive
  });// end of $active.on(...


  // add a listener to the reset button
  dots.$reset.on('click', this.reset);

  dots.$startGame.on('click', () => {
    console.log('click start');
    this.player1.name = $('#player1').val() || this.player1.name;
    this.player2.name = $('#player2').val() || this.player2.name;
    // console.log(this.player1);
    this.updatePlayerScores();
    this.$middle.html(`New Game - You're up `);
    this.$middleEdit.html(this.player1.name);
    $('.welcome').slideUp(700);
    $('.game').css('display', 'block');
  });


  dots.$startAgain.on('click', function() {
    $('.welcome').slideDown(700);
    this.player1.name = '';
    this.player1.name = '';
  });


}; // End of setup
































// All the functions now! -------------------------------

dots.amIActive = function amIActive(e) {
  return $(e.target).hasClass('active');
}; // end of amIActive function

dots.reset = function reset() {
  console.log(`reset button`);
  this.$topBar.removeClass('clicked');
  this.$topBar.addClass('active');
  this.$sideBar.removeClass('clicked');
  this.$sideBar.addClass('active');
  this.$centerpiece.html(`4`);
  this.$centerpiece.css('visibility', 'hidden');
  this.player1.score = 0;
  this.player2.score = 0;
  this.updatePlayerScores();
  this.playerNow = 1;
};// end of reset function

dots.changeBarClassesAfterClick = function changeBarClassesAfterClick(e) {
  console.log(`changeClassesAfterClick`);
  this.playThis(`sounds/pen.m4a`); //play sound
  $(e.target).addClass('clicked');
  $(e.target).removeClass('active');
};



// function that plays anything with the file path passed to is as (audio)
dots.playThis = function playThis(audio) {
  console.log(`audio is ${audio}`);
  audio = new Audio(audio);
  console.log(audio);
  audio.play();
};





dots.lowerTheClass = function lowerTheClass(e) {
  if ( $(e.target).hasClass('topBar')  ) {
    // change html of elements with id +- dots.xElements
    console.log(`what is my topBar ID?`);
    const temp = $(e.target).attr('id');
    console.log(`how about .. ${temp}`);

    console.log(`above`);
    const aboveMe = parseInt(temp) - this.xElements;
    const $aboveMe = $(`#${aboveMe}`);
    let upScore = $aboveMe.html();
    upScore--;
    $aboveMe.html(upScore);
    if (upScore === 0){
      this.claimSquare($aboveMe);
    }

    console.log(`below`);
    const belowMe = parseInt(temp) + this.xElements;
    const $belowMe = $(`#${belowMe}`);
    let downScore = $belowMe.html();
    downScore--;
    $belowMe.html(downScore);
    if (downScore === 0){
      this.claimSquare($belowMe);
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
      this.claimSquare($leftOfMe);
    }
    //
    console.log(`rightOfMe`);
    const rightOfMe = parseInt(temp) + 1;
    const $rightOfMe = $(`#${rightOfMe}`);
    let rightScore = $rightOfMe.html();
    rightScore--;
    $rightOfMe.html(rightScore);
    if (rightScore === 0){
      this.claimSquare($rightOfMe);
    }
  }
};

// playerIndex = 0; // Why is this here!!!!???????

dots.changePlayer = function changePlayer() {
  this.playCount = this.playCount + 1 - this.freeGo;
  //playerIndex = playCount%2;
  //console.log(`player index is ${playerIndex}`);
  if (this.playCount%2 === 1) {
    this.playerNowName = this.player2.name;
    this.playerNowColor = this.player2.color;
    this.playerNow = 2;
    //alert(playerNowName);
  } else {
    this.playerNowName = this.player1.name;
    this.playerNowColor = this.player1.color;
    this.playerNow = 1;
    //alert(playerNowName);
  }

  if (this.freeGo === 1) {
    this.$middle.html(`Play again `);
  } else {
    this.$middle.html(`Lets Go `);
    this.$middleEdit.html(`${this.playerNowName}`);
  }
  this.freeGo = 0;
};

dots.changeCursor = function changeCursor() {
  if (this.playerNow === 2){
    console.log('changeCursor');
    $('.dots.megaBoard').css('cursor', 'url(images/pencilMediumRed.png) 10 113,url(images/pencilSmallRed.png) 4 30,auto');
  } else {
    $('.megaBoard').css('cursor', 'url(images/pencilMedium.png) 10 113,url(images/pencilSmall.png) 4 30,auto');
  }
};

dots.claimSquare = function claimSquare(thisOne) {
  // playerScores[playerNow]
  this.freeGo = 1;
  const initial = ((this.playerNowName).split(''))[0];
  thisOne.html(initial);
  thisOne.css('visibility', 'visible');
  thisOne.css('color', this.playerNowColor);
  if (this.playerNow === 2) {
    this.player2.score += 1;
  } else {
    this.player1.score += 1;
  }
  this.updatePlayerScores();

};

dots.updatePlayerScores = function updatePlayerScores() {
  this.$left.html(`${this.player1.name} score : ${this.player1.score}`);
  this.$right.html(`${this.player2.name} score : ${this.player2.score}`);
};

dots.whoWins = function whoWins(){
  if (this.player1.score + this.player2.score === ( this.x*this.y ) ){  // all squares guessed
    console.log(`we have a winner`);
    this.$middleEdit.html('');
    if (this.player1.score === this.player2.score) {
      this.$middle.html('We have a draw!!!');
      this.playThis(`sounds/trumpet.m4a`);
    } else if (this.player1.score > this.player2.score) {
      this.$middle.html(`${this.player1.name} wins`);
      this.playThis(`sounds/tada.mp3`);
    } else { // player[1] > player[0]
      this.$middle.html(`${this.player2.name} wins`);
      this.playThis(`sounds/tada.mp3`);
    }
    this.$left.html(this.player1.score);
    this.$right.html(this.player2.score);
  }
}; // end of whoWins



// End of funcitons, this space is for the funnky stuff!! -----------------

//this is some funky stuff, don't expect it to be here forever!! ----------
dots.makeBoard = function makeBoard() {
 // takes x and y and sets dots.xElements and dots.yElements
  this.xElements = 1 + (2*this.x);
  this.yElements = 1 + (2*this.y);



  console.log(this.xElements);  //test
  console.log(this.yElements);  // test

  let idCount = 1;  // counter for giving each element a unique id

 // the start of the bit that makes the mega-board board!

 //board width = 10 + 135 + 10 px + 145 for each new square

  const boardWidth = 80 + ((this.x-1)*70);
  const boardHeight = 80 + ((this.y-1)*70);

  $('.megaBoard').css('width', `${boardWidth}px`);
  $('.megaBoard').css('height', `${boardHeight}px`);


  const evenRow = ['node','topBar'];
  const oddRow = ['sideBar','centerpiece'];

 //create the board before here! ------------------------------------------

  for (let i=0; i<this.yElements; i++) {
  // console.log(`y nodes(i): ${i}`);
    let thisDiv = null;
    let aIndex = null;
    let row = null;
    for (let j=0; j<this.xElements; j++) {

      row = i%2 === 0 ? evenRow : oddRow;
      aIndex = j%2 === 0 ? 0 : 1;
      thisDiv = row[aIndex];


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
}; // end of make board




//$('.welcome').css('height', $(document).height());
//$('.game').css("height", $(document).height());


//$(rps.setup.bind(rps));
//$(dots.setup);
//$(() => dots.setup());
$(dots.setup.bind(dots));
