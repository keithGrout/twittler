/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 
Creates two global variables, users and streams. 

global users is simply a list of all the properties in stream.users
users is an array of strings -- all the usernames that you're following.
streams is an object with two properties, users and home.
streams.home is an array of all tweets from all the users you're following.
streams.users is an object with properties for each user. streams.users.shawndrost has all of shawndrost's tweets.
Kicks off a periodic process that puts more data in streams.
You'll mostly be working in the javascript block of index.html. Note: The generated tweets will be displayed in reverse chronological order.
 */

// set up data structures
window.streams = {};                                         // global object stream
streams.home = [];											 // streams has 2 properties, one is an array the other is an object
streams.users = {};                                          // home is an array and users is an object
streams.users.shawndrost = [];                               // the users object inside stream has four properties, each a username. 
streams.users.sharksforcheap = [];                           // each username inside stream.users is an array.
streams.users.mracus = [];              
streams.users.douglascalhoun = [];
window.users = Object.keys(streams.users);                   // global object users is an array with all the properties of streams.users 
                                                             // i.e., the names of each user as a string
                                                             // as a side note, Object.keys method returns all the properties of an object as strings

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){                           // addTweet takes a newTweet parameter, an object, defined in generateRandomTweet()
  var username = newTweet.user;                              // the object has a user property, a message property, and createdAt property
  streams.users[username].push(newTweet);                    // all randomly generated in the generateRandomTweet function.
  streams.home.push(newTweet);                               // addTweet takes the user property and stores it in username
          													 // using username, it adds the tweet to the array of individual user tweets
          													 // it also adds it to the list of all tweets from everyone
          													 
          													 // tl:dr? addTweet takes a tweet object and adds it to the user array of tweets
          													 // and the array of all tweets in general
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['drank', 'drunk', 'deployed', 'got', 'developed', 'built', 'invented', 'experienced', 'fought off', 'hardened', 'enjoyed', 'developed', 'consumed', 'debunked', 'drugged', 'doped', 'made', 'wrote', 'saw'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};



// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};									// a tweet is randomly generated with three properties, then sent to the addTweet function
  tweet.user = randomElement(users); 				// It has a random 'user' property from the array of all users
  tweet.message = randomMessage();					// It has a random 'message' property from randomMessage()
  tweet.created_at = new Date();					// It has a timestamp
  addTweet(tweet);                                  // Then, the newly created tweet object is passed into addTweet()
};

for(var i = 0; i < 10; i++){                        // running generateRandomTweet ten times creates 10 tweet objects
  generateRandomTweet();                            // and all ten are passed to addTweet, which adds each tweet to the
  													// users tweets, and all tweets arrays.
}

var scheduleNextTweet = function(){                       // a random tweet is generated and added to the user tweets and all tweets arrays
  generateRandomTweet();								  // this function calls itself forever (recursion with no base case)
  setTimeout(scheduleNextTweet, Math.random() * 1500);    // setTimeout calls scheduleNextTweet randomly between 0 and 1.5 seconds non-inclusive
};
scheduleNextTweet();    								  // jumpin' off point for the whole shebang		

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message){
  if(!visitor){
    throw new Error('set the global visitor property!');
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  addTweet(tweet);
};
