package com.template.service;

import java.util.List;
import java.util.Map;

import com.template.model.Kdd_ContactInfo;
import com.template.model.Kdd_Info;
import com.template.model.Kdd_Report;
import com.template.model.Org_Department;

/**
 * @author Administrator
 * 基本的serice,适用于基本的crud,方法重用
 */
public interface KddInfoService {

	/**
	 * @param map
	 * @return
	 * 根据参数信息
	 */
	public List<Kdd_Info> listKdds(Map<String, String> map);
	public List<Kdd_ContactInfo> listKddContactInfo(Map<String, String> map);

	/**
	 * @param map
	 * @return
	 * 根据参数获取数量
	 */
	public int getTotalCount(Map<String, String> map);
	public int getKddContactInfoTotalCount(Map<String, String> map);
	
	/**
	 * @param object
	 * 保存修改Object
	 */
	public void saveOrUpdate(Object object);
	
	/**
	 * @param object
	 * 删除对象
	 */
	public void deleteObject(Object object);
	
	/**
	 * @param uid
	 * @return
	 * 通过uid获取部门信息
	 */
	public Org_Department getDeptmentByUid(String uid);
	
	/**
	 * @param id
	 * @return
	 * 根据id获取快递单信息
	 */
	public Kdd_Info getKddInfoById(String id);
	
	/**
	 * @param map
	 * @return
	 * 查询快递单信息
	 */
	public List<Kdd_Info> list_search_Kdds(Map<String, String> map);
	
	/**
	 * @param map
	 * @return
	 * 获取查询的数量
	 */
	public int getTotalSearchCount(Map<String, String> map);
	
	/**
	 * @return
	 * 获取快单的报表信息
	 */
	public List<Kdd_Report> list_report_Kdds(Map<String, String> map);
	
	
	/**
	 * @param tiaoxingma
	 * @return
	 * 根据条形码获取快递单信息
	 */
	public Kdd_Info getKddInfoByTXM(String tiaoxingma);

}
