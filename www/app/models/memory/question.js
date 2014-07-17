define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        print               = require('print'),

        questions = [
            {"id": 1, "qText": "What do you want to teach", "qCategory": "General"},
            {"id": 2, "qText": "What do you need to teach this", "qCategory": "Resources"},
            {"id": 3, "qText": "How many students can you teach this to", "qCategory": "Students"},
            {"id": 4, "qText": "How long will it take to teach this", "qCategory": "Time"}
        ],

        findById = function (id) {
            var deferred = $.Deferred(),
                question = null,
                l = questions.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (questions[i].id === id) {
                    question = questions[i];
                    break;
                }
            }
            deferred.resolve(question);
            return deferred.promise();
        },

//        findByQText = function (searchKey) {
//            var deferred = $.Deferred(),
//                results = questions.filter(function (element) {
//                    var qText = element.qText;
//                    return qText.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
//                });
//            deferred.resolve(results);
//            return deferred.promise();
//        },

//        findByQCategory = function (searchKey) {
//            var deferred = $.Deferred(),
//                results = questions.filter(function (element) {
//                    var qCategory = element.qCategory;
//                    return qCategory.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
//                });
//            deferred.resolve(results);
//            return deferred.promise();
//        },

        Question = Backbone.Model.extend({

            sync: function (method, model, options) {
                if (method === "read") {
                    findById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                }
            },

            refresh: function(){
                this.trigger("change", []);
            }

        }),

        QuestionCollection = Backbone.Collection.extend({

            model: Question,

//            add: function(question) {
//                print("added question="+question.get("id")+" to questionCollection");
//            }

// use fetch/sync when adding query groups of models to the collection in one go - e.g. with a search
//            sync: function (method, model, options) {
//                if (method === "read") {
//                    findByQText(options.data.qText).done(function (data) {
//                        options.success(data);
//                    });
//                }
//            }

        }),

        utils = {
            isValidQuestionID : function(id) {
                return (id > 0 && id <= questions.length);
            },
            isQuestionIDInCollection : function(id, questionCollection){
                _.each(questionCollection.models, function (q) {
                    if(q.id === id){
                        return true;
                    }
                });
                return false;
            },
            getQuestionByIDFromCollection : function(id, questionCollection){
                _.each(questionCollection.models, function (q) {
                    if(q.id === id){
                        return q;
                    }
                });
                return null;
            }
        };

    return {
        Question: Question,
        QuestionCollection: QuestionCollection,
        utils: utils
    };

});