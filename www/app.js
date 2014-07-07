// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        tpl: '../tpl'
    }
});

//define jquery as a non-global
define('jquery-private', ['jquery'], function (jq) {
    return jq.noConflict( true );
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
