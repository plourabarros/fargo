function loadNYTFeed() {
    var column = 1;
    $.get("FeedServer.ashx?url=http://rss.nytimes.com/services/xml/rss/nyt/Movies.xml", function (data) {
        $(data).find('item').each(function () {
            var $item = $(this);
            var title = $item.find('title').text();
            var link = $item.find('link').text();
            var description = $item.find('description').text();
            var imageLink = $item.find('media\\:content, content').attr('url');
            imageLink = (imageLink != undefined) ? imageLink : "Feeds/NYTimes_Logo.png";
            column = addHTMLElement(link, imageLink, title, column, description);
        });
    });
}

function addHTMLElement(link, imageLink, title, column, description) {
    var column, hmtl, columnString;
    html = "<div class=\"feedImage\">";
    html += "<a href=\"" + link + "\" target=\"_blank\" title=\"" + title + "\">";
    html += "<img alt=\"image1\" src=\"" + imageLink + "\"/></a>";
    html += "<p>" + description + "</p>";
    html += "</div>";

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
    $.get('FeedsPage_NYT.html', $("#newsSection").children(columnString).append(html));
    return column;
}