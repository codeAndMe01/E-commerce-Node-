$( document ).ready(function() {
    // perform some jQuery when page is loaded
    
  $("h1").hover(function() { 
    // when user is hovering the h1
    $( this ).addClass("animated infinite pulse"); 
    // we add pulse animation and to infinite
  }, function() {
    // when user no longer hover on the h1
    $( this ).removeClass("animated infinite pulse");
    // we remove the pulse
  });
  });
  