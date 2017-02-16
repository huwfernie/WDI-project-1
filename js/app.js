var dots = dots || {};


dots.setup = function() {
  console.log('setup');
  console.log(this);

  this.x = 4;  // x and y are the number of boxes to make
  this.y = 4;  // on the board

  this.xElements = null;  // these are the elements needed to make
  this.yElements = null;  // the boxes

  console.log('Make the board now');
  this.makeBoard();

  // run this on load!!
  this.player1 = {name: 'Player 1', score: 0, color: '#e7e729'};
  this.player2 = {name: 'Player 2', score: 0, color: '#c51414'};
  this.playerNow = 1;
  this.playerNowName = null;
  this.playerNowColor = null;
  this.playCount = null;
  this.$active = $('.active');
  this.$reset = $('#resetButton');
  this.$topBar = $('.topBar');
  this.$sideBar = $('.sideBar');
  this.$middle = $('#middle');
  this.$middleEdit = $('#middleEdit');
  this.$right = $('#right');
  this.$left = $('#left');
  this.freeGo = 0;
  this.$startAgain = $('#startAgain');
  this.$startGame = $('#startGameWelcome');
  this.$centerpiece = $('.centerpiece');
  this.$welcome = $('.welcome');
  this.$game = $('.game');

  this.$centerpiece.html('4'); // get rid of this later, it puts 4's into each centerpiece

  // create an anon. function for each click on the sideBars
  // and-or top-bars
  this.$active.on('click', function(e) {
    console.log('click');
    if (dots.amIActive(e)) {                 // if bar is clickable : active
      dots.changeBarClassesAfterClick(e);    // change class from active to clicked
      dots.lowerTheClass(e);                 // reads the html number and lowers it!
      dots.changePlayer();
      dots.changeCursor();
      dots.whoWins();
    }// end of amIActive
  }).bind(this);// end of this.$active.on(...



  // add a listener to the start Game button
  this.$startGame.on('click', () => {
    console.log('click start');
    this.player1.name = $('#player1').val() || this.player1.name;
    this.player2.name = $('#player2').val() || this.player2.name;
    // console.log(this.player1);
    this.updatePlayerScores();
    this.$middle.html(`New Game - You're up `);
    this.$middleEdit.html(this.player1.name);
    $('.welcome').slideUp(700);
    this.$game.slideDown(700);
  }).bind(this);



  // add a listener to the reset button
  this.$reset.on('click', this.reset.bind(this));


  //add a listener to the start again button
  this.$startAgain.on('click', () => {
    console.log('start Again');
    this.$welcome.slideDown(700);
    this.$game.slideUp(700);
    this.player1.name = 'Player 1';
    this.player2.name = 'Player 2';
    $('#player1').val('');
    $('#player2').val('');
    this.reset();
  }).bind(this);


}; // End of setup





























// All the functions now! -------------------------------

dots.amIActive = function amIActive(e) {
  return $(e.target).hasClass('active');
}; // end of amIActive function



dots.reset = function reset() {
  console.log('reset button');
  this.$topBar.removeClass('clicked').addClass('active');
  this.$sideBar.removeClass('clicked').addClass('active');
  this.$centerpiece.html('4').css('visibility', 'hidden');
  this.player1.score = 0;
  this.player2.score = 0;
  this.updatePlayerScores();
  this.playerNow = 1;
  this.$middleEdit.html(this.player1.name);
};// end of reset function



dots.changeBarClassesAfterClick = function changeBarClassesAfterClick(e) {
  console.log('changeClassesAfterClick');
  this.playThis(`sounds/pen.m4a`); //play sound
  $(e.target).addClass('clicked');
  $(e.target).removeClass('active');
};



// function that plays anything with the file path passed to is as (audio)
dots.playThis = function playThis(audio) {
  console.log(`audio playing ${audio}`);
  audio = new Audio(audio);
  console.log(audio);
  audio.play();
};



dots.lowerTheClass = function lowerTheClass(e) {
  if ( $(e.target).hasClass('topBar')  ) {
    let x = dots.xElements;
    dots.callMe(e, x);
    x = -dots.xElements;
    dots.callMe(e, x);
  } else {
    let x = 1;
    dots.callMe(e, x);
    x = -1;
    dots.callMe(e, x);
  }
};



dots.callMe = function callMe(e, x) {
  console.log('callMe');
  const belowMe = parseInt($(e.target).attr('id')) + x;
  const $belowMe = $(`#${belowMe}`);
  let downScore = $belowMe.html();
  downScore--;
  $belowMe.html(downScore);
  if (downScore === 0){
    this.claimSquare($belowMe);
  }
};



dots.changePlayer = function changePlayer() {
  this.playCount = this.playCount + 1 - this.freeGo;

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



  // freeGo is 1 after you close a square and get an extra turn
  if (this.freeGo === 1) {
    this.$middle.html('Play again ');
  } else {
    this.$middle.html('Lets Go ');
    this.$middleEdit.html(`${this.playerNowName}`);
  }
  this.freeGo = 0;
};



dots.changeCursor = function changeCursor() {
  console.log('changeCursor');
  if (this.playerNow === 2){
    $('.megaBoard').css('cursor', 'url(images/pencilMediumRed.png) 10 113,url(images/pencilSmallRed.png) 4 30,auto');
  } else {
    $('.megaBoard').css('cursor', 'url(images/pencilMedium.png) 10 113,url(images/pencilSmall.png) 4 30,auto');
  }
};



dots.claimSquare = function claimSquare(thisOne) {
  // playerScores[playerNow]
  this.freeGo = 1;
  const initial = ((this.playerNowName).split(''))[0];
  thisOne.html(initial).css('visibility', 'visible').css('color', this.playerNowColor);
  (this.playerNow === 2) ? this.player2.score += 1 : this.player1.score += 1;
  this.updatePlayerScores();
};

dots.updatePlayerScores = function updatePlayerScores() {
  this.$left.html(`${this.player1.name} score : ${this.player1.score}`);
  this.$right.html(`${this.player2.name} score : ${this.player2.score}`);
};

dots.whoWins = function whoWins(){
  if (this.player1.score + this.player2.score === (this.x*this.y) ){  // all squares guessed
    console.log('we have a winner');
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
  }
}; // end of whoWins



// End of funcitons, this space is for the funnky stuff!! -----------------


dots.makeBoard = function makeBoard() {
 // takes x and y and sets xElements and yElements
  this.xElements = 1 + (2*this.x);
  this.yElements = 1 + (2*this.y);
  console.log(this.xElements);  //test
  console.log(this.yElements);  // test
 // the start of the bit that makes the mega-board board!

 //board width = 10 + 135 + 10 px + 145 for each new square
  let idCount = 1;  // counter for giving each element a unique id
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
      //console.log(`buliding you a ${thisDiv} with id ${idCount}`);
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



$(dots.setup.bind(dots));
