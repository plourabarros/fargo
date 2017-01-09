function loadFandangoFeed(feed) {
    var column = 1;

    $.get("FeedServer.ashx?url=http://www.fandango.com/" + feed, function (data) {
        $(data).find('item').each(function () {
            var $item = $(this);
            var title = $item.find('title').text();
            var link = $item.find('link').text();
            var description = $item.find('description').text();
            var style = " style=\"width: 80%; height: 460px; display:block; margin:auto;\"";

            switch(feed){
                case "rss/top10boxoffice.rss":
                case "rss/newmovies.rss":
                    var firstIdx = description.indexOf("/fandango");
                    var imageLink = description.substring(firstIdx, description.length);
                    var lastIdx = imageLink.indexOf("\"");
                    imageLink = imageLink.substring(0, lastIdx);
                    imageLink = "http://images.fandango.com/r102.5/images/masterrepository" + imageLink;
                    break;
                case "movies/superhero/rss/movie-list.rss":
                case "movies/indie/rss/movie-list.rss":
                    var firstIdx = description.indexOf("/Fandango");
                    var imageLink = description.substring(firstIdx, description.length);
                    var lastIdx = imageLink.indexOf("\"");
                    imageLink = imageLink.substring(0, lastIdx);
                    imageLink = "http://images.fandango.com/r102.5/images/masterrepository" + imageLink;
                    break;
                case "rss/movie-news.rss":                
                    var firstIdx = description.indexOf("0/images");
                    var imageLink = description.substring(firstIdx+1, description.length);
                    var lastIdx = imageLink.indexOf("\"");
                    imageLink = imageLink.substring(0, lastIdx);
                    imageLink = "http://images.fandango.com/r102.6" + imageLink;
                    style = " style=\"width: 600px; height: 250px; display:block; margin:auto;\""
                    break;
                case "movies/indie/rss/movie-news.rss":
                    var firstIdx = description.indexOf("0/images");
                    var imageLink = description.substring(firstIdx + 1, description.length);
                    var lastIdx = imageLink.indexOf("\"");
                    imageLink = imageLink.substring(0, lastIdx);
                    imageLink = "http://images.fandango.com" + imageLink;
                    style = " style=\"width: 600px; height: 250px; display:block; margin:auto;\""
                    console.log(imageLink);
                    break;
            }

            //Alguns Items Não Correspondem a Imagens
            if (imageLink.indexOf("jpg") != -1) {
                column = addHTMLElement(link, imageLink, title, column, style, feed);
            }
        });
    });
}

function addHTMLElement(link, imageLink, title, column, style, feed) {
    var column, hmtl, columnString, feedString;
    html = "<div class=\"feedImage\">";
    html += "<a href=\"" + link + "\" target=\"_blank\">";
    html += "<img alt=\"image1\" src=" + imageLink + style + "/></a>";
    html += "<figcaption class=\"feedImage-text\">" + title + "</figcaption>";
    html += "</div>";

    switch (feed) {
        case "rss/top10boxoffice.rss":
            feedString = "#topTenFilmSection";
            break;
        case "rss/newmovies.rss":
            feedString = "#newMoviesSection";
            break;
        case "movies/superhero/rss/movie-list.rss":
            feedString = "#shMoviesSection";
            break;
        case "movies/indie/rss/movie-list.rss":
            feedString = "#indieMoviesSection";
            break;
        case "rss/movie-news.rss":
            feedString = "#movieNewsSection";
            break;
        case "movies/indie/rss/movie-news.rss":
            feedString = "#indieNewsSection";
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
    $.get('FeedsPage_Fandango.html', $(feedString).children(columnString).append(html));
    return column;
}