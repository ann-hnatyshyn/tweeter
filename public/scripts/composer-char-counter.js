const { JSDOM } = require('jsdom');
const { window } = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const $ = require('jquery')(window);

$(document).ready(function() {
  const maxChars = 140;
  
  $('#tweet-text').on('input', function() {
    const charCount = $(this).val().length;
    const remainingChars = maxChars - charCount;
    
    // Update the counter
    $('.counter').text(remainingChars);
    
    if (remainingChars < 0) {
      $('.counter').addClass('over-limit');
    } else {
      $('.counter').removeClass('over-limit');

      console.log(charCount);
    }
  });
});