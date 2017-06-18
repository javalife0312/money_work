Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'qtip';
	
	var height = document.body.clientHeight;
	var width = document.body.clientWidth;
	var ts = '-';
	var page = 100;
	var id = '0';
	
	/***********************************************************************
	*Window,Form相关
	************************************************************************/
	var addOrUpdateForm = new Ext.FormPanel({
        labelAlign: 'left',
        frame:true,
        title: '',
        bodyStyle:'padding:10px 10px 10',
        width: 600,
        items: [{
            layout:'column',
            columnWidth: 1,
            layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: '题号',
                    allowBlank:false,
                    blankText:'内容不能为空',
                    name: 'topicnum',
                    id: 'topicnum',
                    anchor:'95%'
                }, {
                    xtype:'textarea',
                    fieldLabel: '题目',
                    allowBlank:false,
                    blankText:'内容不能为空',
                    name: 'topic',
                    id: 'topic',
                    anchor:'95%'
                }, {
                    xtype:'textfield',
                    fieldLabel: '选项A',
                    allowBlank:false,
                    blankText:'内容不能为空',
                    name: 'optiona',
                    id: 'optiona',
                    anchor:'95%'
                }, {
                    xtype:'textfield',
                    fieldLabel: '选项B',
                    allowBlank:false,
                    blankText:'内容不能为空',
                    name: 'optionb',
                    id: 'optionb',
                    anchor:'95%'
                }, {
                    xtype:'textfield',
                    fieldLabel: '选项C',
                    allowBlank:false,
                    blankText:'内容不能为空',
                    name: 'optionc',
                    id: 'optionc',
                    anchor:'95%'
                }, {
                    xtype:'textfield',
                    fieldLabel: '选项D',
                    //allowBlank:false,
                    //blankText:'内容不能为空',
                    name: 'optiond',
                    id: 'optiond',
                    anchor:'95%'
                 }, {
		            xtype: 'radiogroup',
		            fieldLabel: '正确答案',
		            itemCls: 'x-check-group-alt',
		            columns: 1,
		            items: [
		                {boxLabel: 'A', name: 'itema', inputValue: 1},
		                {boxLabel: 'B', name: 'itemb', inputValue: 2},
		                {boxLabel: 'C', name: 'itemc', inputValue: 3, checked: true},
		                {boxLabel: 'D', name: 'itemd', inputValue: 4}
		            ]
		  	  } ,{
                    xtype:'textfield',
                    fieldLabel: 'ID',
                    name: 'id',
                    id: 'id',
                    hidden : false,
                    disabled : true,
                    anchor:'95%'
		  	  } ,{
                    xtype:'textfield',
                    fieldLabel: '所属类别ID',
                    name: 'cid',
                    id: 'cid',
                    hidden : false,
                    disabled : true,
                    anchor:'95%'
		  	  } ,{
                    xtype:'textfield',
                    fieldLabel: '所属类别编号',
                    name: 'cnum',
                    id: 'cnum',
                    hidden : false,
                    disabled : true,
                    anchor:'95%'
                }]
        }]
    });
    var addOrUpdateWindow = new Ext.Window({
        id : 'addOrUpdateWindow',
        title: '题目及答案信息',
        width: 600,
        height:520,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'right',
        closable:false,
        items: addOrUpdateForm,
        buttons: [{
			id: 'isfour',
			xtype: 'checkbox',
			boxLabel:'四选一',
			checked:true,
			handler : function(){
				var isleaf = this.getValue();
				if(isleaf){
					Ext.getCmp("optiond").enable();
					Ext.getCmp("optiond").setValue('');
				}else{
					Ext.getCmp("optiond").disable();
					Ext.getCmp("optiond").setValue('请勾选<四选一>');
				}
			}
        },ts,{
            text: '保存',
            icon : "img/button/add.png",
            handler: function(){
            	if(addOrUpdateForm.form.isValid()){
            		id = Ext.getCmp('id').getValue();
            		if(id === null || id === ''){
		           		//验证编号重复
		           		Ext.Ajax.request({
							url: 'topicAction!isRepeat',
						   	success: function(response){
						   		var responseArray = Ext.util.JSON.decode(response.responseText);
								if (responseArray.success == 'true') {
						   			if (responseArray.msg == 'true') {
						   				Ext.MessageBox.alert('提示','题号重复');
						   				return;
						   			}else{
							            Ext.Ajax.request({
											url: 'topicAction!saveOrUpdateTopics',
										   	success: function(response){
										   		var responseArray = Ext.util.JSON.decode(response.responseText);
												if (responseArray.success == 'true') {
											   		store.proxy = new Ext.data.HttpProxy({
														url: 'cateTreeAction!listtopicsByCid',
											            method: 'POST'
													});
													store.baseParams = {
														id : id
													};
													store.load({
														params : {
															start : 0,
															limit : page
														}
													});
													store.reload();
													addOrUpdateWindow.hide();
													//tree.getNodeById(id).reload();
													tree.getRootNode().reload();
										   			Ext.MessageBox.alert('提示','操作成功');
												}else{
													Ext.MessageBox.alert('提示','操作失败');
												}
										   	},
										   	params: { 
										   		id:Ext.getCmp('id').getValue(),
										   		topicnum:Ext.getCmp('topicnum').getValue(),
										   		topic:Ext.getCmp('topic').getValue(),
										   		optiona:Ext.getCmp('optiona').getValue(),
										   		optionb:Ext.getCmp('optionb').getValue(),
										   		optionc:Ext.getCmp('optionc').getValue(),
										   		optiond:Ext.getCmp('optiond').getValue()

										   	}
										});
						   			}
								}
						   	},
						   	params: { 
						   		topicnum:Ext.getCmp('topicnum').getValue()
						   	}
						});
            		
            		}else{
        					Ext.Ajax.request({
							url: 'cateTreeAction!saveOrUpdateCates',
						   	success: function(response){
						   		var responseArray = Ext.util.JSON.decode(response.responseText);
								if (responseArray.success == 'true') {
						   			
							   		store.proxy = new Ext.data.HttpProxy({
										url: 'cateTreeAction!listCatesByFid',
							            method: 'POST'
									});
									store.baseParams = {
										id : id
									};
									store.load({
										params : {
											start : 0,
											limit : page
										}
									});
									store.reload();
									addOrUpdateWindow.hide();
									tree.getNodeById(id).reload();
						   			Ext.MessageBox.alert('提示','操作成功');
								}else{
									Ext.MessageBox.alert('提示','操作失败');
								}
						   	},
						   	params: { 
						   		id:Ext.getCmp('id').getValue(),
						   		topicnum:Ext.getCmp('topicnum').getValue(),
						   		topic:Ext.getCmp('topic').getValue(),
						   		optiona:Ext.getCmp('optiona').getValue(),
						   		optionb:Ext.getCmp('optionb').getValue(),
						   		optionc:Ext.getCmp('optionc').getValue(),
						   		optiond:Ext.getCmp('optiond').getValue()
						   	}
						});
            		}
            	}
			}
        },{
            text: '取消',
            icon : "img/button/add.png",
            handler: function(){
            	addOrUpdateForm.form.reset();
            	addOrUpdateWindow.hide();
            }
        }]
    });
    /***********************************************************************
	*Window,Form相关
	************************************************************************/
    
    
  	/***********************************************************************
	*Grid相关
	************************************************************************/
    var store = new Ext.data.JsonStore({
        root: 'root',
        totalProperty: 'totalProperty',
        idProperty: 'id',
        remoteSort: false,
        fields: [
            {name: 'id', type: 'int'},
            {name: 'topic', type: 'string'},
            {name: 'cid', type: 'int'},
            {name: 'topicnum', type: 'string'},
            {name: 'optiona', type: 'string'},
            {name: 'optionb', type: 'string'},
            {name: 'optionc', type: 'string'},
            {name: 'optiond', type: 'string'},
            {name: 'asnum', type: 'string'},
            {name: 'isfout', type: 'string'},
            {name: 'fatherid', type: 'string'}
        ],
        proxy : new Ext.data.HttpProxy({
             url: 'cateTreeAction!systree?id='+id,
             method: 'POST'
         })
    });
    //store.setDefaultSort('code', 'desc');
    store.load({params:{start:0, limit:page}});
    
    var sm = new Ext.grid.CheckboxSelectionModel();
    var grid = new Ext.grid.GridPanel({
        height : height,
        width : width*0.85,
        title:'题目及答案信息',
        store: store,
        trackMouseOver:true,
        disableSelection:false,
        loadMask: true,
        sm : sm,
        columns:[sm,{
            id: 'id',
            header: "ID",
            dataIndex: 'id',
            sortable: true
        },{
            header: "题目",
            dataIndex: 'topic',
            sortable: true
        },{
            header: "题号",
            dataIndex: 'topicnum',
            sortable: true
        },{
            header: "选项一",
            dataIndex: 'optiona',
            sortable: true
        },{
            header: "选项二",
            dataIndex: 'potionb',
            sortable: true
        },{
            header: "选项三",
            dataIndex: 'optionc',
            sortable: true
        },{
            header: "选项四",
            dataIndex: 'optiond',
            sortable: true
        },{
            header: "答案号",
            dataIndex: 'asnum',
            sortable: true
        },{
            header: "是否是四选择",
            dataIndex: 'isfour',
            sortable: true
        },{
            header: "备注",
            dataIndex: 'remark',
            sortable: true
        },{
            header: "所属类别编号",
            dataIndex: 'cnum',
            sortable: true
        },{
            header: "所属类别id",
            dataIndex: 'cid',
            sortable: true
        }],
        viewConfig: {
            forceFit:true,
            enableRowBody:true,
            showPreview:true
        },
		tbar : [ts,{
            text: '添加',
            tooltip: '添加题目及答案',
            icon : "img/button/add.png",
            handler: function(){
				var node = tree.getSelectionModel().getSelectedNode();
				if(node == null || node == '') {
					Ext.MessageBox.alert('提示','请选择一个节点');
					return;
				}else {
				    id = node.id;
				    //var cnum = node.catenum;
					if(node.isLeaf()){
						addOrUpdateForm.form.reset();
						Ext.getCmp('cid').setValue(id);
						//Ext.getCmp('cnum').setValue(cnum);
						addOrUpdateWindow.show();
					}else{
						Ext.MessageBox.alert('提示','请选择叶子节点');
						return;
					}
				}
			}
        },ts,{
            text: '修改',
            tooltip: '修改题目及答案',
            icon : "img/button/update.png",
            handler: function(){
				var records = grid.getSelectionModel().getSelections();
				if(records.length == 0 || records.length > 1) {
					Ext.MessageBox.alert('提示','请选择一条要修改的记录');
					return;
				}else {
					addOrUpdateForm.form.reset();
					addOrUpdateForm.form.loadRecord(records[0]);
					addOrUpdateWindow.show();
				}
			}
        },ts,{
            text: '删除',
            tooltip: '删除题目及答案',
            icon : "img/button/delete.png",
            handler: function(){
            	var records = grid.getSelectionModel().getSelections();
            	            var ids = "";
            				for(var i=0;i<records.length;i++) {
									ids += records[i].get('id') + ",";
								}
            	if(records.length == 0) {
            		Ext.MessageBox.alert('提示', '请选择要删除的记录！');
            	}else{
          					Ext.Ajax.request({
								url: 'cateTreeAction!delCates?id='+ids,
								Params : {
										id : ids
									},
								
							   	success: function(response){
							   		var responseArray = Ext.util.JSON.decode(response.responseText);
									if (responseArray.success == 'true') {
							   			Ext.MessageBox.alert('提示','删除成功');
												store.baseParams = {
													id : id
												};
												store.load({
													params : {
														start : 0,
														limit : page
													}
												});
												store.reload();
												addOrUpdateWindow.hide();
										store.reload();
									}else{
										Ext.MessageBox.alert('提示','删除失败');
									}
							   	}
							});
            	}
			}
        },ts],
        bbar: new Ext.PagingToolbar({
            store: store,
            displayInfo: true,
            displayMsg: '第 {0} - {1} 条, 总共 {2} 条',
            emptyMsg: "没有数据",
            items:[
                '-', {
                pressed: true,
                enableToggle:true,
                text: 'Show Preview',
                cls: 'x-btn-text-icon details',
                toggleHandler: function(btn, pressed){
                   Ext.MessageBox.alert('提示','');
                }
            }]
        })
    });
    grid.render('center');
    /***********************************************************************
	*Grid相关
	************************************************************************/
	
    
    /***********************************************************************
	*Tree相关
	************************************************************************/
    //<!--树形系统菜单-->
	var root = new Ext.tree.AsyncTreeNode({
		text : '所有题目类别',
		draggable : false,
		id : '0',
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
					dataUrl : 'cateTreeAction!sysTree?id='+id
				})
	});
	tree.render();
	root.expand();
	
	tree.on('beforeload',function(node){     
		id = node.id;
		tree.loader.dataUrl = 'cateTreeAction!sysTree?id='+id;          
	});  
	tree.on('click',function(node){
		id = node.id;
		store.proxy = new Ext.data.HttpProxy({
			url: 'cateTreeAction!listCatesByFid?fatherid='+id,
            method: 'POST'
		});
		store.baseParams = {
			id : id
		};
		store.load({
			params : {
				start : 0,
				limit : page
			}
		});
		store.reload();
	});
	/***********************************************************************
	*Tree相关
	************************************************************************/
	
	
	/***********************************************************************
	*布局相关
	************************************************************************/
	new Ext.Viewport({
		layout : 'border',
		items : [{
					region : 'west',
					id : 'tree',
					split : true,
					width : width*0.15,
					minSize : 175,
					maxSize : 400,
					margins : '0 0 0 0',
					collapsible : false,
					layoutConfig : {
						animate : true
					},
					items : [tree]
				},{
			region : 'center',
			items : grid
		}]
	});
	/***********************************************************************
	*布局相关
	************************************************************************/
});
