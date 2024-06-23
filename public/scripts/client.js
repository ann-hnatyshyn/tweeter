/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const { JSDOM } = require('jsdom');
const { window } = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const $ = require('jquery')(window);
const { format } = require('timeago');

timeago(format);

async function loadModule() {
  try {
    const module = await import('./utility/init');
    module.someFunction();
  } catch (error) {
    console.error('Error loading the module:', error);
  }
}

loadModule();

function renderTweets (tweets) {
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $('#tweets-container').append($tweetElement);
  };
};

function createTweetElement(tweet) {
  const timeAgo = timeAgo.format(new Date(tweet.created_at));
  return `
  <article class="tweet">
<header>
  <div class="image">
    <img src="${tweet.user.avatars}">
  </div>
  <div class="tweet-header-text">
    <h2>${tweet.user.name}</h2>
    <p>@${tweet.user.handle} · ${tweet.created_at}</p>
  </div>
</header>
<p>${tweet.content.text}</p>
<footer>
<span class="tweet-time">${timeAgo}</span>
  <div class="icons">
   <i name="flag" class="fa-solid fa-flag"></i>
   <i name="retweet"class="fa-solid fa-retweet"></i>
   <i name="heart"class="fa-solid fa-heart"></i>
  </div>
</footer>
</section>
</article>
`
};
renderTweets(data);

$(document).ready(function() {
  console.log('Document is ready');
  const maxChars = 140;

  $('#tweet-text').on('input', function() {
    const charCount = $(this).val().length;
    const remainingChars = maxChars - charCount;

    console.log(`Characters entered: ${charCount}, Remaining: ${remainingChars}`);
    
    // Update the counter
    $('.counter').text(remainingChars);
    
    // If the character count exceeds the limit, change the color of the counter
    if (remainingChars < 0) {
      $('.counter').addClass('over-limit');
    } else {
      $('.counter').removeClass('over-limit');
    }
  })
});

$(document).ready(function() {
  function loadTweets() {
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        renderTweets(tweets);
      },
      error: function(err) {
        console.error('Error fetching tweets:', err);
      }
    });
  }
  loadTweets();

  // Form submit handler
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    $('#error-message').text(''); //clear the error message
    $('#error-message').slideUp(); // Hide error message before validation
    $("<div>").text(textFromUser); //prevent CSS
    
    const tweetText = $('#tweet-text').val().trim();

    // Validation
    if (!tweetText) {
      return showError('Tweet content cannot be empty.');
    }
    if (tweetText.length > 140) {
      return showError('Tweet content cannot exceed 140 characters.');
    }
    // If validation passes, proceed with form submission
    const tweetData = $(this).serialize();
    $.ajax({
      url: '/tweet/',
      method: 'GET',
      data: tweetData,
      success: function() {
        loadTweets();
        $('#tweet-text').val(''); // Clear the form
        $('.counter').text('140'); // Reset the character counter
      },
      err: function(err) {
        $('#error-message').text("please type your tweet again").slideDown();
      }
    });
  });
});


