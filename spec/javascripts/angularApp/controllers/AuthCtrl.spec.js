describe('sorting the list of users', function() {
  beforeEach(module('ticketApp'));
  var $controller,$resource, $auth, $uibModalInstance, $location, $window;

  beforeEach(inject(function(_$controller_, _$resource_, _$auth_, _$location_, _$uibModal_, _$window_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_, $resource = _$resource_, $auth=_$auth_, $location=_$location_, $window=_$window_;
    $uibModalInstance = _$uibModal_.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/auth/login_form.htm',
      controller: 'AuthCtrl'
    });
  }));

  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      $uibModalInstance = {};
      var controller = $controller('AuthCtrl', { $scope: $scope , $resource: $resource, $auth: $auth, $uibModalInstance: $uibModalInstance, $location: $location, $window: $window});
      $scope.registrationForm = {};
      $scope.registerUser();
      $scope.loginForm = {};
      $scope.loginUser();
    });
  });
});