/**************************
JSTD - Project 3
***************************/

/**
 * Global Variables
 */
const $name = $('#name');
const $email = $('#mail');
const $otherJobRole = $('#other-title');
const $title = $('#title');
const $design = $('#design');
const $color = $('#color');
const $colorSelection = $color.children();
const $activities = $('.activities');
const $activityLabels = $('.activities label');
const $total = $('<p>Total: </p>');
const $paymentInfo = $('.paymentInfo');
const $paymentSelect = $('#payment');
const $paypalInfo = $('.paypal');
const $bitcoinInfo = $('.bitcoin');
const $credit = $('#credit-card')
const $creditNum = $('#cc-num');
const $zipCode = $('#zip');
const $cvv = $('#cvv');
const $button = $('button');
const $header = $('header');
const $incomplete = $('<h3></h3>');
const $colorDiv = $('#colors-js-puns');
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
$colorDiv.hide();  // Hides color menu by default

$design.on('change', function() {
  if ( $(this).val() === 'js puns' ) {
    $colorDiv.show();
    $color.val('cornflowerblue');
    $colorSelection.eq(0).show();
    $colorSelection.eq(1).show();
    $colorSelection.eq(2).show();
    $colorSelection.eq(3).hide();
    $colorSelection.eq(4).hide();
    $colorSelection.eq(5).hide();
  } else if ( $(this).val() === 'heart js' ) {
    $colorDiv.show();
    $color.val('tomato');
    $colorSelection.eq(0).hide();
    $colorSelection.eq(1).hide();
    $colorSelection.eq(2).hide();
    $colorSelection.eq(3).show();
    $colorSelection.eq(4).show();
    $colorSelection.eq(5).show();
  } else {
    $colorDiv.hide();
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


// Payment Info Section

/*
  1. Displays credit card section by default.
  2. Displays payment sections based on the payment option chosen.
  3. Does not allow user to select 'select payment option'. Reverts to credit card by default.
*/
$paymentSelect.val('credit card'); 
$credit.show();
$paypalInfo.hide();
$bitcoinInfo.hide();

$paymentSelect.on('change', function(){
  if ($(this).val() === 'paypal') {
    $paypalInfo.show();
    $bitcoinInfo.hide();
    $credit.hide();
  } else if ($(this).val() === 'bitcoin') {
    $bitcoinInfo.show();
    $paypalInfo.hide();
    $credit.hide();
  } else if ($(this).val() === 'credit card'){
    $credit.show();
    $bitcoinInfo.hide();
    $paypalInfo.hide();
  } else {
    $paymentSelect.val('credit card');
    $credit.show();
    $bitcoinInfo.hide();
    $paypalInfo.hide();
  }
});


// Form Validation

/* 
  1. Checks if input name is valid. 
  2. Checks if email is valid.
  3. Checks if user has selected at least one activity.
  4. Checks if credit card information is input correctly.
  5. Else, prevent submission and show errors.
*/
$header.append($incomplete);
$incomplete.hide();

const validName = (name) => /^[^-\s\d][a-z ,.'-]+$/i.test(name);
const validEmail = (email) => /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
const validCreditCard = (card) => /^\d{13}$|^\d{14}$|^\d{15}$|^\d{16}$/.test(card);
const validZip = (zip) => /^\d{5}$/.test(zip);
const validCVV = (cvv) => /^\d{3}$/.test(cvv);

$button.on('click', function(e) {
  if ( !validName($name.val()) || 
       !validEmail($email.val()) ||
       $('.activities input:checked').length === 0 ||
       !validCreditCard($creditNum.val()) ||
       !validZip($zipCode.val()) ||
       !validCVV($cvv.val()) )
  {
    e.preventDefault();
    $incomplete.text('At least one or more fields are incomplete or inaccurate.').css('color', 'red').show();
  }
  if ( !validName($name.val()) ) {
    $name.css('border', '2px solid red');
  } else {
    $name.css('border', 'none');
  }
  if ( !validEmail($email.val()) ) {
    $email.css('border', '2px solid red');
  } else {
    $email.css('border', 'none');
  }
  if ( $('.activities input:checked').length === 0 ){
    $activityLabels.css('color', 'red');
  } else {
    $activityLabels.css('color', 'black');
  }
  if ( !validCreditCard($creditNum.val()) ) {
    $creditNum.css('border', '2px solid red');
  } else {
    $creditNum.css('border', 'none');
  }
  if ( !validZip($zipCode.val()) ) {
    $zipCode.css('border', '2px solid red');
  } else {
    $zipCode.css('border', 'none');
  }
  if ( !validCVV($cvv.val()) ) {
    $cvv.css('border', '2px solid red');
  } else {
    $cvv.css('border', 'none');
  }
});

/* 
  Provides error indication in real-time.
*/ 
$name.on("keyup", function() {
  if ( !validName($name.val()) ) {
    $name.css('border', '2px solid red');
  } else {
    $name.css('border', 'none');
  }
});

$email.on("keyup", function() {
  if ( !validEmail($email.val()) ) {
    $email.css('border', '2px solid red');
  } else {
    $email.css('border', 'none');
  }
});

$activities.on("change", function() {
  if ( $('.activities input:checked').length === 0 ){
    $activityLabels.css('color', 'red');
  } else {
    $activityLabels.css('color', 'black');
  }
});

$creditNum.on("keyup", function() {
  if ( !validCreditCard($creditNum.val()) ) {
    $creditNum.css('border', '2px solid red');
  } else {
    $creditNum.css('border', 'none');
  }
});

$zipCode.on("keyup", function() {
  if ( !validZip($zipCode.val()) ) {
    $zipCode.css('border', '2px solid red');
  } else {
    $zipCode.css('border', 'none');
  }
});

$cvv.on("keyup", function() {
  if ( !validCVV($cvv.val()) ) {
    $cvv.css('border', '2px solid red');
  } else {
    $cvv.css('border', 'none');
  }
});