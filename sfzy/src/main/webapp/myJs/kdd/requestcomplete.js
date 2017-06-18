Ext.Ajax.on('requestcomplete', function(conn, response, options) {
		try {
			var responseArray = Ext.util.JSON.decode(response.responseText);
			if (responseArray.success == 'session') {
				 window.parent.location == "../../myWeb/login/login.jsp";
			}
		} catch (e) {
		}
	});