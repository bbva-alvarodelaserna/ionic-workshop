angular.module('starter.controllers')

.controller('TodoCtrl', ['$scope', 'List', '$ionicModal', function($scope, List, $ionicModal) {
  
  var vm = this;

  vm.list = List.all();
  vm.addDialog = {};
  vm.showDialog = showDialog;
  vm.remove = remove;
  vm.markAsCompleted = markAsCompleted;
  vm.leaveDialog = leaveDialog;
  vm.addItem = addItem;

  // Load the add / change dialog from the given template URL
  $ionicModal.fromTemplateUrl('/templates/dialog.html', function(modal) {
    vm.addDialog = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  function remove(chat) {
    List.remove(chat);
  };

  function markAsCompleted(item) {
    item.completed = true;
  }

  function showDialog() {
    console.log('entro');
    vm.addDialog.show();
  };

  function leaveDialog() {
    // Remove dialog 
    vm.addDialog.remove();
    // Reload modal template to have cleared form
    $ionicModal.fromTemplateUrl('/templates/dialog.html', function(modal) {
      vm.addDialog = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });
  };

  function addItem(form) {
    var newItem = {};
    // Add values from form to object
    newItem.description = form.description.$modelValue;
    newItem.name = form.name.$modelValue;
    
    // Save new list in scope and factory
    vm.list.push(newItem);
    List.setList(vm.list);
    // Close dialog
    vm.leaveAddChangeDialog();
  };

}]);
