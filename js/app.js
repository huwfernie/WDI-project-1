console.log('Hello Huw');




$(() => {

//this is some funky stuff, don't expect it to be here forever!! ----------


  $('.dynamicBoard').append('<div class="node">');
  $('.dynamicBoard').append('<div class="active topBar">');
  $('.dynamicBoard').append('<div class="node">');
  $('.dynamicBoard').append('<div class="active topBar">');
  $('.dynamicBoard').append('<div class="node">');
  $('.dynamicBoard').append('<div class="active sideBar">');
  $('.dynamicBoard').append('<div class="centerpiece"">');
  $('.dynamicBoard').append('<div class="active sideBar">');
  $('.dynamicBoard').append('<div class="centerpiece"">');
  $('.dynamicBoard').append('<div class="active sideBar">');
  $('.dynamicBoard').append('<div class="node">');
  $('.dynamicBoard').append('<div class="active topBar">');
  $('.dynamicBoard').append('<div class="node">');
  $('.dynamicBoard').append('<div class="active topBar">');
  $('.dynamicBoard').append('<div class="node">');


// run this on load!!
  const $active = $('.active');
  const $reset = $('#resetButton');
  const $topBar = $('.topBar');
  const $sideBar = $('.sideBar');
  // change this when more than one tile.
  const $board = $('.board');
  const $centerpiece = $('.centerpiece');


  //create an anon. function for click on the area of one square
  $board.on('click', function() {
    console.log($centerpiece.html());
    // myCount += 1;
    // console.log(mycount);
  });

  // create an anon. function for each click on the sideBar
  // and top-bar
  $active.on('click', function(e) {
    console.log(`clickeroo`);
    if (amIActive(e)) {
      changeBarClassesAfterClick(e);


      let currentSides = ($centerpiece.html());
      currentSides -= 1;
      console.log(currentSides);
      $centerpiece.html(currentSides);
      isSquareStillActive();

    } else {
      //
    }// end of amIActive
  });// end of $active.on(...

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
  }// end of reset function

  function changeBarClassesAfterClick(e) {
    console.log(`changeClassesAfterClick`);
    $(e.target).addClass('clicked');
    $(e.target).removeClass('active');
  }

  function isSquareStillActive() {
    console.log(`isSquareStillActive`);
    console.log($centerpiece.html());
    if ($centerpiece.html() > 0){
      // square still active
      // do nothing
      return true;
    } else {
      // square just got closed
      console.log(`you got one!`);
      // -- player score goes up by one
      // -- background of square changes, gets an initial.
      // -- visibility goes from hidden to visible.
      $centerpiece.css('visibility', 'visible');
      return false;
    }
  }

 // End of funcitons, this space is for the funnky stuff!! -----------------








});
