/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
import $ from 'jquery';


const renderTweets = function(tweets) {

  const $tweetsContainer = $('#tweet');
  $("#tweet").empty();

  for (const tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $tweetsContainer.append($tweetElement);
  };
};

const createTweetElement = function(tweet) {
  let $tweet = $(`
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
<p>${tweet.content}</p>
<footer>
  <div class="icons">
   <i name="flag" class="fa-solid fa-flag"></i>
   <i name="retweet"class="fa-solid fa-retweet"></i>
   <i name="heart"class="fa-solid fa-heart"></i>
  </div>
</footer>
</section>
</article>`);

  return $tweet;
};

renderTweets(data);

$(document).$(function() { {

  const $form = $("#new-tweet-form");

  $form.on("submit", function(event) {

    event.preventDefault();
    
    const serializedData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: serializedData,
      success: function(response) {
        console.log("Tweet successfully submitted:", response);
     
        $("#tweets-container").prepend(createTweetElement(response));
      },
      error: function(error) {
       
        console.error("Error submitting tweet:", error);
      }
    });
  });
});

const loadTweets = function() {

};

function loadTweets() {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/tweets",
    success: function(tweets) {
      console.log("Tweets fetched successfully:", tweets);
      // Clear the tweets container
      $("#tweets").empty();

      for (const tweet of tweets) {
        const $tweetElement = createTweetElement(tweet);
        $("#tweets").append($tweetElement);
      }
    },
    error: function(error) {
      console.error("Error fetching tweets:", error);
    }
  });
}

loadTweets();


//timeago format - to see time since last tweet//
import { format } from 'timeago.js';

// format timestamp
format(1544666010224);

// format date instance
format(new Date(1544666010224));

// format date string
format('2018-12-12');

// format with locale
format(1544666010224, 'zh_CN');

// format with locale and relative date
format(1544666010224, 'zh_CN', { relativeDate: '2018-11-11' });

// e.g.
format(Date.now() - 11 * 1000 * 60 * 60); // returns '11 hours ago'