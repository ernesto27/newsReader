var layout	= require("layout");
var rss		= require("rss");
var win = layout.init();
var picker = layout.pickerMenu(win);


picker.addEventListener("change", function(e){
	switch(e.row.title){
		case "Pagina12":
			rss.fetch("pagina12", win);
			break;
		case "Clarin":
			rss.fetch("clarin", win);
			break;
	}
});

rss.fetch("clarin", win);


