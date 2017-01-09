<%@ WebHandler Language="C#" Class="FeedServer" %>  
      
using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.Services;
using System.Xml.Linq;

public class FeedServer : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        string url = context.Request.QueryString["url"];

        XDocument feedXML = XDocument.Load(url);

        context.Response.ContentType = "text/xml";
        context.Response.Write(feedXML.ToString());
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}