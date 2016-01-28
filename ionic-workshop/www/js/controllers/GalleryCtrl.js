angular.module('starter.controllers')

.controller('GalleryCtrl', ['$scope', 'ImageService', 'FileService', function($scope, ImageService, FileService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var vm = this;

  vm.images = FileService.getImages();
  vm.addImage = addImage;

  function addImage(){
    ImageService.addImageFromCamera().then(function(imageData) {
      console.log(imageData);
      var imgURI = "data:image/jpeg;base64," + imageData;
      FileService.addImage(imgURI);
      vm.images = FileService.getImages();
    });
  }

  }]);
