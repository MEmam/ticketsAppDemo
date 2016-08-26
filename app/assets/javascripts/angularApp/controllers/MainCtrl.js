appControllers.controller("MainCtrl", ['$scope', '$resource', '$auth', '$uibModal', '$window', function ($scope, $resource, $auth, $uibModal, $window) {

  $scope.openSignin = function () {
    var modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/auth/login_form.htm',
      controller: 'AuthCtrl'
    });

    modalInstance.result.then(function () {
    });
  };
  $scope.openSignUp = function () {
    var modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/auth/registration_form.htm',
      controller: 'AuthCtrl'
    });

    modalInstance.result.then(function () {
    });
  };

  $scope.signOutUser = function() {
    $auth.signOut()
      .then(function(resp) {
        $window.location.reload();
      })
      .catch(function(resp) {
      });
  };
}]);