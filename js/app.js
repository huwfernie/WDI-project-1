console.log('Hello Huw');




$(() => {
// run this on load!!
  const $active = $('.active');
  const $reset = $('#resetButton');

  // create an anon. function for each click on the sideBar
  // and top-bar
  $active.on('click', function(e) {
    console.log(`clickeroo`);
    if (amIActive(e)) {
      $(e.target).addClass('clicked');
      $(e.target).removeClass('active');
    } else {
      //
    }// end of amIActive
  });// end of $active.on(...

  $reset.on('click', function() {
    console.log(`reset button`);
  });



  // All the functions now! -------------------------------

  function amIActive(e) {
    if ($(e.target).hasClass('active')) {
      return true;
    } else {
      return false;
    }
  }












});
