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
  <div>
    <img src="${tweet.user.avatars}">
  </div>
  <div class="tweet-header-text"
    <h3>${tweet.user.handle}</h3>
    <h2>${tweet.user.name}</h2>
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
    dataType: 'json',
    success: function(tweets) {
      console.log(tweets);
      renderTweets(tweets);
    },
    error: function(err) {
      console.error('Error fetching tweets:', err);
    }
  });
}

$(document).ready(function() {

  // Form submit handler
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    $('#error-message').text(''); //clear the error message
    $('#error-message').slideUp(); // Hide error message before validation
    $("<div>").text(textFromUser); //prevent CSS
    
    const tweetText = $('#tweet-text').val();

    // Validation
    if (!tweetText || !tweetText.trim()) {
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
  loadTweets();
});
