// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        tpl: '../tpl'
    },
    map: {
        '*': {
            'app/models/questionModel': 'app/models/memory/questionModel'
        }
    }
});

//define jquery as a non-global
//define('jquery-private', ['jquery'], function (jq) {
//    return jq.noConflict( true );
//});


//Use route to start application
require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {
    var router = new Router();

    //using a shim to share the router instance in different modules
    require(['app/shared'], function(shared){
        shared.router = router;
    });

    Backbone.history.start();
});

