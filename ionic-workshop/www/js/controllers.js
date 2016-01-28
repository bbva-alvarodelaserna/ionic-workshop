angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('TodoCtrl', function($scope, List) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.List = List.all();
  $scope.remove = function(chat) {
    List.remove(chat);
  };
})

.controller('TodoDetailCtrl', function($scope, $stateParams, List) {
  $scope.chat = List.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
