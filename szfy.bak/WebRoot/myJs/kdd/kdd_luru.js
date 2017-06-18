Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'qtip';

	var height = document.body.clientHeight;
	var width = document.body.clientWidth;
	var ts = '-';
	var page = 100;
	var kddtypevalue = TYPE;

	/***********************************************************************
	 *自定义函数相关
	 ************************************************************************/

	/***********************************************************************
	 *Tree相关
	 ************************************************************************/

	/***********************************************************************
	 *Window,Form相关
	 ************************************************************************/

	/***********************************************************************
	 *Grid相关
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
					header : "序号 ",
					dataIndex : 'id',
					sortable : true
				},{
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
				}, {
					header : "传票信息",
					dataIndex : 'chuanpiaoxinxi',
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
				
				kddForm.getForm().findField('jiaojiren_qianming').setValue(rec.get('jiaojiren_qianming'));
				kddForm.getForm().findField('jingbanren_qianming').setValue(rec.get('jingbanren_qianming'));
				kddForm.getForm().findField('wenjianmingcheng').setValue(rec.get('wenjianmingcheng'));
				kddForm.getForm().findField('beizhuxinxi').setValue(rec.get('beizhuxinxi'));
				kddForm.getForm().findField('chuanpiaoxinxi').setValue(rec.get('chuanpiaoxinxi'));
				
				
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

	var kddForm = new Ext.FormPanel({
				labelAlign : 'left',
				title : '',
				bodyStyle : 'padding:20px 0px 0px 20px',
				width : 450,
				height : 400,
				autoScroll : true,
				border:false,
				tbar : [{
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
								type : kddtypevalue,
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
									kddForm.form.reset();
								}else{
									Ext.MessageBox.alert('提示', '快递单录入失败,请刷新页面重试!');
								}
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
								type : kddtypevalue,
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
									kddForm.form.reset();
								}else{
									Ext.MessageBox.alert('提示', '快递单录入失败,请刷新页面重试!');
								}
							}
						});
					}
				}, ts, {
					text : '重置',
					icon : "img/button/add.gif",
					handler : function() {
						kddForm.form.reset();
					}
				}],
				items : [{
							xtype : 'panel',
							border:false,
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
							border:false,
							items : [{
										columnWidth : .5,
										layout : 'form',
										border:false,
										items : [{
													xtype : 'textfield',
													fieldLabel : '寄件人_姓名',
													allowBlank : true,
													blankText : '不能为空',
													name : 'jijianren_xingming',
													anchor : '60%'
												},{
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
													anchor : '60%'
												}, {
													xtype : 'textfield',
													allowBlank : true,
													fieldLabel : '寄件人_地址',
													name : 'jijianren_dizhi',
													anchor : '60%'
												}, {
													xtype : 'textfield',
													allowBlank : true,
													fieldLabel : '寄件人_邮编',
													name : 'jijianren_youbian',
													anchor : '60%'
												}, {
													xtype : 'textfield',
													allowBlank : true,
													fieldLabel : '交寄人_签名',
													name : 'jiaojiren_qianming',
													anchor : '60%'
												},  {
													xtype : 'textfield',
													fieldLabel : kddtypevalue==1 ? '内件名称': '文书名称',
													name : 'wenjianmingcheng',
													anchor : '60%'
												}, {
													xtype : 'textfield',
													fieldLabel : kddtypevalue==1 ? '内件服务勾选' : '文书勾选',
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
													anchor : '60%'
												}, {
													xtype : 'textfield',
													fieldLabel : '传票信息',
													hidden: kddtypevalue==1 ?true:false,
													name : 'chuanpiaoxinxi',
													anchor : '60%'
												}, {
													xtype : 'panel',
													hidden: kddtypevalue==1 ?false:true,
													fieldLabel :  '代收货款',
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
															},{
																xtype : 'displayfield',
																value : '万'
															}, {
																xtype : 'numberfield',
																name : 'qian_daishouhuokuan',
																ref : 'qian_daishouhuokuan',
																margins : '0 0 0 5',
																width : 30,
																height : 22,
																allowDecimals:false,//不能输入小数 
																maxValue:10,//最大值 
																minValue:0 ,//最小值 
																allowBlank : true
															},{
																xtype : 'displayfield',
																value : '千'
															}, {
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
															}, {
																xtype : 'displayfield',
																value : '百'
															}, {
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
															}, {
																xtype : 'displayfield',
																value : '十'
															}, {
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
															}, {
																xtype : 'displayfield',
																value : '元'
															}]
												},{
													xtype : 'textfield',
													fieldLabel : '快递单类型',
													name : 'type',
													hidden : true,
													anchor : '60%'
												}]
									}, {
										columnWidth : .5,
										layout : 'form',
										border:false,
										items : [{
											xtype : 'textfield',
											fieldLabel : '收件人_姓名',
											allowBlank : true,
											blankText : '不能为空',
											name : 'shoujianren_xingming',
											anchor : '60%'
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
											anchor : '60%'
										}, {
											xtype : 'textfield',
											allowBlank : true,
											fieldLabel : '收件人_地址',
											name : 'shoujianren_dizhi',
											anchor : '60%'
										}, {
											xtype : 'textfield',
											allowBlank : true,
											fieldLabel : '收件人_邮编',
											name : 'shoujianren_youbian',
											anchor : '60%'
										},{
											xtype : 'textfield',
											fieldLabel : '经办人_签名',
											name : 'jingbanren_qianming',
											anchor : '60%'
										},{
											xtype : 'panel',
											hidden: kddtypevalue==1 ?true:false,
											fieldLabel :  '案号',
											name : 'anhao',
											border : false,
											layout : 'hbox',
											items : [{
														xtype : 'displayfield',
														value : '('
													}, {
														xtype : 'textfield',
														name : 'area1',
														ref : 'area1',
														width : 50,
														height : 22,
														allowBlank : true
													}, {
														xtype : 'displayfield',
														value : ')'
													}, {
														xtype : 'textfield',
														name : 'area2',
														ref : 'area2',
														margins : '0 0 0 5',
														width : 50,
														height : 22,
														allowBlank : true
													},{
														xtype : 'displayfield',
														value : '字'
													}, {
														xtype : 'textfield',
														name : 'area3',
														margins : '0 0 0 5',
														width : 80,
														height : 22,
														allowBlank : true
													}, {
														xtype : 'displayfield',
														value : '号'
													}]
										}, {
											xtype : 'panel',
											hidden: kddtypevalue==1 ?false:true,
											fieldLabel :  '保价价格',
											name : 'baojiajiage',
											border : false,
											layout : 'hbox',
											items : [{
														xtype : 'numberfield',
														allowDecimals:false,//不能输入小数 
														maxValue:10,//最大值 
														minValue:0 ,//最小值 
														name : 'wan_baojiajiage',
														ref : 'wan_baojiajiage',
														width : 30,
														height : 22,
														allowBlank : true
													},{
														xtype : 'displayfield',
														value : '万'
													}, {
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
													},{
														xtype : 'displayfield',
														value : '千'
													}, {
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
													}, {
														xtype : 'displayfield',
														value : '百'
													}, {
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
													}, {
														xtype : 'displayfield',
														value : '十'
													}, {
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
													}, {
														xtype : 'displayfield',
														value : '元'
													}]
										}, {
											xtype : 'textarea',
											fieldLabel : '备注信息(文书)',
											name : 'beizhuxinxi',
											hidden : kddtypevalue==1 ? false:true,
											anchor : '60%'
										},{
											xtype : 'combo',
											fieldLabel: '内阜-外阜',
											anchor:'60%',
											displayField : 'text',
											valueField : 'value',
											mode : 'local',
											triggerAction : 'all',
											editable : false,
											value : '1',
											name : 'funei_fuwai',
											hidden: kddtypevalue==1 ?true:false,
											store : new Ext.data.ArrayStore({
												fields : ['value', 'text'],
												data : [[1, '内阜'],[2,'外阜']]
											})
						                }]
									}]
						},
						{
							xtype : 'panel',
							border:false,
							items : [{
										xtype : 'checkbox',
										boxLabel : '将此寄件人信息添加到常用寄件人',
										name : 'add_lianlixiren'
									}]
						}]
			});
	
	var wenshuForm = new Ext.FormPanel({
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
	var wenshuWindow = new Ext.Window({
		title : '文书类型选择',
		width : 450,
		height : 260,
		layout : 'fit',
		plain : true,
		bodyStyle : 'padding:5px;',
		buttonAlign : 'right',
		closable : false,
		border:false,
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
	

	
	
//function select_fun(kddtypevalue){
//	var kddtypeName = '';
//	if (kddtypevalue == 1) {
//		kddtypeName = '国内';
//	} else if (kddtypevalue == 2) {
//		kddtypeName = '京城';
//	} else {
//		kddtypeName = '司法专邮';
//	}
	/***********************************************************************
	 *Window,Form相关
	 ************************************************************************/

	/***********************************************************************
	 *Grid相关
	 ************************************************************************/
	
	kddForm.getForm().findField('type').setValue(kddtypevalue);
	
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
							layout : 'fit',
							autoScroll : true,
							border:false,
							items : [kddForm]
						}]
			});
		/***********************************************************************
	 *布局相关
	 ************************************************************************/
	
});
