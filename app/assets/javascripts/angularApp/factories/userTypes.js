appFactories.factory('userTypes', ['$resource',function($resource){
  return $resource('/users/types.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);