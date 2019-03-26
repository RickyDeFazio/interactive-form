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


$activities.on('change', 'input', function() {
  if ($('.tues9:checked').length > 0) {
    $('.tues9:not(:checked').attr('disabled', true);
    $('.tues9:not(:checked').parent().css('color', 'grey');
  } else if ($('.tues9:checked').length === 0){
    $('.tues9:not(:checked').attr('disabled', false);
    $('.tues9:not(:checked').parent().css('color', '#000');
  }
  if ($('.tues1:checked').length > 0) {
    $('.tues1:not(:checked').attr('disabled', true);
    $('.tues1:not(:checked').parent().css('color', 'grey');
  } else if ($('.tues1:checked').length === 0){
    $('.tues1:not(:checked').attr('disabled', false);
    $('.tues1:not(:checked').parent().css('color', '#000');
  }
});

let sum = 0;
const total = $('<p>Total: </p>');
$('.activities').append(total);

function addToTotal(cost) {
  if ($(':checked')){
    total.text('Total: $' + cost);
  }
};

$('.activity').on('change', 'input', function(){
  if (this.checked && $(this).parent().hasClass('main')) {
    sum += 200;
  } else if ($(':not(:checked)') && $(this).parent().hasClass('main')) {
    sum -= 200;
  } 
  if (this.checked && $(this).parent().hasClass('workshop')){
    sum += 100;
  } else {
    sum -= 100;
  }
  addToTotal(sum);
});