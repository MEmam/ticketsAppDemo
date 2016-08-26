appControllers.controller("RequestCtrl", ['$scope', '$resource', '$route', 'requestsFactory', 'requestStatues', function ($scope, $resource, $route, requestsFactory, requestStatues) {
  $scope.requests = requestsFactory.requests.query();
  $scope.requestsFiltered = $scope.requests;
  $scope.request_statuses = requestStatues.query();

  $scope.createRequest = function () {
    var that = this;
    requestsFactory.requests.create({request: that.requestForm}, function(res){
      $scope.requestsFiltered.push(res);
      that.requestForm = {};
    }, function(error){
      alert(JSON.stringify(error))
    });
  };

  $scope.updateStatus = function (request, status_id) {
    request.request_status_id = status_id;
    requestsFactory.request.update({id: request.id, request: request}, function (res) {
      $scope.requestsFiltered.forEach(function (item, i) {
        if(item.id == request.id){
          $scope.requestsFiltered[i] = request;
        }
      });
      $route.reload();
    }, function (error) {
      alert(JSON.stringify(error))
    });
  };

  $scope.deleteRequest = function (request_id) {
    requestsFactory.request.delete({id: request_id}, function (res) {
      $scope.requestsFiltered.forEach(function (item, i) {
        if(item.id == request_id){
          delete $scope.requestsFiltered[i];
        }
      });
      $route.reload();
    }, function (error) {
      alert(JSON.stringify(error))
    });
  };

  $scope.filterRequest = function () {
    var that = this;
    $scope.requestsFiltered = $scope.requests.filter(function (request) {
      if((!that.requestFilter.name || request.name.indexOf(that.requestFilter.name) != -1) &&
        (!that.requestFilter.label || request.label.indexOf(that.requestFilter.label) != -1) &&
        (!that.requestFilter.request_status || request.request_status == that.requestFilter.request_status)){
        return request;
      }
    });
  };

  $scope.downLoadPdf = function () {
    requestsFactory.pdfRequest().success(function (data, status, headers, config) {
      var url = URL.createObjectURL(data.response);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'closed_request.pdf';
      a.target = '_blank';
      a.click();
      a.remove();
    }).catch(function (err) {
      console.log(err);
    })
  }
}]);