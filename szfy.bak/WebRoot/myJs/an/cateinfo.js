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
        bodyStyle:'padding:5px 5px 0',
        width: 600,
        items: [{
            layout:'column',
            items:[{
                columnWidth: .5,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: '编号',
                    allowBlank:false,
                    blankText:'编号不能为空',
                    name: 'catenum',
                    id: 'catenum',
                    anchor:'95%'
                }, {
                    xtype:'textfield',
                    fieldLabel: '名称',
                    allowBlank:false,
                    blankText:'名称不能为空',
                    name: 'catename',
                    id: 'catename',
                    anchor:'95%'
                }]
            },{
                columnWidth: .5,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: '备注',
                    allowBlank:true,
                    name: 'remark',
                    id: 'remark',
                    anchor:'95%'
                }]
            },{
                columnWidth: .5,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: '父节点ID',
                    name: 'fatherid',
                    id: 'fatherid',
                    hidden : false,
                    disabled : true,
                    anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: 'ID',
                    name: 'id',
                    id: 'id',
                    hidden : false,
                    disabled : true,
                    anchor:'95%'
                }]
            }]
        }]
    });
    var addOrUpdateWindow = new Ext.Window({
        id : 'addOrUpdateWindow',
        title: '类别信息',
        width: 600,
        height:170,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'right',
        closable:false,
        items: addOrUpdateForm,
        buttons: [{
            text: '保存',
            icon : "img/button/add.png",
            handler: function(){
            	if(addOrUpdateForm.form.isValid()){
            		var cateid = Ext.getCmp('id').getValue();
            		if(cateid == null||cateid ==''){
		           		//验证编号重复
		           		Ext.Ajax.request({
							url: 'cateTreeAction!isRepeat',
						   	success: function(response){
						   		var responseArray = Ext.util.JSON.decode(response.responseText);
								if (responseArray.success == 'true') {
						   			if (responseArray.msg == 'true') {
						   				Ext.MessageBox.alert('提示','编号重复');
						   				return;
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
													//tree.getNodeById(id).reload();
													tree.getRootNode().reload();
										   			Ext.MessageBox.alert('提示','操作成功');
												}else{
													Ext.MessageBox.alert('提示','操作失败');
												}
										   	},
										   	params: { 
										   		id:Ext.getCmp('id').getValue(),
										   		catenum:Ext.getCmp('catenum').getValue(),
										   		catename:Ext.getCmp('catename').getValue(),
										   		remark:Ext.getCmp('remark').getValue(),
										   		fatherid:Ext.getCmp('fatherid').getValue()
										   	}
										});
						   			}
								}
						   	},
						   	params: { 
						   		catenum:Ext.getCmp('catenum').getValue()
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
						   		catenum:Ext.getCmp('catenum').getValue(),
						   		catename:Ext.getCmp('catename').getValue(),
						   		remark:Ext.getCmp('remark').getValue(),
						   		fatherid:Ext.getCmp('fatherid').getValue()
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
            {name: 'catenum', type: 'string'},
            {name: 'catename', type: 'string'},
            {name: 'remark', type: 'string'},
            {name: 'fatherid', type: 'int'}
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
        title:'题目类别信息',
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
            header: "编号",
            dataIndex: 'catenum',
            sortable: true
        },{
            header: "名字",
            dataIndex: 'catename',
            sortable: true
        },{
            header: "父节点ID",
            dataIndex: 'fatherid',
            sortable: true
        },{
            header: "备注",
            dataIndex: 'remark',
            sortable: true
        }],
        viewConfig: {
            forceFit:true,
            enableRowBody:true,
            showPreview:true
        },
		tbar : [ts,{
            text: '添加',
            tooltip: '添加类别',
            icon : "img/button/add.png",
            handler: function(){
				var node = tree.getSelectionModel().getSelectedNode();
				if(node == null || node == '') {
					Ext.MessageBox.alert('提示','请选择一个节点');
					return;
				}else {
					addOrUpdateForm.form.reset();
					id = node.id;
					Ext.getCmp('fatherid').setValue(id);
					addOrUpdateWindow.show();
				}
			}
        },ts,{
            text: '修改',
            tooltip: '修改类别',
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
            tooltip: '删除类别',
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
