Ext.onReady(function() {
	
	
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'qtip';
	
	var height = document.body.clientHeight;
	var width = document.body.clientWidth;
	var ts = '-';
	var page = 100;
	var nodeId = '0';
	var groupId = '0';
	var reportType = getReportType();
	
    /***********************************************************************
	* 自定义函数相关
	* 报表类型	1=日报	2=周报	3=月报	4=季报	5=年报
	************************************************************************/
	function getReportType(){
		var params_arr = window.location.search.substring(1).split('&');
		var reportType = params_arr[0].split('=')[1];
		return reportType;
	}
	
	
	/***********************************************************************
	*Window,Form相关
	************************************************************************/
	var searchForm = new Ext.FormPanel({
        labelAlign: 'left',
        frame:true,
        title: '',
        bodyStyle:'padding:5px 5px 0',
        items: [{
            layout:'column',
            items:[{
                columnWidth:1,
                layout: 'form',
                items: [{
                	xtype: 'datefield',
            		fieldLabel : '选择月份',
            		emptyText : '请选择月份',
            		allowBlank : false,
            		value:new Date(),
                    name: 'startDate',
            		format : 'Y-m'
            	}]
            }]
        }]
    });
	
	var searchForm1 = new Ext.FormPanel({
		labelAlign: 'left',
		frame:true,
		title: '',
		bodyStyle:'padding:5px 5px 0',
		items: [{
			layout:'column',
			items:[{
				columnWidth:1,
				layout: 'form',
				items: [{
					xtype: 'datefield',
					fieldLabel : '选择年份',
					emptyText : '请选择',
					allowBlank : false,
					value:new Date(),
					name: 'startDate1',
					format : 'Y'
				}]
			}]
		}]
	});
	
	var searchWindow = new Ext.Window({
        id : 'kkdTypeWindow',
        title: '月份选择',
        width: 350,
        height:130,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'right',
        closable:false,
        items: searchForm,
        buttons: [ts,{
            text: '查询并导出',
            icon : "img/button/add.gif",
            handler: function(){
            	var startDate = Ext.util.Format.date(searchForm.getForm().findField("startDate").getValue(), 'Y-m');
				var type = 'day';
				
				store.proxy = new Ext.data.HttpProxy({
					url: 'kddInfoAction!list_report_Kdds',
		            method: 'POST'
				});
				store.baseParams = {
					type : type,
					startDate :startDate
				};
				store.load({
					params : {
						start : 0,
						limit : page
					}
				});
				searchForm.form.reset();
				searchWindow.hide();
				var url = "kddInfoAction!export_report_Kdds?type="+type+"&startDate="+startDate;
				window.open(url);

            }
        },ts,{
            text: '查询',
            icon : "img/button/add.gif",
            handler: function(){
            	var startDate = Ext.util.Format.date(searchForm.getForm().findField("startDate").getValue(), 'Y-m');
				var type = 'day';
				
				store.proxy = new Ext.data.HttpProxy({
					url: 'kddInfoAction!list_report_Kdds',
		            method: 'POST'
				});
				store.baseParams = {
					type : type,
					startDate :startDate
				};
				store.load();
				searchForm.form.reset();
				searchWindow.hide();
            }
        },ts,{
            text: '取消',
            icon : "img/button/add.gif",
            handler: function(){
            	searchForm.form.reset();
            	searchWindow.hide();
            }
        },ts]
    }); 
	
	var searchWindow1 = new Ext.Window({
		id : 'kkdTypeWindow1',
		title: '时间段选择',
		width: 550,
		height:150,
		layout: 'fit',
		plain:true,
		bodyStyle:'padding:5px;',
		buttonAlign:'right',
		closable:false,
		items: searchForm1,
		buttons: [ts,{
            text: '查询并导出',
            icon : "img/button/add.gif",
            handler: function(){
            	var startDate = Ext.util.Format.date(searchForm1.getForm().findField("startDate1").getValue(), 'Y');
				var type = 'month';
				
				store.proxy = new Ext.data.HttpProxy({
					url: 'kddInfoAction!list_report_Kdds',
		            method: 'POST'
				});
				store.baseParams = {
					type : type,
					startDate :startDate
				};
				store.load({
					params : {
						start : 0,
						limit : page
					}
//					,
//					callback : function(r, option, success) {
//						searchForm1.form.reset();
//						searchWindow1.hide();
//						if (success==false) { 
//							Ext.MessageBox.alert('提示', '会话超时,请注销登录'); 
//						}else{
//							var url = "kddInfoAction!export_report_Kdds?type="+type+"&startDate="+startDate+"&endDate="+endDate;
//							window.open(url);
//						}
//					}
				});
				searchForm1.form.reset();
				searchWindow1.hide();
				var url = "kddInfoAction!export_report_Kdds?type="+type+"&startDate="+startDate;
				window.open(url);
				
            }
        },ts,{
			text: '查询',
			icon : "img/button/add.gif",
			handler: function(){
				var startDate = Ext.util.Format.date(searchForm1.getForm().findField("startDate1").getValue(), 'Y');
				var type = 'month';
				
				store.proxy = new Ext.data.HttpProxy({
					url: 'kddInfoAction!list_report_Kdds',
					method: 'POST'
				});
				store.baseParams = {
						type : type,
						startDate :startDate
				};
				store.load();
				searchForm1.form.reset();
				searchWindow1.hide();
			}
		},ts,{
			text: '取消',
			icon : "img/button/add.gif",
			handler: function(){
				searchForm1.form.reset();
				searchWindow1.hide();
			}
		},ts]
	}); 
    
    /***********************************************************************
	*Window,Form相关
	************************************************************************/
    
    
  	/***********************************************************************
	*Grid相关
	************************************************************************/
    var store = new Ext.data.JsonStore({
		root : 'root',
		totalProperty : 'totalProperty',
		idProperty : 'id',
		remoteSort : false,
		fields : [{
					"name" : "kddType",
					"type" : "string"
				}, {
					"name" : "type1",
					"type" : "string"
				}, {
					"name" : "sum1",
					"type" : "string"
				}, {
					"name" : "type2",
					"type" : "string"
				}, {
					"name" : "sum2",
					"type" : "string"
				}, {
					"name" : "type3",
					"type" : "string"
				}, {
					"name" : "sum3",
					"type" : "string"
				}, {
					"name" : "type4",
					"type" : "string"
				}, {
					"name" : "sum4",
					"type" : "string"
				}, {
					"name" : "type5",
					"type" : "string"
				}, {
					"name" : "sum5",
					"type" : "string"
				}, {
					"name" : "type6",
					"type" : "string"
				}, {
					"name" : "sum6",
					"type" : "string"
				}],
		sortInfo : {
			 field : 'kddType',
			 direction : 'ASC' //升序排列
			},
		proxy : new Ext.data.HttpProxy({
			url : 'kddInfoAction!list_report_Kdds',
			method : 'POST'
		})
	});
//    store.load();
    
    var grid = new Ext.grid.GridPanel({
        height : height,
        width : width,
        title:'',
        store: store,
        trackMouseOver:true,
        disableSelection:false,
        loadMask: true,
        clicksToEdit :1,
        columns:[{
            header: "快递单类型",
            dataIndex: 'kddType',
            sortable: true

        },{
            header: "类型",
            dataIndex: 'type1',
            sortable: true
        },{
            header: "数量",
            dataIndex: 'sum1',
            sortable: true
        },{
            header: "类型",
            dataIndex: 'type2',
            sortable: true
        },{
        	header: "数量",
        	dataIndex: 'sum2'
        },{
        	header: "类型",
        	dataIndex: 'type3',
        	sortable: true
        },{
        	header: "数量",
        	dataIndex: 'sum3',
        	sortable: true
        },{
            header: "类型",
            dataIndex: 'type4',
            sortable: true
        },{
        	header: "数量",
        	dataIndex: 'sum4'
        },{
        	header: "类型",
        	dataIndex: 'type5',
        	sortable: true
        },{
        	header: "数量",
        	dataIndex: 'sum5',
        	sortable: true
        },{
        	header: "类型",
        	dataIndex: 'type6',
        	sortable: true
        },{
        	header: "数量",
        	dataIndex: 'sum6',
        	sortable: true
        }],
        viewConfig: {
            forceFit:true,
            enableRowBody:true,
            showPreview:true
        },
		tbar : [ts,{
            text: '月报表查询/导出',
            tooltip: '月报表查询/导出',
            icon : "img/button/add.gif",
            handler: function(){
            	searchWindow.show();
			}
        },ts,{
            text: '年报表查询/导出',
            tooltip: '年报表查询/导出',
            icon : "img/button/add.gif",
            handler: function(){
            	searchWindow1.show();
			}
        },ts],
        bbar: new Ext.PagingToolbar({
            store: store,
            displayInfo: true,
            displayMsg: '第 {0} - {1} 条, 总共 {2} 条',
            emptyMsg: "没有数据"
        })
    });
    grid.render('center');
    if(reportType == 3){
    	grid.setTitle("月报表");
    }
    if(reportType == 5){
    	grid.setTitle("年报表");
    }
    /***********************************************************************
	*Grid相关
	************************************************************************/
	 var viewport = new Ext.Viewport({
         layout:'border',
         items:[{
             region:'center',
             margins:'0 0 1 0',//上->右->下->左
             layout:'fit',
             autoScroll:true,
             items:[grid]
         }]
     });
	/***********************************************************************
	*布局相关
	************************************************************************/
	 
});
