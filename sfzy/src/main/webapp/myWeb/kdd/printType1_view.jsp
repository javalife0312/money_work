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
	String type1_beizhu_font = SysUtil.getProperty("type1_beizhu_font");
	
	Kdd_Info kdd_Info = (Kdd_Info)request.getSession().getAttribute("kddinfo");
	//寄件人姓名 7
	String jijianren_xingming = kdd_Info.getJijianren_xingming();
	jijianren_xingming = checkObject(jijianren_xingming);
	
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
	
	//寄件人手机2
	String jijianren_shouji = kdd_Info.getJijianren_shouji();
	jijianren_shouji = checkObject(jijianren_shouji);
	
	//文书名称3
	String wenjianmingcheng = kdd_Info.getWenjianmingcheng();
	wenjianmingcheng = checkObject(wenjianmingcheng);
	wenjianmingcheng = SysUtil.resetStr(wenjianmingcheng);
	
	//报价价格
	String baojiajiage = kdd_Info.getBaojiajiage();
	baojiajiage = checkObject(baojiajiage);
	String[] baojiajiageArr = {"0","0","0","0","0"};
	String[] tmp = baojiajiage.split(",");
	for(int i=0;i<tmp.length;i++){
		baojiajiageArr[i] = tmp[i];
	}
	baojiajiage = "";
	for(int i=0;i<baojiajiageArr.length;i++){
		baojiajiage += baojiajiageArr[i];
	}
	baojiajiage = Integer.parseInt(baojiajiage) + "";
	
	//代收货款
	String daishouhuokuan = kdd_Info.getDaishouhuokuan();
	daishouhuokuan = checkObject(daishouhuokuan);
	String[] daishouhuokuanArr = {"0","0","0","0","0"};
	String[] tmp1 = daishouhuokuan.split(",");
	for(int i=0;i<tmp1.length;i++){
		daishouhuokuanArr[i] = tmp1[i];
	}
	daishouhuokuan = "";
	for(int i=0;i<daishouhuokuanArr.length;i++){
		daishouhuokuan += daishouhuokuanArr[i];
	}
	daishouhuokuan = Integer.parseInt(daishouhuokuan) + "";
	
	//勾选信息
	String wenshumingcheng= kdd_Info.getWenshumingcheng();
	wenshumingcheng = checkObject(wenshumingcheng);
	String[] wenshuArr = {"","","","","","","","","","",""};
	String[] t_wenshuArr = wenshumingcheng.split(",");
	for(int i=0;i<t_wenshuArr.length;i++){
		if(t_wenshuArr[i] != ""){
			int index = Integer.valueOf(t_wenshuArr[i]);
			wenshuArr[index] = "√";
		}
	}
	//备注信息6
	String beizhuxinxi= kdd_Info.getBeizhuxinxi();
	beizhuxinxi = checkObject(beizhuxinxi);
	beizhuxinxi = SysUtil.resetType1BeizhuStr(beizhuxinxi);
	
	//收件人姓名 8
	String shoujianren_xingming=kdd_Info.getShoujianren_xingming();
	shoujianren_xingming = checkObject(shoujianren_xingming);
	
	//收件人手机9
	String shoujianren_shouji=kdd_Info.getShoujianren_shouji();
	shoujianren_shouji = checkObject(shoujianren_shouji);
	
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
		<div style="position: absolute;left: 0mm;top: 0mm;background-image: url('img/kdd/type1.jpg');width: 239mm;height: 135mm;background-repeat: no-repeat;"></div>
		<!--寄件人姓名-->
		<div style="position:absolute; left:35mm; top:28mm;"><%=jijianren_xingming%></div>
		<!--寄件人单位-->
		<div style="position:absolute; left:35mm; top:35mm;"><%=jijianren_danwei%></div>
		<!--寄件人地址-->
		<div style="position:absolute; left:35mm; top:40mm;"><%=jijianren_dizhi%></div>
		<!--寄件人邮编-->
		<div style="position:absolute; left:90mm; top:50mm;"><%=jijianren_youbian%></div>
		<!--寄件人电话-->
		<div style="position:absolute; left:75mm; top:28mm;"><%=jijianren_shouji%></div>
		
		<!--文书名称-->
		<div style="position:absolute; left:38mm; top:111mm;"><%=wenjianmingcheng%></div>
		<!--报价价格-->
		<div style="position:absolute; left:103mm; top:121mm;"><%=baojiajiage %></div>
		<!-- 万 -->
		<div style="position:absolute; left:63mm; top:121mm;"><%=SysUtil.numToCN(baojiajiageArr[0]) %></div>
		<!-- 千 -->
		<div style="position:absolute; left:71mm; top:121mm;"><%=SysUtil.numToCN(baojiajiageArr[1]) %></div>
		<!-- 百 -->
		<div style="position:absolute; left:78mm; top:121mm;"><%=SysUtil.numToCN(baojiajiageArr[2]) %></div>
		<!-- 十 -->
		<div style="position:absolute; left:85mm; top:121mm;"><%=SysUtil.numToCN(baojiajiageArr[3]) %></div>
		<!-- 元 -->
		<div style="position:absolute; left:91mm; top:121mm;"><%=SysUtil.numToCN(baojiajiageArr[4]) %></div>
	
		<!--信函-->
		<div style="position:absolute; left:21mm; top:115mm;"><%=wenshuArr[0+1] %></div>
		<!--文件资料-->
		<div style="position:absolute; left:32mm; top:115mm;"><%=wenshuArr[1+1] %></div>
		<!--物品-->
		<div style="position:absolute; left:49.5mm; top:115mm;"><%=wenshuArr[2+1] %></div>
		<!--是保价-->
		<div style="position:absolute; left:30mm; top:121mm;"><%=wenshuArr[3+1] %></div>
		<!--否保价-->
		<div style="position:absolute; left:37mm; top:121.5mm;"><%=wenshuArr[4+1] %></div>
		
		<!--代收货款-->
		<div style="position:absolute; left:142mm; top:49mm;"><%=daishouhuokuan %></div>
		<!-- 万 -->
		<div style="position:absolute; left:134mm; top:54mm;"><%=SysUtil.numToCN(daishouhuokuanArr[0]) %></div>
		<!-- 千 -->
		<div style="position:absolute; left:141.5mm; top:54mm;"><%=SysUtil.numToCN(daishouhuokuanArr[1]) %></div>
		<!-- 百 -->
		<div style="position:absolute; left:149.5mm; top:54mm;"><%=SysUtil.numToCN(daishouhuokuanArr[2]) %></div>
		<!-- 十 -->
		<div style="position:absolute; left:157.5mm; top:54mm;"><%=SysUtil.numToCN(daishouhuokuanArr[3]) %></div>
		<!-- 元 -->
		<div style="position:absolute; left:165.5mm; top:54mm;"><%=SysUtil.numToCN(daishouhuokuanArr[4]) %></div>
		<!--寄件人签名 -->
		<div style="position:absolute; left:190mm; top:54mm;"><%=jijianren_xingming %></div>
		<!--寄件人日期 -->
		<div style="position:absolute; left:176mm; top:62mm;"><%=new Date().toLocaleString().substring(0, 4) %></div>
		<div style="position:absolute; left:189mm; top:62mm;"><%=new Date().toLocaleString().substring(5, 7) %></div>
		<div style="position:absolute; left:198mm; top:62mm;"><%=new Date().toLocaleString().substring(8, 10) %></div>
		<div style="position:absolute; left:207mm; top:62mm;"><%=new Date().toLocaleString().substring(11, 13) %></div>
		
		<!--备注信息 -->
		<div style="position:absolute; left:176mm; top:104mm;font-size: <%=type1_beizhu_font%>;"><%=beizhuxinxi %></div>
		
		<!--妥投短信-->
		<div style="position:absolute; left:126mm; top:37mm;"><%=wenshuArr[5+1] %></div>
		<!--实物返单-->
		<div style="position:absolute; left:150mm; top:37mm;"><%=wenshuArr[6+1] %></div>
		<!--电子返单-->
		<div style="position:absolute; left:126mm; top:43mm;"><%=wenshuArr[7+1] %></div>
		<!--其它-->
		<div style="position:absolute; left:150mm; top:43mm;"><%=wenshuArr[8+1] %></div>
		<!--代收货款-->
		<div style="position:absolute; left:126mm; top:49mm;"><%=wenshuArr[9+1] %></div>

	
	
		<!--收件人姓名-->
		<div style="position:absolute; left:35mm; top:61mm;"><%=shoujianren_xingming%></div>
		<!--收件人电话-->
		<div style="position:absolute; left:75mm; top:60mm;"><%=shoujianren_shouji%></div>
		<!--收单位-->
		<div style="position:absolute; left:35mm; top:67mm;"><%=shoujianren_danwei%></div>
		<!--收件地址-->
		<div style="position:absolute; left:35mm; top:75mm;"><%=shoujianren_dizhi%></div>
		<!--收件人邮编-->
		<div style="position:absolute; left:90mm; top:90mm;"><%=shoujianren_youbian%></div>
			
		<!--条形码  -->
		<div style="position:absolute; left:142mm; top:118mm;wi"><input type="text" id="tiaoxingma" style="height: 33;width: 210"/></div>
		<!--打印按钮  -->
		<div style="position:absolute; left:200mm; top:118mm;"><button onclick="goToPrint();" style="height: 8mm;">打印快递单</button></div>
	</body>
</html>