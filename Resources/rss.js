var layout = require("layout");

var tableRss = Ti.UI.createTableView({});
tableRss.addEventListener("click", function(e){
	Ti.Platform.openURL(e.rowData.url);
});

var rss = {
	media:{
		clarin : "http://clarin.feedsportal.com/c/33088/f/577682/index.rss",
		pagina12: "http://www.pagina12.com.ar/diario/rss/principal.xml"
		
	},
	defaultImgNews: "http://waaheen.com/wp-content/uploads/2014/02/news-100x100.jpg",
	
	parse: function(items, win){
		var rssRes = [];
		for ( var i = 0; i < items.length; i++ ){
			var item = items.item(i),
				title = item.getElementsByTagName('title').item(0).text,
				url = item.getElementsByTagName('guid').item(0).text,
				image,
				imageSrc;
					
			try{
				image = item.getElementsByTagName('enclosure').item(0).getAttribute('url');
				imageUrlSplit  = image.split("/");
				imageSrc = "http://www.clarin.com/" + url.split("/")[3] + "/" + imageUrlSplit[imageUrlSplit.length - 1];
					 
			}catch(e){
				imageSrc = rss.media.defaultImg;
			}
				
			rssRes.push({
				title: title,
				url: url,
				image: imageSrc
			});		
				
				
			var tableRow = Ti.UI.createTableViewRow({
				height: 115,
				url: url
			});
				
			var rowText = Ti.UI.createLabel({
				text: title,
				left: 130,
				font:{
					fontSize: 20
				},
				color: "black"
			});
				
			var imageRow = Ti.UI.createImageView({
				width: 100,
				height: 100,
				image: imageSrc,
				left: 5
			});
				
			tableRow.add(imageRow);
			tableRow.add(rowText);
			tableRss.appendRow(tableRow);
			
		}
		
		layout.loadingText.visible = false;
		clearInterval(layout.loadingInterval);
		layout.viewMain.add(tableRss);
		win.add(layout.viewMain);
		return rssRes;
	},
	
	fetch: function(name, win){
		layout.showLoading(win);
		tableRss.data = [];
		var xhr = Titanium.Network.createHTTPClient();
		xhr.open('GET', rss.media[name]);
		xhr.onload = function(e){
			var xml = this.responseXML;
			var items = xml.documentElement.getElementsByTagName("item");
			rss.parse(items, win);

		};
		xhr.onerror = function(e){
			alert("Ocurrio un error");
		};
		
		xhr.send();	
	}
};


module.exports = rss;