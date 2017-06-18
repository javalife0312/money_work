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
	int type23_jjr_xingming_x = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_xingming_x"));
	int type23_jjr_xingming_y = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_xingming_y"));
	
	//寄件人单位
	String jijianren_danwei = kdd_Info.getJijianren_danwei();
	jijianren_danwei = checkObject(jijianren_danwei);
	jijianren_danwei = SysUtil.resetStr(jijianren_danwei);
	int type23_jjr_danwei_x = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_danwei_x"));
	int type23_jjr_danwei_y = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_danwei_y"));
	
	//寄件人地址
	String jijianren_dizhi = kdd_Info.getJijianren_dizhi();
	jijianren_dizhi = checkObject(jijianren_dizhi);
	jijianren_dizhi = SysUtil.resetStr(jijianren_dizhi);
	int type23_jjr_dizhi_x = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_dizhi_x"));
	int type23_jjr_dizhi_y = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_dizhi_y"));
	
	//寄件人邮编
	String jijianren_youbian = kdd_Info.getJijianren_youbian();
	jijianren_youbian = checkObject(jijianren_youbian);
	jijianren_youbian = SysUtil.resetStr(jijianren_youbian);
	int type23_jjr_youbian_x = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_youbian_x"));
	int type23_jjr_youbian_y = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_youbian_y"));
	
	//寄件人手机2
	String jijianren_shouji = kdd_Info.getJijianren_shouji();
	jijianren_shouji = checkObject(jijianren_shouji);
	jijianren_shouji = jijianren_shouji.replace(",", "&nbsp;&nbsp;&nbsp;");
	int type23_jjr_shouji_x = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_shouji_x"));
	int type23_jjr_shouji_y = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_shouji_y"));
	
	//文书名称3
	String wenjianmingcheng = kdd_Info.getWenjianmingcheng();
	wenjianmingcheng = checkObject(wenjianmingcheng);
	wenjianmingcheng = SysUtil.resetStr(wenjianmingcheng);
	int type23_wenjianmingcheng_x = Integer.parseInt(SysUtil.getPageProperty("type23_wenjianmingcheng_x"));
	int type23_wenjianmingcheng_y = Integer.parseInt(SysUtil.getPageProperty("type23_wenjianmingcheng_y"));
	
	//案号4
	String anhao = kdd_Info.getAnhao();
	anhao = checkObject(anhao);
	String[] anhaoArr = {"","",""};
	String[] tmp = anhao.split(",");
	for(int i=0;i<tmp.length;i++){
		anhaoArr[i] = tmp[i];
	}
	int type23_anhao_part1_x = Integer.parseInt(SysUtil.getPageProperty("type23_anhao_part1_x"));
	int type23_anhao_part2_x = Integer.parseInt(SysUtil.getPageProperty("type23_anhao_part2_x"));
	int type23_anhao_part3_x = Integer.parseInt(SysUtil.getPageProperty("type23_anhao_part3_x"));
	int type23_anhao_part1_y = Integer.parseInt(SysUtil.getPageProperty("type23_anhao_part1_y"));
	int type23_anhao_part2_y = Integer.parseInt(SysUtil.getPageProperty("type23_anhao_part2_y"));
	int type23_anhao_part3_y = Integer.parseInt(SysUtil.getPageProperty("type23_anhao_part3_y"));
	
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
	int type23_wenshu_1_x = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_1_x"));
	int type23_wenshu_2_x = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_2_x"));
	int type23_wenshu_3_x = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_3_x"));
	int type23_wenshu_4_x = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_4_x"));
	int type23_wenshu_5_x = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_5_x"));
	int type23_wenshu_6_x = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_6_x"));
	int type23_wenshu_7_x = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_7_x"));
	int type23_wenshu_8_x = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_8_x"));
	int type23_wenshu_9_x = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_9_x"));
	int type23_wenshu_10_x = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_10_x"));
	int type23_wenshu_11_x = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_11_x"));
	int type23_wenshu_1_y = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_1_y"));
	int type23_wenshu_2_y = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_2_y"));
	int type23_wenshu_3_y = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_3_y"));
	int type23_wenshu_4_y = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_4_y"));
	int type23_wenshu_5_y = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_5_y"));
	int type23_wenshu_6_y = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_6_y"));
	int type23_wenshu_7_y = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_7_y"));
	int type23_wenshu_8_y = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_8_y"));
	int type23_wenshu_9_y = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_9_y"));
	int type23_wenshu_10_y = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_10_y"));
	int type23_wenshu_11_y = Integer.parseInt(SysUtil.getPageProperty("type23_wenshu_11_y"));
	
	//备注信息6
	String beizhuxinxi=kdd_Info.getChuanpiaoxinxi();
	beizhuxinxi = checkObject(beizhuxinxi);
	beizhuxinxi = SysUtil.resetStr(beizhuxinxi);
	int type23_beizhuxinxi_x = Integer.parseInt(SysUtil.getPageProperty("type23_beizhuxinxi_x"));
	int type23_beizhuxinxi_y = Integer.parseInt(SysUtil.getPageProperty("type23_beizhuxinxi_y"));
	
	//收件人姓名 8
	String shoujianren_xingming=kdd_Info.getShoujianren_xingming();
	shoujianren_xingming = checkObject(shoujianren_xingming);
	shoujianren_xingming = SysUtil.resetSJRNameStr(shoujianren_xingming);
	int type23_sjr_xingming_x = Integer.parseInt(SysUtil.getPageProperty("type23_sjr_xingming_x"));
	int type23_sjr_xingming_y = Integer.parseInt(SysUtil.getPageProperty("type23_sjr_xingming_y"));
	
	//收件人手机9
	String shoujianren_shouji=kdd_Info.getShoujianren_shouji();
	shoujianren_shouji = checkObject(shoujianren_shouji);
	shoujianren_shouji = shoujianren_shouji.replace(",", "<br/>");
	int type23_sjr_shouji_x = Integer.parseInt(SysUtil.getPageProperty("type23_sjr_shouji_x"));
	int type23_sjr_shouji_y = Integer.parseInt(SysUtil.getPageProperty("type23_sjr_shouji_y"));
	
	//收件人单位10
	String shoujianren_danwei=kdd_Info.getShoujianren_danwei();
	shoujianren_danwei = checkObject(shoujianren_danwei);
	shoujianren_danwei = SysUtil.resetStr(shoujianren_danwei);
	int type23_sjr_danwei_x = Integer.parseInt(SysUtil.getPageProperty("type23_sjr_danwei_x"));
	int type23_sjr_danwei_y = Integer.parseInt(SysUtil.getPageProperty("type23_sjr_danwei_y"));
	
	//收件人地址11
	String shoujianren_dizhi=kdd_Info.getShoujianren_dizhi();
	shoujianren_dizhi = checkObject(shoujianren_dizhi);
	shoujianren_dizhi = SysUtil.resetStr(shoujianren_dizhi);
	int type23_sjr_dizhi_x = Integer.parseInt(SysUtil.getPageProperty("type23_sjr_dizhi_x"));
	int type23_sjr_dizhi_y = Integer.parseInt(SysUtil.getPageProperty("type23_sjr_dizhi_y"));
	
	//收件人邮编12
	String shoujianren_youbian=kdd_Info.getShoujianren_youbian();
	shoujianren_youbian = checkObject(shoujianren_youbian);
	int type23_sjr_youbian_x = Integer.parseInt(SysUtil.getPageProperty("type23_sjr_youbian_x"));
	int type23_sjr_youbian_y = Integer.parseInt(SysUtil.getPageProperty("type23_sjr_youbian_y"));
	
	//经办人签名
	String jingbanren_qianming = kdd_Info.getJingbanren_qianming();
	jingbanren_qianming = checkObject(jingbanren_qianming);
	int type23_jjr_qianming_x = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_qianming_x"));
	int type23_jjr_qianming_y = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_qianming_y"));
	
	int type23_jjr_riqi_x = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_riqi_x"));
	int type23_jjr_riqi_y = Integer.parseInt(SysUtil.getPageProperty("type23_jjr_riqi_y"));
	
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
	<!--邮件日期-->
	<div style="position:absolute; left:<%=(type23_jjr_riqi_x+70) %>mm; top:<%=(type23_jjr_riqi_y+8) %>mm;"><%= new Date().toLocaleString() %></div>
	<<!--寄件人单位-->
	<div style="position:absolute; left:<%=(type23_jjr_danwei_x+20) %>mm; top:<%=(type23_jjr_danwei_y+25) %>mm;"></div>
	<!--寄件人地址-->
	<div style="position:absolute; left:<%=(type23_jjr_dizhi_x+20) %>mm; top:<%=(type23_jjr_dizhi_y+30) %>mm;"></div>
	<!--寄件人电话-->
	<div style="position:absolute; left:<%=(type23_jjr_shouji_x+20) %>mm; top:<%=(type23_jjr_shouji_y+35) %>mm;"><%=jijianren_shouji%></div>
	<!--文书名称-->
	<div style="position:absolute; left:<%=(type23_wenjianmingcheng_x+33) %>mm; top:<%=(type23_wenjianmingcheng_y+69) %>mm;"><%=wenjianmingcheng%></div>
	<!--案号1-->
	<div style="position:absolute; left:<%=(type23_anhao_part1_x+34) %>mm; top:<%=(type23_anhao_part1_y+73) %>mm;"><%=anhaoArr[0] %></div>
	<!--案号2-->
	<div style="position:absolute; left:<%=(type23_anhao_part2_x+56) %>mm; top:<%=(type23_anhao_part1_y+73) %>mm;"><%=anhaoArr[1] %></div>
	<!--案号3-->
	<div style="position:absolute; left:<%=(type23_anhao_part3_x+80) %>mm; top:<%=(type23_anhao_part1_y+73) %>mm;"><%=anhaoArr[2] %></div>
	<!--勾选1-1-->
	<div style="position:absolute; left:<%=(type23_wenshu_1_x+4) %>mm; top:<%=(type23_wenshu_1_y+80) %>mm;"><%=wenshuArr[0+1] %></div>
	<!--勾选1-2-->
	<div style="position:absolute; left:<%=(type23_wenshu_2_x+4) %>mm; top:<%=(type23_wenshu_2_y+85) %>mm;"><%=wenshuArr[1+1] %></div>
	<!--勾选1-3-->
	<div style="position:absolute; left:<%=(type23_wenshu_3_x+4) %>mm; top:<%=(type23_wenshu_3_y+90) %>mm;"><%=wenshuArr[2+1] %></div>
	<!--勾选1-4-->
	<div style="position:absolute; left:<%=(type23_wenshu_4_x+4) %>mm; top:<%=(type23_wenshu_4_y+95) %>mm;"><%=wenshuArr[3+1] %></div>
	<!--勾选1-5-->
	<div style="position:absolute; left:<%=(type23_wenshu_5_x+4) %>mm; top:<%=(type23_wenshu_5_y+100) %>mm;"><%=wenshuArr[4+1] %></div>
	<!--勾选1-6-->
	<div style="position:absolute; left:<%=(type23_wenshu_6_x+4) %>mm; top:<%=(type23_wenshu_6_y+105) %>mm;"><%=wenshuArr[5+1] %></div>
	<!--勾选2-1-->
	<div style="position:absolute; left:<%=(type23_wenshu_7_x+80) %>mm; top:<%=(type23_wenshu_7_y+80) %>mm;"><%=wenshuArr[6+1] %></div>
	<!--勾选2-2-->
	<div style="position:absolute; left:<%=(type23_wenshu_8_x+80) %>mm; top:<%=(type23_wenshu_8_y+85) %>mm;"><%=wenshuArr[7+1] %></div>
	<!--勾选2-3-->
	<div style="position:absolute; left:<%=(type23_wenshu_9_x+80) %>mm; top:<%=(type23_wenshu_9_y+90) %>mm;"><%=wenshuArr[8+1] %></div>
	<!--勾选2-4-->
	<div style="position:absolute; left:<%=(type23_wenshu_10_x+80) %>mm; top:<%=(type23_wenshu_10_y+95) %>mm;"><%=wenshuArr[9+1] %></div>
	<!--勾选2-5-->
	<div style="position:absolute; left:<%=(type23_wenshu_11_x+80) %>mm; top:<%=(type23_wenshu_11_y+100) %>mm;"><%=wenshuArr[10+1] %></div>
	<!--备注信息-->
	<div style="position:absolute; left:<%=(type23_beizhuxinxi_x+34) %>mm; top:<%=(type23_beizhuxinxi_y+105) %>mm;"><%=beizhuxinxi%></div>
	<!--交件人签名-->
	<div style="position:absolute; left:<%=(type23_jjr_xingming_x+23) %>mm; top:<%=(type23_jjr_xingming_y+113) %>mm;"><%=jijianren_xingming%></div>
	<!--经办人人签名-->
	<div style="position:absolute; left:<%=(type23_jjr_qianming_x+85) %>mm; top:<%=(type23_jjr_qianming_y+113) %>mm;"><%=jingbanren_qianming%></div>
	<!--收件人姓名-->
	<div style="position:absolute; left:<%=(147+type23_sjr_xingming_x) %>mm; top:<%=22+type23_sjr_xingming_y %>mm;font-size: <%=sjr_font%>;"><%=shoujianren_xingming%></div>
	<!--收件人电话-->
	<div style="position:absolute; left:<%=(195+type23_sjr_shouji_x) %>mm; top:<%=(22+type23_sjr_shouji_y) %>mm;"><%=type23_jjr_shouji_x%></div>
	<!--收单位-->
	<div style="position:absolute; left:<%=(135+type23_sjr_danwei_x) %>mm; top:<%=(37+type23_sjr_danwei_y) %>mm;"><%=shoujianren_danwei%></div>
	<!--收件地址-->
	<div style="position:absolute; left:<%=(130+type23_sjr_dizhi_x) %>mm; top:<%=(47+type23_sjr_dizhi_y) %>mm;"><%=shoujianren_dizhi%></div>
	<!--收件人邮编-->
	<div style="position:absolute; left:<%=(205+type23_sjr_youbian_x) %>mm; top:<%=(60+type23_sjr_youbian_y) %>mm;"><%=shoujianren_youbian%></div>
	</body>
</html>