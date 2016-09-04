angular.module('node', [])

.controller('list', function($scope, $http) {
 $scope.formData="";
 $scope.alumnidata=[];
 var username="sd";
 $scope.checklist=false;
 $scope.checkview=false;
 $scope.checkfav=false;
  $http.post('/get_data', $scope.formData)
      .success(function(data) {
       if(data.length!=0)
       {
         $scope.checklist=true;
         $scope.checkview=false;
         $scope.checkfav=false;
         for(i=0;i<data.length;i++)
          $scope.alumnidata.push(data[i]);
         //console.log($scope.alumnidata);
       }
      else {
        $scope.checklist=false;
      }
    })
      .error(function(error) {
          console.log('Error: ' + error);
      });
      $scope.view=function(index){
        //console.log(index);
         $scope.jobopening=[];
         $scope.checklist=false;
         $scope.checkfav=false;
         $scope.userdata=[];
         $scope.checkview=true;
        // console.log($scope.alumnidata[index]);
         $scope.userdata.push($scope.alumnidata[index]);
         $scope.jobopening=$scope.userdata[0].jobopenings.split(",");
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
            $scope.checkview=false;
            $scope.checklist=false;
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
