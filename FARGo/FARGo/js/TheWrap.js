function loadTheWrapFeed() {
    var column = 1;
    $.get("FeedServer.ashx?url=http://www.thewrap.com/category/movies/feed/", function (data) {
        $(data).find('item').each(function () {
            var $item = $(this);
            var title = $item.find('title').text();
            var link = $item.find('link').text();
            var description = $item.find('description').text();
            var imageLink = $item.find('media\\:content, content').attr('url');

            column = addHTMLElement(link, imageLink, title, column, " style=\"width: 600px; height: 250px; display:block; margin:auto;\"");
        });
    });
}

function addHTMLElement(link, imageLink, title, column, style) {
    var column, hmtl, columnString;
    html = "<div class=\"feedImage\">";
    html += "<a href=\"" + link + "\" target=\"_blank\">";
    html += "<img alt=\"image1\" src=" + imageLink + style + "/></a>";
    html += "<figcaption class=\"feedImage-text\">" + title + "</figcaption>";
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
    $.get('FeedsPage_TheWrap.html', $("#newsSection").children(columnString).append(html));
    return column;
}