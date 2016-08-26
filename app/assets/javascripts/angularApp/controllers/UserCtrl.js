appControllers.controller("UserCtrl", ['$scope', '$resource', '$route', 'usersFactory', 'userTypes', function ($scope, $resource, $route, usersFactory, userTypes) {
  $scope.users = usersFactory.users.query();
  $scope.usersFiltered = $scope.users;
  $scope.users_types = userTypes.query();

  $scope.updateType = function (user, type) {
    user.type = type;
    usersFactory.user.update({id: user.id, user: user}, function (res) {
      $scope.usersFiltered.forEach(function (item, i) {
        if(item.id == user.id){
          $scope.usersFiltered[i] = user;
        }
      });
      $route.reload();
    }, function (error) {
      alert(JSON.stringify(error))
    });
  };

  $scope.deleteUser = function (user_id) {
    usersFactory.user.delete({id: user_id}, function (res) {
      $scope.usersFiltered.forEach(function (item, i) {
        if(item.id == user_id){
          delete $scope.usersFiltered[i];
        }
      });
      $route.reload();
    }, function (error) {
      alert(JSON.stringify(error))
    });
  };

  $scope.filterUsers = function () {
    var that = this;
    $scope.usersFiltered = $scope.users.filter(function (user) {
      if((!that.userFilter.name || user.name.indexOf(that.userFilter.name) != -1) &&
        (!that.userFilter.label || user.label.indexOf(that.userFilter.label) != -1) &&
        (!that.userFilter.type || user.type == that.userFilter.type)){
        return user;
      }
    });
  };
}]);