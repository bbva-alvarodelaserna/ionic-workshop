angular.module('imageServices', [])

.factory('ImageService', ['$cordovaCamera', '$ionicActionSheet', '$q',
  '$cordovaImagePicker', '$ionicPlatform', '$cordovaFile', 'FileService',
  function($cordovaCamera, $ionicActionSheet, $q, $cordovaImagePicker, $ionicPlatform, $cordovaFile, FileService) {

    var obj = {
      makeID: function(){
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     
        for (var i = 0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      },
      getImageFromGallery: function() {
          var q = $q.defer();
          // Image picker will load images according to these settings
          var options = {
            maximumImagesCount: 1, // Max number of selected images
            width: 400,
            height: 400,
            quality: 60 // Higher is better
          };
          
          $cordovaImagePicker.getPictures(options).then(function(results) {
            q.resolve(results);
          }, function(error) {
            q.reject(error);
            console.log('Error: ' + JSON.stringify(error)); // In case of error
          });
          return q.promise;
      },
      addImageFromCamera: function() {
          var q = $q.defer();
          var options = {
            quality: 60,
            destinationType: Camera.DestinationType.DATA_URL, // for base64
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 300,
            saveToPhotoAlbum: false
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            q.resolve(imageData);
          }, function(err) {
            q.reject(err);
            console.log(err);
          });
          return q.promise;
      },
      addProfileImageFromCamera: function() {
          var q = $q.defer();
          var options = {
            quality: 60,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
          };
          
          $cordovaCamera.getPicture(options).then(function(imageData) {
            q.resolve(imageData);
          }, function(err) {
            console.log(err);
            q.reject(err);
          });
          
          return q.promise;
      },
      optionsForType: function(type, allow) {
        var source;
        switch (type) {
          case 0:
            source = Camera.PictureSourceType.CAMERA;
            break;
          case 1:
            source = Camera.PictureSourceType.PHOTOLIBRARY;
            break;
        }

        var options = {
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: source,
          quality: 50,
          allowEdit: allow,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          targetWidth: 300,
          saveToPhotoAlbum: true
        };
        return options;
      },
      saveMedia: function(type, allowEdit) {
        return $q(function(resolve, reject) {
          var options = obj.optionsForType(type, allowEdit);
     
          $cordovaCamera.getPicture(options).then(function(imageUrl) {
            var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
            var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
            var newName = obj.makeID() + name;
            
            $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
              .then(function(info) {
                FileService.addImage(newName);
                resolve(info.nativeURL);
              }, function(e) {
                reject();
              });
          });
        });
      }
    }

    return obj;
}]);