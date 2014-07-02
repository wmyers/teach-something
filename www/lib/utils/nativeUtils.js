/**
 * Created by william.myers on 02/07/2014.
 */

//Taken from Javascript The Good Parts

define(function () {

    var print = require('print');
    print("**** applying nativeUtils augmentation ****");

    //***************************************
    //Method augmenter
    //***************************************
    if (typeof Function.method !== 'function'){
        Function.prototype.method = function (name, func) {
            this.prototype[name] = func;
            return this;
        };
    }

    //***************************************
    //Begetter - applies an object to the prototype of a Function
    //***************************************
    if (typeof Object.beget !== 'function') {
        Object.beget = function (o) {
            var F = function () {};
            F.prototype = o;
            return new F();
        };
    }

    //***************************************
    //Number Utils
    //***************************************
    //Augment Number with a method for rounding to an integer
    if (typeof Number.integer !== 'function') {
        Number.method('integer', function () {
            return Math[this < 0 ? 'ceiling' : 'floor'](this);
        });
    }

    //***************************************
    //String Utils
    //***************************************
    //De-entify HTML tag chars
    if (typeof String.deentityify !== 'function') {
    // Notice the last line. We immediately invoke the function we just made with the ( ) operator.
    // That invocation creates and returns the function that becomes the deentityify method.
        String.method('deentityify', function () {
    // The entity table. It maps entity names to
    // characters.
            var entity = {
                quot: '"',
                lt: '<',
                gt: '>' };
    // Return the deentityify method.
            return function () {
    // This is the deentityify method. It calls the string
    // replace method, looking for substrings that start
    // with '&' and end with ';'. If the characters in
    // between are in the entity table, then replace the
    // entity with the character from the table. It uses
    // a regular expression (Chapter 7).
                return this.replace(/&([^&;]+);/g, function (a, b) {
                        var r = entity[b];
                        return typeof r === 'string' ? r : a;
                    }
                );
            };
        }());
    }

    //***************************************
    //Curry Util
    //***************************************
    /*
     The curry method works by creating a closure that holds that original function and the arguments to curry.
     It returns a function that, when invoked, returns the result of calling that original function,
     passing it all of the arguments from the invocation of curry and the current invocation.
     It uses the Array concat method to concatenate the two arrays of arguments together.
     */
    if(typeof Function.curry !== 'function') {
        Function.method('curry', function () {
            var slice = Array.prototype.slice,
                args = slice.apply(arguments),
                that = this;
            return function () {
                return that.apply(null, args.concat(slice.apply(arguments)));
            };
        });
    }
});



