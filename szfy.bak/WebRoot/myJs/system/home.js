Ext.ux.TabCloseMenu = function() {
	var tabs, menu, ctxItem;
	this.init = function(tp) {
		tabs = tp;
		tabs.on('contextmenu', onContextMenu);
	}
	function onContextMenu(ts, item, e) {
		if (!menu) {
			menu = new Ext.menu.Menu([{
				id : tabs.id + '-close',
				text : '关闭当前页',
				handler : function() {
					tabs.remove(ctxItem);
				}
			}, {
				id : tabs.id + '-close-others',
				text : '关闭其他页',
				handler : function() {
					tabs.items.each(function(item) {
						if (item.closable && item != ctxItem) {
							tabs.remove(item);
						}
					});
				}
			}]);
		}
		ctxItem = item;
		var items = menu.items;
		items.get(tabs.id + '-close').setDisabled(!item.closable);
		var disableOthers = true;
		tabs.items.each(function() {
			if (this != item && this.closable) {
				disableOthers = false;
				return false;
			}
		});
		items.get(tabs.id + '-close-others').setDisabled(disableOthers);
		menu.showAt(e.getPoint());
	}
};

var centerTabs = new Ext.TabPanel({
	region : 'center',
	deferredRender : false,
	activeTab : 0,
	resizeTabs : true, // turn on tab resizing
	minTabWidth : 115,
	tabWidth : 135,
	enableTabScroll : true,
	defaults : {
		autoScroll : true
	},
	plugins : new Ext.ux.TabCloseMenu(),
	items : [{
		id : 'homePage',
		title : '欢迎页',
		autoScroll : true,
		closable : false,
		layout : 'fit',
//		frame : true,
		layout : 'fit',
		html : '<iframe scrolling="no" frameborder="0" width="100%" height="100%" src="myWeb/system/logo.jsp"></iframe>'
			
	}]
});

Ext.onReady(function() {
	var id = "0";
	var height = document.body.clientHeight;	
	var Ip = document.location.hostname;;
	
	<!--树形系统菜单-->
	var root = new Ext.tree.AsyncTreeNode({
		text : '系统菜单',
		draggable : false,
		id : '0',
		url : 'isleaf',
		icon : "img/tree/system.png"
	});
	var tree = new Ext.tree.TreePanel({
		renderTo : 'tree',
		autoScroll : true,
		root : root,
		animate : true,
		enableDD : false,
		border : false,
		rootVisible : true,
		containerScroll : true,
		loader : new Ext.tree.TreeLoader({
					dataUrl : 'treeAction!loginTree?id='+id
				})
	});
	tree.render();
	root.expand();
	
	tree.on('beforeload',function(node){     
		var id = node.id;
		tree.loader.dataUrl = 'treeAction!loginTree?id='+id;          
	});  
	tree.on('click',function(node){
		var url = node.attributes.url;
		if(url != 'isleaf') {
			var childTab = centerTabs.getComponent(node.id);
			if (!childTab) {
				var childTab = centerTabs.add({
					'id' : node.id,
					'title' : node.text,
					closable : true,
					html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+node.attributes.url+'"></iframe>'
				});
			}
			centerTabs.setActiveTab(childTab);
		}
	});
	
	var logopic = document.getElementById("logopic").value;
	var logocolor = document.getElementById("logocolor").value;
	var northPanel = new Ext.form.FormPanel({
		height : '100%',
		html : "<div align='left' height='"+height*0.1+"' width='100%' style='background-color: "+logocolor+";'>"+
					"<img src='img/kdd/"+logopic+"' height='"+height*0.1+"'>"+
				"</div>"
	});
	
  	var labelOp = new Ext.form.Label({
              id:"labelOp",
              hidden:false,//默认false
              html:"操作员：Admin"//默认""
     });
  	var labelIp = new Ext.form.Label({
              id:"labelIp",
              hidden:false,//默认false
              html:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IP：" + Ip
     });
  	var labelBB = new Ext.form.Label({
              id:"labelBB",
              hidden:false,//默认false
              html:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版本：LSWeb 1.1.1.1"
     });
	var southPanel = new Ext.form.FormPanel({
		title : '',
		layout : 'column',
		frame : true,
		height : 0,
		autoScroll : true,
		items : []
//	items : [labelOp,labelIp,labelBB]
	});
  
  	
  
	var viewport = new Ext.Viewport({
		layout : 'border',
		items : [{
					region : 'north',
					id : 'northPanel',
					split : false,
					height : height*0.1,
					margins : '0 0 0 0',
					collapsible : false,
					layoutConfig : {
						animate : true
					},
					items : [northPanel]
//				},{
//					region : 'south',
//					id : 'southPanel',
//					split : false,
//					height : height*0.05,
//					margins : '0 0 0 0',
//					collapsible : false,
//					layoutConfig : {
//						animate : true
//					},
//					items : [southPanel]
				},{
					region : 'west',
					id : 'tree',
					split : true,
					width : 200,
					minSize : 175,
					maxSize : 400,
					margins : '0 0 0 0',
					collapsible : true,
					layoutConfig : {
						animate : true
					},
					items : [tree]
				}, centerTabs
		]
	});
});
