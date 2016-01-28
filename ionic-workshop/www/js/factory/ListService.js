angular.module('starter.services')

.factory('List', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var itemList = [];
  var LIST_STORAGE_KEY = 'List';

  return {
    all: function() {
      var items = window.localStorage.getItem(LIST_STORAGE_KEY);
      if (items) {
        itemList = JSON.parse(items);
      } else {
        itemList = [];
      }
      return itemList;
    },
    setList: function(list) {
      itemList = list;
      window.localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(itemList));
    },
    remove: function(item) {
      itemList.splice(itemList.indexOf(item), 1);
    },
    get: function(itemId) {
      for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].id === parseInt(itemId)) {
          return itemList[i];
        }
      }
      return null;
    }
  };
});
