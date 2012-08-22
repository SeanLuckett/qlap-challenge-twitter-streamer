function TwitterPoller(){
  this.tweet_list = [];
  this.search_phrase = "";
};

TwitterPoller.prototype.add_tweet = function(tweet){
  if (this.tweet_list.length === 20){
    this.tweet_list.pop();
    this.tweet_list.unshift(tweet);
  } else {
    this.tweet_list.push(tweet);
  }
};

TwitterPoller.prototype.change_search_phrase = function(new_phrase){
  if (this.search_phrase !== new_phrase){
    this.search_phrase = new_phrase;
    this.tweet_list = []
  }
};

TwitterPoller.prototype.get_tweets = function(){
  var _this = this;
  $.ajax({
    type: 'GET',
    url: "http://search.twitter.com/search.json?q=Zach%20Braff&result_type=recent&rpp=20",
    dataType: 'jsonp',
    success: function(data){ _this.set_tweets(data); }
    }
  );
};

TwitterPoller.prototype.set_tweets = function(data){
  tweets = data.results;
  for(i = 0; i < tweets.length; i++){
    this.add_tweet(tweets[i]);
  }
};
