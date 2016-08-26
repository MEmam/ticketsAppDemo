appControllers.controller("AuthCtrl", ['$scope', '$resource', '$auth', '$uibModalInstance', '$location', '$window', function ($scope, $resource, $auth, $uibModalInstance, $location, $window) {
  $scope.registerUser = function() {
    $auth.submitRegistration($scope.registrationForm)
      .then(function() {
        $auth.submitLogin({
          email: $scope.registrationForm.email,
          password: $scope.registrationForm.password
        });
        $uibModalInstance.dismiss();
        $window.location.reload();
        $location.path('/');
      })
      .catch(function (err) {
        var errors = err.data.errors.full_messages || err.data.errors
        alert(errors.join("\n"))
      });
  };

  $scope.loginUser = function() {
    $auth.submitLogin($scope.loginForm)
      .then(function(resp) {
        $uibModalInstance.dismiss();
        $window.location.reload();
        $location.path('/');
      })
      .catch(function(resp) {
        alert(JSON.stringify(resp.errors.join('\n'))+"\n New User? Please Sign up")
      });
  };
}]);