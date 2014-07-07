define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
//    var messages = require('./messages');


    // Load library/vendor modules using
    // full IDs, like:
    var print = require('print');


//    print(messages.getHello());

    //apply nativeUtils augmentation
//    require(['utils/nativeUtils']);

    //test render a question
    var Question = require('app/views/Question');

    var $ = require('jquery-private');
    var $questions = $('#questions');
    var q = new Question({el:$questions});
    q.render();

});
