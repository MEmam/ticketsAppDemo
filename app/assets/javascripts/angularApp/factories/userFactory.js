appFactories.factory('usersFactory', ['$resource',function($resource){
  return {
    users: $resource(
      '/users.json',
      {},
      {
        query: { method: 'GET', isArray: true },
      }
    ),
    user: $resource(
      '/users/:id.json',
      {},
      {
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
      }
    )
  };
}]);