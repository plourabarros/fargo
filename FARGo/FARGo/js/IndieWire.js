function loadIndieWireFeed(feed) {
    var column = 1;
    $.get("FeedServer.ashx?url=http://feeds.feedburner.com/" + feed, function (data) {
        $(data).find('item').each(function () {
            var $item = $(this);
            var title = $item.find('title').text();
            var link = $item.find('link').text();
            var description = $item.find('description').text();

            column = addHTMLElement(link,title, column, feed);
        });
    });
}

function addHTMLElement(link,title, column, feed) {
    var column, hmtl, columnString, feedString;
    html = "<div class=\"feedImage\">";
    html += "<a href=\"" + link + "\" target=\"_blank\">";
    html += "<img alt=\"image1\" src=\"Feeds/IndieWire_Logo.jpg\"/></a>";
    html += "<figcaption class=\"feedImage-text\">" + title + "</figcaption>";
    html += "</div>";

    switch (feed) {
        case "indieWIREAwardsWatch?format=xml":
            feedString = "#awardsSection";
            break;
        case "indieWIREFesitvals?format=xml":
            feedString = "#festivalsSection";
            break;
        case "indieWIREMoviesReviews?format=xml":
            feedString = "#reviewsSection";
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
    $.get('FeedsPage_IndieWire.html', $(feedString).children(columnString).append(html));
    return column;
}