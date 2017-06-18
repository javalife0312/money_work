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

import com.an.model.Topicinfo;
import com.an.service.TopicService;
import com.an.util.SysUtil;
import com.opensymphony.xwork2.ActionSupport;

public class TopicAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private HttpServletRequest request = ServletActionContext.getRequest();
	private HttpServletResponse response = ServletActionContext.getResponse();
	
	/*********************************************************************************
	* Spring注入
	*********************************************************************************/
	private TopicService topicService;
	private SysUtil sysUtil;
	
	public SysUtil getSysUtil() {
		return sysUtil;
	}

	public void setSysUtil(SysUtil sysUtil) {
		this.sysUtil = sysUtil;
	}


	/*********************************************************************************
	 * Spring注入
	 *********************************************************************************/

	public TopicService getTopicService() {
		return topicService;
	}

	public void setTopicService(TopicService topicService) {
		this.topicService = topicService;
	}

	/**
	 * 
	 * 根据父节点id列出所有其子节点的类别信息
	 * */
	public void listtopicsByCid() {
		List<Topicinfo> list = null;
		int count = 0;
		response.setCharacterEncoding("utf-8");
		try {
			List<String> args = new ArrayList<String>();
			String first = request.getParameter("start");
			String limit = request.getParameter("limit");
			int f = Integer.parseInt(first);
			int m = Integer.parseInt(limit);
			String cid = request.getParameter("id");
			String json = "{";
			args.add(first);
			args.add(limit);
			if(cid != null && !"".equals(cid)){
				args.add(cid);
			}
			list = topicService.listNodesByCid(f, m, Integer.parseInt(cid));
			count = topicService.listNodesByCidCount(Integer.parseInt(cid));//“根据父节点id列出所有其子节点”的数量
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
	 * 添加、修改 信息
	 * */
	public void saveOrUpdateTopics() {
		Map<String,String> map = new HashMap<String,String>();
		
		String id = request.getParameter("id");
		String topicnum = request.getParameter("topicnum");
		String topic = request.getParameter("topic");
		String optiona = request.getParameter("optiona");
		String optionb = request.getParameter("optionb");
		String optionc = request.getParameter("optionc");
		String optiond = request.getParameter("optiond");
		String asnum = request.getParameter("asnum");

		try {
			//添加
			Topicinfo info = new Topicinfo();
			if(id != null && !"".equals(id)){
				int id2 = Integer.parseInt(id);
				info.setId(id2);
			}
			info.setTopicnum(topicnum);
			info.setTopic(topic);
			info.setOptiona(optiona);
			info.setOptionb(optionb);
			info.setOptionc(optionc);
			info.setOptiond(optiond);
			info.setAsnum(asnum);
			
			topicService.saveOrUpdateTopic(info);
			
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
				topicService.deltopicById(id);
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
	 * 题号编号是否重复
	 * */	
	public void isRepeat(){
		
		try {
			Map<String, String> map = new HashMap<String, String>();
			
			String node = request.getParameter("topicnum");
			String Topicinfo = "Topicinfo";
			String topicnum = "topicnum";
			boolean isRepeat = false;
			isRepeat = sysUtil.isCodeExit(node, Topicinfo, topicnum);
			map.put("success", "true");
			map.put("msg", isRepeat+""); 
			response.getWriter().print(JSONObject.fromObject(map));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
	}
	
}
