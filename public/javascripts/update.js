angular.module('node', [])

.controller('update', function($scope, $http) {
  $scope.formData= {};
  $scope.rr= {};
  var name = "sd";
  $scope.rr.isAlumni = window.localStorage['isAlumni'];
  $scope.formData.name =  window.localStorage['username'];
  console.log(window.localStorage['username']);
  $scope.formData.isAlumni = $scope.rr.isAlumni;
  $http.post('/userData', $scope.formData)
    .success(function(data) {
        $scope.formData = {};
        $scope.userData = data[0];
        $scope.userData.isAlumni = $scope.rr.isAlumni;

    })
    .error(function(error) {
        console.log('Error: ' + error);
    });

    $scope.updateDetails = function(){
      $http.post('/userDataUpdate', $scope.userData)
        .success(function(data) {
          console.log("fdskjfdshkjsdfndsfjkdfshkdjf");
            $scope.formData = {};
            $scope.userData = data[0];
              window.location.href="/search";
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    }
});
