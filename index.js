
$(document).ready(() => {
  //variables
  //structure variables
  const $body = $('body');
  $body.html('');
  const $tweetSec = $(`<section></section>`);
  const $tweetBank = $(`<div id='new-tweets'</div>`);
  //button variables
  const $buttonSec = $(`<section></section>`);
  const $buttonDiv = $(`<div id='tweet-button></div>`);
  const $button = $(`<button id='update-tweet'>Update Recent Tweets</button>`);
  $($buttonSec).prepend($button); //attach button to button section
  $('body').append($buttonSec); //attaches button section to top of body

  //function for event listener to update feed
  $button.click(function(){
    let newTweet = streams.home;
    nameTracker = null;
    $tweetBank.html('');
    $tweetBank.prepend(makeTweet(newTweet));
  })


    function makeTweet(){
    const $tweets = streams.home.map((tweet) => {
      const $tweet = $('<div></div>');
      const text = `@${tweet.user}: ${tweet.message}`;

      $tweet.text(text);

      return $tweet;
    });
    $('body').append($tweetSec);
    $($tweetSec).append($tweetBank);
    $($tweetBank).append($tweets);
  }
  makeTweet();


  
});
