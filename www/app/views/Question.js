/**
 * Created by william.myers on 07/07/2014.
 */
define(function (require) {

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Question.html'),
        print              = require('print'),
        template = _.template(tpl);

    return Backbone.View.extend({
        render: function () {
            this.$el.html(template(this.model.attributes));
            return this;
        }
    });
});
