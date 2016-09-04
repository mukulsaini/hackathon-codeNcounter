angular.module('node', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.userData = {};
    $scope.check = true;
    $scope.loginCheck = false;
    $scope.registerCheck = false;


    $scope.register = function(){
      $scope.loginCheck = false;
      $scope.registerCheck = true;
      $scope.check = false;
    }
    $scope.rr ={};
    $scope.login = function(){
      $scope.loginCheck = true;
        $scope.check = false;
    }

    $scope.checkLogin = function(){
        $scope.formData.name = $scope.rr.username;
        $scope.formData.password = $scope.rr.password;

        $http.post('/login', $scope.formData)
          .success(function(data) {
              $scope.formData = {};
              $scope.userData = data[0];
              console.log(data);
              window.localStorage['username'] = data[0].username;
              window.localStorage['isAlumni'] = data[0].isalumni;
              window.location.href= "/updateDetail";

          })
          .error(function(error) {
              console.log('Error: ' + error);
          });

    }
    $scope.types = ["Alumni", "Student"]
    $scope.checkRegister = function(){
        console.log($scope.rr.selectedType);
        $scope.formData.name = $scope.rr.username;
        $scope.formData.password = $scope.rr.password;
        if ($scope.rr.selectedType == "Alumni") {
          $scope.formData.isAlumni = true;
        }else {
          $scope.formData.isAlumni = false;
        }
        $http.post('/register', $scope.formData)
          .success(function(data) {
              $scope.formData = {};
              $scope.userData = data[0];
              console.log(data);
              window.localStorage['username'] = data[0].username;
              window.localStorage['isAlumni'] = data[0].isAlumni;
              window.location.href= "/updateDetail";

          })
          .error(function(error) {
              console.log('Error: ' + error);
          });

    }


});
