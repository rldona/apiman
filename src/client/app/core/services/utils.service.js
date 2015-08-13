(function() {
  'use strict';

  angular
    .module('core.utils')
    .factory('utils', utils);

  // utils.$inject = ['$http'];

  function utils() {

    return {
      formatURL : formatURL
    };

    ////////

    function formatURL(url) {
        var finalChar = url[url.length-1];
        var finalUrl = (finalChar !== '/') ? url + '/' : url;
        return finalUrl;
    }

  }

}());
