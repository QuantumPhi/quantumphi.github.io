define(['jquery'], function() {
    $.getJSON('https://cdn.rawgit.com/doda/github-language-colors/master/colors.json',
            function(data) {
        return data
    })
})
