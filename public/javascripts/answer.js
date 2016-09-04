angular.module('node', [])

.controller('answer', function($scope, $http) {
       $scope.answers=[];
       $scope.formData ={};
       $scope.formData.id=window.location.href.substring(window.location.href.indexOf("=")+1);
       console.log($scope.formData.id);
  $http.post('/view_ans', $scope.formData)
    .success(function(data) {
        $scope.formData = {};
        for(i=0;i<data.length;i++)
        {
          $scope.answers.push(data[i]);
        }
      //  console.log(data);
        // window.localStorage['username'] = data[0].username;
        // window.localStorage['isAlumni'] = data[0].isalumni;
        // window.location.href= "/updateDetail";
      //  $scope.question = "";
    })
    .error(function(error) {
        console.log('Error: ' + error);
    });
  $scope.post = function () {
    console.log($scope.answer);
     $scope.formData = {};

    $scope.formData.answer = $scope.answer;
    console.log($scope.answer);

    $scope.formData.username = window.localStorage["username"];
    $scope.formData.id=window.location.href.substring(window.location.href.indexOf("=")+1);
    $http.post('/add_ans', $scope.formData)
      .success(function(data) {
          $scope.answers.unshift($scope.formData);
        //  console.log($scope.questions);
          $scope.formData = {};
          console.log(data);
          $scope.answer = "";

      })
      .error(function(error) {
          console.log('Error: ' + error);
      });
  }
});
