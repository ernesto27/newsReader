var layout = {
	viewMain: Ti.UI.createView({top: 120}),
	init: function() {
		var win = Ti.UI.createWindow({
			title: "news reader",
			backgroundColor: "#E9EAED",
			color: "black"
		});
		
		layout.header(win);
		layout.pickerMenu(win);
		win.open();
		return win;
	},
	
	header: function(win){
		var viewHeader = Ti.UI.createView();

		var titleWrap = Ti.UI.createLabel({
			top: 0,
			backgroundColor: "#7DDFFA",
			width: "100%",
			height: 50
		});
		viewHeader.add(titleWrap);
		
		var titleHeader = Ti.UI.createLabel({
			text: "NEWS HEADER",
			font: {
				fontFamily: "Helvetica",
				fontSize: 24
			},
			top: 5,
			color: "white"
		});
		viewHeader.add(titleHeader);
		win.add(viewHeader);
	},
	
	pickerMenu: function(win){
		var menu = Ti.UI.createView({ 
			top: 60
		});
			
		var data = [];
		data[0] = Ti.UI.createPickerRow({
					title:'Clarin',
					color: "black",
					font:{
					  	fontSize: 18
					}
				});
				
		data[1] = Ti.UI.createPickerRow({
					title:'Pagina12',
					color: "black",
					font:{
					  	fontSize: 18
					}
				});
		
		var picker = Ti.UI.createPicker({
			top:0,
		  	left: 10
		});
		
		
		picker.add(data);
		picker.selectionIndicator = true;
		menu.add(picker);
		win.add(menu);
		return picker;
	},
	
	
	showLoading: function(win){
		layout.loadingText = Ti.UI.createLabel({
			text: "Cargando...",
			font:{
				fontSize: 30,
				fontFamily: "Arial"
			},
			color: "black"
		});
		
		layout.loadingInterval = setInterval(function(){
			if(layout.loadingText.visible){
				layout.loadingText.visible = false;
			}else{
				layout.loadingText.visible = true;
			}
		} ,700);
		layout.viewMain.add(layout.loadingText);
		win.add(layout.viewMain);
	}
};

module.exports = layout;
