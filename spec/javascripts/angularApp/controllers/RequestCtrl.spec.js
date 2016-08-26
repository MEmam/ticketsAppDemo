describe('sorting the list of users', function() {
  beforeEach(module('ticketApp'));
  var $controller, $resource, $route, requestsFactory, requestStates;

  beforeEach(inject(function(_$controller_, _$resource_, _$route_, _requestsFactory_, _requestStates_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_, $resource = _$resource_, $route=_$route_, requestsFactory=_requestsFactory_, requestStates=_requestStates_;
  }));

  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      var controller = $controller('RequestCtrl', { $scope: $scope , $resource: $resource, $route: $route, requestsFactory: requestsFactory, requestStates: requestStates});
      $scope.createRequest();
      $scope.updateStatus({}, 0);
      $scope.deleteRequest(0);
      $scope.downLoadPdf();
      $scope.requests = [
        {name: "some name", label: "some label", request_status: "new"},
        {name: "another name", label: "another label", request_status: "closed"}
      ];
      $scope.requestFilter = {name: "some", label: "some"};
      $scope.filterRequest();
      expect($scope.requestsFiltered.length).toEqual(1)
    });
  });
});