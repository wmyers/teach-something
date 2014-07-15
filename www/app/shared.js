/**
 * Created by william.myers on 15/07/2014.
 */
define([], function () {
    require('print')("creating shared module ONLY ONCE");
    var shared = {};
    return shared;
});
