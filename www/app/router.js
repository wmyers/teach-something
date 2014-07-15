define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        print       = require('print'),
        $questions = $('#questions');


    return Backbone.Router.extend({

        routes: {
            "": "home",
            "questions/:id": "questionDetails"
        },

        home: function () {
            this.questionDetails(1);  //nb: 'this' scope different due to Backbone.router.extend?
        },

        questionDetails: function (id) {
            var that = this;
            print("router.questionDetails", id, "questionView=", that.questionView);
            require(["app/views/Question", "app/models/question"], function (QuestionView, models) {
                var question = new models.Question({id: id});

                question.fetch({
                    success: function (data) {
                        var questionView = new QuestionView({model: data, el: $questions});
                        questionView.render();
                    }
                });
            });
        }

    });

});