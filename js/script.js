/**************************
JSTD - Project 3
***************************/

/**
 * Global Variables
 */

const $name = $('#name');
const $otherJobRole = $('#other-title');
const $title = $('#title');

// Sets focus on first input element
$name.focus();


/**
  Hide input element until event on 'other' triggers it to appear.
*/
$otherJobRole.hide();

$title.on('change', function() {
  if ( $(this).val() === 'other' ) {
    return $otherJobRole.show();
  } else {
    return $otherJobRole.hide();
  }
});