define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        print       = require('print'),

        models      = require('app/models/question'),
        currentQuestions = new models.QuestionCollection(),

        MainView   = require('app/views/main'),
        QuestionView   = require('app/views/Question'),
        $body = $('body'),
        mainView = new MainView({el: $body, collection:currentQuestions}).render(),
        $questions = $("#questions", mainView.el),
        questionView;


    return Backbone.Router.extend({

        routes: {
            "": "home",
            "questions/:id": "showQuestion"
        },

        home: function () {
            this.showQuestion(1);  //nb: 'this' scope different due to Backbone.router.extend?
        },

        showQuestion: function (id) {
            print("router.showQuestion", id);
            require(["app/views/Question", "app/models/question"], function (QuestionView, models) {

                var modelsUtils = models.utils;

                if(modelsUtils.isValidQuestionID(id)){
                    print("id", id, "is valid");
                    var question  = modelsUtils.getQuestionByIDFromCollection(id, currentQuestions);

                    if(question === null){
                        question = new models.Question({id: id});

                        question.fetch({
                            success: function (data) {
                                //add to collection
                                currentQuestions.add(question);
                            }
                        }); 
                    }

                    if(questionView === undefined){
                        questionView = new QuestionView({model:question, el: $questions});
                        questionView.render();
                    }else{
                        questionView.model.set(question.toJSON());
                        questionView.delegateEvents();
                    }
                    
                }else{
                    print("question id", id, "is invalid");
                    Backbone.history.history.back();
                }
            });
        }

    });

});