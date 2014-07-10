define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        print       = require('print'),
        $questions = $('#questions');

//        shellView = new ShellView({el: $body}).render(),
//        $content = $("#content", shellView.el),
//        homeView = new HomeView({el: $content});

    // Close the search dropdown on click anywhere in the UI
//    $body.click(function () {
//        $('.dropdown').removeClass("open");
//    });
//
//    $("body").on("click", "#showMeBtn", function (event) {
//        event.preventDefault();
//        shellView.search();
//    });

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "questions/:id": "questionDetails"
        },

        home: function () {
//            homeView.delegateEvents(); // delegate events when the view is recycled
//            homeView.render();
//            shellView.selectMenuItem('home-menu');
            this.questionDetails(1);  //nb: 'this' scope different due to Backbone.router.extend?
        },

//        contact: function () {
//            require(["app/views/Contact"], function (ContactView) {
//                var view = new ContactView({el: $content});
//                view.render();
//                shellView.selectMenuItem('contact-menu');
//            });
//        },

        questionDetails: function (id) {
            require(["app/views/Question", "app/models/question"], function (QuestionView, models) {
                var question = new models.Question({id: id});

                question.fetch({
                    success: function (data) {
                        // Note that we could also 'recycle' the same instance of QuestionView
                        // instead of creating new instances
                        var view = new QuestionView({model: data, el: $questions});
                        view.render();
                    }
                });
            });
        }

    });

});