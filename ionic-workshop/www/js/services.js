angular.module('starter.services', [])

.factory('List', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var items = [];

  return {
    all: function() {
      return items;
    },
    setList: function(list) {
      items = list;
    },
    remove: function(item) {
      items.splice(items.indexOf(item), 1);
    },
    get: function(itemId) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(itemId)) {
          return items[i];
        }
      }
      return null;
    }
  };
});
