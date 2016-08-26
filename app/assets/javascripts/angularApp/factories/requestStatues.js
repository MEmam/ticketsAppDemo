appFactories.factory('requestStatues', ['$resource',function($resource){
  return $resource('/requests/statuses.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);