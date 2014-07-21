/**
 * Created by william.myers on 17/07/2014.
 */
define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        models              = require('app/models/question'),
        tpl                 = require('text!tpl/Main.html'),
        shared              = require('app/shared'),
        print               = require('print'),

        template = _.template(tpl);

    return Backbone.View.extend({

        events: {
           'click a.home': 'home'
        },

//        initialize: function () {
//            //this collection can be populated using a fetch call
//            this.questionList = new models.QuestionCollection();
//        },

        render: function () {
            this.$el.html(template());
            return this;
        },

        home: function (){
            print("calling home from main view");
            shared.router.navigate('', true);
        }
    });

});
