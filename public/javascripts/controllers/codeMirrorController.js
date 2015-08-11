var app = angular.module('app', ['ui.codemirror']);

app.controller('CodeMirror', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
    // The ui-codemirror option
    $scope.cmTemplate = {
        lineNumbers: true,
        indentWithTabs: true,
        mode: "text/html",
        theme: "monokai"
    };

    $scope.cmData = {
        lineNumbers: true,
        indentWithTabs: true,
        mode: "javascript",
        theme: "monokai"
    };

     // Initial code content template...
     $scope.template =   "<html>\n"+
                         "    <head>\n"+
                         "        <meta charset=\"utf8\" />\n"+
                         "        <link href=\"//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css\" rel=\"stylesheet\">\n"+
                         "    </head>\n"+
                         "    <body>\n"+
                         "        <h1>Title</h1>\n"+
                         "        <table class=\"table table-bordered\">\n"+
                         "            <tr>\n"+
                         "                <th>Name</th>\n"+
                         "                <th>Country</th>\n"+
                         "            </tr>\n"+
                         "            {{#each persons}}\n"+
                         "                <tr>\n"+
                         "                    <td>{{name}}</td>\n"+
                         "                    <td>{{country}}</td>\n"+
                         "                </tr>\n"+
                         "            {{/each}}\n"+
                         "        </table>\n"+
                         "    </body>\n"+
                         "</html>";

    // Initial code content data...
    $scope.data =   "{\n"+
                    "  \"persons\": [\n"+
                    "       {\"name\": \"Brasileiro 1\", \"country\": \"Brasil\"},\n"+
                    "       {\"name\": \"Brasileiro 2\", \"country\": \"Brasil\"},\n"+
                    "       {\"name\": \"Brasileiro 3\", \"country\": \"Brasil\"},\n"+
                    "       {\"name\": \"Mexicano 1\", \"country\": \"México\"},\n"+
                    "       {\"name\": \"Mexicano 2\", \"country\": \"México\"},\n"+
                    "       {\"name\": \"Mexicano 3\", \"country\": \"México\"},\n"+
                    "       {\"name\": \"Norueguês 1\", \"country\": \"Noruega\"}\n"+
                    "  ]\n"+
                    "}";
    /*
    // -- example 2 --
    $scope.template =   "Rock And {{complete}}";

    // Initial code content data...
    $scope.data =   "{ \n"+
                    "    \"complete\": \"Roll!!!\" \n"+
                    "}";
    */

    //---------------------------------------------------------------------


    $scope.renderpdf = function() {

        var myParams = {
            "template": {"content": $scope.template, "recipe": "phantom-pdf"},
            "data": $scope.data
        };

        $http.post('https://playground.jsreport.net/api/report',myParams, {responseType:'arraybuffer'})
            .success(function (response) {
                var file = new Blob([response], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(file);

                $scope.content = $sce.trustAsResourceUrl(fileURL);
            });
    }

}]);
