/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
import $ from 'jquery';
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


const renderTweets = function(tweets) {
  const $tweetsContainer = $('#tweet');

  tweets.forEach(tweet => {
    const $tweetElement = createTweetElement(tweet);
    $tweetsContainer.append($tweetElement);
  });
};

const createTweetElement = function(tweet) {
  let $tweet = $(`
  <article class="tweet">
<header>
  <div class="image">
    <img src="${tweet.profilePicture}">
  </div>
  <div class="tweet-header-text">
    <h2>${tweet.name}</h2>
    <p>@${tweet.handle} · ${tweet.time}</p>
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

console.log($tweet);
$('#tweets-container').append($tweet)