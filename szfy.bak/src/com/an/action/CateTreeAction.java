package com.an.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.an.model.Categoryinfo;
import com.an.service.CateTreeService;
import com.an.util.SysUtil;
import com.opensymphony.xwork2.ActionSupport;

public class CateTreeAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private HttpServletRequest request = ServletActionContext.getRequest();
	private HttpServletResponse response = ServletActionContext.getResponse();
	
	/*********************************************************************************
	* Spring注入
	*********************************************************************************/
	private CateTreeService cateTreeService;
	private SysUtil sysUtil;
	
	public SysUtil getSysUtil() {
		return sysUtil;
	}

	public void setSysUtil(SysUtil sysUtil) {
		this.sysUtil = sysUtil;
	}

	public CateTreeService getCateTreeService() {
		return cateTreeService;
	}

	public void setCateTreeService(CateTreeService cateTreeService) {
		this.cateTreeService = cateTreeService;
	}

	/*********************************************************************************
	 * Spring注入
	 *********************************************************************************/

	/**
	 * 类别树
	 */
	public void sysTree() {
		try {
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");
			
			Categoryinfo cate = null;
			boolean leaf = true;
			
			String id = request.getParameter("id");
			String json = "[";
			List<Categoryinfo> list = new ArrayList<Categoryinfo>();
			list = cateTreeService.listNodesByParent(id);
			if(list != null) {
				for(int i=0;i<list.size();i++){
					cate = list.get(i);
					leaf = cateTreeService.hasChild(cate.getId()+"");
					json += "{id:"+cate.getId()+",text:'"+cate.getCatename()+"',icon:'img/tree/subsystem.png',leaf:"+leaf+",url:'"+cate.getCatenum()+"'},";
				}
				if(json.length() > 1) {
					json = json.substring(0, json.length()-1);
				}
			}
			json += "]";
			response.getWriter().print(json);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 
	 * 根据父节点id列出所有其子节点的类别信息
	 * */
	public void listCatesByFid() {
		List<Categoryinfo> list = null;
		int count = 0;
		response.setCharacterEncoding("utf-8");
		try {
			List<String> args = new ArrayList<String>();
			String first = request.getParameter("start");
			String limit = request.getParameter("limit");
			int f = Integer.parseInt(first);
			int m = Integer.parseInt(limit);
			String id = request.getParameter("id");
			String json = "{";
			args.add(first);
			args.add(limit);
			if(id != null && !"".equals(id)){
				args.add(id);
			}
			list = cateTreeService.listNodesByParent(f,m,Integer.parseInt(id));
			count = cateTreeService.listNodesByParentCount(Integer.parseInt(id));//“根据父节点id列出所有其子节点”的数量
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
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 * 添加、修改 类别信息
	 * */
	public void saveOrUpdateCates() {
		Map<String,String> map = new HashMap<String,String>();
		
		String id = request.getParameter("id");
		String catenum = request.getParameter("catenum");
		String catename = request.getParameter("catename");
		String fatherid2 = request.getParameter("fatherid");
		int fatherid = Integer.parseInt(fatherid2);
		String remark = request.getParameter("remark");

		try {
			//添加
			Categoryinfo cate = new Categoryinfo();
			if(id != null && !"".equals(id)){
				int id2 = Integer.parseInt(id);
				cate.setId(id2);
			}
			cate.setCatenum(catenum);
			cate.setCatename(catename);
			cate.setRemark(remark);
			cate.setFatherid(fatherid);
			
			cateTreeService.saveOrUpdateCates(cate);
			
			map.put("success", "true");
			response.getWriter().print(JSONObject.fromObject(map));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 
	 * 删除 类别信息
	 * 支持批量删除
	 * */
	public void delCates() {
		Map<String,String> map = new HashMap<String,String>();
		try {
			String[] ids = request.getParameter("id").split(",");
			for(int i=0;i<ids.length;i++){
				int id = Integer.parseInt(ids[i]);
				cateTreeService.delCatesById(id);
			}
			map.put("success", "true");
			map.put("msg", "删除成功！");
			response.getWriter().print(JSONObject.fromObject(map));
		} catch (Exception e) {
			map.put("success", "false");
			map.put("msg", "删除失败！");
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 * 类名编号是否重复
	 * */	
	public void isRepeat(){
		
		try {
			Map<String, String> map = new HashMap<String, String>();
			
			String node = request.getParameter("catenum");
			String Categoryinfo = "Categoryinfo";
			String catenum = "catenum";
			boolean isRepeat = false;
			isRepeat = sysUtil.isCodeExit(node, Categoryinfo, catenum);
			map.put("success", "true");
			map.put("msg", isRepeat+""); 
			//response.getWriter().print(map)  --> success = true
			//JSONObject.fromObject(map).toString();      --> succcess:true
			response.getWriter().print(JSONObject.fromObject(map));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
	}
	
}
