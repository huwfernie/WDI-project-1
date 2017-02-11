console.log('Hello Huw');




$(() => {

//this is some funky stuff, don't expect it to be here forever!! ----------

  const x = 2;  // x and y are the number of boxes to make
  const y = 2;  // on the board

  let xNodes = null;  // these are the elements needed to make
  let yNodes = null;  // the boxes

  createNodes(x,y);   // takes x and y and sets xNodes and yNodes

  console.log(xNodes);  //test
  console.log(yNodes);  // test

  let idCount = 1;  // counter for giving each element a unique id

  const evenRow = ['node','topBar'];
  const oddRow = ['sideBar','centerpiece'];

  //create the board before here! ------------------------------------------
  for (let i=0; i<yNodes; i++) {
    // console.log(`y nodes(i): ${i}`);
    let thisDiv = null;
    let aIndex = null;
    for (let j=0; j<xNodes; j++) {
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
      $('.superBoard').append(`<div class=${thisDiv} id=${idCount}>`);
      //$('.superBoard').append(`<div class=${thisDiv}>`);
      // console.log(`id count ${idCount}`);
      idCount++;
    }
  }

  $('.dynamicBoard').append('<div class="node">');
  $('.dynamicBoard').append('<div class="topBar">');
  $('.dynamicBoard').append('<div class="node">');
  $('.dynamicBoard').append('<div class="topBar">');
  $('.dynamicBoard').append('<div class="node">');
  // Top row done
  $('.dynamicBoard').append('<div class="sideBar">');
  $('.dynamicBoard').append('<div class="centerpiece"">');
  $('.dynamicBoard').append('<div class="sideBar">');
  $('.dynamicBoard').append('<div class="centerpiece"">');
  $('.dynamicBoard').append('<div class="sideBar">');
  //middle row done
  $('.dynamicBoard').append('<div class="node">');
  $('.dynamicBoard').append('<div class="topBar">');
  $('.dynamicBoard').append('<div class="node">');
  $('.dynamicBoard').append('<div class="topBar">');
  $('.dynamicBoard').append('<div class="node">');
  // // bottom row done
  // $('.dynamicBoard').append('<div class="active sideBar">');
  // $('.dynamicBoard').append('<div class="centerpiece"">');
  // $('.dynamicBoard').append('<div class="active sideBar">');
  // $('.dynamicBoard').append('<div class="centerpiece"">');
  // $('.dynamicBoard').append('<div class="active sideBar">');
  // //middle row done
  // $('.dynamicBoard').append('<div class="node">');
  // $('.dynamicBoard').append('<div class="active topBar">');
  // $('.dynamicBoard').append('<div class="node">');
  // $('.dynamicBoard').append('<div class="active topBar">');
  // $('.dynamicBoard').append('<div class="node">');
  // bottom row done

  // add the "active" class to sidebars and topBars so the onClick's are added
  $('.sideBar').addClass('active');
  $('.topBar').addClass('active');


// run this on load!!
  const players = ['Aplayer 1','Bplayer 2'];
  let playerIndex = 0;
  let playCount = null;
  const playerScores = [0,0];
  const $active = $('.active');
  const $reset = $('#resetButton');
  const $topBar = $('.topBar');
  const $sideBar = $('.sideBar');
  //const $update = $('.update');
  const $middle = $('#middle');
  const $right = $('#right');
  const $left = $('#left');
  let freeGo = 0;
  // change this when more than one tile.
  // const $board = $('.board'); not used any more
  const $centerpiece = $('.centerpiece');

  $centerpiece.html('4'); // get rid of this later, it puts 4's into each centerpiece
  $middle.html(`Lets Go ${players[playerIndex]}`);
  updatePlayerScores();

  // create an anon. function for each click on the sideBar
  // and-or top-bar
  $active.on('click', function(e) {
    //console.log(`clickeroo`);
    if (amIActive(e)) {                 // if bar is clickable : active
      changeBarClassesAfterClick(e);    // change class from active to clicked

      lowerTheClass(e); // reads the html number and lowers it!

      playCount = playCount + 1 - freeGo;
      freeGo = 0;

      changePlayer();

      whoWins();
    }// end of amIActive
  });// end of $active.on(...


  // add a listener to the reset button
  $reset.on('click', function() {
    reset();
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
    playerIndex = 0;
  }// end of reset function

  function changeBarClassesAfterClick(e) {
    console.log(`changeClassesAfterClick`);
    $(e.target).addClass('clicked');
    $(e.target).removeClass('active');
  }

  // function isSquareStillActive() {
  //   console.log(`isSquareStillActive`);
  //   console.log($centerpiece.html());
  //   if ($centerpiece.html() > 0){
  //     // square still active
  //     // do nothing
  //     return true;
  //   } else {
  //     // square just got closed
  //     console.log(`you got one!`);
  //     // -- player score goes up by one
  //     // -- background of square changes, gets an initial.
  //     // -- visibility goes from hidden to visible.
  //     $centerpiece.css('visibility', 'visible');
  //     return false;
  //   }
  // }

  function createNodes(x,y) {
    xNodes = 1 + (2*x);
    yNodes = 1 + (2*y);
  }


  function lowerTheClass(e) {
    if ( $(e.target).hasClass('topBar')  ) {
      // change html of elements with id +- xNodes
      console.log(`what is my topBar ID?`);
      const temp = $(e.target).attr('id');
      console.log(`how about .. ${temp}`);

      console.log(`above`);
      const aboveMe = parseInt(temp) - xNodes;
      const $aboveMe = $(`#${aboveMe}`);
      let upScore = $aboveMe.html();
      upScore--;
      $aboveMe.html(upScore);
      if (upScore === 0){
        claimSquare($aboveMe);
      }

      console.log(`below`);
      const belowMe = parseInt(temp) + xNodes;
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

  playerIndex = 0;

  function changePlayer() {
    playerIndex = playCount%2;
    console.log('player index');
    console.log(playerIndex);
    $middle.html(`Lets Go ${players[playerIndex]}`);
  }

  function claimSquare(thisOne) {
    // playerScores[playerNow]
    freeGo = 1;
    const initial = ((players[playerIndex]).split(''))[0];
    thisOne.html(initial);
    playerScores[playerIndex]+=1;
    updatePlayerScores();
  }

  function updatePlayerScores() {
    $left.html(`Player 1 score : ${playerScores[0]}`);
    $right.html(`Player 2 score : ${playerScores[1]}`);
  }

  function whoWins(){
    if (playerScores[0] + playerScores[1] === ( x*y ) ){  // all squares guessed
      console.log(`we have a winner`);
      if (playerScores[0] > playerScores[1]) {
        $middle.html('Player 1 wins');
      } else {
        $middle.html('Player 2 wins');
      }
      $left.html('');
      $right.html('');
    }
  } // end of whoWins
 // End of funcitons, this space is for the funnky stuff!! -----------------









});
