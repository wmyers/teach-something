/**
 * Created by william.myers on 02/07/2014.
 */
define(function () {
    return function(namespaceString){
        var parts = namespaceString.split("."),
            parent = this,    currentPart = "";

        for(var i = 0, length = parts.length; i < length; i++){
            currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart];
        }
        return parent;
    }
});
