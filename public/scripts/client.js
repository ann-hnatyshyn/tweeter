/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweet) {
  const timeAgo = timeago().format(tweet.created_at);
  return `
  <article class="tweet">
<header>
  <div class="tweet-header-text"
    <h3>${tweet.user.handle}</h3>
    <h2>${tweet.user.name}</h2>
  </div>
  <img src="${tweet.user.avatars}">
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
</article>
`
};


function renderTweets (tweets) {
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $('#tweets-container').append($tweetElement);
  };
};

function loadTweets() {
  $.ajax({
    url: '/tweets/',
    method: 'GET',
    dataType: 'JSON',

    success: function(tweet) {
      renderTweets(tweet);
    },
    err: function(err) {
      $('.error-message').text("please type your tweet again").slideDown();
    }
  });
}


$(document).ready(function() {

  $('.tweet-form').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    $('.error-message').text(''); //clear the error message
    $('.error-message').slideUp(); // Hide error message before validation
   
    // Validation
    const tweetText = $('#tweet-text').val();
    if (!tweetText) {
      return $('#error-message').text('Tweet content cannot be empty.').slideDown();
    }
    if (tweetText.length > 140) {
     return $('#error-message').text('Tweet content cannot exceed 140 characters.').slideDown();
    }

    // If validation passes, proceed with form submission
    const tweetData = $(this).serialize();

    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: tweetData,

      success: function() {
        loadTweets();
        $('#tweet-text').val(''); // Clear the form
        $('.counter').text('140'); // Reset the character counter
      },
      err: function () {
        $('#error-message').text('Your error message here').slideDown();
      }
    });
  });
  loadTweets();
});

