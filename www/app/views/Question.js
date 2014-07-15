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
        template = _.template(tpl);

    return Backbone.View.extend({
        events: {
            "click a.next": "next"
        },

        render: function () {
            this.$el.append(template(this.model.attributes));
            return this;
        },

        next: function (){
            var nextId = Number(this.model.id)+1;
            print("next question id=", nextId);
            shared.router.navigate('questions/'+nextId, true);
        }
    });
});
