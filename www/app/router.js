define(function (require) {

    "use strict";

    var $                           = require('jquery'),
        Backbone                    = require('backbone'),
        print                       = require('print'),

        model                       = require('app/models/questionModel'),
        currentQuestions            = new model.QuestionCollection(),

        ShellView                   = require('app/views/shellView'),
        shellView                   = new ShellView({el: $('body'), collection:currentQuestions}).render(),

        $questions                  = $("#qp-questions", shellView.el),
        questionView;


    return Backbone.Router.extend({

        routes: {
            "": "home",
            "questions/:id": "showQuestion"
        },

        home: function () {
            this.showQuestion(1);
        },

        showQuestion: function (id) {
            print("router.showQuestion", id);
            require(["app/views/askQuestionView", "app/models/questionModel"], function (AskQuestionView, model) {

                var modelUtils = model.utils;

                if(modelUtils.isValidQuestionID(id)){
                    var question  = modelUtils.getQuestionByIDFromCollection(id, currentQuestions);

                    if(question === null){
                        question = new model.Question({id: id});

                        question.fetch({
                            success: function (data) {
                                //add to collection
                                currentQuestions.add(question);
                            }
                        }); 
                    }
                    if(questionView === undefined){
                        questionView = new AskQuestionView({model:question, el: $questions});
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