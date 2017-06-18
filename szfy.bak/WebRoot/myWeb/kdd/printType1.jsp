<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.template.model.Kdd_Info"%>
<%@page import="com.template.util.DateUtil"%>
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
	//寄件人姓名 1
	String jijianren_xingming = kdd_Info.getJijianren_xingming();
	jijianren_xingming = checkObject(jijianren_xingming);
	int type1_jjr_xingming_x = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_xingming_x"));
	int type1_jjr_xingming_y = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_xingming_y"));
	int type1_jjr_qianming_x = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_qianming_x"));
	int type1_jjr_qianming_y = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_qianming_y"));
	
	//寄件人手机2
	String jijianren_shouji = kdd_Info.getJijianren_shouji();
	jijianren_shouji = checkObject(jijianren_shouji);
	int type1_jjr_shouji_x = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_shouji_x"));
	int type1_jjr_shouji_y = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_shouji_y"));
	
	//寄件人单位3
	String jijianren_danwei = kdd_Info.getJijianren_danwei();
	jijianren_danwei = checkObject(jijianren_danwei);
	jijianren_danwei = SysUtil.resetStr(jijianren_danwei);
	int type1_jjr_danwei_x = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_danwei_x"));
	int type1_jjr_danwei_y = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_danwei_y"));
	
	//寄件人地址4
	String jijianren_dizhi = kdd_Info.getJijianren_dizhi();
	jijianren_dizhi = checkObject(jijianren_dizhi);
	jijianren_dizhi = SysUtil.resetStr(jijianren_dizhi);
	int type1_jjr_dizhi_x = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_dizhi_x"));
	int type1_jjr_dizhi_y = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_dizhi_y"));
	
	//寄件人邮编5
	String jijianren_youbian = kdd_Info.getJijianren_youbian();
	jijianren_youbian = checkObject(jijianren_youbian);
	int type1_jjr_youbian_x = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_youbian_x"));
	int type1_jjr_youbian_y = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_youbian_y"));
	
	//收件人姓名 6
	String shoujianren_xingming=kdd_Info.getShoujianren_xingming();
	shoujianren_xingming = checkObject(shoujianren_xingming);
	int type1_sjr_xingming_x = Integer.parseInt(SysUtil.getPageProperty("type1_sjr_xingming_x"));
	int type1_sjr_xingming_y = Integer.parseInt(SysUtil.getPageProperty("type1_sjr_xingming_y"));
	
	//收件人手机7
	String shoujianren_shouji=kdd_Info.getShoujianren_shouji();
	shoujianren_shouji = checkObject(shoujianren_shouji);
	int type1_sjr_shouji_x = Integer.parseInt(SysUtil.getPageProperty("type1_sjr_shouji_x"));
	int type1_sjr_shouji_y = Integer.parseInt(SysUtil.getPageProperty("type1_sjr_shouji_y"));
	
	//收件人单位8
	String shoujianren_danwei=kdd_Info.getShoujianren_danwei();
	shoujianren_danwei = checkObject(shoujianren_danwei);
	shoujianren_danwei = SysUtil.resetStr(shoujianren_danwei);
	int type1_sjr_danwei_x = Integer.parseInt(SysUtil.getPageProperty("type1_sjr_danwei_x"));
	int type1_sjr_danwei_y = Integer.parseInt(SysUtil.getPageProperty("type1_sjr_danwei_y"));
	
	//收件人地址9
	String shoujianren_dizhi=kdd_Info.getShoujianren_dizhi();
	shoujianren_dizhi = checkObject(shoujianren_dizhi);
	shoujianren_dizhi = SysUtil.resetStr(shoujianren_dizhi);
	int type1_sjr_dizhi_x = Integer.parseInt(SysUtil.getPageProperty("type1_sjr_dizhi_x"));
	int type1_sjr_dizhi_y = Integer.parseInt(SysUtil.getPageProperty("type1_sjr_dizhi_y"));
	
	//收件人邮编10
	String shoujianren_youbian=kdd_Info.getShoujianren_youbian();
	shoujianren_youbian = checkObject(shoujianren_youbian);
	int type1_sjr_youbian_x = Integer.parseInt(SysUtil.getPageProperty("type1_sjr_youbian_x"));
	int type1_sjr_youbian_y = Integer.parseInt(SysUtil.getPageProperty("type1_sjr_youbian_y"));
	
	//文书名称11
	String wenjianmingcheng = kdd_Info.getWenjianmingcheng();
	wenjianmingcheng = checkObject(wenjianmingcheng);
	wenjianmingcheng = SysUtil.resetStr(wenjianmingcheng);
	int type1_wenjianmingcheng_x = Integer.parseInt(SysUtil.getPageProperty("type1_wenjianmingcheng_x"));
	int type1_wenjianmingcheng_y = Integer.parseInt(SysUtil.getPageProperty("type1_wenjianmingcheng_y"));
	
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
	int type1_wenshu_1_x = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_1_x"));
	int type1_wenshu_2_x = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_2_x"));
	int type1_wenshu_3_x = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_3_x"));
	int type1_wenshu_4_x = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_4_x"));
	int type1_wenshu_5_x = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_5_x"));
	int type1_wenshu_6_x = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_6_x"));
	int type1_wenshu_7_x = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_7_x"));
	int type1_wenshu_8_x = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_8_x"));
	int type1_wenshu_9_x = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_9_x"));
	int type1_wenshu_10_x = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_10_x"));
	int type1_wenshu_1_y = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_1_y"));
	int type1_wenshu_2_y = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_2_y"));
	int type1_wenshu_3_y = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_3_y"));
	int type1_wenshu_4_y = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_4_y"));
	int type1_wenshu_5_y = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_5_y"));
	int type1_wenshu_6_y = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_6_y"));
	int type1_wenshu_7_y = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_7_y"));
	int type1_wenshu_8_y = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_8_y"));
	int type1_wenshu_9_y = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_9_y"));
	int type1_wenshu_10_y = Integer.parseInt(SysUtil.getPageProperty("type1_wenshu_10_y"));
	
	
	//报价价格
	String baojiajiage = kdd_Info.getBaojiajiage();
	baojiajiage = checkObject(baojiajiage);
	
	String[] baojiajiageArr = {"0","0","0","0","0"};
	String[] tmp = baojiajiage.split(",");
	for(int i=0;i<tmp.length;i++){
		baojiajiageArr[i] = tmp[i];
	}
	int type1_baojiajiage_part1_x = Integer.parseInt(SysUtil.getPageProperty("type1_baojiajiage_part1_x"));
	int type1_baojiajiage_part2_x = Integer.parseInt(SysUtil.getPageProperty("type1_baojiajiage_part2_x"));
	int type1_baojiajiage_part3_x = Integer.parseInt(SysUtil.getPageProperty("type1_baojiajiage_part3_x"));
	int type1_baojiajiage_part4_x = Integer.parseInt(SysUtil.getPageProperty("type1_baojiajiage_part4_x"));
	int type1_baojiajiage_part5_x = Integer.parseInt(SysUtil.getPageProperty("type1_baojiajiage_part5_x"));
	int type1_baojiajiage_part1_y = Integer.parseInt(SysUtil.getPageProperty("type1_baojiajiage_part1_y"));
	int type1_baojiajiage_part2_y = Integer.parseInt(SysUtil.getPageProperty("type1_baojiajiage_part2_y"));
	int type1_baojiajiage_part3_y = Integer.parseInt(SysUtil.getPageProperty("type1_baojiajiage_part3_y"));
	int type1_baojiajiage_part4_y = Integer.parseInt(SysUtil.getPageProperty("type1_baojiajiage_part4_y"));
	int type1_baojiajiage_part5_y = Integer.parseInt(SysUtil.getPageProperty("type1_baojiajiage_part5_y"));
	
	baojiajiage = "";
	for(int i=0;i<baojiajiageArr.length;i++){
		baojiajiage += baojiajiageArr[i];
	}
	baojiajiage = Integer.parseInt(baojiajiage) + "";
	int type1_baojiajiage_all_x = Integer.parseInt(SysUtil.getPageProperty("type1_baojiajiage_all_x"));
	int type1_baojiajiage_all_y = Integer.parseInt(SysUtil.getPageProperty("type1_baojiajiage_all_y"));
	
	
	//代收货款
	String daishouhuokuan = kdd_Info.getDaishouhuokuan();
	daishouhuokuan = checkObject(daishouhuokuan);
	String[] daishouhuokuanArr = {"0","0","0","0","0"};
	String[] tmp1 = daishouhuokuan.split(",");
	for(int i=0;i<tmp1.length;i++){
		daishouhuokuanArr[i] = tmp1[i];
	}
	int type1_daishouhuokuan_part1_x = Integer.parseInt(SysUtil.getPageProperty("type1_daishouhuokuan_part1_x"));
	int type1_daishouhuokuan_part2_x = Integer.parseInt(SysUtil.getPageProperty("type1_daishouhuokuan_part2_x"));
	int type1_daishouhuokuan_part3_x = Integer.parseInt(SysUtil.getPageProperty("type1_daishouhuokuan_part3_x"));
	int type1_daishouhuokuan_part4_x = Integer.parseInt(SysUtil.getPageProperty("type1_daishouhuokuan_part4_x"));
	int type1_daishouhuokuan_part5_x = Integer.parseInt(SysUtil.getPageProperty("type1_daishouhuokuan_part5_x"));
	int type1_daishouhuokuan_part1_y = Integer.parseInt(SysUtil.getPageProperty("type1_daishouhuokuan_part1_y"));
	int type1_daishouhuokuan_part2_y = Integer.parseInt(SysUtil.getPageProperty("type1_daishouhuokuan_part2_y"));
	int type1_daishouhuokuan_part3_y = Integer.parseInt(SysUtil.getPageProperty("type1_daishouhuokuan_part3_y"));
	int type1_daishouhuokuan_part4_y = Integer.parseInt(SysUtil.getPageProperty("type1_daishouhuokuan_part4_y"));
	int type1_daishouhuokuan_part5_y = Integer.parseInt(SysUtil.getPageProperty("type1_daishouhuokuan_part5_y"));
	daishouhuokuan = "";
	for(int i=0;i<daishouhuokuanArr.length;i++){
		daishouhuokuan += daishouhuokuanArr[i];
	}
	daishouhuokuan = Integer.parseInt(daishouhuokuan) + "";
	int type1_daishouhuokuan_all_x = Integer.parseInt(SysUtil.getPageProperty("type1_daishouhuokuan_all_x"));
	int type1_daishouhuokuan_all_y = Integer.parseInt(SysUtil.getPageProperty("type1_daishouhuokuan_all_y"));
	
	String dtime = new SimpleDateFormat("yyyyMMdd").format(new Date());
	int type1_jjr_riqi_x = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_riqi_x"));
	int type1_jjr_riqi_y = Integer.parseInt(SysUtil.getPageProperty("type1_jjr_riqi_y"));
	
	//备注信息6
	String beizhuxinxi= kdd_Info.getBeizhuxinxi();
	beizhuxinxi = checkObject(beizhuxinxi);
	beizhuxinxi = SysUtil.resetType1BeizhuStr(beizhuxinxi);
	int type1_beizhuxinxi_x = Integer.parseInt(SysUtil.getPageProperty("type1_beizhuxinxi_x"));
	int type1_beizhuxinxi_y = Integer.parseInt(SysUtil.getPageProperty("type1_beizhuxinxi_y"));
	
	String id = kdd_Info.getId() + "";
	String tiaoxingma = kdd_Info.getTiaoxingma();
	
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
	 	<base href="<%=basePath%>">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
		<!-- 自定义js -->
	<script type="text/javascript">
		function saveKdd(){
			var id=<%=id%>;
			var tiaoxingma = <%=tiaoxingma%>;
			window.location.href="kddInfoAction!saveOrUpdate_statusAndMark?id="+id+"&tiaoxingma="+tiaoxingma;
			window.close();
		}
		function printWB(){
			window.print();
			window.close();
		}
	</script>
	<style type="text/css">
		div{font-size:<%= ftsize %>;}
	</style>
	</head>
	<body onload="printWB();saveKdd();">
	
		<!--寄件人姓名 1-->
		<div style="position:absolute; left:<%=(type1_jjr_xingming_x+15) %>mm; top:<%= (type1_jjr_xingming_y+10)%>mm;"><%=jijianren_xingming%></div>
		<!--寄件人电话 2-->
		<div style="position:absolute; left:<%=(type1_jjr_shouji_x+50) %>mm; top:<%= (type1_jjr_shouji_y+10)%>mm;"><%=jijianren_shouji%></div>
		<!--寄件人单位 3-->
		<div style="position:absolute; left:<%=(type1_jjr_danwei_x+15) %>mm; top:<%= (type1_jjr_danwei_y+16)%>mm;"><%=jijianren_danwei%></div>
		<!--寄件人地址 4-->
		<div style="position:absolute; left:<%=(type1_jjr_dizhi_x+15) %>mm; top:<%= (type1_jjr_dizhi_y+23)%>mm;"><%=jijianren_dizhi%></div>
		<!--寄件人邮编 5-->
		<div style="position:absolute; left:<%=(type1_jjr_youbian_x+73) %>mm; top:<%= (type1_jjr_youbian_y+32)%>mm;"><%=jijianren_youbian%></div>
		
		<!--收件人姓名 6-->
		<div style="position:absolute; left:<%=(type1_sjr_xingming_x+15) %>mm; top:<%= (type1_sjr_xingming_y+40)%>mm;"><%=shoujianren_xingming%></div>
		<!--收件人电话 7-->
		<div style="position:absolute; left:<%=(type1_sjr_shouji_x+58) %>mm; top:<%= (type1_sjr_shouji_y+40)%>mm;"><%=shoujianren_shouji%></div>
		<!--收单位 8-->
		<div style="position:absolute; left:<%=(type1_sjr_danwei_x+15) %>mm; top:<%= (type1_sjr_danwei_y+47)%>mm;"><%=shoujianren_danwei%></div>
		<!--收件地址 9-->
		<div style="position:absolute; left:<%=(type1_sjr_dizhi_x+15) %>mm; top:<%= (type1_sjr_danwei_y+52)%>mm;"><%=shoujianren_dizhi%></div>
		<!--收件人邮编 10-->
		<div style="position:absolute; left:<%=(type1_sjr_youbian_x+73) %>mm; top:<%= (type1_sjr_youbian_y+65)%>mm;"><%=shoujianren_youbian%></div>
		
		<!--内件品名 11-->
		<div style="position:absolute; left:<%=(type1_wenjianmingcheng_x+20)%>mm; top:<%= (type1_wenjianmingcheng_y+85)%>mm;"><%=wenjianmingcheng%></div>
		<!--信函-->
		<div style="position:absolute; left:<%=(type1_wenshu_1_x+4)%>mm; top:<%= (type1_wenshu_1_y+91)%>mm;"><%=wenshuArr[0+1] %></div>
		<!--文件资料-->
		<div style="position:absolute; left:<%=(type1_wenshu_2_x+15)%>mm; top:<%= (type1_wenshu_2_y+91)%>mm;"><%=wenshuArr[1+1] %></div>
		<!--物品-->
		<div style="position:absolute; left:<%=(type1_wenshu_3_x+30)%>mm; top:<%= (type1_wenshu_3_y+91)%>mm;"><%=wenshuArr[2+1] %></div>
		<!--是保价-->
		<div style="position:absolute; left:<%=(type1_wenshu_4_x+12)%>mm; top:<%= (type1_wenshu_4_y+97)%>mm;"><%=wenshuArr[3+1] %></div>
		<!--否保价-->
		<div style="position:absolute; left:<%=(type1_wenshu_5_x+19)%>mm; top:<%= (type1_wenshu_5_y+97)%>mm;"><%=wenshuArr[4+1] %></div>
		<!-- 万 -->
		<div style="position:absolute; left:<%=(type1_baojiajiage_part1_x+42)%>mm; top:<%= (type1_baojiajiage_part1_y+97)%>mm;"><%=SysUtil.numToCN(baojiajiageArr[0]) %></div>
		<!-- 千 -->
		<div style="position:absolute; left:<%=(type1_baojiajiage_part2_x+50)%>mm; top:<%= (type1_baojiajiage_part2_y+97)%>mm;"><%=SysUtil.numToCN(baojiajiageArr[1]) %></div>
		<!-- 百 -->
		<div style="position:absolute; left:<%=(type1_baojiajiage_part3_x+58)%>mm; top:<%= (type1_baojiajiage_part3_y+97)%>mm;"><%=SysUtil.numToCN(baojiajiageArr[2]) %></div>
		<!-- 十 -->
		<div style="position:absolute; left:<%=(type1_baojiajiage_part4_x+65)%>mm; top:<%= (type1_baojiajiage_part4_y+97)%>mm;"><%=SysUtil.numToCN(baojiajiageArr[3]) %></div>
		<!-- 元 -->
		<div style="position:absolute; left:<%=(type1_baojiajiage_part5_x+73)%>mm; top:<%= (type1_baojiajiage_part5_y+97)%>mm;"><%=SysUtil.numToCN(baojiajiageArr[4]) %></div>
		<!--保价价格-->
		<div style="position:absolute; left:<%=(type1_baojiajiage_all_x+82) %>mm; top:<%= (type1_baojiajiage_all_y+97)%>mm;"><%=baojiajiage %></div>
	
		<!--妥投短信-->
		<div style="position:absolute; left:<%=(type1_wenshu_6_x+101)%>mm; top:<%= (type1_wenshu_6_y+18)%>mm;"><%=wenshuArr[5+1] %></div>
		<!--实物返单-->
		<div style="position:absolute; left:<%=(type1_wenshu_7_x+125)%>mm; top:<%= (type1_wenshu_7_y+18)%>mm;"><%=wenshuArr[6+1] %></div>
		<!--电子返单-->
		<div style="position:absolute; left:<%=(type1_wenshu_8_x+101)%>mm; top:<%= (type1_wenshu_8_y+23)%>mm;"><%=wenshuArr[7+1] %></div>
		<!--其它-->
		<div style="position:absolute; left:<%=(type1_wenshu_9_x+125)%>mm; top:<%= (type1_wenshu_9_y+23)%>mm;"><%=wenshuArr[8+1] %></div>
		<!--代收货款-->
		<div style="position:absolute; left:<%=(type1_wenshu_10_x+101)%>mm; top:<%= (type1_wenshu_10_y+29)%>mm;"><%=wenshuArr[9+1] %></div>
		<!--代收货款-->
		<div style="position:absolute; left:<%=(type1_daishouhuokuan_all_x+125)%>mm; top:<%= (type1_daishouhuokuan_all_y+29)%>mm;"><%=daishouhuokuan %></div>
		<!-- 万 -->
		<div style="position:absolute; left:<%=(type1_daishouhuokuan_part1_x+107)%>mm; top:<%= (type1_daishouhuokuan_part1_y+35)%>mm;"><%=SysUtil.numToCN(daishouhuokuanArr[0]) %></div>
		<!-- 千 -->
		<div style="position:absolute; left:<%=(type1_daishouhuokuan_part2_x+116)%>mm; top:<%= (type1_daishouhuokuan_part2_y+35)%>mm;"><%=SysUtil.numToCN(daishouhuokuanArr[1]) %></div>
		<!-- 百 -->
		<div style="position:absolute; left:<%=(type1_daishouhuokuan_part3_x+125)%>mm; top:<%= (type1_daishouhuokuan_part3_y+35)%>mm;"><%=SysUtil.numToCN(daishouhuokuanArr[2]) %></div>
		<!-- 十 -->
		<div style="position:absolute; left:<%=(type1_daishouhuokuan_part4_x+133)%>mm; top:<%= (type1_daishouhuokuan_part4_y+35)%>mm;"><%=SysUtil.numToCN(daishouhuokuanArr[3]) %></div>
		<!-- 元 -->
		<div style="position:absolute; left:<%=(type1_daishouhuokuan_part5_x+141)%>mm; top:<%= (type1_daishouhuokuan_part5_y+35)%>mm;"><%=SysUtil.numToCN(daishouhuokuanArr[4]) %></div>
		
		<!--寄件人签名 -->
		<div style="position:absolute; left:<%=(type1_jjr_qianming_x+155) %>mm; top:<%=(type1_jjr_qianming_y+35)%>mm;"><%=jijianren_xingming %></div>
		<!--寄件人日期 -->
		<div style="position:absolute; left:<%=(type1_jjr_riqi_x+150) %>mm; top:<%= (type1_jjr_riqi_y+40)%>mm;"><%=dtime %></div>
		<!--备注信息 -->
		<div style="position:absolute; left:<%=(150+type1_beizhuxinxi_x) %>mm; top:<%= (78+type1_beizhuxinxi_y)%>mm;font-size: <%=type1_beizhu_font%>;"><%=beizhuxinxi %></div>
		

	</body>
</html>