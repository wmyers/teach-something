define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        print       = require('print'),

        models      = require('app/models/question'),
        currentQuestions = new models.QuestionCollection(),

        MainView   = require('app/views/main'),
        $body = $('body'),
        mainView = new MainView({el: $body, collection:currentQuestions}).render(),
        $questions = $("#questions", mainView.el);


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
                    //print("id", id, "is valid");
                    var question;
                    
                    if(!modelsUtils.isQuestionIDInCollection(id, currentQuestions)){
                        //print("question is NOT in collection");
                        question = new models.Question({id: id});

                        question.fetch({
                            success: function (data) {
                                //add to collection
                                currentQuestions.add(question);

                                var questionView = new QuestionView({model: data, el: $questions});
                                questionView.render();
                            }
                        }); 
                    }else{
                        //print("question is ALREADY in collection");
                        question = modelsUtils.getQuestionByIDFromCollection(id, currentQuestions);
                        question.refresh();
                    }
                    
                }else{
                    history.back();
                }
            });
        }

    });

});