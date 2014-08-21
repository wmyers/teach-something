/**
 * Created by william.myers on 07/07/2014.
 */
define(function (require) {

    var $                  = require('jquery'),
        _                  = require('underscore'),
        Backbone           = require('backbone'),
        tpl                = require('text!tpl/AskQuestion.html'),
        print              = require('print'),
        shared             = require('app/shared'),
        models             = require('app/models/questionModel'),
        template = _.template(tpl);

    return Backbone.View.extend({

        events: function() {
            var ev = {};
            var id = this.model.get('id');
            var q =  '#question-' + id;
            var next_selector = q + " button.next";
            var prev_selector = q + " button.prev";
            ev['click ' + next_selector] = 'nextFunc';
            ev['click ' + prev_selector] = 'prevFunc';

            return ev;
        },

        initialize : function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(template(this.model.attributes));
            return this;
        },

        renderOnce: function () {
            var $q = $('#question-'+this.model.id, this.$el);
            if($q.length === 0) {
                this.render();
            }
            return this;
        },

        prevFunc: function (){
            shared.router.navigate('questions/'+(Number(this.model.id)-1), true);
        },

        nextFunc: function (){
            shared.router.navigate('questions/'+(Number(this.model.id)+1), true);
        }
    });
});
