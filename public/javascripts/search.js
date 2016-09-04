angular.module('node', [])

.controller('search', function($scope, $http) {
  $scope.checkalumni=false;
  $scope.checkstudent=false;
  $scope.checknotfound=false;
  $scope.checkfav=false;
  var username=window.localStorage["username"];
//  console.log("dsa");
  $scope.formData = {};
  $scope.searchPeople = function(){
    console.log($scope.people);
    $scope.people1="";
    $scope.formData.name1 = $scope.people;
    $http.post('/view_user', $scope.formData)
        .success(function(data) {
          $scope.checkfav=false;
          if(data.length!=0)
          {
            //console.log("1");
            $scope.detail = data[0];
            $scope.checkalumni=false;
            $scope.checknotfound=false;
            $scope.checkstudent=true;
          }//  console.log(data);
          else {
              $scope.checknotfound=true;
              $scope.checkstudent=false;
              $scope.checkalumni=false;
            //  console.log("2");
          }
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
  }
  $scope.searchPeople1 = function(){
    console.log($scope.people1);
    $scope.people="";
    $scope.jobopening=[];
    $scope.formData.name1 = $scope.people1;
    $http.post('/view_user1', $scope.formData)
        .success(function(data) {
          $scope.checkfav=false;
           if(data.length!=0)
           {
            $scope.detail = data[0];
            $scope.checkalumni=true;
            $scope.checkstudent=false;
            $scope.checknotfound=false;
            $scope.jobopening=$scope.detail.jobopenings.split(",");
          //  console.log($scope.jobopening);
          }
          else {
            $scope.checknotfound=true;
            $scope.checkstudent=false;
            $scope.checkalumni=false;
          //  console.log("4");
          }
           //  console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
  }

  $scope.Addfav=function(fav_username){
     $scope.formData={};
     $scope.formData.username=username;
     $scope.formData.favusername=fav_username

   $http.post('/add_fav',$scope.formData)
   .success(function(data) {
      //console.log(data);
   })
   .error(function(error) {
       console.log('Error: ' + error);
   });
  }
  $scope.Viewfav=function(){
     $scope.formData={};
     $scope.viewfav=[];
     $scope.formData.username=username;

    // console.log("by");
   $http.post('/get_fav',$scope.formData)
   .success(function(data) {
      if(data.length!=0)
      {
        $scope.checkfav=true;
        $scope.checkalumni=false;
        $scope.checkstudent=false;
        for(i=0;i<data.length;i++)
        {
          $scope.viewfav.push(data[i].favusername);
        }

      }

   })
   .error(function(error) {
       console.log('Error: ' + error);
   });
  }
});
