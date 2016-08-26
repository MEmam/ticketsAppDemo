describe('sorting the list of users', function() {
  beforeEach(module('ticketApp'));
  var $controller, $resource, $auth, $uibModal, $window;

  beforeEach(inject(function(_$controller_, _$resource_, _$auth_, _$uibModal_, _$window_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_, $resource = _$resource_, $auth=_$auth_, $uibModal=_$uibModal_, $window=_$window_;
  }));

  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      var controller = $controller('MainCtrl', { $scope: $scope , $resource: $resource, $auth: $auth, $uibModal: $uibModal, $window: $window});
      $scope.openSignin();
      $scope.openSignUp();
      $scope.signOutUser();
    });
  });
});