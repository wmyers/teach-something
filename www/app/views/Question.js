/**
 * Created by william.myers on 07/07/2014.
 */
define(function (require) {

    var $                   = require('jquery-private'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Question.html'),
        template = _.template(tpl);

    return Backbone.View.extend({
        render: function () {
            this.$el.html(template());
            return this;
        }
    });
});
