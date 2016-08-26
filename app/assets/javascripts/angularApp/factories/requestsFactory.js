appFactories.factory('requestsFactory', ['$resource', '$http',function($resource, $http){
  return {
    requests: $resource(
      '/requests.json',
      {},
      {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
      }
    ),
    request: $resource(
      '/requests/:id.json',
      {},
      {
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
      }
    ),
    pdfRequest: function () {
        return $http(
          {
            url: '/requests.pdf',
            method: 'GET',
            headers: {
                accept: 'application/pdf',
            },
            type: 'application/pdf',
            responseType: 'arraybuffer',
            cache: true,
            transformResponse: function (data) {
              var pdf;
              if (data) {
                  pdf = new Blob([data], {
                      type: 'application/pdf'
                  });
              }
              return {
                  response: pdf
              };
            }
          }
      )
    }
  };
}]);