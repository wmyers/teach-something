/**
 * Created by william.myers on 07/07/2014.
 */
define(function (require) {

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Question.html'),
        print              = require('print'),
        shared             = require('app/shared'),
        models             = require('app/models/question'),
        template = _.template(tpl);

    return Backbone.View.extend({

        events: function() {
            var ev = {};
            var id = this.model.get('id');
            var selector = '#question-' + id + " a.next";
            ev['click ' + selector] = 'next';
            selector = '#question-' + id + " a.prev";
            ev['click ' + selector] = 'prev';

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

        prev: function (){
            shared.router.navigate('questions/'+(Number(this.model.id)-1), true);
        },

        next: function (){
            shared.router.navigate('questions/'+(Number(this.model.id)+1), true);
        }
    });
});
