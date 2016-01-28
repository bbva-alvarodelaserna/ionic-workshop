angular.module('starter.controllers')

.controller('TodoCtrl', ['$scope', 'List', '$ionicModal', function($scope, List, $ionicModal) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var vm = this;

  vm.addDialog = "";
  vm.list = List.all();
  vm.remove = function(chat) {
    List.remove(chat);
  };

  vm.markAsCompleted = function(item) {
      item.completed = true;
  }

  // Load the add / change dialog from the given template URL
  $ionicModal.fromTemplateUrl('templates/dialog.html', function(modal) {
    vm.addDialog = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });


  vm.showDialog = function() {
    vm.addDialog.show();
  };

  vm.leaveDialog = function() {
    // Remove dialog 
    vm.addDialog.remove();
    // Reload modal template to have cleared form
    $ionicModal.fromTemplateUrl('templates/dialog.html', function(modal) {
      vm.addDialog = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });
  };

  vm.addItem = function(form) {
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
