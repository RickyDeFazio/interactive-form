/**************************
JSTD - Project 3
***************************/

/**
 * Global Variables
 */
const $name = $('#name');
const $otherJobRole = $('#other-title');
const $title = $('#title');
const $design = $('#design');
const $color = $('#color');
const $colorSelection = $color.children();
const $activities = $('.activities');
const $total = $('<p>Total: </p>');
let sum = 0;
// Sets focus on first input element
$name.focus();


// Job Role Section

/*
  Hides input element until user selects 'other' and triggers it to appear.
*/
$otherJobRole.hide();

$title.on('change', function() {
  if ( $(this).val() === 'other' ) {
    return $otherJobRole.show();
  } else {
    return $otherJobRole.hide();
  }
});


// Tshirt Info Section

/*
  When user chooses a design theme, the color field and options are updated to reflect the relevant options.
*/
$design.on('change', function() {
  if ( $(this).val() === 'js puns' ) {
    $color.val('cornflowerblue');
    $colorSelection.eq(0).show();
    $colorSelection.eq(1).show();
    $colorSelection.eq(2).show();
    $colorSelection.eq(3).hide();
    $colorSelection.eq(4).hide();
    $colorSelection.eq(5).hide();
  } else if ( $(this).val() === 'heart js' ) {
    $color.val('tomato');
    $colorSelection.eq(0).hide();
    $colorSelection.eq(1).hide();
    $colorSelection.eq(2).hide();
    $colorSelection.eq(3).show();
    $colorSelection.eq(4).show();
    $colorSelection.eq(5).show();
  } else {
    $color.val('cornflowerblue');
    $colorSelection.each(function() {
      $(this).show();
    });
  }
});


// Register For Activities Section

/* 
  1. Add paragraph element containing total to bottom of activity list.
  2. For each activity registered, the total is updated to reflect the total price.
*/
$activities.append($total);

function addToTotal(cost) {
  if ($(':checked')){
    $total.text(`Total: $${cost}`);
  }
};


/* 
  1. Event handler listens for change on activities.
  2. When an activity is registered for, the handler checks to see if there is a time conflict with other activities. If there is, those activities are disabled and greyed out.
  3. Depending on which activities are registered for, the total price is reflected below the activity list.
*/
$activities.on('change', 'input', function() {
  // Tuesday at 9AM time frame
  if ($('.tues9:checked').length > 0) {
    $('.tues9:not(:checked').attr('disabled', true);
    $('.tues9:not(:checked').parent().css('color', 'grey');
  } else if ($('.tues9:checked').length === 0){
    $('.tues9:not(:checked').attr('disabled', false);
    $('.tues9:not(:checked').parent().css('color', '#000');
  }
  // Tuesday at 1PM time frame
  if ($('.tues1:checked').length > 0) {
    $('.tues1:not(:checked').attr('disabled', true);
    $('.tues1:not(:checked').parent().css('color', 'grey');
  } else if ($('.tues1:checked').length === 0){
    $('.tues1:not(:checked').attr('disabled', false);
    $('.tues1:not(:checked').parent().css('color', '#000');
  }
  // Adding/Subtracting from total (main conference)
  if (this.checked && $(this).parent().hasClass('main')) {
    sum += 200;
  } else if ($(':not(:checked)') && $(this).parent().hasClass('main')) {
    sum -= 200;
  }
  // Adding/subtracting from total (workshops)
  if (this.checked && $(this).parent().hasClass('workshop')){
    sum += 100;
  } else if ($(':not(:checked)') && $(this).parent().hasClass('workshop')) {
    sum -= 100;
  }

  addToTotal(sum);
});