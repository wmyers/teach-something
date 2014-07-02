/**
 * Created by william.myers on 02/07/2014.
 */

// external xml loader (including svg)
// taken from d3.xhr, d3.xml (version 2)
define(function () {
    var that = this;
    return {
        xhr: function(url, mime, callback) {
            var req = new XMLHttpRequest;
            if (arguments.length < 3)
                callback = mime, mime = null;
            else if (mime && req.overrideMimeType)
                req.overrideMimeType(mime);
            req.open("GET", url, true);

            if (mime) req.setRequestHeader("Accept", mime);
            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    var s = req.status;
                    callback(!s && req.response ||
                        s >= 200 && s < 300 ||
                        s === 304 ? req : null);
                }
            };
            req.send(null);
        },
        getXML: function(url, mime, callback) {
            function ready(req) {
                callback(req && req.responseXML);
            }

            if (arguments.length < 3) {
                callback = mime;
                mime = null;
            }
            that.xhr(url, mime, ready);
        }
    };
});


