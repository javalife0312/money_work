//package com.template.action;
//
//
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import net.sf.json.JSONArray;
//import net.sf.json.JSONObject;
//
//import org.apache.struts2.ServletActionContext;
//
//import com.opensymphony.xwork2.ActionSupport;
//import com.template.model.Kdd_ContactInfo;
//import com.template.model.Kdd_Info;
//import com.template.model.Kdd_Report;
//import com.template.model.Org_Department;
//import com.template.model.Org_User;
//import com.template.service.KddInfoService;
//import com.template.service.OrgUserService;
//import com.template.util.SysUtil;
//import com.template.util.ToExcel;
//import com.template.util.Type;
//
//public class KddInfoAction extends ActionSupport {
//
//	private static final long serialVersionUID = 1L;
//	private HttpServletRequest request = ServletActionContext.getRequest();
//	private HttpServletResponse response = ServletActionContext.getResponse();
//	private SimpleDateFormat dateFormat;
//
//	/*********************************************************************************
//	* Spring注入
//	*********************************************************************************/
//	private KddInfoService kddInfoService;
//	private OrgUserService orgUserService;
//
//	public OrgUserService getOrgUserService() {
//		return orgUserService;
//	}
//	public void setOrgUserService(OrgUserService orgUserService) {
//		this.orgUserService = orgUserService;
//	}
//	public KddInfoService getKddInfoService() {
//		return kddInfoService;
//	}
//	public void setKddInfoService(KddInfoService kddInfoService) {
//		this.kddInfoService = kddInfoService;
//	}
//	/*********************************************************************************
//	 * Spring注入
//	 *********************************************************************************/
//
//	/**
//	 * @return
//	 * 打印还是预览
//	 */
//	public String printPage(){
//		String result = "";
//		String id = request.getParameter("id");
//		String type = request.getParameter("type");
//		String tiaoxingma = request.getParameter("tiaoxingma");
//		String printOrView = request.getParameter("printOrView");//0 view; 1 print
//		Kdd_Info info = kddInfoService.getKddInfoById(id);
//		if(printOrView.equals("1")){
//			info.setTiaoxingma(tiaoxingma);
//		}
//		request.getSession().setAttribute("kddinfo", info);
//		String view_page = "printType"+type+"_view";
//		String print_page = "printType"+type;
//		if(printOrView.equals("0")){
//			result = view_page;
//		}else if(printOrView.equals("1")){
//			result = print_page;
//		}
//		return result;
//	}
//
//	/**
//	 * 查询显示快递单信息
//	 */
//	public void listKdds(){
//		try {
//			response.setCharacterEncoding("utf-8");
//			Map<String, String> map = new HashMap<String,String>();
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				String userid = Type.getString(request.getSession().getAttribute("uid"));
//				Org_User org_User = (Org_User) orgUserService.getById(userid);
//				String first = request.getParameter("start");
//				String limit = request.getParameter("limit");
//
//				map.put("first", first);
//				map.put("limit", limit);
//				if(!org_User.getUsername().equals("admin")){
//					map.put("uid", userid);
//				}
//				map.put("model","Kdd_Info");
//
//				List<Kdd_Info> list = new ArrayList<Kdd_Info>();
//				int totalCount = 0;
//				list = kddInfoService.listKdds(map);
//				totalCount = kddInfoService.getTotalCount(map);
//
//				String json = "{";
//				if(list != null && list.size() > 0) {
//					JSONArray jsonArray = new JSONArray();
//					jsonArray.add(list);
//					String temp = jsonArray.toString();
//					json += "root:["+temp.substring(2, temp.length()-2)+"],totalProperty:"+totalCount+"";
//				}else {
//					json += "root:[],totalProperty:"+totalCount+"";
//				}
//				json += "}";
//				response.getWriter().print(json);
//			}else {
//				Map<String, String> jsonMap = new HashMap<String, String>();
//				jsonMap.put("success", "session");
//				String json = JSONObject.fromObject(jsonMap).toString();
//				response.getWriter().print(json);
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//
//	/**
//	 * 统计快递单
//	 */
//	public void list_report_Kdds(){
//		try {
//			response.setCharacterEncoding("utf-8");
//
//			Map<String, String> map = new HashMap<String, String>();
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
////				String userid = Type.getString(request.getSession().getAttribute("uid"));
//				String startDate = Type.getString(request.getParameter("startDate"));
//				String status = Type.getString(request.getParameter("type"));
//
//				map.put("startDate", startDate);
//				map.put("type", status);
//
//				List<Kdd_Report> list = new ArrayList<Kdd_Report>();
//				int totalCount = 0;
//				list = kddInfoService.list_report_Kdds(map);
//				totalCount = list.size();
//
//				ToExcel.setExportReiprtList(list);
//				String json = "{";
//				if(list != null && list.size() > 0) {
//					JSONArray jsonArray = new JSONArray();
//					jsonArray.add(list);
//					String temp = jsonArray.toString();
//					json += "root:["+temp.substring(2, temp.length()-2)+"],totalProperty:"+totalCount+"";
//				}else {
//					json += "root:[],totalProperty:"+totalCount+"";
//				}
//				json += "}";
//				response.getWriter().print(json);
//			}else {
//				Map<String, String> jsonMap = new HashMap<String, String>();
//				jsonMap.put("success", "session");
//				String json = JSONObject.fromObject(jsonMap).toString();
//				response.getWriter().print(json);
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	/**
//	 * 查询快递单
//	 */
//	public void list_search_Kdds(){
//		boolean sessionCheck = SysUtil.sessionCheck(request, response);
//		try {
//			response.setCharacterEncoding("utf-8");
//			Map<String, String> map = new HashMap<String,String>();
//
//			if(sessionCheck){
//				/**
//				 *快递单的查询类型
//				 * kdd_search 		: 表示快单查询页面
//				 * kdd_chuandashi   : 表示传达室
//				 * kdd_tj_mingxi   	: 表示统计页面,显示具体的明细
//				 */
//				String lururenid = Type.getString(request.getSession().getAttribute("uid"));
//				Org_User org_User = (Org_User)orgUserService.getById(lururenid);
//				String first = request.getParameter("start");
//				String limit = request.getParameter("limit");
//				String search_type = Type.getString(request.getParameter("search_type"));
//				String startDate = Type.getString(request.getParameter("startDate"));
//				String endDate = Type.getString(request.getParameter("endDate"));
//				String status = Type.getString(request.getParameter("status"));
//				String jijianren_xingming = Type.getString(request.getParameter("jijianren_xingming"));
//				String jijianren_shouji = Type.getString(request.getParameter("jijianren_shouji"));
//				String id = Type.getString(request.getParameter("id"));
//				String anhao = Type.getString(request.getParameter("anhao"));
//				String lururenDeptName = Type.getString(request.getParameter("lururenDeptName"));
//				String shoujianren_xingming = Type.getString(request.getParameter("shoujianren_xingming"));
//				String shoujianren_shouji = Type.getString(request.getParameter("shoujianren_shouji"));
//				String tiaoxingma = Type.getString(request.getParameter("tiaoxingma"));
//
//				if(!org_User.getUsername().equals("admin")){
//					SysUtil.searchMap(map,"lururenid",lururenid);
//				}
//				SysUtil.searchMap(map,"first",first);
//				SysUtil.searchMap(map,"limit",limit);
//				SysUtil.searchMap(map,"search_type",search_type);
//				if(!startDate.equals("")){
//					SysUtil.searchMap(map,"startDate",startDate);
//				}
//				SysUtil.searchMap(map,"status",status);
//				SysUtil.searchMap(map,"jijianren_xingming",jijianren_xingming);
//				SysUtil.searchMap(map,"jijianren_shouji",jijianren_shouji);
//				SysUtil.searchMap(map,"id",id);
//				SysUtil.searchMap(map,"anhao",anhao);
//				if(!endDate.equals("")){
//					SysUtil.searchMap(map,"endDate",endDate);
//				}
//				SysUtil.searchMap(map,"lururenDeptName",lururenDeptName);
//				SysUtil.searchMap(map,"shoujianren_xingming",shoujianren_xingming);
//				SysUtil.searchMap(map,"shoujianren_shouji",shoujianren_shouji);
//				SysUtil.searchMap(map,"tiaoxingma",tiaoxingma);
//
//				map.put("model","Kdd_Info");
//				if(search_type != null && (search_type.equals("kdd_chuandashi") || search_type.equals("kdd_tj_mingxi"))){
//					map.remove("lururenid");
//				}
//
//				List<Kdd_Info> list = new ArrayList<Kdd_Info>();
//				list = kddInfoService.list_search_Kdds(map);
//				int totalCount = 0;
//				totalCount = kddInfoService.getTotalSearchCount(map);
//
//				String json = "{";
//				if(list != null && list.size() > 0) {
//					JSONArray jsonArray = new JSONArray();
//					jsonArray.add(list);
//					String temp = jsonArray.toString();
//					json += "success:[true],root:["+temp.substring(2, temp.length()-2)+"],totalProperty:"+totalCount+"";
//				}else {
//					json += "success:[true],root:[],totalProperty:"+totalCount+"";
//				}
//				json += "}";
//				response.getWriter().print(json);
//			}else {
//				Map<String, String> jsonMap = new HashMap<String, String>();
//				jsonMap.put("success", "session");
//				String json = JSONObject.fromObject(jsonMap).toString();
//				response.getWriter().print(json);
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	/**
//	 * 导出快递单
//	 */
//	public void export_search_Kdds(){
//		try {
//			response.setCharacterEncoding("utf-8");
//
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				Map<String, String> map = new HashMap<String,String>();
//
//				String id = Type.getString(request.getParameter("id"));
//				id = new String(id.getBytes("iso8859-1"),"utf8");
//
//				String lururenid = Type.getString(request.getSession().getAttribute("uid"));
//				lururenid = new String(lururenid.getBytes("iso8859-1"),"utf8");
//
//				Org_User org_User = (Org_User)orgUserService.getById(lururenid);
//
//				String search_type = Type.getString(request.getParameter("search_type"));
//				search_type = new String(search_type.getBytes("iso8859-1"),"utf8");
//
//				String startDate = Type.getString(request.getParameter("startDate"));
//				startDate = new String(startDate.getBytes("iso8859-1"),"utf8");
//
//				String endDate = Type.getString(request.getParameter("endDate"));
//				endDate = new String(endDate.getBytes("iso8859-1"),"utf8");
//
//				String status = Type.getString(request.getParameter("status"));
//				status = new String(status.getBytes("iso8859-1"),"utf8");
//
//				String jijianren_xingming = Type.getString(request.getParameter("jijianren_xingming"));
//				jijianren_xingming = new String(jijianren_xingming.getBytes("iso8859-1"),"utf8");
//
//				String jijianren_shouji = Type.getString(request.getParameter("jijianren_shouji"));
//				jijianren_shouji = new String(jijianren_shouji.getBytes("iso8859-1"),"utf8");
//
//				String anhao = Type.getString(request.getParameter("anhao"));
//				anhao = new String(anhao.getBytes("iso8859-1"),"utf8");
//
//				String lururenDeptName = Type.getString(request.getParameter("lururenDeptName"));
//				lururenDeptName = new String(lururenDeptName.getBytes("iso8859-1"),"utf8");
//
//				String shoujianren_xingming = Type.getString(request.getParameter("shoujianren_xingming"));
//				shoujianren_xingming = new String(shoujianren_xingming.getBytes("iso8859-1"),"utf8");
//
//				String shoujianren_shouji = Type.getString(request.getParameter("shoujianren_shouji"));
//				shoujianren_shouji = new String(shoujianren_shouji.getBytes("iso8859-1"),"utf8");
//
//				String tiaoxingma = Type.getString(request.getParameter("tiaoxingma"));
//				tiaoxingma = new String(tiaoxingma.getBytes("iso8859-1"),"utf8");
//
//				if(!org_User.getUsername().equals("admin")){
//					SysUtil.searchMap(map,"lururenid",lururenid);
//				}
//				SysUtil.searchMap(map,"search_type",search_type);
//				if(!startDate.equals("")){
//					SysUtil.searchMap(map,"startDate",startDate);
//				}
//				SysUtil.searchMap(map,"status",status);
//				SysUtil.searchMap(map,"jijianren_xingming",jijianren_xingming);
//				SysUtil.searchMap(map,"jijianren_shouji",jijianren_shouji);
//				SysUtil.searchMap(map,"id",id);
//				SysUtil.searchMap(map,"anhao",anhao);
//				if(!endDate.equals("")){
//					SysUtil.searchMap(map,"endDate",endDate);
//				}
//				SysUtil.searchMap(map,"lururenDeptName",lururenDeptName);
//				SysUtil.searchMap(map,"shoujianren_xingming",shoujianren_xingming);
//				SysUtil.searchMap(map,"shoujianren_shouji",shoujianren_shouji);
//				SysUtil.searchMap(map,"tiaoxingma",tiaoxingma);
//
//				map.put("model","Kdd_Info");
//				if(search_type != null && (search_type.equals("kdd_chuandashi") || search_type.equals("kdd_tj_mingxi"))){
//					map.remove("lururenid");
//				}
//
//				List<Kdd_Info> list = new ArrayList<Kdd_Info>();
//				list = kddInfoService.list_search_Kdds(map);
//
//				String headMsg = request.getParameter("header");
//				String[] tmpMsg = headMsg.split("_");
//				Integer[] header = new Integer[tmpMsg.length];
//				for(int i=0;i<tmpMsg.length;i++){
//					header[i] = Integer.valueOf(tmpMsg[i]);
//				}
//
//				ToExcel.exportExcel(request, response, "快递单明细", header, list);
//			}else {
//				Map<String, String> jsonMap = new HashMap<String, String>();
//				jsonMap.put("success", "session");
//				String json = JSONObject.fromObject(jsonMap).toString();
//				response.getWriter().print(json);
//			}
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	/**
//	 * 导出快递单
//	 */
//	public void export_report_Kdds(){
//		try {
//			response.setCharacterEncoding("utf-8");
//
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				String startDate = Type.getString(request.getParameter("startDate"));
//				String status = Type.getString(request.getParameter("type"));
//				Map<String, String> map = new HashMap<String, String>();
//				map.put("startDate", startDate);
//				map.put("type", status);
//				List<Kdd_Report> list = new ArrayList<Kdd_Report>();
//				list = kddInfoService.list_report_Kdds(map);
//
//				String title = "";
//				if(status.equals("day")){
//					title = startDate + "月";
//				}else if(status.equals("month")){
//					title = startDate + "年";
//				}
//				ToExcel.exportReportExcel(request, response,title, list);
//			}else {
//				Map<String, String> jsonMap = new HashMap<String, String>();
//				jsonMap.put("success", "session");
//				String json = JSONObject.fromObject(jsonMap).toString();
//				response.getWriter().print(json);
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	/**
//	 * 更改状态和备注信息
//	 */
//	public void saveOrUpdate_statusAndMark(){
//		Map<String, String> map = new HashMap<String, String>();
//		try {
//			request.setCharacterEncoding("utf-8");
//			response.setCharacterEncoding("utf-8");
//
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				String ids = request.getParameter("id");
//				String status = request.getParameter("status");							//快递单状态
//				String kdd_mark = Type.getString(request.getParameter("kdd_mark"));		//备注信息
//
//				String tiaoxingma = request.getParameter("tiaoxingma");							//快递单号
//
//				Kdd_Info kdd_Info = new Kdd_Info();
//				if(ids != null && !"".equals(ids)){
//					String[] idarr = ids.split(",");
//					for(int i=0;i<idarr.length;i++){
//						if(!idarr[i].equals("0")){
//							kdd_Info = kddInfoService.getKddInfoById(idarr[i]);
//							if(kdd_mark != null && !"".equals(kdd_mark)){
//								String mark = Type.getString(kdd_Info.getKdd_mark());
//								mark += "," + kdd_mark;
//								kdd_Info.setKdd_mark(mark);
//							}
//							if(tiaoxingma!=null && !"".equals(tiaoxingma)){
//								kdd_Info.setTiaoxingma(tiaoxingma);
//								kdd_Info.setStatus(3);
//							}
//							if(status != null && !"".equals(status)){
//								kdd_Info.setStatus(Integer.valueOf(status));
//								if(status.equals("4")){
//									dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//									kdd_Info.setTongjidate(dateFormat.format(new Date()));
//									dateFormat = new SimpleDateFormat("yyyy-MM");
//									kdd_Info.setTongjimonth(dateFormat.format(new Date()));
//								}
//							}
//							kddInfoService.saveOrUpdate(kdd_Info);
//						}
//					}
//				}
//				if(tiaoxingma!=null && !"".equals(tiaoxingma)){
//					return;
//				}
//				map.put("success", "true");
//				String json = JSONObject.fromObject(map).toString();
//				response.getWriter().print(json);
//			}else {
//				Map<String, String> jsonMap = new HashMap<String, String>();
//				jsonMap.put("success", "session");
//				String json = JSONObject.fromObject(jsonMap).toString();
//				response.getWriter().print(json);
//			}
//
//		} catch (Exception e) {
//			map.put("success", "false");
//			e.printStackTrace();
//		}finally {}
//
//	}
//
//	/**
//	 * 回执快递单信息
//	 */
//	public void saveOrUpdate_huizhi(){
//		Map<String, String> map = new HashMap<String, String>();
//		try {
//			request.setCharacterEncoding("utf-8");
//			response.setCharacterEncoding("utf-8");
//
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				String hzstatus = request.getParameter("hzstatus");
//				String id = request.getParameter("id");							//快递单状态
//				String qita = Type.getString(request.getParameter("qita"));		//备注信息
//
//
//				Kdd_Info kdd_Info = new Kdd_Info();
//				kdd_Info = kddInfoService.getKddInfoById(id);
//				if(kdd_Info != null){
//					kdd_Info.setStatus(Integer.valueOf(hzstatus));
//					kdd_Info.setHuizhistatus(qita);
//					kddInfoService.saveOrUpdate(kdd_Info);
//				}
//				map.put("success", "true");
//				String json = JSONObject.fromObject(map).toString();
//				response.getWriter().print(json);
//			}else {
//				Map<String, String> jsonMap = new HashMap<String, String>();
//				jsonMap.put("success", "session");
//				String json = JSONObject.fromObject(jsonMap).toString();
//				response.getWriter().print(json);
//			}
//
//		} catch (Exception e) {
//			map.put("success", "false");
//			e.printStackTrace();
//		}finally {}
//
//	}
//
//	/**
//	 * 保存修改快递单信息
//	 */
//	public void saveOrUpdate(){
//		Map<String, String> map = new HashMap<String, String>();
//		try {
//			request.setCharacterEncoding("utf-8");
//			response.setCharacterEncoding("utf-8");
//
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				String userid = Type.getString(request.getSession().getAttribute("uid"));
//
//				String id = request.getParameter("id");
//				//通用属性
//				String jijianren_xingming = request.getParameter("jijianren_xingming");			//寄件人_姓名
//				String jijianren_shouji = request.getParameter("jijianren_shouji");				//寄件人_手机
//				String jijianren_danwei = request.getParameter("jijianren_danwei");				//寄件人_单位名称
//			    String jijianren_dizhi = request.getParameter("jijianren_dizhi");			 	//寄件人_地址
//			    String jijianren_youbian = request.getParameter("jijianren_youbian");			//寄件人_邮编
//			    String shoujianren_xingming = request.getParameter("shoujianren_xingming");		//收件人_姓名
//			    String shoujianren_shouji = request.getParameter("shoujianren_shouji");			//收件人_手机
//			    String shoujianren_danwei = request.getParameter("shoujianren_danwei");			//收件人_单位名称
//			    String shoujianren_dizhi = request.getParameter("shoujianren_dizhi");			//收件人_地址(输入十个字自动换行)
//			    String shoujianren_youbian = request.getParameter("shoujianren_youbian");		//收件人_邮编
//			    String jiaojiren_qianming = request.getParameter("jiaojiren_qianming");			//交寄人_签名
//
//			    String status = request.getParameter("status");									//快递单状态
//
//			    //京城市内-司法专邮
//			    String jingbanren_qianming = request.getParameter("jingbanren_qianming");	//经办人_签名
//			    //司法专邮
//			    String wenjianmingcheng = request.getParameter("wenjianmingcheng");			//文件名称
//			    String beizhuxinxi = request.getParameter("beizhuxinxi");					//备注信息称
//			    String chuanpiaoxinxi = request.getParameter("chuanpiaoxinxi");				//传票信息
//
//
//			    String add_lianlixiren = request.getParameter("add_lianlixiren");		//是否保存为常用寄件人
//			    if("true".equals(add_lianlixiren)){
//
//					Kdd_ContactInfo kdd_Info1 = new Kdd_ContactInfo();
//					kdd_Info1.setUserid(Type.getInteger(userid));
//
//					kdd_Info1.setJijianren_xingming(jijianren_xingming);
//					kdd_Info1.setJijianren_shouji(jijianren_shouji);
//					kdd_Info1.setJijianren_danwei(jijianren_danwei);
//					kdd_Info1.setJijianren_dizhi(jijianren_dizhi);
//					kdd_Info1.setJijianren_youbian(jijianren_youbian);
//					kdd_Info1.setShoujianren_xingming(shoujianren_xingming);
//					kdd_Info1.setShoujianren_shouji(shoujianren_shouji);
//					kdd_Info1.setShoujianren_danwei(shoujianren_danwei);
//					kdd_Info1.setShoujianren_dizhi(shoujianren_dizhi);
//					kdd_Info1.setShoujianren_youbian(shoujianren_youbian);
//
//					kdd_Info1.setJiaojiren_qianming(jiaojiren_qianming);
//					kdd_Info1.setJingbanren_qianming(jingbanren_qianming);
//					kdd_Info1.setWenjianmingcheng(wenjianmingcheng);
//					kdd_Info1.setBeizhuxinxi(beizhuxinxi);
//					kdd_Info1.setChuanpiaoxinxi(chuanpiaoxinxi);
//
//					kddInfoService.saveOrUpdate(kdd_Info1);
//			    }
//
//			    String anhao = request.getParameter("anhao");								//案号
//			    String wenshumingcheng = request.getParameter("wenshumingcheng");			//文书名勾选)
//			    String funei_fuwai = request.getParameter("funei_fuwai");					//阜内阜外
//			    if(funei_fuwai != null){
//			    	if(funei_fuwai.equals("内阜")){
//			    		funei_fuwai = "1";
//			    	}
//			    	if(funei_fuwai.equals("外阜")){
//			    		funei_fuwai = "2";
//			    	}
//			    }
//
//			    String type = request.getParameter("type");									//快递单类型:EMS市内-1 、EMS市外-2 、EMS司法专邮-3
//
//			    //辅助信息
//
//				Kdd_Info kdd_Info = new Kdd_Info();
//				if(id != null && !"".equals(id)){
//					kdd_Info = kddInfoService.getKddInfoById(id);
//				}else{
//					kdd_Info.setStartdate(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
//				}
//				kdd_Info.setStatus(Integer.valueOf(status));
//				kdd_Info.setJijianren_xingming(jijianren_xingming);
//				kdd_Info.setJijianren_shouji(jijianren_shouji);
//				kdd_Info.setJijianren_danwei(jijianren_danwei);
//				kdd_Info.setJijianren_dizhi(jijianren_dizhi);
//				kdd_Info.setJijianren_youbian(jijianren_youbian);
//				kdd_Info.setShoujianren_xingming(shoujianren_xingming);
//				kdd_Info.setShoujianren_shouji(shoujianren_shouji);
//				kdd_Info.setShoujianren_danwei(shoujianren_danwei);
//				kdd_Info.setShoujianren_dizhi(shoujianren_dizhi);
//				kdd_Info.setShoujianren_youbian(shoujianren_youbian);
//
//				kdd_Info.setJiaojiren_qianming(jiaojiren_qianming);
//				kdd_Info.setType(Type.GetInt(type));
//
//				kdd_Info.setJingbanren_qianming(jingbanren_qianming);
//				if(type.equals("2") || type.equals("3")){
//					kdd_Info.setFunei_fuwai(Integer.valueOf(funei_fuwai));
//				}else if(type.equals("1")){
//					kdd_Info.setFunei_fuwai(0);
//				}
//
//
//				String baojiajiage = Type.getString(request.getParameter("baojiajiage"));
//				String daishouhuokuan = Type.getString(request.getParameter("daishouhuokuan"));
//
//				kdd_Info.setWenjianmingcheng(Type.getString(wenjianmingcheng));
//				kdd_Info.setAnhao(Type.getString(anhao));
//				kdd_Info.setWenshumingcheng(Type.getString(wenshumingcheng));
//				kdd_Info.setBeizhuxinxi(Type.getString(beizhuxinxi));
//				kdd_Info.setChuanpiaoxinxi(Type.getString(chuanpiaoxinxi));
//				kdd_Info.setBaojiajiage(baojiajiage);
//				kdd_Info.setDaishouhuokuan(daishouhuokuan);
//
//				if(type.equals("1")){
//					kdd_Info.setPrice(10);
//				}
//				if(type.equals("2")){
//					kdd_Info.setPrice(20);
//				}
//				if(type.equals("3")){
//					kdd_Info.setPrice(30);
//				}
//
//				kdd_Info.setLururenid(Integer.valueOf(userid));
//				Org_Department department = kddInfoService.getDeptmentByUid(userid);
//				if(department != null){
//					kdd_Info.setLururenDeptId(department.getId()+"");
//					kdd_Info.setLururenDeptName(department.getName());
//				}
//
//				kddInfoService.saveOrUpdate(kdd_Info);
//				map.put("success", "true");
//				String json = JSONObject.fromObject(map).toString();
//				response.getWriter().print(json);
//			}else {
//				Map<String, String> jsonMap = new HashMap<String, String>();
//				jsonMap.put("success", "session");
//				String json = JSONObject.fromObject(jsonMap).toString();
//				response.getWriter().print(json);
//			}
//		} catch (Exception e) {
//			map.put("success", "false");
//			e.printStackTrace();
//		}finally {}
//
//	}
//
//	/**
//	 * 删除改快递单信息
//	 */
//	public void delete(){
//		Map<String, String> map = new HashMap<String, String>();
//		try {
//			request.setCharacterEncoding("utf-8");
//			response.setCharacterEncoding("utf-8");
//
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				String ids = request.getParameter("ids");
//				if(ids != null){
//					Kdd_Info kdd_Info = new Kdd_Info();
//					String[] arr = ids.split(",");
//					for (String id : arr) {
//						kdd_Info.setId(Integer.valueOf(id));
//						kddInfoService.deleteObject(kdd_Info);
//					}
//				}
//				map.put("success", "true");
//				String json = JSONObject.fromObject(map).toString();
//				response.getWriter().print(json);
//			}else {
//				Map<String, String> jsonMap = new HashMap<String, String>();
//				jsonMap.put("success", "session");
//				String json = JSONObject.fromObject(jsonMap).toString();
//				response.getWriter().print(json);
//			}
//		} catch (Exception e) {
//			map.put("success", "false");
//			e.printStackTrace();
//		}
//
//	}
//
//	/**
//	 * 查询显示快递单信息
//	 */
//	public void listKddContactInfo(){
//		try {
//			response.setCharacterEncoding("utf-8");
//			Map<String, String> map = new HashMap<String,String>();
//
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				String userid = Type.getString(request.getSession().getAttribute("uid"));
//				String first = request.getParameter("start");
//				String limit = request.getParameter("limit");
//
//				map.put("first", first);
//				map.put("limit", limit);
//				map.put("uid", userid);
//				map.put("model","Kdd_ContactInfo");
//
//				List<Kdd_ContactInfo> list = new ArrayList<Kdd_ContactInfo>();
//				int totalCount = 0;
//				list = kddInfoService.listKddContactInfo(map);
//				totalCount = kddInfoService.getKddContactInfoTotalCount(map);
//
//				String json = "{";
//				if(list != null && list.size() > 0) {
//					JSONArray jsonArray = new JSONArray();
//					jsonArray.add(list);
//					String temp = jsonArray.toString();
//					json += "root:["+temp.substring(2, temp.length()-2)+"],totalProperty:"+totalCount+"";
//				}else {
//					json += "root:[],totalProperty:"+totalCount+"";
//				}
//				json += "}";
//				response.getWriter().print(json);
//			}else {
//				Map<String, String> jsonMap = new HashMap<String, String>();
//				jsonMap.put("success", "session");
//				String json = JSONObject.fromObject(jsonMap).toString();
//				response.getWriter().print(json);
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
////	/**
////	 * 新增修改常用寄件人
////	 */
////	public void saveOrUpdateKddContactInfo(){
////		Map<String, String> map = new HashMap<String, String>();
////		try {
////			request.setCharacterEncoding("utf-8");
////			response.setCharacterEncoding("utf-8");
////
////			String userid = Type.getString(request.getSession().getAttribute("uid"));
////			userid = "123";
////
////			String id = request.getParameter("id");
////			//通用属性
////			String jijianren_xingming = request.getParameter("jijianren_xingming");			//寄件人_姓名
////			String jijianren_shouji = request.getParameter("jijianren_shouji");				//寄件人_手机
////			String jijianren_zuoji = request.getParameter("jijianren_zuoji");				//寄件人_座机
////			String jijianren_danwei = request.getParameter("jijianren_danwei");				//寄件人_单位名称
////		    String jijianren_dizhi = request.getParameter("jijianren_dizhi");			 	//寄件人_地址
////		    String jijianren_youbian = request.getParameter("jijianren_youbian");			//寄件人_邮编
////
////			Kdd_ContactInfo kdd_Info = new Kdd_ContactInfo();
////			kdd_Info.setJijianren_xingming(jijianren_xingming);
////			kdd_Info.setJijianren_shouji(jijianren_shouji);
////			kdd_Info.setJijianren_zuoji(jijianren_zuoji);
////			kdd_Info.setJijianren_danwei(jijianren_danwei);
////			kdd_Info.setJijianren_dizhi(jijianren_dizhi);
////			kdd_Info.setJijianren_youbian(jijianren_youbian);
////			kdd_Info.setUserid(Type.getInteger(userid));
////
////			kddInfoService.saveOrUpdate(kdd_Info);
////			map.put("success", "true");
////		} catch (UnsupportedEncodingException e) {
////			map.put("success", "false");
////			e.printStackTrace();
////		}finally {
////			try {
////				String json = JSONObject.fromObject(map).toString();
////				response.getWriter().print(json);
////			} catch (IOException e) {
////				e.printStackTrace();
////			}
////		}
////
////	}
////
//	/**
//	 * 删除常用的寄件人信息
//	 */
//	public void deleteKddContactInfo(){
//		Map<String, String> map = new HashMap<String, String>();
//		try {
//			request.setCharacterEncoding("utf-8");
//			response.setCharacterEncoding("utf-8");
//
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				String ids = request.getParameter("ids");
//				if(ids != null){
//					Kdd_ContactInfo kdd_Info = new Kdd_ContactInfo();
//					String[] arr = ids.split(",");
//					for (String id : arr) {
//						kdd_Info.setId(Integer.valueOf(id));
//						kddInfoService.deleteObject(kdd_Info);
//					}
//				}
//				map.put("success", "true");
//				String json = JSONObject.fromObject(map).toString();
//				response.getWriter().print(json);
//			}else {
//				Map<String, String> jsonMap = new HashMap<String, String>();
//				jsonMap.put("success", "session");
//				String json = JSONObject.fromObject(jsonMap).toString();
//				response.getWriter().print(json);
//			}
//		} catch (Exception e) {
//			map.put("success", "false");
//			e.printStackTrace();
//		}
//
//	}
//}
