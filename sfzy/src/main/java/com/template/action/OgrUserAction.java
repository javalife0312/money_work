//package com.template.action;
//
//import java.io.IOException;
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
//import com.template.model.Org_User;
//import com.template.service.OrgUserService;
//import com.template.util.SysUtil;
//
//public class OgrUserAction extends ActionSupport {
//
//	private static final long serialVersionUID = 1L;
//	private HttpServletRequest request = ServletActionContext.getRequest();
//	private HttpServletResponse response = ServletActionContext.getResponse();
//
//	private OrgUserService orgUserService;
//	private SysUtil sysUtil;
//
//	public SysUtil getSysUtil() {
//		return sysUtil;
//	}
//	public OrgUserService getOrgUserService() {
//		return orgUserService;
//	}
//	public void setOrgUserService(OrgUserService orgUserService) {
//		this.orgUserService = orgUserService;
//	}
//
//	/**
//	 * 修改或者保存
//	 */
//	public void saveOrUpdate() {
//		Map<String, String> map = new HashMap<String, String>();
//		try {
//			request.setCharacterEncoding("utf-8");
//			response.setCharacterEncoding("utf-8");
//
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				String id = request.getParameter("id");
//				String username = request.getParameter("username");
//				String password = request.getParameter("password");
//				String descr =  request.getParameter("descr");
//				String orgId = request.getParameter("orgId");
//
//				Org_User org_User = new Org_User();
//				if(id != null && !"".equals(id)){
//					org_User.setId(Integer.parseInt(id));
//				}
//				org_User.setUsername(username);
//				org_User.setPassword(password);
//				org_User.setDescr(descr);
//				org_User.setOrgId(Integer.valueOf(orgId));
//
//				orgUserService.saveOrUpdate(org_User);
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
//
//		} catch (Exception e) {
//			map.put("success", "false");
//			e.printStackTrace();
//		}finally {}
//	}
//
//	/**
//	 * 修改或者保存
//	 */
//	public void quanxianFP() {
//		Map<String, String> map = new HashMap<String, String>();
//		try {
//			request.setCharacterEncoding("utf-8");
//			response.setCharacterEncoding("utf-8");
//
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				String id = request.getParameter("uid");
//				String pms = request.getParameter("nodeIds");
//
//				Org_User org_User = (Org_User)orgUserService.getById(id);
//				org_User.setPermissions(pms);
//				orgUserService.saveOrUpdate(org_User);
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
//	}
//
//	/**
//	 * 删除
//	 */
//	public void delete() {
//		Map<String, String> map = new HashMap<String, String>();
//		try {
//			request.setCharacterEncoding("utf-8");
//			response.setCharacterEncoding("utf-8");
//
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				String[] ids = request.getParameter("ids").split(",");
//				if(ids != null){
//					for (String id : ids) {
//						Org_User org_User = new Org_User();
//						org_User.setId(Integer.valueOf(id));
//						orgUserService.deleteObject(org_User);
//					}
//				}
//
//				map.put("success", "true");
//				map.put("msg", "true");
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
//	}
//
//	/**
//	 * 查询departs
//	 */
//	public void listAll() {
//
//		boolean sessionCheck = SysUtil.sessionCheck(request, response);
//		if(sessionCheck){
//			List<Org_User> list = null;
//			int count = 0;
//			response.setCharacterEncoding("utf-8");
//			Map<String, String> map = new HashMap<String,String>();
//			try {
//				String first = request.getParameter("start");
//				String limit = request.getParameter("limit");
//				String orgId = request.getParameter("id");
//
//				map.put("first", first);
//				map.put("limit", limit);
//				map.put("model","Org_User");
//				String json = "{";
//				if(orgId != null && !"".equals(orgId)){
//					map.put("orgId", orgId);
//				}
//				list = orgUserService.listUsers(map);
//				count = orgUserService.listCount(map);
//				if(list != null && list.size() > 0) {
//					JSONArray jsonArray = new JSONArray();
//					jsonArray.add(list);
//					String temp = jsonArray.toString();
//					json += "root:["+temp.substring(2, temp.length()-2)+"],totalProperty:"+count+"";
//				}else {
//					json += "root:[],totalProperty:"+count+"";
//				}
//				json += "}";
//				response.getWriter().print(json);
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}else {
//			Map<String, String> jsonMap = new HashMap<String, String>();
//			jsonMap.put("success", "session");
//			String json = JSONObject.fromObject(jsonMap).toString();
//			try {
//				response.getWriter().print(json);
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		}
//
//
//	}
//
//	/**
//	 * 检测用户名是否存在
//	 */
//	public void checkUsername(){
//		Map<String, String> map = new HashMap<String, String>();
//		Map<String, String> args = new HashMap<String, String>();
//		try {
//			request.setCharacterEncoding("utf-8");
//			response.setCharacterEncoding("utf-8");
//
//			boolean sessionCheck = SysUtil.sessionCheck(request, response);
//			if(sessionCheck){
//				int count = 0;
//
//				String username = request.getParameter("username");
//				if(username != null){
//					args.put("model","Org_User");
//					args.put("username",username);
//					count = orgUserService.checkUsername(args);
//				}
//				map.put("success", "true");
//				if(count > 0){
//					map.put("msg", "true");
//				}else{
//					map.put("msg", "false");
//				}
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
//	}
//}
