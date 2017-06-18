<%@page import="com.template.model.Kdd_Info"%>
<%@page import="com.template.util.SysUtil"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%!
	public String checkObject(Object obj){
		String result = "";
		if(obj != null){
			result = obj.toString();
		}
		return result;
	}
%>

<%
	String ftsize = SysUtil.getProperty("fontSize");
	String sjr_font = SysUtil.getProperty("type23_sjr_font");
	
	Kdd_Info kdd_Info = (Kdd_Info)request.getSession().getAttribute("kddinfo");
	//寄件人姓名 7
	String jijianren_xingming = kdd_Info.getJijianren_xingming();
	jijianren_xingming = checkObject(jijianren_xingming);
	jijianren_xingming = SysUtil.resetStr(jijianren_xingming);
	
	//寄件人单位
	String jijianren_danwei = kdd_Info.getJijianren_danwei();
	jijianren_danwei = checkObject(jijianren_danwei);
	jijianren_danwei = SysUtil.resetStr(jijianren_danwei);
	
	//寄件人地址
	String jijianren_dizhi = kdd_Info.getJijianren_dizhi();
	jijianren_dizhi = checkObject(jijianren_dizhi);
	jijianren_dizhi = SysUtil.resetStr(jijianren_dizhi);
	
	//寄件人邮编
	String jijianren_youbian = kdd_Info.getJijianren_youbian();
	jijianren_youbian = checkObject(jijianren_youbian);
	jijianren_youbian = SysUtil.resetStr(jijianren_youbian);
	
	//寄件人手机2
	String jijianren_shouji = kdd_Info.getJijianren_shouji();
	jijianren_shouji = checkObject(jijianren_shouji);
	jijianren_shouji = jijianren_shouji.replace(",", "&nbsp;&nbsp;&nbsp;");
	
	//文书名称3
	String wenjianmingcheng = kdd_Info.getWenjianmingcheng();
	wenjianmingcheng = checkObject(wenjianmingcheng);
	wenjianmingcheng = SysUtil.resetStr(wenjianmingcheng);
	
	//案号4
	String anhao = kdd_Info.getAnhao();
	anhao = checkObject(anhao);
	String[] anhaoArr = {"","",""};
	String[] tmp = anhao.split(",");
	for(int i=0;i<tmp.length;i++){
		anhaoArr[i] = tmp[i];
	}
	
	//文书名5
	String wenshumingcheng=kdd_Info.getWenshumingcheng();
	wenshumingcheng = checkObject(wenshumingcheng);
	String[] wenshuArr = {"","","","","","","","","","","",""};
	String[] t_wenshuArr = wenshumingcheng.split(",");
	for(int i=0;i<t_wenshuArr.length;i++){
		if(t_wenshuArr[i] != ""){
			int index = Integer.valueOf(t_wenshuArr[i]);
			wenshuArr[index] = "√";
		}
	}
	
	//备注信息6
	String beizhuxinxi=kdd_Info.getChuanpiaoxinxi();
	beizhuxinxi = checkObject(beizhuxinxi);
	beizhuxinxi = SysUtil.resetStr(beizhuxinxi);
	
	//收件人姓名 8
	String shoujianren_xingming=kdd_Info.getShoujianren_xingming();
	shoujianren_xingming = checkObject(shoujianren_xingming);
	shoujianren_xingming = SysUtil.resetSJRNameStr(shoujianren_xingming);
	
	//收件人手机9
	String shoujianren_shouji=kdd_Info.getShoujianren_shouji();
	shoujianren_shouji = checkObject(shoujianren_shouji);
	shoujianren_shouji = shoujianren_shouji.replace(",", "<br/>");
	
	//收件人单位10
	String shoujianren_danwei=kdd_Info.getShoujianren_danwei();
	shoujianren_danwei = checkObject(shoujianren_danwei);
	shoujianren_danwei = SysUtil.resetStr(shoujianren_danwei);
	
	//收件人地址11
	String shoujianren_dizhi=kdd_Info.getShoujianren_dizhi();
	shoujianren_dizhi = checkObject(shoujianren_dizhi);
	shoujianren_dizhi = SysUtil.resetStr(shoujianren_dizhi);
	
	//收件人邮编12
	String shoujianren_youbian=kdd_Info.getShoujianren_youbian();
	shoujianren_youbian = checkObject(shoujianren_youbian);
	
	//经办人签名
	String jingbanren_qianming = kdd_Info.getJingbanren_qianming();
	jingbanren_qianming = checkObject(jingbanren_qianming);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
	 	<base href="<%=basePath%>">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
		<!-- 自定义js -->
		<script type="text/javascript">
			function goToPrint(){
				var tiaoxingma = document.getElementById("tiaoxingma").value;
				if(tiaoxingma.length==0){
					alert('请扫描条形码');
					return;
				}
				var extjsUrl = location.href;
				var nowUrl = extjsUrl + "&tiaoxingma='"+tiaoxingma+"'";
				nowUrl = nowUrl.replace("printOrView=0","printOrView=1");
				window.open(nowUrl,'newwindow','height=0,width=0,top=50,left=100,titlebar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=yes,status=no');
				window.close();
			}
		</script>
		<style type="text/css">
			div{font-size:<%= ftsize %>;}
		</style>
	</head>
	<body>
		<div style="position: absolute;left: 0mm;top: 0mm;background-image: url('img/kdd/type3.jpg');width: 239mm;height: 135mm;background-repeat: no-repeat;"></div>
		<!--寄件人单位-->
		<div style="position:absolute; left:25mm; top:45mm;"><%=""%></div>
		<!--寄件人地址-->
		<div style="position:absolute; left:25mm; top:50mm;"><%=""%></div>
		<!--寄件人电话-->
		<div style="position:absolute; left:25mm; top:55mm;"><%=jijianren_shouji%></div>
		<!--寄件人邮编-->
		<div style="position:absolute; left:90mm; top:68mm;"><%=""%></div>
		
		
		<!--邮件日期-->
		<div style="position:absolute; left:75mm; top:28mm;"><%= new Date().toLocaleString() %></div>
		<!--文书名称-->
		<div style="position:absolute; left:38mm; top:74mm;"><%=wenjianmingcheng%></div>
		<!--案号1-->
		<div style="position:absolute; left:39mm; top:81mm;"><%=anhaoArr[0] %></div>
		<!--案号2-->
		<div style="position:absolute; left:61mm; top:81mm;"><%=anhaoArr[1] %></div>
		<!--案号3-->
		<div style="position:absolute; left:85mm; top:81mm;"><%=anhaoArr[2] %></div>
		<!--勾选1-1-->
		<div style="position:absolute; left:23mm; top:84mm;"><%=wenshuArr[0+1] %></div>
		<!--勾选1-2-->
		<div style="position:absolute; left:23mm; top:88mm;"><%=wenshuArr[1+1] %></div>
		<!--勾选1-3-->
		<div style="position:absolute; left:23mm; top:92mm;"><%=wenshuArr[2+1] %></div>
		<!--勾选1-4-->
		<div style="position:absolute; left:23mm; top:96mm;"><%=wenshuArr[3+1] %></div>
		<!--勾选1-5-->
		<div style="position:absolute; left:23mm; top:100mm;"><%=wenshuArr[4+1] %></div>
		<!--勾选1-6-->
		<div style="position:absolute; left:23mm; top:104mm;"><%=wenshuArr[5+1] %></div>
		
		<!--勾选2-1-->
		<div style="position:absolute; left:85mm; top:84mm;"><%=wenshuArr[6+1] %></div>
		<!--勾选2-2-->
		<div style="position:absolute; left:85mm; top:88mm;"><%=wenshuArr[7+1] %></div>
		<!--勾选2-3-->
		<div style="position:absolute; left:85mm; top:92mm;"><%=wenshuArr[8+1] %></div>
		<!--勾选2-4-->
		<div style="position:absolute; left:85mm; top:96mm;"><%=wenshuArr[9+1] %></div>
		<!--勾选2-5-->
		<div style="position:absolute; left:85mm; top:100mm;"><%=wenshuArr[10+1] %></div>
		<!--备注信息-->
		<div style="position:absolute; left:34mm; top:105mm;"><%=beizhuxinxi%></div>
		<!--交件人签名-->
		<div style="position:absolute; left:35mm; top:113mm;"><%=jijianren_xingming%></div>
		<!--经办人签名-->
		<div style="position:absolute; left:90mm; top:113mm;"><%=jingbanren_qianming%></div>
	
	
		<!--收件人姓名-->
		<div style="position:absolute; left:118mm; top:40mm;font-size: <%=sjr_font%>;"><%=shoujianren_xingming%></div>
		<!--收件人电话-->
		<div style="position:absolute; left:185mm; top:36mm;"><%=shoujianren_shouji%></div>
		<!--收单位-->
		<div style="position:absolute; left:135mm; top:51mm;"><%=shoujianren_danwei%></div>
		<!--收件地址-->
		<div style="position:absolute; left:130mm; top:61mm;"><%=shoujianren_dizhi%></div>
		<!--收件人邮编-->
		<div style="position:absolute; left:190mm; top:70mm;"><%=shoujianren_youbian%></div>
			
		<!--条形码  -->
		<div style="position:absolute; left:42mm; top:118mm;wi"><input type="text" id="tiaoxingma" style="height: 33;width: 210"/></div>
		<!--打印按钮  -->
		<div style="position:absolute; left:100mm; top:118mm;"><button onclick="goToPrint();" style="height: 8mm;">打印快递单</button></div>
	</body>
</html>