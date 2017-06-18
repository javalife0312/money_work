Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'qtip';

	var height = document.body.clientHeight;
	var width = document.body.clientWidth;
	var ts = '-';
	var page = 100;
	var search_type = "kdd_tj_mingxi";

	/***********************************************************************
	 *Window,Form相关
	 ************************************************************************/
	var exportForm = new Ext.FormPanel({
		labelAlign : 'left',
		frame : true,
		title : '',
		bodyStyle : 'padding:5px 5px 0',
		autoScroll : true,
		items : [{
			layout : 'column',
			items : [{
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'checkbox',
					fieldLabel : '编号',
					name : 'export1',
					value : '1',
					checked:false,
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '发件人姓名',
					name : 'export2',
					checked:false,
					value : '2',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '发件人手机',
					checked:false,
					name : 'export3',
					value : '3',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					checked:false,
					fieldLabel : '收件人名字',
					name : 'export4',
					value : '4',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					checked:false,
					fieldLabel : '快递单状态',
					name : 'export9',
					value : '9',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					checked:false,
					fieldLabel : '内阜/外阜',
					name : 'export10',
					value : '10',
					anchor : '95%'
				},{
					xtype : 'checkbox',
					checked:false,
					fieldLabel : '寄件人地址',
					name : 'export12',
					value : '12',
					anchor : '95%'
				}]
			}, {
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'checkbox',
					fieldLabel : '收件人手机',
					name : 'export5',
					checked:false,
					value : '5',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					checked:false,
					fieldLabel : '快递编号',
					name : 'export6',
					value : '6',
					anchor : '95%'
				},{
					xtype : 'checkbox',
					fieldLabel : '案号',
					name : 'export7',
					checked:false,
					value : '7',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '部门名称',
					name : 'export8',
					checked:false,
					value : '8',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '日期签名',
					name : 'export11',
					checked:false,
					value : '11',
					anchor : '95%'
				},{
					xtype : 'checkbox',
					checked:false,
					fieldLabel : '收件人地址',
					name : 'export13',
					value : '13',
					anchor : '95%'
				}]
			}]
		}]
	});
	
	var exportWindow = new Ext.Window({
		title : '导出项选择',
		width : 500,
		height : 300,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'right',
		closable : false,
		items : exportForm,
		buttons : [ts, {
			text : '确定',
			icon : "img/button/add.gif",
			handler : function() {
				var msg = "0";
				for(var i=1;i<14;i++){
					var check_box = eval("exportForm.getForm().findField('export"+i+ "').checked");
					if(check_box){
						var check_value = eval("exportForm.getForm().findField('export"+i+ "').value");
						msg += "_" + check_value;
					}
				}

				var startDate = Ext.util.Format.date(searchForm.getForm().findField("startDate").getValue(), 'Y-m-d');
				var endDate = Ext.util.Format.date(searchForm.getForm().findField("endDate").getValue(), 'Y-m-d');
				var jijianren_xingming = searchForm.getForm().findField("jijianren_xingming").getValue();
				var jijianren_shouji = searchForm.getForm().findField("jijianren_shouji").getValue();
				var shoujianren_xingming = searchForm.getForm().findField("shoujianren_xingming").getValue();
				var shoujianren_shouji = searchForm.getForm().findField("shoujianren_shouji").getValue();
				var id = searchForm.getForm().findField("id").getValue();
				var tiaoxingma = searchForm.getForm().findField("tiaoxingma").getValue();
				var status = searchForm.getForm().findField("status").getValue();
				var anhao = searchForm.getForm().findField("anhao").getValue();
				var lururenDeptName = searchForm.getForm().findField("lururenDeptName").getValue();
				
				store.proxy = new Ext.data.HttpProxy({
					url: 'kddInfoAction!list_search_Kdds',
		            method: 'POST'
				});
				store.baseParams = {
					search_type : search_type,
					startDate :startDate,
					status :status,
					jijianren_xingming :jijianren_xingming,
					jijianren_shouji :jijianren_shouji,
					id :id,
					anhao :anhao,
					endDate :endDate,
					lururenDeptName :lururenDeptName,
					shoujianren_xingming :shoujianren_xingming,
					shoujianren_shouji :shoujianren_shouji,
					tiaoxingma :tiaoxingma
				};
				store.load({
					params : {
						start : 0,
						limit : page
					}
//					,
//					callback : function(r, option, success) {
//						exportForm.form.reset();
//						exportWindow.hide();
//						searchWindow.hide();
//						if (success==false) { 
//							Ext.MessageBox.alert('提示', '会话超时,请注销登录'); 
//						}else{
//							var url = "kddInfoAction!export_search_Kdds?header="+msg;
//							window.open(url)
//						}
//					}
				});
				searchWindow.hide();
				exportForm.form.reset();
				exportWindow.hide();
				
				var params = "&search_type="+ search_type;
				params += "&startDate="+startDate;
				params += "&endDate="+endDate;
				params += "&status="+status;
				params += "&jijianren_xingming="+jijianren_xingming;
				params += "&jijianren_shouji="+jijianren_shouji;
				params += "&id="+id;
				params += "&anhao="+anhao;
				params += "&lururenDeptName="+lururenDeptName;
				params += "&shoujianren_xingming="+shoujianren_xingming;
				params += "&shoujianren_shouji="+shoujianren_shouji;
				params += "&tiaoxingma="+tiaoxingma;
				
				var url = "kddInfoAction!export_search_Kdds?header="+msg+params;
				window.open(url);
			}
		}, ts, {
			text : '取消',
			icon : "img/button/add.gif",
			handler : function() {
				exportForm.form.reset();
				exportWindow.hide();
			}
		}, ts]
	});
	

	var searchForm = new Ext.FormPanel({
		labelAlign : 'left',
		frame : true,
		title : '',
		bodyStyle : 'padding:5px 5px 0',
		width : 450,
		height : 400,
		autoScroll : true,
		items : [{
			layout : 'column',
			items : [{
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'datefield',
					fieldLabel : '开始日期',
					allowBlank : true,
			        name: 'startDate',
					format : 'Y-m-d'
				},{
					xtype : 'combo',
					fieldLabel: '快递单状态',
					anchor:'95%',
					displayField : 'text',
					valueField : 'value',
					mode : 'local',
					triggerAction : 'all',
					editable : false,
					value : '-1',
					name : 'status',
					store : new Ext.data.ArrayStore({
						fields : ['value', 'text'],
						data : [[-1, '所有'],[4,'已发送'],[51, '本人签收'],[52, '拒收'],[53,'代收'],[54,'地址不详'],[55,'其他']]
					})
                },{
					xtype : 'textfield',
					fieldLabel : '寄件人_姓名',
					blankText : '不能为空',
					name : 'jijianren_xingming',
					anchor : '95%'
				}, {
					xtype : 'textfield',
					fieldLabel : '寄件人_手机',
					blankText : '不能为空',
					name : 'jijianren_shouji',
					anchor : '95%'
				},{
					xtype : 'textfield',
					fieldLabel : '编号',
					blankText : '不能为空',
					name : 'id',
					anchor : '95%'
				},{
					xtype : 'textfield',
					fieldLabel : '案号',
					blankText : '不能为空',
					name : 'anhao',
					anchor : '95%'
				}]
			}, {
				columnWidth : .5,
				layout : 'form',
				items : [{
			 		fieldLabel : '结束日期',
			 		xtype : 'datefield',
			 		allowBlank : true,
			        name: 'endDate',
					format : 'Y-m-d'
					},{
						xtype : 'textfield',
						fieldLabel : '部门名称',
						blankText : '不能为空',
						name : 'lururenDeptName',
						anchor : '95%'
					},{
					xtype : 'textfield',
					fieldLabel : '收件人_姓名',
					blankText : '不能为空',
					name : 'shoujianren_xingming',
					anchor : '95%'
				}, {
					xtype : 'textfield',
					fieldLabel : '收件人_手机',
					blankText : '不能为空',
					name : 'shoujianren_shouji',
					anchor : '95%'
				},{
					xtype : 'textfield',
					fieldLabel : '快递单编号',
					blankText : '不能为空',
					name : 'tiaoxingma',
					anchor : '95%'
				}]
			}]
		}]
	});
	
	var searchWindow = new Ext.Window({
		title : '查询选项',
		width : 550,
		height : 260,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'right',
		closable : false,
		items : searchForm,
		buttons : [ts, {
			text : '查询并导出',
			icon : "img/button/add.gif",
			handler : function() {
				exportWindow.show();
			}
		}, ts,{
			text : '查询',
			icon : "img/button/add.gif",
			handler : function() {
				var startDate = Ext.util.Format.date(searchForm.getForm().findField("startDate").getValue(), 'Y-m-d');
				var endDate = Ext.util.Format.date(searchForm.getForm().findField("endDate").getValue(), 'Y-m-d');
				var jijianren_xingming = searchForm.getForm().findField("jijianren_xingming").getValue();
				var jijianren_shouji = searchForm.getForm().findField("jijianren_shouji").getValue();
				var shoujianren_xingming = searchForm.getForm().findField("shoujianren_xingming").getValue();
				var shoujianren_shouji = searchForm.getForm().findField("shoujianren_shouji").getValue();
				var id = searchForm.getForm().findField("id").getValue();
				var tiaoxingma = searchForm.getForm().findField("tiaoxingma").getValue();
				var status = searchForm.getForm().findField("status").getValue();
				var anhao = searchForm.getForm().findField("anhao").getValue();
				var lururenDeptName = searchForm.getForm().findField("lururenDeptName").getValue();
				
				store.proxy = new Ext.data.HttpProxy({
					url: 'kddInfoAction!list_search_Kdds',
		            method: 'POST'
				});
				store.baseParams = {
					search_type : search_type,
					startDate :startDate,
					status :status,
					jijianren_xingming :jijianren_xingming,
					jijianren_shouji :jijianren_shouji,
					id :id,
					anhao :anhao,
					endDate :endDate,
					lururenDeptName :lururenDeptName,
					shoujianren_xingming :shoujianren_xingming,
					shoujianren_shouji :shoujianren_shouji,
					tiaoxingma :tiaoxingma
				};
				store.load({
					params : {
						start : 0,
						limit : page
					}
				});
				searchWindow.hide();
			}
		},ts, {
			text : '取消',
			icon : "img/button/add.gif",
			handler : function() {
				searchForm.form.reset();
				searchWindow.hide();
			}
		}, ts]
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
							"name" : "id",
							"mapping" : "id",
							"type" : "int"
						}, {
							"name" : "jijianren_xingming",
							"mapping" : "jijianren_xingming",
							"type" : "string"
						}, {
							"name" : "shoujianren_xingming",
							"mapping" : "shoujianren_xingming",
							"type" : "string"
						}, {
							"name" : "jijianren_shouji",
							"mapping" : "jijianren_shouji",
							"type" : "string"
						}, {
							"name" : "shoujianren_shouji",
							"mapping" : "shoujianren_shouji",
							"type" : "string"
						},{
							"name" : "jijianren_danwei",
							"mapping" : "jijianren_danwei",
							"type" : "string"
						}, {
							"name" : "jijianren_dizhi",
							"mapping" : "jijianren_dizhi",
							"type" : "string"
						},{
							"name" : "jijianren_youbian",
							"mapping" : "jijianren_youbian",
							"type" : "string"
						}, {
							"name" : "shoujianren_danwei",
							"mapping" : "shoujianren_danwei",
							"type" : "string"
						}, {
							"name" : "shoujianren_dizhi",
							"mapping" : "shoujianren_dizhi",
							"type" : "string"
						},{
							"name" : "shoujianren_youbian",
							"mapping" : "shoujianren_youbian",
							"type" : "string"
						}, {
							"name" : "jiaojiren_qianming",
							"mapping" : "jiaojiren_qianming",
							"type" : "string"
						},{
							"name" : "jingbanren_qianming",
							"mapping" : "jingbanren_qianming",
							"type" : "string"
						},{
							"name" : "status",
							"mapping" : "status",
							"type" : "int"
						}, {
							"name" : "jingbanren_qianming",
							"mapping" : "jingbanren_qianming",
							"type" : "string"
						}, {
							"name" : "wenjianmingcheng",
							"mapping" : "wenjianmingcheng",
							"type" : "string"
						}, {
							"name" : "anhao",
							"mapping" : "anhao",
							"type" : "string"
						}, {
							"name" : "wenshumingcheng",
							"mapping" : "wenshumingcheng",
							"type" : "string"
						},{
							"name" : "beizhuxinxi",
							"mapping" : "beizhuxinxi",
							"type" : "string"
						}, {
							"name" : "chuanpiaoxinxi",
							"mapping" : "chuanpiaoxinxi",
							"type" : "string"
						},{
							"name" : "startdate",
							"mapping" : "startdate",
							"type" : "string"
						}, {
							"name" : "tiaoxingma",
							"mapping" : "tiaoxingma",
							"type" : "string"
						}, {
							"name" : "lururenDeptName",
							"mapping" : "lururenDeptName",
							"type" : "string"
						},{
							"name" : "kdd_mark",
							"mapping" : "kdd_mark",
							"type" : "string"
						},{
							"name" : "funei_fuwai",
							"mapping" : "funei_fuwai",
							"type" : "string"
						},{
							"name" : "type",
							"mapping" : "type",
							"type" : "string"
						}],
				proxy : new Ext.data.HttpProxy({
							url : 'kddInfoAction!list_search_Kdds',
							method : 'POST'
						})
			});
	store.baseParams = {
			search_type : search_type
		};
	store.load({
				params : {
					start : 0,
					limit : page
				}
			});
	var sm = new Ext.grid.CheckboxSelectionModel();
	var grid = new Ext.grid.GridPanel({
		height : height,
		width : width,
		title : '快递单信息',
		store : store,
		trackMouseOver : true,
		disableSelection : false,
		loadMask : true,
		clicksToEdit : 1,
		sm : sm,
		columns : [sm,  {
					header : "编号",
					dataIndex : 'id',
					sortable : true
				}, {
					header : '发件人姓名',
					dataIndex : 'jijianren_xingming',
					sortable : true
				}, {

					header : '发件人手机',
					dataIndex : 'jijianren_shouji',
					sortable : true
				}, {

					header : '收件人姓名',
					dataIndex : 'shoujianren_xingming',
					sortable : true
				}, {

					header : '收件人手机',
					dataIndex : 'shoujianren_shouji',
					sortable : true
				}, {
					header : "快递单状态",
					dataIndex : 'status',
					sortable : true,
					renderer:function(value){ 
						if(value == 2){
							return "未打印";
						}
						if(value == 3){
							return "已打印";
						}
						if(value == 4){
							return "已发送";
						}
						if(value == 51){
							return "本人签收";
						}
						if(value == 52){
							return "拒收";
						}
						if(value == 53){
							return "代收";
						}
						if(value == 54){
							return "地址不详";
						}
						if(value == 55){
							return "其他";
						}
					}
				},{
					header : "创建时间",
					dataIndex : 'startdate',
					width : 150,
					sortable : true
				},{
					header : "快递编号",
					dataIndex : 'tiaoxingma',
					sortable : true
				},{

					header : '案号',
					dataIndex : 'anhao',
					sortable : true
				},{
					header : '部门名称',
					dataIndex : 'lururenDeptName',
					sortable : true
				},{
					header : '内阜-外阜',
					dataIndex : 'funei_fuwai',
					sortable : true,
					renderer:function(value){ 
						if(value == 1){
							return "内阜";
						}else if(value == 2){
							return "外阜";
						}else{
							return "";
						}
					}
				},{
					header : '快递单备注',
					dataIndex : 'kdd_mark',
					sortable : true
				}],
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : true
		},
		tbar : [ts, {
					text : '查询/导出',
					tooltip : '检索快递单',
					icon : "img/button/add.gif",
					handler : function() {
						searchWindow.show();
					}
				}, ts
		],
		bbar : new Ext.PagingToolbar({
					store : store,
					pageSize : page,
					displayInfo : true,
					displayMsg : '第 {0} - {1} 条, 总共 {2} 条',
					emptyMsg : "没有数据"
				})
	});
	grid.render('center');
	/***********************************************************************
	 *Grid相关
	 ************************************************************************/

	/***********************************************************************
	 *布局相关
	 ************************************************************************/
	var viewport = new Ext.Viewport({
				layout : 'border',
				items : [{
							region : 'center',
							margins : '0 0 1 0',//上->右->下->左
							layout : 'fit',
							autoScroll : true,
							items : [grid]
						}]
			});
		/***********************************************************************
	 *布局相关
	 ************************************************************************/
	
});
