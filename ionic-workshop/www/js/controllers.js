angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('TodoDetailCtrl', function($scope, $stateParams, List) {
  $scope.chat = List.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
