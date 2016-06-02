var $files = $('.js-active-navigation-container');
var prepareNewDirsOnPage = function() {
    var dirs = $files.find('.js-navigation-item').not('.select-menu-item').find('.content a:eq(0)').map(function() {
        var $self = $(this),
            dir = $self.text();

        $self.closest('.js-navigation-item');

        return dir;
    }).toArray();
    // alert(dirs);
    return unique(dirs);
};

var dirsUrls = function() {
    var dirsHref = $files.find('.js-navigation-item').not('.select-menu-item').find('.content a:eq(0)').map(function() {
        var $self = $(this),
            ahref = $self.attr("href");

        $self.closest('.js-navigation-item');

        return ahref;
    }).toArray();
    // alert(dirsHref);
    return unique(dirsHref);
};

var unique = function(array) {
    var temp = {};
    for (var i in array) {
        temp[array[i]] = {};
    }
    return Object.keys(temp);
};

var printImages = function(array) {
    var i = 0;
    $('.js-navigation-item:not(.select-menu-item, .download-ready) .age').each(function() {
        var $img = $("<td class='download'><a lid='" + i + "' href='javascript:void(0);' title='Download " + array[i] + "'><svg aria-hidden='true' class='octicon octicon-cloud-download' height='16' version='1.1' viewBox='0 0 16 16' width='16'><path d='M9 13h2l-3 3-3-3h2V8h2v5z m3-8c0-0.44-0.91-3-4.5-3-2.42 0-4.5 1.92-4.5 4C1.02 6 0 7.52 0 9c0 1.53 1 3 3 3 0.44 0 2.66 0 3 0v-1.3H3C1.38 10.7 1.3 9.28 1.3 9c0-0.17 0.05-1.7 1.7-1.7h1.3v-1.3c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2h1.3c0.81 0 2.7 0.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2H10v1.3c0.38 0 1.98 0 2 0 2.08 0 4-1.16 4-3.5 0-2.44-1.92-3.5-4-3.5z'></path></svg></a><img alt='' class='spinner' height='16' src='https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif' width='16' /></td>");
        var $self = $(this);
        $img.clone().insertAfter($self);
        $self.closest('.js-navigation-item').addClass('download-ready');
        i++;
    });
};

printImages(prepareNewDirsOnPage());

dirsUrls();

$(document).ready(function() {


    $(".download a").click(function() {
        var i = $(this).attr("lid");
        var url = "https://github.com" + dirsUrls()[i];

        $self = $(this);

        // alert(url);
        $self.addClass('display-none');
        $self.parent().find("img:eq(0)").removeClass('spinner').addClass('loading');

        GitZip.registerCallback(function(status, message, percent) {
            if (status == 'error' || status == 'done') {
                $self.removeClass('display-none');
                $self.parent().find("img:eq(0)").removeClass('loading').addClass('spinner');

                // alert(status);
            }
        });

        // alert(url);
        GitZip.zipRepo(url);
    });
});
