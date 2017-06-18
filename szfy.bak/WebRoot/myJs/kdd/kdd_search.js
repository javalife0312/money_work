Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'qtip';

	var height = document.body.clientHeight;
	var width = document.body.clientWidth;
	var ts = '-';
	var page = 100;
	var search_type = "kdd_search";
	var kddtypevalue = 0;
	var kddtypeName = '';
	var kdd_upload_type = 0;

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
					"name" : "jijianren_xingming",
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
				},{
					"name" : "jiaojiren_qianming",
					"mapping" : "jiaojiren_qianming",
					"type" : "string"
				},{
					"name" : "jingbanren_qianming",
					"mapping" : "jingbanren_qianming",
					"type" : "string"
				},{
					"name" : "wenjianmingcheng",
					"mapping" : "wenjianmingcheng",
					"type" : "string"
				},{
					"name" : "beizhuxinxi",
					"mapping" : "beizhuxinxi",
					"type" : "string"
				},{
					"name" : "chuanpiaoxinxi",
					"mapping" : "chuanpiaoxinxi",
					"type" : "string"
				}],
		proxy : new Ext.data.HttpProxy({
					url : 'kddInfoAction!listKddContactInfo',
					method : 'POST'
				})
	});
//	contact_store.load({
//		params : {
//			start : 0,
//			limit : page
//		}
//	});
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
				}, {
					header : "交寄人",
					dataIndex : 'jiaojiren_qianming',
					sortable : true
				}, {
					header : "经办人",
					dataIndex : 'jingbanren_qianming',
					sortable : true
				}, {
					header : "内件名称",
					dataIndex : 'wenjianmingcheng',
					sortable : true
				}, {
					header : "备注信息",
					dataIndex : 'beizhuxinxi',
					sortable : true
				},{
					header : "传票信息",
					dataIndex : 'chuanpiaoxinxi',
					sortable : true
				}],
		tbar : [{
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
				//寄件人手机
				var jjr_shouji = rec.get('jijianren_shouji');
				if(jjr_shouji==null || jjr_shouji==''){
					jjr_shouji = ',';
				}
				var jjr_arr = jjr_shouji.split(",")
				kddForm.getForm().findField('jijianren_shouji_1').setValue(jjr_arr[0]);
				kddForm.getForm().findField('jijianren_shouji_2').setValue(jjr_arr[1]);
				kddForm.getForm().findField('jijianren_danwei').setValue(rec.get('jijianren_danwei'));
				kddForm.getForm().findField('jijianren_dizhi').setValue(rec.get('jijianren_dizhi'));
				kddForm.getForm().findField('jijianren_youbian').setValue(rec.get('jijianren_youbian'));
				
				kddForm.getForm().findField('shoujianren_xingming').setValue(rec.get('shoujianren_xingming'));
				//收件人手机
				var sjr_shouji = rec.get('shoujianren_shouji');
				if(sjr_shouji==null || sjr_shouji==''){
					sjr_shouji = ',,';
				}
				var sjr_arr = sjr_shouji.split(",");
				kddForm.getForm().findField('shoujianren_shouji_1').setValue(sjr_arr[0]);
				kddForm.getForm().findField('shoujianren_shouji_2').setValue(sjr_arr[1]);
				kddForm.getForm().findField('shoujianren_shouji_3').setValue(sjr_arr[2]);
				kddForm.getForm().findField('shoujianren_danwei').setValue(rec.get('shoujianren_danwei'));
				kddForm.getForm().findField('shoujianren_dizhi').setValue(rec.get('shoujianren_dizhi'));
				kddForm.getForm().findField('shoujianren_youbian').setValue(rec.get('shoujianren_youbian'));
				
				kddForm.getForm().findField('jiaojiren_qianming').setValue(rec.get('jiaojiren_qianming'));
				kddForm.getForm().findField('jingbanren_qianming').setValue(rec.get('jingbanren_qianming'));
				kddForm.getForm().findField('wenjianmingcheng').setValue(rec.get('wenjianmingcheng'));
				kddForm.getForm().findField('beizhuxinxi').setValue(rec.get('beizhuxinxi'));
				kddForm.getForm().findField('chuanpiaoxinxi').setValue(rec.get('chuanpiaoxinxi'));

				jingchang_Window.hide();
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
			xtype : 'textarea',
			fieldLabel : '备注信息',
			name : 'kdd_mark',
			anchor : '95%'
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
		border:false,
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
					value:'',
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
						data : [[-1, '所有'],[0, '退回'],[1, '保存'],[2,'保存提交'],[3,'已打印'],[4,'已发送'],[51, '本人签收'],[52, '拒收'],[53,'代收'],[54,'地址不详'],[55,'其他']]
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
					value:'',
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
	
	var neijianfuwuForm = new Ext.FormPanel({
		labelAlign : 'left',
		frame : true,
		title : '',
		bodyStyle : 'padding:5px 5px 0',
		border:false,
		autoScroll : true,
		items : [{
			layout : 'column',
			items : [{
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'checkbox',
					fieldLabel : '信函',
					name : 'neijianfuwu_check1',
					value : '1',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '文件资料',
					name : 'neijianfuwu_check2',
					value : '2',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '物品',
					name : 'neijianfuwu_check3',
					value : '3',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '保价',
					name : 'neijianfuwu_check4',
					value : '4',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '不保价',
					name : 'neijianfuwu_check5',
					value : '5',
					anchor : '95%'
				}]
			}, {
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'checkbox',
					fieldLabel : '妥投短信',
					name : 'neijianfuwu_check6',
					value : '6',
					anchor : '95%'
				},{
					xtype : 'checkbox',
					fieldLabel : '实物返单',
					name : 'neijianfuwu_check7',
					value : '7',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '电子返单',
					name : 'neijianfuwu_check8',
					value : '8',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '其他',
					name : 'neijianfuwu_check9',
					value : '9',
					anchor : '95%'
				}, {
					xtype : 'checkbox',
					fieldLabel : '代收货款',
					name : 'neijianfuwu_check10',
					value : '10',
					anchor : '95%'
				}]
			}]
		}]
	});
	var neijianfuwuWindow = new Ext.Window({
		title : '内件服务选择',
		width : 450,
		height : 260,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'right',
		closable : false,
		border:false,
		items : neijianfuwuForm,
		buttons : [ts, {
			text : '确定',
			icon : "img/button/add.gif",
			handler : function() {
				var msg = "0";
				for(var i=1;i<11;i++){
					var check_box = eval("neijianfuwuForm.getForm().findField('neijianfuwu_check"+i+ "').checked");
					if(check_box){
						var check_value = eval("neijianfuwuForm.getForm().findField('neijianfuwu_check"+i+ "').value");
						msg += "," + check_value;
					}
				}
				kddForm.getForm().findField('wenshumingcheng').setValue(msg);
				neijianfuwuForm.form.reset();
				neijianfuwuWindow.hide();
			}
		}, ts, {
			text : '取消',
			icon : "img/button/add.gif",
			handler : function() {
				neijianfuwuForm.form.reset();
				neijianfuwuWindow.hide();
			}
		}, ts]
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
				exportForm.form.reset();
				exportWindow.hide();
				searchWindow.hide();
				
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
//		frame : true,
		title : '',
		bodyStyle : 'padding:5px 5px 0',
		width : 450,
		height : 400,
		autoScroll : true,
		border : false,
		items : [{
					xtype : 'panel',
					border : false,
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
					border : false,
					items : [{
								columnWidth : .5,
								layout : 'form',
								border : false,
								items : [{
											xtype : 'textfield',
											fieldLabel : '寄件人_姓名',
											allowBlank : true,
											blankText : '不能为空',
											name : 'jijianren_xingming',
											anchor : '95%'
										}, {
											xtype : 'textfield',
											fieldLabel : '寄件人_座机',
											allowBlank : true,
											blankText : '不能为空',
											name : 'jijianren_shouji_1',
											anchor : '60%'
										}, {
											xtype : 'textfield',
											fieldLabel : '寄件人_手机',
											allowBlank : true,
											blankText : '不能为空',
											name : 'jijianren_shouji_2',
											anchor : '60%'
										}, {
											xtype : 'textfield',
											allowBlank : true,
											fieldLabel : '寄件人_单位名称',
											name : 'jijianren_danwei',
											anchor : '95%'
										}, {
											xtype : 'textfield',
											allowBlank : true,
											fieldLabel : '寄件人_地址',
											name : 'jijianren_dizhi',
											anchor : '95%'
										}, {
											xtype : 'textfield',
											allowBlank : true,
											fieldLabel : '寄件人_邮编',
											name : 'jijianren_youbian',
											anchor : '95%'
										}, {
											xtype : 'textfield',
											allowBlank : true,
											fieldLabel : '交寄人_签名',
											name : 'jiaojiren_qianming',
											anchor : '95%'
										},  {
											xtype : 'textfield',
											fieldLabel : '',
											id : 'wenjianmingchengID',
											name : 'wenjianmingcheng',
											anchor : '95%'
										}, {
											xtype : 'textfield',
											fieldLabel : '',
											id : 'wenshumingchengID',
											name : 'wenshumingcheng',
											editabled : false,
											value:0,
											listeners : { 
												"focus" : function() { 
													if(kddtypevalue==1){
														neijianfuwuForm.form.reset();
														var msg = this.value+"";
														var check_arr = msg.split(',');
														for(var i=0;i<check_arr.length;i++){
															if((i+1)<check_arr.length){
																var vl = check_arr[i+1];
																eval("neijianfuwuForm.getForm().findField('neijianfuwu_check"+(vl)+ "').setValue(true)");
															}
														}
														neijianfuwuWindow.show(); 
													}else{
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
											hidden : true,
											readOnly : true,
											anchor : '95%'
										}]
							}, {
								columnWidth : .5,
								layout : 'form',
								border : false,
								items : [{
									xtype : 'textfield',
									fieldLabel : '收件人_姓名',
									allowBlank : true,
									blankText : '不能为空',
									name : 'shoujianren_xingming',
									anchor : '95%'
								}, {
									xtype : 'textfield',
									fieldLabel : '收件人_手机',
									allowBlank : true,
									blankText : '不能为空',
									name : 'shoujianren_shouji_1',
									anchor : '60%'
								},{
									xtype : 'textfield',
									fieldLabel : '收件人_住宅电话',
									allowBlank : true,
									blankText : '不能为空',
									name : 'shoujianren_shouji_2',
									anchor : '60%'
								},{
									xtype : 'textfield',
									fieldLabel : '收件人_办公电话',
									allowBlank : true,
									blankText : '不能为空',
									name : 'shoujianren_shouji_3',
									anchor : '60%'
								}, {
									xtype : 'textfield',
									allowBlank : true,
									fieldLabel : '收件人_单位名称',
									name : 'shoujianren_danwei',
									anchor : '95%'
								}, {
									xtype : 'textfield',
									allowBlank : true,
									fieldLabel : '收件人_地址',
									name : 'shoujianren_dizhi',
									anchor : '95%'
								}, {
									xtype : 'textfield',
									allowBlank : true,
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
									id : 'funei_fuwaiID',
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
				},{
					xtype : 'panel',
					fieldLabel :  '案号',
					id : 'anhaoID',
					name : 'anhao',
					border : false,
					layout : 'hbox',
					items : [new Ext.form.Label({
						width:10,                           
						html:"<font color='black' size='2px'>(</font>"            
					}),{
								xtype : 'textfield',
								name : 'area1',
								ref : 'area1',
								width : 50,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>)</font>"            
							}), {
								xtype : 'textfield',
								name : 'area2',
								ref : 'area2',
								margins : '0 0 0 5',
								width : 50,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>字</font>"            
							}),{
								xtype : 'textfield',
								name : 'area3',
								margins : '0 0 0 5',
								width : 80,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>号</font>"            
							})]
				},{
					xtype : 'panel',
					fieldLabel :  '保价价格',
					id : 'baojiajiageID',
					name : 'baojiajiage',
					border : false,
					layout : 'hbox',
					items : [{
								xtype : 'numberfield',
								name : 'wan_baojiajiage',
								ref : 'wan_baojiajiage',
								width : 30,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>万</font>"            
							}), {
								xtype : 'numberfield',
								allowDecimals:false,//不能输入小数 
								maxValue:10,//最大值 
								minValue:0 ,//最小值 
								name : 'qian_baojiajiage',
								ref : 'qian_baojiajiage',
								margins : '0 0 0 5',
								width : 30,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>千</font>"            
							}), {
								xtype : 'numberfield',
								allowDecimals:false,//不能输入小数 
								maxValue:10,//最大值 
								minValue:0 ,//最小值 
								name : 'bai_baojiajiage',
								ref : 'bai_baojiajiage',
								margins : '0 0 0 5',
								width : 30,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>百</font>"            
							}), {
								xtype : 'numberfield',
								allowDecimals:false,//不能输入小数 
								maxValue:10,//最大值 
								minValue:0 ,//最小值 
								name : 'shi_baojiajiage',
								ref : 'shi_baojiajiage',
								margins : '0 0 0 5',
								width : 30,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>十</font>"            
							}), {
								xtype : 'numberfield',
								allowDecimals:false,//不能输入小数 
								maxValue:10,//最大值 
								minValue:0 ,//最小值 
								name : 'yuan_baojiajiage',
								ref : 'yuan_baojiajiage',
								margins : '0 0 0 5',
								width : 30,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>元</font>"            
							})]
				},{
					xtype : 'panel',
					fieldLabel :  '代收货款',
					id : 'daishouhuokuanID',
					name : 'daishouhuokuan',
					border : false,
					layout : 'hbox',
					items : [{
								xtype : 'numberfield',
								allowDecimals:false,//不能输入小数 
								maxValue:10,//最大值 
								minValue:0 ,//最小值 
								name : 'wan_daishouhuokuan',
								ref : 'wan_daishouhuokuan',
								width : 30,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>万</font>"            
							}), {
								xtype : 'numberfield',
								allowDecimals:false,//不能输入小数 
								maxValue:10,//最大值 
								minValue:0 ,//最小值 
								name : 'qian_daishouhuokuan',
								ref : 'qian_daishouhuokuan',
								margins : '0 0 0 5',
								width : 30,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>千</font>"            
							}), {
								xtype : 'numberfield',
								allowDecimals:false,//不能输入小数 
								maxValue:10,//最大值 
								minValue:0 ,//最小值 
								name : 'bai_daishouhuokuan',
								ref : 'bai_daishouhuokuan',
								margins : '0 0 0 5',
								width : 30,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>百</font>"            
							}), {
								xtype : 'numberfield',
								allowDecimals:false,//不能输入小数 
								maxValue:10,//最大值 
								minValue:0 ,//最小值 
								name : 'shi_daishouhuokuan',
								ref : 'shi_daishouhuokuan',
								margins : '0 0 0 5',
								width : 30,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>十</font>"            
							}), {
								xtype : 'numberfield',
								allowDecimals:false,//不能输入小数 
								maxValue:10,//最大值 
								minValue:0 ,//最小值 
								name : 'yuan_daishouhuokuan',
								ref : 'yuan_daishouhuokuan',
								margins : '0 0 0 5',
								width : 30,
								height : 22,
								allowBlank : true
							},new Ext.form.Label({
								width:10,                           
								html:"<font color='black' size='2px'>元</font>"            
							})]
				},
				{
					xtype : 'panel',
					border : false,
					items : [{
								xtype : 'checkbox',
								boxLabel : '将此寄件人信息添加到常用寄件人',
								name : 'add_lianlixiren'
							}]
				}]
	});
	var win = new Ext.Window({
		title : kddtypeName + '信息录入',
		width : 600,
		height : 440,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		closable : false,
		border : false,
		items : [kddForm],
		modal : true,
		buttons : [ts, {
			text : '保存打印',
			icon : "img/button/add.gif",
			handler : function() {
				//寄件人电话
				var jjr_shouji1 = kddForm.getForm().findField('jijianren_shouji_1').getValue();
				var jjr_shouji2 = kddForm.getForm().findField('jijianren_shouji_2').getValue();
				var jijianren_shouji = jjr_shouji1 + "," + jjr_shouji2;
				//收件人电话
				var sjr_shouji1 = kddForm.getForm().findField('shoujianren_shouji_1').getValue();
				var sjr_shouji2 = kddForm.getForm().findField('shoujianren_shouji_2').getValue();
				var sjr_shouji3 = kddForm.getForm().findField('shoujianren_shouji_3').getValue();
				var shoujianren_shouji = sjr_shouji1 + "," + sjr_shouji2 + "," + sjr_shouji3;
				
				//案号信息
				var area1 = kddForm.getForm().findField('area1').getValue();
				var area2 = kddForm.getForm().findField('area2').getValue();
				var area3 = kddForm.getForm().findField('area3').getValue();
				if(area1==''){
					area1='-';
				}
				if(area2==''){
					area2='-';
				}
				if(area3==''){
					area3='-';
				}
				var anhao =  area1+','+area2+','+area3;
				
				//保价信息
				var wan_baojiajiage = kddForm.getForm().findField('wan_baojiajiage').getValue();
				var qian_baojiajiage = kddForm.getForm().findField('qian_baojiajiage').getValue();
				var bai_baojiajiage = kddForm.getForm().findField('bai_baojiajiage').getValue();
				var shi_baojiajiage = kddForm.getForm().findField('shi_baojiajiage').getValue();
				var yuan_baojiajiage = kddForm.getForm().findField('yuan_baojiajiage').getValue();
				if(wan_baojiajiage==''){
					wan_baojiajiage=0;
				}
				if(qian_baojiajiage==''){
					qian_baojiajiage=0;
				}
				if(bai_baojiajiage==''){
					bai_baojiajiage=0;
				}
				if(shi_baojiajiage==''){
					shi_baojiajiage=0;
				}
				if(yuan_baojiajiage==''){
					yuan_baojiajiage=0;
				}
				var baojiajiage =  wan_baojiajiage+','+qian_baojiajiage+','+bai_baojiajiage+','+shi_baojiajiage+','+yuan_baojiajiage;
				
				//代收货款
				var wan_daishouhuokuan = kddForm.getForm().findField('wan_daishouhuokuan').getValue();
				var qian_daishouhuokuan = kddForm.getForm().findField('qian_daishouhuokuan').getValue();
				var bai_daishouhuokuan = kddForm.getForm().findField('bai_daishouhuokuan').getValue();
				var shi_daishouhuokuan = kddForm.getForm().findField('shi_daishouhuokuan').getValue();
				var yuan_daishouhuokuan = kddForm.getForm().findField('yuan_daishouhuokuan').getValue();
				
				if(wan_daishouhuokuan==''){
					wan_daishouhuokuan=0;
				}
				if(qian_daishouhuokuan==''){
					qian_daishouhuokuan=0;
				}
				if(bai_daishouhuokuan==''){
					bai_daishouhuokuan=0;
				}
				if(shi_daishouhuokuan==''){
					shi_daishouhuokuan=0;
				}
				if(yuan_daishouhuokuan==''){
					yuan_daishouhuokuan=0;
				}
				var daishouhuokuan = wan_daishouhuokuan+','+qian_daishouhuokuan+','+bai_daishouhuokuan+','+shi_daishouhuokuan+','+yuan_daishouhuokuan;
				
				kddForm.getForm().submit({
					url : 'kddInfoAction!saveOrUpdate',
					params : {
						status : 2,
						anhao:anhao,
						baojiajiage:baojiajiage,
						daishouhuokuan:daishouhuokuan,
						jijianren_shouji:jijianren_shouji,
						shoujianren_shouji:shoujianren_shouji,
						add_lianlixiren : kddForm.getForm().findField('add_lianlixiren').getValue()
					},
					success : function(response, action) {
						if (action.result.success == 'true') {
							Ext.MessageBox.alert('提示', '快递单录入成功');
							store.load({
								params : {
									start : 0,
									limit : page,
									search_type : search_type
								}
							});
						}else{
							Ext.MessageBox.alert('提示', '快递单录入失败,请刷新页面重试!');
						}
						win.hide();
					}
				});
			}
		},ts, {
			text : '保存',
			icon : "img/button/add.gif",
			handler : function() {
				//寄件人电话
				var jjr_shouji1 = kddForm.getForm().findField('jijianren_shouji_1').getValue();
				var jjr_shouji2 = kddForm.getForm().findField('jijianren_shouji_2').getValue();
				var jijianren_shouji = jjr_shouji1 + "," + jjr_shouji2;
				//收件人电话
				var sjr_shouji1 = kddForm.getForm().findField('shoujianren_shouji_1').getValue();
				var sjr_shouji2 = kddForm.getForm().findField('shoujianren_shouji_2').getValue();
				var sjr_shouji3 = kddForm.getForm().findField('shoujianren_shouji_3').getValue();
				var shoujianren_shouji = sjr_shouji1 + "," + sjr_shouji2 + "," + sjr_shouji3;
				
				//案号信息
				var area1 = kddForm.getForm().findField('area1').getValue();
				var area2 = kddForm.getForm().findField('area2').getValue();
				var area3 = kddForm.getForm().findField('area3').getValue();
				if(area1==''){
					area1='-';
				}
				if(area2==''){
					area2='-';
				}
				if(area3==''){
					area3='-';
				}
				var anhao =  area1+','+area2+','+area3;
				
				//保价信息
				var wan_baojiajiage = kddForm.getForm().findField('wan_baojiajiage').getValue();
				var qian_baojiajiage = kddForm.getForm().findField('qian_baojiajiage').getValue();
				var bai_baojiajiage = kddForm.getForm().findField('bai_baojiajiage').getValue();
				var shi_baojiajiage = kddForm.getForm().findField('shi_baojiajiage').getValue();
				var yuan_baojiajiage = kddForm.getForm().findField('yuan_baojiajiage').getValue();
				if(wan_baojiajiage==''){
					wan_baojiajiage=0;
				}
				if(qian_baojiajiage==''){
					qian_baojiajiage=0;
				}
				if(bai_baojiajiage==''){
					bai_baojiajiage=0;
				}
				if(shi_baojiajiage==''){
					shi_baojiajiage=0;
				}
				if(yuan_baojiajiage==''){
					yuan_baojiajiage=0;
				}
				var baojiajiage =  wan_baojiajiage+','+qian_baojiajiage+','+bai_baojiajiage+','+shi_baojiajiage+','+yuan_baojiajiage;
				
				//代收货款
				var wan_daishouhuokuan = kddForm.getForm().findField('wan_daishouhuokuan').getValue();
				var qian_daishouhuokuan = kddForm.getForm().findField('qian_daishouhuokuan').getValue();
				var bai_daishouhuokuan = kddForm.getForm().findField('bai_daishouhuokuan').getValue();
				var shi_daishouhuokuan = kddForm.getForm().findField('shi_daishouhuokuan').getValue();
				var yuan_daishouhuokuan = kddForm.getForm().findField('yuan_daishouhuokuan').getValue();
				
				if(wan_daishouhuokuan==''){
					wan_daishouhuokuan=0;
				}
				if(qian_daishouhuokuan==''){
					qian_daishouhuokuan=0;
				}
				if(bai_daishouhuokuan==''){
					bai_daishouhuokuan=0;
				}
				if(shi_daishouhuokuan==''){
					shi_daishouhuokuan=0;
				}
				if(yuan_daishouhuokuan==''){
					yuan_daishouhuokuan=0;
				}
				var daishouhuokuan = wan_daishouhuokuan+','+qian_daishouhuokuan+','+bai_daishouhuokuan+','+shi_daishouhuokuan+','+yuan_daishouhuokuan;
				
				kddForm.getForm().submit({
					url : 'kddInfoAction!saveOrUpdate',
					params : {
						status : 1,
						anhao:anhao,
						baojiajiage:baojiajiage,
						daishouhuokuan:daishouhuokuan,
						jijianren_shouji:jijianren_shouji,
						shoujianren_shouji:shoujianren_shouji,
						add_lianlixiren : kddForm.getForm().findField('add_lianlixiren').getValue()
					},
					success : function(response, action) {
						if (action.result.success == 'true') {
							Ext.MessageBox.alert('提示', '快递单录入成功');
							store.load({
								params : {
									start : 0,
									limit : page,
									search_type : search_type
								}
							});
						}else{
							Ext.MessageBox.alert('提示', '快递单录入失败,请刷新页面重试!');
						}
						win.hide();
					}
				});
			}
		}, ts, {
			text : '取消',
			icon : "img/button/add.gif",
			handler : function() {
				kddForm.form.reset();
				win.hide();
			}
		}, ts]
	});

	var huizhiForm = new Ext.FormPanel({
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
					xtype : 'combo',
					fieldLabel: '回执状态',
					anchor:'95%',
					displayField : 'text',
					valueField : 'value',
					mode : 'local',
					triggerAction : 'all',
					editable : false,
					value : 51,
					name : 'hzstatus',
					store : new Ext.data.ArrayStore({
						fields : ['value', 'text'],
						data : [[51, '本人签收'],[52, '拒收'],[53,'代收'],[54,'地址不详'],[55,'其他']]
					})
			    }]
			},{
				columnWidth : 1,
				layout : 'form',
				items : [{
					xtype : 'textfield',
					fieldLabel : '其他',
					name : 'qita',
					anchor : '95%'
				}]
			}]
		}]
	});
	
	var huizhiWindow = new Ext.Window({
		title : '填写回执信息',
		width : 400,
		height : 60,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'right',
		closable : false,
		items : huizhiForm,
		buttons : [ts, {
			text : '确定',
			icon : "img/button/add.gif",
			handler : function() {
				var records = grid.getSelectionModel().getSelections();
				debugger;
				if(records[0].data.status!=4){
					Ext.MessageBox.alert('提示', '已发送状态的快递单才能回执');
					return;
				}else{
					var id = records[0].data.id;
					var hzstatus = huizhiForm.getForm().findField('hzstatus').getValue();
					var qita = huizhiForm.getForm().findField('qita').getValue();
					Ext.Ajax.request({
						url: 'kddInfoAction!saveOrUpdate_huizhi',
						success: function(response){
							var responseArray = Ext.util.JSON.decode(response.responseText);
							if (responseArray.success == 'true') {
								Ext.MessageBox.alert('提示', '提交成功');
								store.load({
									params : {
										start : 0,
										limit : page,
										search_type:search_type
									}
								});
							}else{
								Ext.MessageBox.alert('提示', '提交失败,请刷新页面重试!');
							}
							huizhiForm.form.reset();
							huizhiWindow.hide();
						},
						params: { 
							id:id,
							qita:qita,
							hzstatus:hzstatus
						}
					});
				}
			}
		}, ts, {
			text : '取消',
			icon : "img/button/add.gif",
			handler : function() {
				huizhiForm.form.reset();
				huizhiWindow.hide();
			}
		}, ts]
	});

	/***********************************************************************
	 *Window,Form相关
	 ************************************************************************/
	
	/***********************************************************************
	*Window,Form 上传导入
	************************************************************************/	
	var uploadForm_type_select = new Ext.FormPanel({
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
					xtype : 'combo',
					fieldLabel: '快递单类型',
					anchor:'95%',
					displayField : 'text',
					valueField : 'value',
					mode : 'local',
					triggerAction : 'all',
					editable : false,
					value : '3',
					name : 'kdd_upload_type',
					store : new Ext.data.ArrayStore({
						fields : ['value', 'text'],
						data : [[1, '国内市外'],[2, '京城市内'],[3,'司法专邮']]
					})
                }]
			}]
		}]
	});

    var uploadWindow_type_select = new Ext.Window({
        id : 'uploadWindow__type_select',
        title: '类型选择',
        width: 600,
        height:120,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'right',
        closable:false,
        items: uploadForm_type_select,
        buttons: [ts,{
            text: '确认选择',
            icon : "img/button/add.gif",
            handler: function(){
            	kdd_upload_type = uploadForm_type_select.getForm().findField("kdd_upload_type").getValue();
            	uploadWindow_type_select.hide();
            	uploadWindow.show();
            }
        },ts,{
            text: '取消',
            icon : "img/button/add.gif",
            handler: function(){
            	uploadForm_type_select.getForm().reset();;
            	uploadWindow_type_select.hide();
            }
        },ts]
    });
	var uploadForm = new Ext.form.FormPanel({    
		labelAlign: 'left',
        frame:true,
        bodyStyle:'padding:5px 5px 0',
	    labelWidth: 80,     
	    fileUpload:true,    
	    defaultType: 'form',    
	    items: [{    
	        xtype: 'textfield',    
	        fieldLabel: '上传文件',    
	        name: 'urlName',    
	        inputType: 'file',    
	        allowBlank: false,    
	        anchor: '90%'
	   }]    
	});  
    var uploadWindow = new Ext.Window({
        id : 'uploadWindow',
        title: '文件上传',
        width: 600,
        height:120,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'right',
        closable:false,
        items: uploadForm,
        buttons: [ts,{
            text: '上传文件',
            icon : "img/button/add.gif",
            handler: function(){
            	debugger
            	uploadForm.getForm().submit({  
            	    url : 'uploadAction!upload?kdd_upload_type='+kdd_upload_type,  
            	    method : 'POST',  
            	    success : function(form, action) {
            	    	store.proxy = new Ext.data.HttpProxy({
			   				url: 'kddInfoAction!list_search_Kdds',
				            method: 'POST'
						});
						store.load({
							params : {
								start : 0,
								limit : page
							}
						});
						store.reload();
						
            	        Ext.Msg.alert('成功','恭喜！文件上传成功！');  
            	        uploadWindow.hide();  
            	    },  
            	    failure : function(form, action) {
            	        Ext.Msg.alert('錯誤',"文件上传失败，请重新操作！");  
            	    }  
            	}) ; 
            }
        },ts,{
            text: '取消',
            icon : "img/button/add.gif",
            handler: function(){
            	uploadForm.getForm().reset();;
            	uploadWindow.hide();
            }
        },ts]
    });
	/***********************************************************************
	*Window,Form 上传导入
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
	store.load({
				params : {
					start : 0,
					limit : page,
					search_type : search_type
				}
			});

	//    快递单状态（未提交、已提交、已打印、已发送、已回执（已接收、拒收） ）
	//    发件人姓名 发件人电话 收件人姓名 收件人电话（手机、座机）、快递类型（3种）、
	//    快递状态（ 未打印、已发货、已完成）、创建时间、邮件编号(系统自动生成)、
	//    快递编号（EY618159791CN）、案号（司法专邮，其他快递可以为空）。
	
	//	显示信息:收发人姓名,电话,状态,创建时间,编号,条形码,案号,部门名称

	//    grid.getStore().getModifiedRecords();获得编辑后的结果
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
			header : "快递单类型",
			dataIndex : 'type',
			hidden: true,
			sortable : true
		}, {
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
						if(value == 0){
							return "退回";
						}
						if(value == 1){
							return "保存";
						}
						if(value == 2){
							return "已提交";
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
		tbar : [ts,
		        {
					text : '批量导入',
					tooltip : '批量导入',
					icon : "img/button/add.gif",
					handler : function() {
						uploadWindow_type_select.show();
					}
		        }, 
				ts,{
					text : '查询/导出',
					tooltip : '检索快递单',
					icon : "img/button/add.gif",
					handler : function() {
						searchWindow.show();
					}
				}, ts, {
					text : '修改',
					tooltip : '修改',
					icon : "img/button/add.gif",
					handler : function() {
						var records = grid.getSelectionModel().getSelections();
						if (records.length == 0) {
							Ext.MessageBox.alert('提示', '请选择要修改的记录');
							return;
						} else if (records.length > 1) {
							Ext.MessageBox.alert('提示', '仅支持单条修改');
							return;
						}else if(records[0].data.status > 1){
							Ext.MessageBox.alert('提示', '已提交的数据不能修改');
						} else {
							kddForm.form.reset();
							kddForm.form.loadRecord(records[0]);
							kddtypevalue = records[0].data.type;
							
							var anhao = records[0].data.anhao;
							var baojiajiage = records[0].data.baojiajiage;
							var daishouhuokuan = records[0].data.daishouhuokuan;
							var jijianren_shouji = records[0].data.jijianren_shouji;
							var shoujianren_shouji = records[0].data.shoujianren_shouji;

							if(anhao==null || anhao==''){
								anhao="-,-,-";
							}
							if(baojiajiage==null || baojiajiage==''){
								baojiajiage="0,0,0,0,0";
							}
							if(daishouhuokuan==null || daishouhuokuan==''){
								daishouhuokuan="0,0,0,0,0";
							}
							if(jijianren_shouji==null || jijianren_shouji==''){
								jijianren_shouji=",";
							}
							if(shoujianren_shouji==null || shoujianren_shouji==''){
								shoujianren_shouji=",,";
							}
							
							var baojiajiageValue = baojiajiage.split(',');
							kddForm.getForm().findField('wan_baojiajiage').setValue(baojiajiageValue[0]);
							kddForm.getForm().findField('qian_baojiajiage').setValue(baojiajiageValue[1]);
							kddForm.getForm().findField('bai_baojiajiage').setValue(baojiajiageValue[2]);
							kddForm.getForm().findField('shi_baojiajiage').setValue(baojiajiageValue[3]);
							kddForm.getForm().findField('yuan_baojiajiage').setValue(baojiajiageValue[4]);
							
							var daishouhuokuanValue = daishouhuokuan.split(',');
							kddForm.getForm().findField('wan_daishouhuokuan').setValue(daishouhuokuanValue[0]);
							kddForm.getForm().findField('qian_daishouhuokuan').setValue(daishouhuokuanValue[1]);
							kddForm.getForm().findField('bai_daishouhuokuan').setValue(daishouhuokuanValue[2]);
							kddForm.getForm().findField('shi_daishouhuokuan').setValue(daishouhuokuanValue[3]);
							kddForm.getForm().findField('yuan_daishouhuokuan').setValue(daishouhuokuanValue[4]);
							
							var areaValue = anhao.split(',');
							kddForm.getForm().findField('area1').setValue(areaValue[0]);
							kddForm.getForm().findField('area2').setValue(areaValue[1]);
							kddForm.getForm().findField('area3').setValue(areaValue[2]);
							
							var jjr_arr = jijianren_shouji.split(',');
							kddForm.getForm().findField('jijianren_shouji_1').setValue(jjr_arr[0]);
							kddForm.getForm().findField('jijianren_shouji_2').setValue(jjr_arr[1]);
							
							var sjr_arr = shoujianren_shouji.split(',');
							kddForm.getForm().findField('shoujianren_shouji_1').setValue(sjr_arr[0]);
							kddForm.getForm().findField('shoujianren_shouji_2').setValue(sjr_arr[1]);
							kddForm.getForm().findField('shoujianren_shouji_3').setValue(sjr_arr[2]);
						
							Ext.getCmp('wenjianmingchengID').fieldLabel="文件名称";
							Ext.getCmp('wenshumingchengID').fieldLabel="信息勾选";
							
							if (kddtypevalue == 1) {
								kddtypeName = '国内';
								Ext.getCmp('anhaoID').hide();
								Ext.getCmp('funei_fuwaiID').hide();
								Ext.getCmp('baojiajiageID').show();
								Ext.getCmp('daishouhuokuanID').show();
							} else if (kddtypevalue == 2) {
								kddtypeName = '京城';
								Ext.getCmp('baojiajiageID').hide();
								Ext.getCmp('daishouhuokuanID').hide();
								Ext.getCmp('anhaoID').show();
								Ext.getCmp('funei_fuwaiID').show();
							} else {
								kddtypeName = '司法专邮';
								Ext.getCmp('baojiajiageID').hide();
								Ext.getCmp('daishouhuokuanID').hide();
								Ext.getCmp('anhaoID').show();
								Ext.getCmp('funei_fuwaiID').show();
							}
							win.show();
						}
					}
				}, ts, {
					text : '删除',
					tooltip : '删除',
					icon : "img/button/add.gif",
					handler : function() {
						var records = grid.getSelectionModel().getSelections();
						if (records.length == 0) {
							Ext.MessageBox.alert('提示', '请选择要删除的记录');
						} else {
							Ext.MessageBox.confirm('请确认', '确认删除 ',
									function(btn) {
										if (btn == 'yes') {
											var ids = '';
											for (var i = 0; i < records.length; i++) {
												if(records[i].get('status') < 2){
													ids += records[i].get('id') + ',';
												}
											}
											if (ids.indexOf(',')) {
												ids = ids.substr(0, ids.length);
											}
											Ext.Ajax.request({
												url : 'kddInfoAction!delete',
												success : function(response) {
													var responseArray = Ext.util.JSON
															.decode(response.responseText);

													if (responseArray.success == 'true') {
														store.reload();
														Ext.MessageBox
																.alert('提示',
																		'删除快递单成功');
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
				},ts, {
					text : '提交去打印',
					tooltip : '提交打印',
					icon : "img/button/add.gif",
					handler : function() {
						var records = grid.getSelectionModel().getSelections();
						if (records.length == 0) {
							Ext.MessageBox.alert('提示', '请选择要操作的记录');
							return;
						} else {
							var ids = "";
							for(var i=0;i<records.length;i++){
								if(records[i].data.status<=1){
									ids += records[i].data.id + ",";
								}
							}
							Ext.MessageBox.confirm('询问', '您确定要保存打印?', function (opt) {
                                if (opt == 'yes') {
                                	Ext.Ajax.request({
                                		url: 'kddInfoAction!saveOrUpdate_statusAndMark?id='+ids + '&status=2',
                                		success: function(response){
                                			var responseArray = Ext.util.JSON.decode(response.responseText);
                                			if (responseArray.success == 'true') {
                                				Ext.MessageBox.alert('提示', '提交成功');
                                				store.load({
                                					params : {
                                						start : 0,
                                						limit : page,
                                						search_type : search_type
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
				},ts, {
					text : '回执',
					tooltip : '回执状态',
					icon : "img/button/add.gif",
					handler : function() {
						var records = grid.getSelectionModel().getSelections();
						if(records.length == 0) {
							Ext.MessageBox.alert('提示', '请选择要回执的记录');
						}else if(records.length > 1) {
							Ext.MessageBox.alert('提示', '仅支持单条信息回执');
						}else{
							huizhiWindow.show();
							huizhiForm.getForm().findField('qita').setValue('');
						}
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
