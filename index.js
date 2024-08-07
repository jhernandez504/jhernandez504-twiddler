
$(document).ready(() => {
  //variables
  //structure variables
  const $body = $('body');
  $body.html('');
  //button variables
  const buttonSec = $(`<section `);
    function makeTweet(){
    const $tweets = streams.home.map((tweet) => {
      const $tweet = $('<div></div>');
      const text = `@${tweet.user}: ${tweet.message}`;

      $tweet.text(text);

      return $tweet;
    });
    $body.append($tweets);
  }
  makeTweet();

  
});
