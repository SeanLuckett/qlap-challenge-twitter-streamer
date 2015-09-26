describe("TwitterPoller", function(){
  var twit_poll;

  beforeEach(function(){
    twit_poll = new TwitterPoller();
  });

  describe("has a list", function(){

    it("which can be added to", function(){
      twit_poll.add_tweet({'sample': 'tweet'});
      expect(twit_poll.tweet_list.length).toEqual(1);
    });

    it("whose size is never more than 20", function(){
      for(i = 0; i < 21; i++){
        twit_poll.add_tweet({'sample': 'tweet'});
      }
      expect(twit_poll.tweet_list.length).toBeLessThan(21);
    });

    describe("that only has most recent tweets:", function(){

      beforeEach(function(){
        twit_poll.add_tweet({'first': 'tweet'});
        for(i = 0; i < 18; i++){
          twit_poll.add_tweet({'sample': 'tweet'});
        }
        twit_poll.add_tweet({'last': 'tweet'});
      });

      it("Drops old tweets for new ones", function(){
        twit_poll.add_tweet({'new': 'tweet'});
        expect(twit_poll.tweet_list).toContain({'first': 'tweet'});
        expect(twit_poll.tweet_list).not.toContain({'last': 'tweet'});
      });
    });
  });

  describe("search phrase", function(){
    beforeEach(function(){
      twit_poll.change_search_phrase("A search");
    });

    it("stores the phrase", function(){
      expect(twit_poll.search_phrase).toEqual("A search");
    });

    describe("when the phrase changes:", function(){
      it("'nukes' the tweet_list", function(){
        twit_poll.tweet_list.push({'unique': 'tweet'});
        twit_poll.change_search_phrase("A different search");
        expect(twit_poll.tweet_list.length).toEqual(0);
      });
    });
  });

  describe("getting tweets", function(){
    it("makes the call", function(){
      spyOn(twit_poll, 'get_tweets').andCallFake(function(){
        this.tweet_list = new Array(5);
      });

      twit_poll.get_tweets();
      expect(twit_poll.tweet_list.length).toBeGreaterThan(0);
      expect(twit_poll.tweet_list.length).not.toBeGreaterThan(20);
    });
  });
});
