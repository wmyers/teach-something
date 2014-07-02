define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var messages = require('./messages');


    // Load library/vendor modules using
    // full IDs, like:
    var print = require('print');


    print(messages.getHello());

    //apply nativeUtils augmentation
    require(['utils/nativeUtils']);


    // test jquery
    //var jquery = require('jquery-private');
});
