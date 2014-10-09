Angular Object Viewer
=====================

A basic angular module to test bower injestion.

## What it does
AngularJS directive that ingests an object and creates an html breakdown of the parts of that object.

## Usage

### Dependency in your app

You will need to include ```angularObjectViewer``` in your list of app dependencies:

```
'use strict';

angular.module('angularApp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'angularObjectViewer'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
	  	...
```

### Using the directive in your html

#### Short version:

```<object-viewer object="YouAmazingObject"></object-viewer>```

#### Longer version

The code below assumes that you have an object on your scope named 'scopedObject'

```
<div ng-repeat="object in scopedObject">
  <object-viewer object="object"></object-viewer>
</div>
```