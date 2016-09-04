angular.module('node', [])

.controller('discussion', function($scope, $http) {
       $scope.questions=[];
  $http.post('/view_ques', $scope.formData)
    .success(function(data) {
        $scope.formData = {};
        for(i=0;i<data.length;i++)
        {
          $scope.questions.push(data[i]);
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
    console.log($scope.question);
     $scope.formData = {};

    $scope.formData.question = $scope.question;
    console.log($scope.question);

    $scope.formData.username = window.localStorage["username"];

    $http.post('/add_ques', $scope.formData)
      .success(function(data) {
        console.log($scope.questions);
          $scope.questions.unshift($scope.formData);
          console.log($scope.questions);
          $scope.formData = {};

          console.log(data);


          $scope.question = "";

      })
      .error(function(error) {
          console.log('Error: ' + error);
      });
  }
  $scope.read = function (question_id) {
      window.location.href ="answer?id="+question_id+"";
    }
});
