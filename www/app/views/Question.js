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
        models      = require('app/models/question'),
        template = _.template(tpl);

    return Backbone.View.extend({

        events: function() {
            //reference unique id for selector (prevents multiple event firing)
            var selector = '#question-' + this.model.get('id') + " a.next";
            var ev = {};
            ev['click ' + selector] = 'next';
            return ev;
        },

        initialize : function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            var $q = $('#question-'+this.model.id, this.$el);
            if($q.length === 0){
                this.$el.append(template(this.model.attributes));
            }
            return this;
        },

        next: function (){
            var id = Number(this.model.id);
            var nextId = id+1;
            //print("calling next from question", id);
            shared.router.navigate('questions/'+nextId, true);
        }
    });
});
