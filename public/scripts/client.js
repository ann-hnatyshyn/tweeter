/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

import $ from 'jquery'
window.$ = $
import('./utility/init') 
import { format } from 'timeago.js';


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
<p>${tweet.content.text}</p>
<div>format(Date.now() - 11 * 1000 * 60 * 60);</div>
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


function loadTweets() {
  $.ajax({
    type: "GET",
    url: "/tweets",
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

$(document).ready(function() {
  $('#tweetForm').submit(function(event) {
    // Get the value of the tweet content
    const tweetContent = $('#tweetContent').val();

    // Check if the tweet is empty or exceeds 140 characters
    if (!tweetContent) {
      alert('Error: Tweet content is required.');
      event.preventDefault(); // Prevent form submission
    } else if (tweetContent.length > 140) {
      alert('Error: Tweet content exceeds 140 characters.');
      event.preventDefault(); // Prevent form submission
    }
  });
});