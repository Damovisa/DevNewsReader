// Class to represent a news item
function NewsItem(id, title, url, commentCount) {
    var self = this;
    self.id = id;
    self.title = title;
    self.url = url;
    self.commentCount = commentCount;

    self.commentUrl = 'http://news.ycombinator.com/item?id=' + self.id;
    self.commentText = '<i class="icon-white icon-comment"></i> '+self.commentCount + ' comments';
}

// Overall viewmodel for this screen, along with initial state
function NewsItemsViewModel() {
    var self = this;

    self.loaded = ko.observable(false);
    // Editable data
    self.newsItems = ko.observableArray([]);

    // retrieve up to date data
    self.GetData = function(uri) {
      var ajaxloader = $('#thinker img');
      ajaxloader.show();
      self.newsItems.removeAll();
      var args = {format: 'jsonp', appid: 'devnewsreader', jsonp:'jsonp' };

        $.getJSON(uri + '?callback=?', args,
        function(data, status, xhr) {
          if (status !== 'success') {
            alert('Couldn\'t retrieve data!');
          } else {
            var resultlist = $.map(data.items, function(item) {
              return new NewsItem(item.id, item.title, item.url, item.commentCount);
            });
            self.newsItems(resultlist);
          }
        }
      )
      .done(function() {
          self.loaded = true;
      })
      .fail(function(e) {
          alert('Couldn\'t retrieve data!');
      })
      .always(function() {
          ajaxloader.hide();
      });
    }

    // animations (not working because we're blanket changing everything)
    self.hideElements = function(elem) {
        $(elem).fadeOut();
    };
    self.showElements = function(elem) {
        $(elem).hide().fadeIn();
    };
}
