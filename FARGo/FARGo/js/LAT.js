function loadLATFeed(feed) {
    var column = 1;
    $.get("FeedServer.ashx?url=http://www.latimes.com/entertainment/" + feed, function (data) {
        $(data).find('item').each(function () {
            var $item = $(this);
            var title = $item.find('title').text();
            var link = $item.find('link').text();
            var description = $item.find('description').text();
            var imageLink = $item.find('media\\:thumbnail, content').attr('url') 
            imageLink = (imageLink != undefined) ? imageLink.substring(0, imageLink.length-4): "Feeds/LATimes_Logo.png";
            column = addHTMLElement(link,title, column, imageLink, feed);
        });
    });
}

function addHTMLElement(link,title, column, imageLink, feed) {
    var column, hmtl, columnString, feedString;
    html = "<div class=\"feedImage\">";
    html += "<a href=\"" + link + "\" target=\"_blank\">";
    html += "<img alt=\"image1\" src=\""+imageLink+"\"/></a>";
    html += "<figcaption class=\"feedImage-text\">" + title + "</figcaption>";
    html += "</div>";

    switch (feed) {
        case "movies/moviesnow/rss2.0.xml":
            feedString = "#moviesNewsSection";
            break;
        case "gossip/rss2.0.xml":
            feedString = "#gossipSection";
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
    $.get('FeedsPage_LAT.html', $(feedString).children(columnString).append(html));
    return column;
}