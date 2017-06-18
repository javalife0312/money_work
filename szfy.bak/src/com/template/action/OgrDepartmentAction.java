package com.template.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.template.model.Org_Department;
import com.template.service.OrgDepartmentService;
import com.template.util.SysUtil;

public class OgrDepartmentAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private HttpServletRequest request = ServletActionContext.getRequest();
	private HttpServletResponse response = ServletActionContext.getResponse();
	
	private OrgDepartmentService orgDepartmentService;
	private SysUtil sysUtil;
	
	public SysUtil getSysUtil() {
		return sysUtil;
	}
	public OrgDepartmentService getOrgDepartmentService() {
		return orgDepartmentService;
	}
	public void setOrgDepartmentService(OrgDepartmentService orgDepartmentService) {
		this.orgDepartmentService = orgDepartmentService;
	}
	
	/**
	 * 修改或者保存Depart
	 */
	public void saveOrUpdate() {
		Map<String, String> map = new HashMap<String, String>();
		try {
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");
			
			boolean sessionCheck = SysUtil.sessionCheck(request, response);
			if(sessionCheck){
				String id = request.getParameter("id");
				String name = request.getParameter("name");
				String descr = request.getParameter("descr");
				String isleaf =  request.getParameter("isleaf");
				String path = request.getParameter("path");
				String fid = request.getParameter("fid");
				
				Org_Department department = new Org_Department();
				if(id != null && !"".equals(id)){
					department.setId(Integer.parseInt(id));
				}
				department.setName(name);
				department.setDescr(descr);
				if(isleaf.equals("true")){
					department.setIsleaf(0);
				}else{
					department.setIsleaf(1);
				}
				department.setFid(Integer.parseInt(fid));
				department.setPath(path);
				
				orgDepartmentService.saveOrUpdate(department);
				
				map.put("success", "true");
				String json = JSONObject.fromObject(map).toString();
				response.getWriter().print(json);
			}else {
				Map<String, String> jsonMap = new HashMap<String, String>();
				jsonMap.put("success", "session");
				String json = JSONObject.fromObject(jsonMap).toString();
				response.getWriter().print(json);
			}
		} catch (Exception e) {
			map.put("success", "false");
			e.printStackTrace();
		}finally {}
	}
	
	/**
	 * 删除departs
	 */
	public void deleteDeparts() {
		Map<String, String> map = new HashMap<String, String>();
		try {
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");
			
			boolean sessionCheck = SysUtil.sessionCheck(request, response);
			if(sessionCheck){
				String[] ids = request.getParameter("ids").split(",");
				orgDepartmentService.deleteDeparts(ids);
				map.put("success", "true");
				map.put("msg", "true");
				String json = JSONObject.fromObject(map).toString();
				response.getWriter().print(json);
			}else {
				Map<String, String> jsonMap = new HashMap<String, String>();
				jsonMap.put("success", "session");
				String json = JSONObject.fromObject(jsonMap).toString();
				response.getWriter().print(json);
			}
			
		} catch (Exception e) {
			map.put("success", "false");
			e.printStackTrace();
		}finally {}
	}

	/**
	 * 查询departs
	 */
	public void listAllDeparts() {
		List<Org_Department> list = null;
		int count = 0;
		response.setCharacterEncoding("utf-8");
		try {
			boolean sessionCheck = SysUtil.sessionCheck(request, response);
			if(sessionCheck){
				Map<String, String> args = new HashMap<String, String>();
				String first = request.getParameter("start");
				String limit = request.getParameter("limit");
				String id = request.getParameter("id");
				String path = request.getParameter("path");
				String json = "{";
				args.put("first", first);
				args.put("limit", limit);
				if(id != null && !"".equals(id)){
					args.put("id", id);
				}
				if(path != null && !"".equals(path)){
					args.put("path", path);
				}
				list = orgDepartmentService.listDeparts(args);
				count = orgDepartmentService.listCount(args);
				if(list != null && list.size() > 0) {
					JSONArray jsonArray = new JSONArray();
					jsonArray.add(list);
					String temp = jsonArray.toString();
					json += "root:["+temp.substring(2, temp.length()-2)+"],totalProperty:"+count+"";				
				}else {
					json += "root:[],totalProperty:"+count+"";								
				}
				json += "}";
				response.getWriter().print(json);
			}else {
				Map<String, String> jsonMap = new HashMap<String, String>();
				jsonMap.put("success", "session");
				String json = JSONObject.fromObject(jsonMap).toString();
				response.getWriter().print(json);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
