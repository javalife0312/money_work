Ext.onReady(function() {

	var Ip = new ActiveXObject("rcbdyctl.Setting").GetIPAddress;
	var height = document.body.clientHeight;
	
	document.body.bgColor.innerHTML = 'red';
	
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
     
     var radiogroup= new Ext.form.RadioGroup({
          fieldLabel : "答案",
          items: [
                {boxLabel: 'A', name: 'da', inputValue: 1,checked: true},
                {boxLabel: 'B', name: 'da', inputValue: 2},
                {boxLabel: 'C', name: 'da', inputValue: 3},
                {boxLabel: 'D', name: 'da', inputValue: 4}
            ]
    });
    
	var loginPanel = new Ext.FormPanel({
        labelAlign: 'left',
        frame:true,
        height : height,
        title: '',
        bodyStyle:"background:url('img/system/background1.jpg')",
        items: [{
            layout:'column',
            items:[{
                columnWidth:1,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: '用户名',
                    allowBlank:false,
                    blankText:'用户名不能为空',
                    name: 'username',
                    id: 'username',
                    anchor:'95%'
                }, {
                    xtype:'textfield',
                    fieldLabel: '密码',
                    allowBlank:false,
                    blankText:'密码不能为空',
                    name: 'password',
                    id: 'password',
                    anchor:'95%'
                },radiogroup]
            }]
        }],
        buttons: [{
            text: '保存',
            icon : "img/button/add.gif",
            handler: function(){
            	 var username = Ext.getCmp('username').getValue();
            	 var password = Ext.getCmp('password').getValue();
            	 var da = radiogroup.getValue(true).inputValue;
            	 alert(da);
            	 return;
            	 window.location.href = "loginAction!login?username="+username+"&password="+password+"";
            }
        },{
            text: '取消',
            icon : "img/button/add.gif",
            handler: function(){
            	alert('取消');
            }
        }]
    });
  
	var viewport = new Ext.Viewport({
		layout : 'border',
		items : [{
					region : 'center',
					id : 'loginPanel',
					split : false,
					margins : '0 0 0 0',
					collapsible : false,
					layoutConfig : {
						animate : true
					},
					items : [loginPanel]
				} 
		]
	});
});
