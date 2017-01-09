function loadTHRFeed(feed) {
    var column = 1;
    $.get("FeedServer.ashx?url=http://feeds.feedburner.com/thr/" + feed, function (data) {
        $(data).find('item').each(function () {
            var $item = $(this);
            var title = $item.find('title').text();
            var link = $item.find('link').text();
            var description = $item.find('description').text();

            var firstIdx = description.indexOf("\"") + 1;
            var imageLink = description.substring(firstIdx, description.length);
            var lastIdx = imageLink.indexOf("\"");
            var imageLink = imageLink.substring(0, lastIdx);

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
        case "film":
            feedString = "#filmSection";
            break;
        case "awards":
            feedString = "#awardsSection";
            break;
        case "reviews/film":
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
    $.get('FeedsPage_THR.html', $(feedString).children(columnString).append(html));
    return column;
}