$('[id*="select-"]').click(function (e) {
    e.preventDefault()
    $(this).tab('show')

    if (this.id == "select1") {
        $('body').css('background', 'red');
    }
    else if (this.id == "tab-movieReviewsSection") {
        $('body').css('background', 'green');
    }
    else if (this.id == "tab-castingSection") {
        $('body').css('background', 'blue');
    }
    else if (this.id == "tab-movieTrailersSection") {
        $('body').css('background', 'purple');
    }
});

function loadMovieWebFeed(feed) {
    var column = 1;
    $.get("FeedServer.ashx?url=http://movieweb.com/rss/" + feed, function (data) {
        $(data).find('item').each(function () {
            var $item = $(this);
            var title = $item.find('title').text();
            var link = $item.find('link').text();
            var description = $item.find('description').text();

            var imageLink = $item.find('enclosure').attr('url');
            imageLink = (imageLink != undefined) ? imageLink : "Feeds/MovieWeb_Logo.png";

            console.log(imageLink);

            column = addHTMLElement(link, imageLink, title, column, feed);
        });
    });
}

function addHTMLElement(link, imageLink, title, column, feed) {
    var column, hmtl, columnString, feedString;
    html = "<div class=\"feedImage\">";
    html += "<a href=\"" + link + "\" target=\"_blank\">";
    html += "<img alt=\"image1\" src=\"" + imageLink + "\"/></a>";
    html += "<figcaption class=\"feedImage-text\">" + title + "</figcaption>";
    html += "</div>";

    switch (feed) {
        case "movie-news/":
            feedString = "#movieNewsSection";
            break;
        case "movie-trailers/":
            feedString = "#movieTrailersSection";
            break;
        case "movie-reviews/":
            feedString = "#movieReviewsSection";
            break;
        case "casting-news/":
            feedString = "#castingSection";
            break;
    }

    switch (column) {
        case 1:
            columnString = ".column1";
            column = 2;
            break;
        case 2:
            columnString = ".column2";
            column = 3;
            break;
        case 3:
            columnString = ".column3";
            column = 1;
            break;
    }
    $.get('FeedsPage_MovieWeb.html', $(feedString).children(columnString).append(html));
    return column;
}