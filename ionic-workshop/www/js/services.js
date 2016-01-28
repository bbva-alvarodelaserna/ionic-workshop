angular.module('starter.services', [])

.factory('List', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var items = [{
    id: 0,
    name: 'Ir al Macera',
    description: 'Se acerca el fin de semana, necesito macerar',
    completed: false
  }, {
    id: 1,
    name: 'Max Lynx',
    description: 'Hey, it\'s me',
    completed: true
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    description: 'I should buy a boat',
    completed: false
  }, {
    id: 3,
    name: 'Perry Governor',
    description: 'Look at my mukluks!',
    completed: false
  }, {
    id: 4,
    name: 'Mike Harrington',
    description: 'This is wicked good ice cream.',
    completed: false
  }];

  return {
    all: function() {
      return items;
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
