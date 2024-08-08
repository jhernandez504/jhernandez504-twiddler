$(document).ready(() => {
  // variables
  const $body = $('body');
  $body.html(''); // Clears body
  const $title = $(`<h1 id="title">Twiddler</h1>`);
  
  const $tweetSec = $('<section class="tweet-feed"></section>');
  const $tweetBank = $('<div id="new-tweets"></div>');
  // button variables
  const $buttonSec = $('<section id="button-row"></section>');
  const $updateButton = $('<button id="update-tweet" class="button">Update Recent Tweets</button>');
  const $tweetButton = $('<button id="tweet-button" class="button">Post Tweet</button>');
  $buttonSec.prepend($title);
  //attach buttons to button section
  $buttonSec.append($updateButton, $tweetButton);
  //input variables
  const $userInput = $('<input type="text" id="user-input" placeholder="Enter a Username!">');
  const $tweetInput = $('<input type="text" id="tweet-input" placeholder="Enter a Tweet!">');
  $buttonSec.append($userInput, $tweetInput);
  // attach button section to top of body
  $body.append($buttonSec);
  // variable for filter toggle
  let isFiltered = false;
  // function to add new tweets
  function addNewTweet(tweets) {
    $tweetBank.html(''); // clears previous tweets
    tweets.forEach((tweet) => {
      const $tweet = $('<div class="tweet-box"></div>');
      const $userName = $(`<span class="username">@${tweet.user}</span>`);
      const messageText = tweet.message || '';
      const messageHtml = messageText.replace(/(#\w+)/g, '<span class="hashtag">$1</span>'); // Convert hashtags to clickable elements
      const $message = $(`<span>${messageHtml}</span>`);
      const createdAt = moment(tweet.created_at);
      const $timestamp = $(`<span class="timestamp"> (${createdAt.format("MMM Do YY")} - ${createdAt.fromNow()})</span>`);

      $userName.on('click', function () {
        const username = $(this).text().substring(1); // remove @ from username
        console.log('Filtering tweets for user:', username);

        if (streams.users[username]) {
          $tweetBank.html(''); // clear previous tweets
          addNewTweet(streams.users[username]);
          isFiltered = true;
        } else {
          console.error(`No tweets found for user: ${username}`);
        }
      });

      // event listener for hashtag clicks
      $message.find('.hashtag').on('click', function () {
        const hashtag = $(this).text(); // Get the clicked hashtag
        console.log('Filtering tweets by hashtag:', hashtag);
        const filteredTweets = tweets.filter(tweet => tweet.message.includes(hashtag));
        $tweetBank.html(''); // clear previous tweets
        addNewTweet(filteredTweets);
        isFiltered = true;
      });

      $tweet.append($userName).append(': ').append($message).append(' - ').append($timestamp);
      $tweetBank.prepend($tweet); // adds new tweet at the top

      // keep tweet feed to only show 10 at a time and remove oldest tweets
      const tweetCount = $tweetBank.children().length;
      if (tweetCount > 10) {
        $tweetBank.children().last().remove();
      }
    });
  }
    // update button event listener
    $updateButton.on('click', function () {
      console.log('Updating recent tweets...');
      addNewTweet(streams.home); // get latest tweets from database
      isFiltered = false; // clicking update button also resets isFiltered var
    });

    // tweet button event listener
    $tweetButton.on('click', function () {
    const username = $userInput.val().trim();
    const message = $tweetInput.val().trim();
    // if visitor enters username and a message
    if (username && message) {
      // creates new tweet object
      const newTweet = {
        user: username,
        message: message,
        created_at: new Date()
      };
      // adds new tweet to streams.home and streams.users[username]
      streams.home.push(newTweet);
      if (!streams.users[username]) {
        streams.users[username] = [];
      }
      streams.users[username].push(newTweet);
      // updates the tweet feed
      addNewTweet(streams.home);

      // clear inputs
      $userInput.val('');
      $tweetInput.val('');
    } else {
      alert('Please enter both a username and a tweet.');
    }
  });

  // initial startup for displaying tweets
  addNewTweet(streams.home);

  // append tweet section to body
  $tweetSec.append($tweetBank);
  $body.append($tweetSec);
  
});
