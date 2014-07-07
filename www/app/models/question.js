/**
 * Created by william.myers on 07/07/2014.
 */
define(function (require) {
    var $           = require('jquery'),
        Backbone    = require('backbone'),

        Question = Backbone.Model.extend({

            initialize: function () {

            }

        })

    return {
        Question: Question
    };

});
