/*!
 * Object Viewer
 * https://github.com/scottnath/object-viewer
 * @license MIT
 * v0.2
 */
(function(){

angular.module('angularObjectViewer',['angular-object-viewer/object-viewer-template.html', 'angularObjectViewerFilters'])

  .directive('objectViewer',['RecursionHelper', function(RecursionHelper) {
    return {
      restrict: 'E',
      templateUrl: 'angular-object-viewer/object-viewer-template.html',
      scope: {object: '='},
      compile: function(element) {
        return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){
          // Define your normal link function here.
          // Alternative: instead of passing a function,
          // you can also pass an object with
          // a 'pre'- and 'post'-link function.
        });
      },
      controller: function($scope){
        $scope.test = function (value){
          if (angular.isFunction(value)) {
            return null;
          }
          return value;
        };
      },
      link: function(scope, element, attrs, fn) {

      }
    };
  }])
  .factory('RecursionHelper', ['$compile', function($compile){
    return {
      /**
      * @ngdoc method
      * @name angularApp.RecursionHelper#compile
      * @methodOf angularApp.RecursionHelper
      * @description
      * Manually compiles the element, fixing the recursion loop.
      * @param element
      * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
      * @returns An object containing the linking functions.
      */
      compile: function(element, link){
        // Normalize the link parameter
        if(angular.isFunction(link)){
          link = { post: link };
        }

        // Break the recursion loop by removing the contents
        var contents = element.contents().remove();
        var compiledContents;
        return {
          pre: (link && link.pre) ? link.pre : null,
          /**
           * Compiles and re-adds the contents
           */
          post: function(scope, element){
            // Compile the contents
            if(!compiledContents){
              compiledContents = $compile(contents);
            }
            // Re-add the compiled contents to the element
            compiledContents(scope, function(clone){
              element.append(clone);
            });

            // Call the post-linking function, if any
            if(link && link.post){
              link.post.apply(null, arguments);
            }
          }
        };
      }
    };
  }]);

angular.module('angularObjectViewerFilters', [])
  .filter('checkValueType', function () {
    return function (item) {
      if(angular.isArray(item)){
        return 'array';
      }else if(angular.isObject(item)){
        return 'object';
      }else if(angular.isFunction(item)){
        return 'function';
      }else{
        return 'string';
      }
    };
  });

  angular.module("angular-object-viewer/object-viewer-template.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("angular-object-viewer/object-viewer-template.html",
      '<div class="object--MAIN">\n' +
      '  <dl ng-repeat="(key, value) in object" ng-show="test(value)" class="object--property">\n' +
      '    <dt class="object--key">{{key}}</dt>\n' +
      '    <dd class="object--value" ng-switch on="value | checkValueType">\n' +
      '      <div ng-switch-when="object"><object-viewer object="value"></object-viewer></div>\n' +
      '      <div ng-switch-when="array"><pre>{{value | json}}</pre></div>\n' +
      '      <div ng-switch-default>{{value}}</div>\n' +
      '    </dd>\n' +
      '  </dl>\n' +
      '</div>\n'
      );
  }]);

})();
