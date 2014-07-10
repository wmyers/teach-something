define(function () {
    return function print() {
        var slice = Array.prototype.slice,
            args = slice.apply(arguments),
            msg = args.join(" ");
        console.log(msg);
    };
});
