Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'qtip';

	var height = document.body.clientHeight;
	var width = document.body.clientWidth;
	var ts = '-';
	var page = 100;
	var page_cs = 100;
	var search_type = "kdd_chuandashi";

	/***********************************************************************
	 *Window,Form相关
	 ************************************************************************/
	var contact_store = new Ext.data.JsonStore({
		root : 'root',
		totalProperty : 'totalProperty',
		idProperty : 'id',
		remoteSort : false,
		fields : [{
					"name" : "id",
					"mapping" : "id",
					"type" : "int"
				}, {
					"name" : "jijianren_xingming",//lying
					"mapping" : "jijianren_xingming",
					"type" : "string"
				}, {
					"name" : "jijianren_shouji",
					"mapping" : "jijianren_shouji",
					"type" : "string"
				}, {
					"name" : "jijianren_danwei",
					"mapping" : "jijianren_danwei",
					"type" : "string"
				}, {
					"name" : "jijianren_dizhi",
					"mapping" : "jijianren_dizhi",
					"type" : "string"
				}, {
					"name" : "jijianren_youbian",
					"mapping" : "jijianren_youbian",
					"type" : "string"
				},, {
					"name" : "shoujianren_xingming",
					"mapping" : "shoujianren_xingming",
					"type" : "string"
				}, {
					"name" : "shoujianren_shouji",
					"mapping" : "shoujianren_shouji",
					"type" : "string"
				}, {
					"name" : "shoujianren_danwei",
					"mapping" : "shoujianren_danwei",
					"type" : "string"
				}, {
					"name" : "shoujianren_dizhi",
					"mapping" : "shoujianren_dizhi",
					"type" : "string"
				}, {
					"name" : "shoujianren_youbian",
					"mapping" : "shoujianren_youbian",
					"type" : "string"
				}],
		proxy : new Ext.data.HttpProxy({
					url : 'kddInfoAction!listKddContactInfo',
					method : 'POST'
				})
	});
	contact_store.load({
		params : {
			start : 0,
			limit : page_cs
		}
	});
	var sm_c = new Ext.grid.CheckboxSelectionModel();
	var contact_grid = new Ext.grid.GridPanel({
		height : height,
		width : width,
		title : '',
		store : contact_store,
		trackMouseOver : true,
		disableSelection : false,
		loadMask : true,
		clicksToEdit : 1,
		sm : sm_c,
		columns : [sm_c, {
					header : "寄件人姓名 ",
					dataIndex : 'jijianren_xingming',
					sortable : true
				}, {
					header : "寄件人手机",
					dataIndex : 'jijianren_shouji',
					sortable : true
				}, {
					header : "寄件人单位",
					dataIndex : 'jijianren_danwei',
					sortable : true
				}, {
					header : "寄件人地址",
					dataIndex : 'jijianren_dizhi',
					sortable : true
				}, {
					header : "寄件人邮编",
					dataIndex : 'jijianren_youbian',
					sortable : true
				},{
					header : "收件人姓名 ",
					dataIndex : 'shoujianren_xingming',
					sortable : true
				}, {
					header : "收件人手机",
					dataIndex : 'shoujianren_shouji',
					sortable : true
				}, {
					header : "收件人单位",
					dataIndex : 'shoujianren_danwei',
					sortable : true
				}, {
					header : "收件人地址",
					dataIndex : 'shoujianren_dizhi',
					sortable : true
				}, {
					header : "收件人邮编",
					dataIndex : 'shoujianren_youbian',
					sortable : true
				}],
		tbar : [ts, {
			text : '删除',
			tooltip : '删除',
			icon : "img/button/add.gif",
			handler : function() {

				var records = contact_grid.getSelectionModel().getSelections();
				if (records.length == 0) {
					Ext.MessageBox.alert('提示', '请选择要删除的记录');
				} else {
					Ext.MessageBox.confirm('请确认', '确认删除 ', function(btn) {
						if (btn == 'yes') {
							var ids = '';
							for (var i = 0; i < records.length; i++) {
								ids += records[i].get('id') + ',';
							}
							if (ids.indexOf(',')) {
								ids = ids.substr(0, ids.length);
							}
							Ext.Ajax.request({
								url : 'kddInfoAction!deleteKddContactInfo',
								success : function(response) {
									var responseArray = Ext.util.JSON.decode(response.responseText);
									if (responseArray.success == 'true') {
										contact_grid.store.reload();
										Ext.MessageBox.alert('提示', '删除常用联系人成功');
									}
								},
								params : {
									ids : ids
								}
							});
						}
					});
				}
			}
		}],
		listeners : {
			'rowclick' : function() {
				var rec = contact_grid.getSelectionModel().getSelected();
				kddForm.getForm().findField('jijianren_xingming').setValue(rec.get('jijianren_xingming'));
				kddForm.getForm().findField('jijianren_shouji').setValue(rec.get('jijianren_shouji'));
				kddForm.getForm().findField('jijianren_danwei').setValue(rec.get('jijianren_danwei'));
				kddForm.getForm().findField('jijianren_dizhi').setValue(rec.get('jijianren_dizhi'));
				kddForm.getForm().findField('jijianren_youbian').setValue(rec.get('jijianren_youbian'));
				
				kddForm.getForm().findField('shoujianren_xingming').setValue(rec.get('shoujianren_xingming'));
				kddForm.getForm().findField('shoujianren_shouji').setValue(rec.get('shoujianren_shouji'));
				kddForm.getForm().findField('shoujianren_danwei').setValue(rec.get('shoujianren_danwei'));
				kddForm.getForm().findField('shoujianren_dizhi').setValue(rec.get('shoujianren_dizhi'));
				kddForm.getForm().findField('shoujianren_youbian').setValue(rec.get('shoujianren_youbian'));

				//jingchang_Window.hide();
			}
		}
	});

	var jingchang_Window = new Ext.Window({
		title : '选择常用联系人',
		width : 750,
		height : 450,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'right',
		closable : false,
		items : contact_grid,
		buttons : [ts, {
			text : '取消',
			icon : "img/button/add.gif",
			handler : function() {
				jingchang_Window.hide();
			}
		}, ts]
	});
	
	var wenshuForm = new Ext.FormPanel({
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
					fieldLabel : '受理案件通知书',
					name : 'wenshu_check1',
					value : '1',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '应诉通知书',
					name : 'wenshu_check2',
					value : '2',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '起诉或反诉副本',
					name : 'wenshu_check3',
					value : '3',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '答辩状副本',
					name : 'wenshu_check4',
					value : '4',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '举证通知书',
					name : 'wenshu_check5',
					value : '5',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '传票',
					name : 'wenshu_check6',
					value : '6',
					anchor : '95%'
				}]
			}, {
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'checkbox',
					fieldLabel : '出庭通知书',
					name : 'wenshu_check7',
					value : '7',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '民事裁定书',
					name : 'wenshu_check8',
					value : '8',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '民事判决书',
					name : 'wenshu_check9',
					value : '9',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '民事调解书',
					name : 'wenshu_check10',
					value : '10',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '其他',
					name : 'wenshu_check11',
					value : '11',
					anchor : '95%'
				}]
			}]
		}]
	});
	
	var beizhuForm = new Ext.FormPanel({
		labelAlign : 'left',
		frame : true,
		title : '',
		bodyStyle : 'padding:5px 5px 0',
		autoScroll : true,
		items : [{
			layout : 'column',
			items : [{
				columnWidth : 1,
				layout : 'form',
				items : [{
					xtype : 'textarea',
					fieldLabel : '备注信息',
					name : 'kdd_mark',
					anchor : '95%'
				}]
			}]
		}]
	});
	
	var beizhuWindow = new Ext.Window({
		title : '填写备注信息',
		width : 400,
		height : 60,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'right',
		closable : false,
		items : beizhuForm,
		buttons : [ts, {
			text : '确定',
			icon : "img/button/add.gif",
			handler : function() {
				var records = grid.getSelectionModel().getSelections();
				if (records.length == 0) {
					Ext.MessageBox.alert('提示', '请选择要备注的记录');
					return;
				} else if (records.length > 1) {
					Ext.MessageBox.alert('提示', '仅支持单条备注');
					return;
				}else {
					var mark = beizhuForm.getForm().findField('kdd_mark').getValue();
					Ext.Ajax.request({
                		url: 'kddInfoAction!saveOrUpdate_statusAndMark',
                		success: function(response){
                			var responseArray = Ext.util.JSON.decode(response.responseText);
                			if (responseArray.success == 'true') {
                				Ext.MessageBox.alert('提示', '提交成功');
                				store.baseParams = {
                						search_type : search_type
                					};
                				store.load({
                					params : {
                						start : 0,
                						limit : page
                					}
                				});
                			}else{
                				Ext.MessageBox.alert('提示', '提交失败,请刷新页面重试!');
                			}
                			beizhuForm.form.reset();
                			beizhuWindow.hide();
                		},
                		params: { 
                			id:records[0].data.id,
                			kdd_mark:mark
					   	}
                	});
				}
			}
		}, ts, {
			text : '取消',
			icon : "img/button/add.gif",
			handler : function() {
				beizhuForm.form.reset();
				beizhuWindow.hide();
			}
		}, ts]
	});
	var wenshuWindow = new Ext.Window({
		title : '文书类型选择',
		width : 450,
		height : 260,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'right',
		closable : false,
		items : wenshuForm,
		buttons : [ts, {
			text : '确定',
			icon : "img/button/add.gif",
			handler : function() {
				var msg = "0";
				for(var i=1;i<12;i++){
					var check_box = eval("wenshuForm.getForm().findField('wenshu_check"+i+ "').checked");
					if(check_box){
						var check_value = eval("wenshuForm.getForm().findField('wenshu_check"+i+ "').value");
						msg += "," + check_value;
					}
				}
				kddForm.getForm().findField('wenshumingcheng').setValue(msg);
				wenshuForm.form.reset();
				wenshuWindow.hide();
			}
		}, ts, {
			text : '取消',
			icon : "img/button/add.gif",
			handler : function() {
				wenshuForm.form.reset();
				wenshuWindow.hide();
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
						data : [[-1, '所有'],[2,'未打印'],[3, '已打印'],[4,'已发送'],[51, '本人签收'],[52, '拒收'],[53,'代收'],[54,'地址不详'],[55,'其他']]
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
	
	var searchWindow = new Ext.Window({
		title : '查询/导出',
		width : 550,
		height : 300,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'right',
		closable : false,
		items : searchForm,
		buttons : [ts, {
			text : '查询/导出',
			icon : "img/button/add.gif",
			handler : function() {
				exportWindow.show();
			}
		},ts, {
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
		}, ts, {
			text : '取消',
			icon : "img/button/add.gif",
			handler : function() {
				searchForm.form.reset();
				searchWindow.hide();
			}
		}, ts]
	});
	var kddForm = new Ext.FormPanel({
		labelAlign : 'left',
		frame : true,
		title : '',
		bodyStyle : 'padding:5px 5px 0',
		width : 450,
		height : 400,
		autoScroll : true,
		items : [{
					xtype : 'panel',
					items : [{
								xtype : 'button',
								text : '选择常用联系人',
								name : 'jingchang_lainlixiren',
								handler : function() {
									contact_store.load({
										params : {
											start : 0,
											limit : page
										}
									});
									jingchang_Window.show();
								}

							}]
				}, {
					layout : 'column',
					items : [{
								columnWidth : .5,
								layout : 'form',
								items : [{
											xtype : 'textfield',
											fieldLabel : '寄件人_姓名',
											allowBlank : false,
											blankText : '不能为空',
											name : 'jijianren_xingming',
											anchor : '95%'
										}, {
											xtype : 'textfield',
											fieldLabel : '寄件人_手机',
											allowBlank : false,
											blankText : '不能为空',
											name : 'jijianren_shouji',
											anchor : '95%'
										}, {
											xtype : 'textfield',
											allowBlank : false,
											fieldLabel : '寄件人_单位名称',
											name : 'jijianren_danwei',
											anchor : '95%'
										}, {
											xtype : 'textfield',
											allowBlank : false,
											fieldLabel : '寄件人_地址',
											name : 'jijianren_dizhi',
											anchor : '95%'
										}, {
											xtype : 'textfield',
											allowBlank : false,
											fieldLabel : '寄件人_邮编',
											name : 'jijianren_youbian',
											anchor : '95%'
										}, {
											xtype : 'textfield',
											allowBlank : false,
											fieldLabel : '交寄人_签名',
											name : 'jiaojiren_qianming',
											anchor : '95%'
										},  {
											xtype : 'textfield',
											fieldLabel : '文件名称',
											name : 'wenjianmingcheng',
											anchor : '95%'
										}, {
											xtype : 'textfield',
											fieldLabel : '文书名',
											name : 'wenshumingcheng',
											editabled : false,
											value:0,
											listeners : { 
												"focus" : function() { 
													wenshuForm.form.reset();
													var msg = this.value+"";
													var check_arr = msg.split(',');
													for(var i=0;i<check_arr.length;i++){
														if((i+1)<check_arr.length){
															var vl = check_arr[i+1];
															eval("wenshuForm.getForm().findField('wenshu_check"+(vl)+ "').setValue(true)");
														}
													}
													wenshuWindow.show(); 
												}
											},
											anchor : '95%'
										}, {
											xtype : 'textfield',
											fieldLabel : '传票信息',
											name : 'chuanpiaoxinxi',
											anchor : '95%'
										}, {
											xtype : 'textfield',
											fieldLabel : '快递单类型',
											name : 'type',
											hidden : false,
											readOnly : true,
											anchor : '95%'
										}]
							}, {
								columnWidth : .5,
								layout : 'form',
								items : [{
									xtype : 'textfield',
									fieldLabel : '收件人_姓名',
									allowBlank : false,
									blankText : '不能为空',
									name : 'shoujianren_xingming',
									anchor : '95%'
								}, {
									xtype : 'textfield',
									fieldLabel : '收件人_手机',
									allowBlank : false,
									blankText : '不能为空',
									name : 'shoujianren_shouji',
									anchor : '95%'
								}, {
									xtype : 'textfield',
									allowBlank : false,
									fieldLabel : '收件人_单位名称',
									name : 'shoujianren_danwei',
									anchor : '95%'
								}, {
									xtype : 'textfield',
									allowBlank : false,
									fieldLabel : '收件人_地址',
									name : 'shoujianren_dizhi',
									anchor : '95%'
								}, {
									xtype : 'textfield',
									allowBlank : false,
									fieldLabel : '收件人_邮编',
									name : 'shoujianren_youbian',
									anchor : '95%'
								},{
									xtype : 'textfield',
									fieldLabel : '经办人_签名',
									name : 'jingbanren_qianming',
									anchor : '95%'
								}, {
									xtype : 'textfield',
									fieldLabel : '案号',
									name : 'anhao',
									anchor : '95%'
								}, {
									xtype : 'textfield',
									fieldLabel : '备注信息(文书)',
									name : 'beizhuxinxi',
									anchor : '95%'
								},{
									xtype : 'combo',
									fieldLabel: '内阜-外阜',
									anchor:'95%',
									displayField : 'text',
									valueField : 'value',
									mode : 'local',
									triggerAction : 'all',
									editable : false,
									value : '1',
									name : 'funei_fuwai',
									store : new Ext.data.ArrayStore({
										fields : ['value', 'text'],
										data : [[1, '内阜'],[2,'外阜']]
									})
				                },{
									xtype : 'textfield',
									fieldLabel : '',
									name : 'id',
									hidden : true,
									anchor : '95%'
								}]
							}]
				},
				{
					xtype : 'panel',
					items : [{
								xtype : 'checkbox',
								boxLabel : '将此寄件人信息添加到常用寄件人',
								name : 'add_lianlixiren'
							}]
				}]
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
						},{
							"name" : "baojiajiage",
							"mapping" : "baojiajiage",
							"type" : "string"
						},{
							"name" : "daishouhuokuan",
							"mapping" : "daishouhuokuan",
							"type" : "string"
						}],
				proxy : new Ext.data.HttpProxy({
							url : 'kddInfoAction!list_search_Kdds',
							method : 'POST'
						})
			});

	//store.setDefaultSort('code', 'desc');
	store.baseParams = {
			search_type : search_type
		};
	store.load({
				params : {
					start : 0,
					limit : page
				}
			});

	//    快递单状态（未提交、已提交、已打印、已发送、已回执（已接收、拒收） ）
	//    发件人姓名 发件人电话 收件人姓名 收件人电话（手机、座机）、快递类型（3种）、
	//    快递状态（ 未打印、已发货、已完成）、创建时间、邮件编号(系统自动生成)、
	//    快递编号（EY618159791CN）、案号（司法专邮，其他快递可以为空）。
	
	//	显示信息:收发人姓名,电话,状态,创建时间,编号,条形码,案号,部门名称

	//    grid.getStore().getModifiedRecords();获得编辑后的结果
	var bForm = new Ext.FormPanel({
		labelAlign : 'left',
		frame : true,
		ref:'bForm',
		title : '',
		bodyStyle : 'padding:5px 5px 0',
		autoScroll : true,
		items : [{
			xtype : 'textfield',
			fieldLabel : '条形码',
			name : 'tiaoxingma',
			anchor : '95%'
		}]
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
					header : "快递单类型",
					dataIndex : 'type',
					width : 150,
					hidden : true,
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
				}, ts, {
					text : '预览/打印',
					tooltip : '打印快递单',
					icon : "img/button/add.gif",
					handler : function() {
						var records = grid.getSelectionModel().getSelections();
						if (records.length == 0) {
							Ext.MessageBox.alert('提示', '请选择要打印的记录');
						}else if (records.length>1) {
							Ext.MessageBox.alert('提示', '仅支持单条信息打印');
						} else {
							if(records[0].data.status==2 || records[0].data.status==3){
								//寄件人单位
								var jijianren_danwei=records[0].data.jijianren_danwei;
								//寄件人地址
								var jijianren_dizhi=records[0].data.jijianren_dizhi;
								//寄件人邮编
								var jijianren_youbian=records[0].data.jijianren_youbian;
								var id=records[0].data.id;
								
								//寄件人手机2
								var jijianren_shouji=records[0].data.jijianren_shouji;
								if (jijianren_shouji == null) {
									jijianren_shouji = '';
								}
								//文书名称3
								var wenjianmingcheng=records[0].data.wenjianmingcheng;
								if (wenjianmingcheng == null) {
									wenjianmingcheng = '';
								}
								//案号4
								var anhao=records[0].data.anhao;
								if (anhao == null) {
									anhao = '-,-,-';
								}
								//文书名5
								var wenshumingcheng=records[0].data.wenshumingcheng;
								if (wenshumingcheng == null) {
									wenshumingcheng = '';
								}
								//备注信息6
								var beizhuxinxi=records[0].data.beizhuxinxi;
								if (beizhuxinxi == null) {
									beizhuxinxi = '';
								}
								//寄件人姓名 7
								var jijianren_xingming=records[0].data.jijianren_xingming;
								if (jijianren_xingming == null) {
									jijianren_xingming = '';
								}
								//收件人姓名 8
								var shoujianren_xingming=records[0].data.shoujianren_xingming;
								if (shoujianren_xingming == null) {
									shoujianren_xingming = '';
								}
								//收件人手机9
								var shoujianren_shouji=records[0].data.shoujianren_shouji;
								if (shoujianren_shouji == null) {
									shoujianren_shouji = '';
								}
								//收件人单位10
								var shoujianren_danwei=records[0].data.shoujianren_danwei;
								if (shoujianren_danwei == null) {
									shoujianren_danwei = '';
								}
								//收件人地址11
								var shoujianren_dizhi=records[0].data.shoujianren_dizhi;
								if (shoujianren_dizhi == null) {
									shoujianren_dizhi = '';
								}
								//收件人邮编12
								var shoujianren_youbian=records[0].data.shoujianren_youbian;
								if (shoujianren_youbian == null) {
									shoujianren_youbian = '';
								}
								var type = records[0].data.type;
								if (type == null) {
									type = '';
								}
								var chuanpiaoxinxi = records[0].data.chuanpiaoxinxi;
								var baojiajiage = records[0].data.baojiajiage;
								var daishouhuokuan = records[0].data.daishouhuokuan;
								
								var page = 'printType'+type+'_view.jsp';
//								window.open(page + '?jijianren_shouji='+jijianren_shouji
//										+'&wenjianmingcheng='+wenjianmingcheng //3
//										+'&anhao='+anhao
//										+'&wenshumingcheng='+wenshumingcheng
//										+'&beizhuxinxi='+beizhuxinxi//6
//										+'&jijianren_xingming='+jijianren_xingming
//										+'&shoujianren_xingming='+shoujianren_xingming
//										+'&shoujianren_shouji='+shoujianren_shouji//9
//										+'&shoujianren_danwei='+shoujianren_danwei
//										+'&shoujianren_dizhi='+shoujianren_dizhi //11
//										+'&shoujianren_youbian='+shoujianren_youbian
//										+'&jijianren_danwei='+jijianren_danwei
//										+'&jijianren_dizhi='+jijianren_dizhi
//										+'&jijianren_youbian='+jijianren_youbian
//										+'&chuanpiaoxinxi='+chuanpiaoxinxi
//										+'&baojiajiage='+baojiajiage
//										+'&daishouhuokuan='+daishouhuokuan
//										+'&id='+id,
//										'target','height=500,width=900,top=50,left=100,titlebar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=yes,status=no');
								window.open("kddInfoAction!printPage" + '?type='+type+'&id='+id+'&printOrView='+0,
										'target','height=500,width=900,top=50,left=100,titlebar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=yes,status=no');
							}else{
								Ext.MessageBox.alert('提示', '状态为:未打印/已打印,才能打印');
							}
						}
					}
				},ts, {
					text : '退回',
					tooltip : '退回快递',
					icon : "img/button/add.gif",
					handler : function() {
						var records = grid.getSelectionModel().getSelections();
						if (records.length == 0) {
							Ext.MessageBox.alert('提示', '请选择要退回的记录');
							return;
						} else if (records.length > 1) {
							Ext.MessageBox.alert('提示', '仅支持单条退回');
							return;
						}else if (records[0].data.status != 2) {
							Ext.MessageBox.alert('提示', '未打印的单据才能退回');
							return;
						}else {
							Ext.MessageBox.confirm('询问', '您确定要保退回信息?', function (opt) {
                                if (opt == 'yes') {
                                	Ext.Ajax.request({
                                		url: 'kddInfoAction!saveOrUpdate_statusAndMark?id='+records[0].data.id + '&status=0',
                                		success: function(response){
                                			var responseArray = Ext.util.JSON.decode(response.responseText);
                                			if (responseArray.success == 'true') {
                                				Ext.MessageBox.alert('提示', '提交成功');
                                				store.baseParams = {
                                						search_type : search_type
                                					};
                                				store.load({
                                					params : {
                                						start : 0,
                                						limit : page
                                					}
                                				});
                                			}
                                		}
                                	});
                                }
                            });
						}
					}
				},ts, {
					text : '发送',
					tooltip : '更改为已发送',
					icon : "img/button/add.gif",
					handler : function() {
						var records = grid.getSelectionModel().getSelections();
						if (records.length == 0) {
							Ext.MessageBox.alert('提示', '请选择要发送的记录');
							return;
						}else {
							Ext.MessageBox.confirm('询问', '您确定要发送选择的快递单?', function (opt) {
                                if (opt == 'yes') {
                                	var ids = "0";
                                	for(var i=0;i<records.length;i++){
                                		var record = records[i];
                                		if(record.data.status=="3"){
                                			ids += ","+record.data.id;
                                		}
                                	}
                                	Ext.Ajax.request({
                                		url: 'kddInfoAction!saveOrUpdate_statusAndMark?id='+ ids + '&status=4',
                                		success: function(response){
                                			var responseArray = Ext.util.JSON.decode(response.responseText);
                                			if (responseArray.success == 'true') {
                                				Ext.MessageBox.alert('提示', '提交成功');
                                				store.baseParams = {
                                						search_type : search_type
                                					};
                                				store.load({
                                					params : {
                                						start : 0,
                                						limit : page
                                					}
                                				});
                                			}
                                		}
                                	});
                                }
                            });
						}
					}
				},ts, {
					text : '备注信息',
					tooltip : '追加备注信息',
					icon : "img/button/add.gif",
					handler : function() {
						beizhuForm.form.reset();
						beizhuWindow.show();
					}
				}],
		bbar : new Ext.PagingToolbar({
					store : store,
					displayInfo : true,
					pageSize:page,
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
