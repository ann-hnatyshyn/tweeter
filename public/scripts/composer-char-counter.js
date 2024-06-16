$(document).ready(function() {
  console.log("composer-char-counter.js is loaded");

  $('.textarea').on('input', function() {
    const maxLength = 140;
    const currentLength = $(this).val().length;
    const remainingLength = maxLength - currentLength;

    const counter = $(this).closest('.new-tweet').find('.counter');
    counter.text(remainingLength);

    if (remainingLength < 0) {
      counter.addClass('over-limit');
    } else {
      counter.removeClass('over-limit');
    }
  });
});
