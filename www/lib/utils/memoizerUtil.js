/**
 * Created by william.myers on 02/07/2014.
 */

//Taken from Javascript The Good Parts

//***************************************
//Memoization Util
//***************************************
//useful for storing values during recursion
//shell function deals with the memoizing and wraps the passed-in fundamental function
define(function () {
    return function (memo, fundamental) {
        var shell = function (n) {
            var result = memo[n];
            if (typeof result !== 'number') {
                result = fundamental(shell, n);
                memo[n] = result;
            }
            return result;
        };
        return shell;
    };
});
