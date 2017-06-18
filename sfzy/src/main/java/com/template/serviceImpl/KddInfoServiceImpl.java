package com.template.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.template.dao.BaseDao;
import com.template.model.Kdd_ContactInfo;
import com.template.model.Kdd_Info;
import com.template.model.Kdd_Report;
import com.template.model.Org_Department;
import com.template.service.KddInfoService;
import com.template.util.SysUtil;

/**
 * @author Administrator
 * 基本的serice,适用于基本的crud,方法重用
 */
public class KddInfoServiceImpl implements KddInfoService{
	/*********************************************************************************
	* Spring注入
	*********************************************************************************/
	private BaseDao baseDao;
	
	public BaseDao getBaseDao() {
		return baseDao;
	}
	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}
	/*********************************************************************************
	 * Spring注入
	 *********************************************************************************/

	/**
	 * @param map
	 * @return
	 * 根据参数信息
	 */
	public List<Kdd_Info> listKdds(Map<String, String> map){
		List<Object> objects = new ArrayList<Object>();
		List<Kdd_Info> list = new ArrayList<Kdd_Info>();
		String hql = "from " + map.get("model").toString() + " where 1=1";
		if(map.containsKey("uid")){
			hql += " and lururenid="+map.get("uid").toString();
		}
//		hql += " order by id desc";
		objects = baseDao.listObjectsByHql(hql, map);
		for (Object object : objects) {
			Kdd_Info kdd_Info = (Kdd_Info)object;
			list.add(kdd_Info);
		}
		return list;
	}
	/**
	 * @param map
	 * @return
	 * 根据参数信息
	 */
	public List<Kdd_ContactInfo> listKddContactInfo(Map<String, String> map){
		List<Object> objects = new ArrayList<Object>();
		List<Kdd_ContactInfo> list = new ArrayList<Kdd_ContactInfo>();
		String hql = "from " + map.get("model").toString() + " where 1=1 ";
		if(map.containsKey("uid")){
			hql += " and userid="+map.get("uid").toString();
		}
		objects = baseDao.listObjectsByHql(hql, map);
		for (Object object : objects) {
			Kdd_ContactInfo kdd_Info = (Kdd_ContactInfo)object;
			list.add(kdd_Info);
		}
		return list;
	}

	/**
	 * @param map
	 * @return
	 * 根据参数获取数量
	 */
	public int getTotalCount(Map<String, String> map){
		
		String hql = "select count(*) from " + map.get("model").toString() + " where 1=1";
		if(map.containsKey("uid")){
			hql += " and lururenid="+map.get("uid").toString();
		}
		int result = baseDao.getTotalCountByHql(hql, map);
		return result;
	}
	public int getKddContactInfoTotalCount(Map<String, String> map){
		
		String hql = "select count(*) from " + map.get("model").toString() + " where 1=1";
		if(map.containsKey("uid")){
			hql += " and userid="+map.get("uid").toString();
		}
		int result = baseDao.getTotalCountByHql(hql, map);
		return result;
	}
	
	/**
	 * @param object
	 * 保存修改Object
	 */
	public void saveOrUpdate(Object object){
		baseDao.saveOrUpdate(object);
	}
	
	/**
	 * @param object
	 * 删除对象
	 */
	public void deleteObject(Object object){
		baseDao.deleteObject(object);
	}
	
	/**
	 * @param object
	 * 根据uid获取部门信息
	 */
	public Org_Department getDeptmentByUid(String uid) {
		return baseDao.getDeptmentByUid(uid);
	}
	
	/**
	 * @param object
	 * 根据id获取快递单信息
	 */
	public Kdd_Info getKddInfoById(String id) {
		return baseDao.getKddInfoById(id);
	}
	
	/**
	 * @param object
	 * 查询快递单信息
	 */
	public List<Kdd_Info> list_search_Kdds(Map<String, String> map) {
		List<Object> objects = new ArrayList<Object>();
		List<Kdd_Info> list = new ArrayList<Kdd_Info>();
		String hql = "from " + map.get("model").toString() + " where 1=1";
		String status = "-1";
		String search_type = "-1";
		String startDate = "-1";
		String endDate = "-1";
		
		
		Set<String> keys = map.keySet();
		Iterator<String> iterator = keys.iterator();
		while(iterator.hasNext()){
			String key = iterator.next();
			if(key.equals("id") || key.equals("lururenid")){
				hql += " and " +key+ "='" +map.get(key)+ "'";
			}else if(key.equals("status")){
				status = map.get(key);
			}else if(key.equals("status")){
				status = map.get(key);
			}else if(key.equals("search_type")){
				search_type = map.get(key);
			}else if(key.equals("startDate")){
				startDate = map.get(key);
			}else if(key.equals("endDate")){
				endDate = map.get(key);
			}else if(key.equals("first")){
			}else if(key.equals("limit")){
			}else if(key.equals("model")){
			}else{
				hql += " and " +key+ " like '%"+map.get(key) + "%'";
			}
		}
		if(!status.equals("-1")){
			hql += " and status = '" +status+ "'";
		}else{
			/**
			 *快递单的查询类型
			 * kdd_search 		: 表示快单查询页面
			 * kdd_chuandashi   : 表示传达室
			 * kdd_tj_mingxi   	: 表示统计页面,显示具体的明细
			 */
			if(search_type.equals("kdd_search")){
				hql += " and status in(0,1,2,3,4,51,52,53,54,55)";
			}else if(search_type.equals("kdd_chuandashi")){
				hql += " and status in(2,3,4,51,52,53,54,55)";
			}else if(search_type.equals("kdd_tj_mingxi")){
				hql += " and status in(4,51,52,53,54,55)";
			}
		}
		if((search_type.equals("kdd_search") || search_type.equals("kdd_chuandashi")) && !startDate.equals("-1") && !endDate.equals("-1")){
			hql += " and startdate between '"+startDate+"' and '"+endDate+"'";
		}
		if(search_type.equals("kdd_tj_mingxi") && !startDate.equals("-1") && !endDate.equals("-1")){
			hql += " and tongjidate between '"+startDate+"' and '"+endDate+"'";
		}
		hql += " order by id desc";
		System.out.println(hql);
		objects = baseDao.listObjectsByHql(hql, map);
		for (Object object : objects) {
			Kdd_Info kdd_Info = (Kdd_Info)object;
			list.add(kdd_Info);
		}
		return list;
	}
	
	/**
	 * @param object
	 * 查询快递单信息
	 */
	public int getTotalSearchCount(Map<String, String> map) {
		String hql = "select count(*) from " + map.get("model").toString() + " where 1=1";
		String status = "-1";
		String search_type = "-1";
		String startDate = "-1";
		String endDate = "-1";
		
		
		Set<String> keys = map.keySet();
		Iterator<String> iterator = keys.iterator();
		while(iterator.hasNext()){
			String key = iterator.next();
			if(key.equals("id") || key.equals("lururenid")){
				hql += " and " +key+ "='" +map.get(key)+ "'";
			}else if(key.equals("status")){
				status = map.get(key);
			}else if(key.equals("status")){
				status = map.get(key);
			}else if(key.equals("search_type")){
				search_type = map.get(key);
			}else if(key.equals("startDate")){
				startDate = map.get(key);
			}else if(key.equals("endDate")){
				endDate = map.get(key);
			}else if(key.equals("first")){
			}else if(key.equals("limit")){
			}else if(key.equals("model")){
			}else{
				hql += " and " +key+ " like '%"+map.get(key) + "%'";
			}
		}
		if(!status.equals("-1")){
			hql += " and status = '" +status+ "'";
		}else{
			/**
			 *快递单的查询类型
			 * kdd_search 		: 表示快单查询页面
			 * kdd_chuandashi   : 表示传达室
			 * kdd_tj_mingxi   	: 表示统计页面,显示具体的明细
			 */
			if(search_type.equals("kdd_search")){
				hql += " and status in(0,1,2,3,4,51,52,53,54,55)";
			}else if(search_type.equals("kdd_chuandashi")){
				hql += " and status in(2,3,4,51,52,53,54,55)";
			}else if(search_type.equals("kdd_tj_mingxi")){
				hql += " and status in(4,51,52,53,54,55)";
			}
		}
		if((search_type.equals("kdd_search") || search_type.equals("kdd_chuandashi")) && !startDate.equals("-1") && !endDate.equals("-1")){
			hql += " and startdate between '"+startDate+"' and '"+endDate+"'";
		}
		if(search_type.equals("kdd_tj_mingxi") && !startDate.equals("-1") && !endDate.equals("-1")){
			hql += " and tongjidate between '"+startDate+"' and '"+endDate+"'";
		}
		System.out.println(hql);
		int result = baseDao.getTotalCountByHql(hql, map);
		return result;
	}
	
	/**
	 * @param object
	 * 查询报表信息
	 */
	public List<Kdd_Report> list_report_Kdds(Map<String, String> map) {
		
		List<Object[]> list = baseDao.list_report_Kdds(map);

		
		List<Kdd_Report> kdd_Reports = new ArrayList<Kdd_Report>();
		Map<String, Map<String, String>> map_result = new HashMap<String, Map<String,String>>();
		Kdd_Report heji = new Kdd_Report();
		heji.setKddType("合计:");
		heji.setType1("本人签收");
		heji.setType2("拒收");
		heji.setType3("代收");
		heji.setType4("地址不详");
		heji.setType5("其他");
		heji.setType6("已发送");
		heji.setSum1("0");
		heji.setSum2("0");
		heji.setSum3("0");
		heji.setSum4("0");
		heji.setSum5("0");
		heji.setSum6("0");
		
		Kdd_Report zongji = new Kdd_Report();
		zongji.setKddType("总计:");
		zongji.setType1("0");

		
		for (Object[] arr : list) {
			Map<String, String> type_value_map = new HashMap<String, String>();
			
			String type = arr[0].toString();
			String status = arr[1].toString();
			String count = arr[2].toString();
			if(map_result.containsKey(type)){
				type_value_map = map_result.get(type);
				if(type_value_map == null){
					type_value_map = new HashMap<String, String>();
				}
			}
			type_value_map.put(status, count);
			map_result.put(type, type_value_map);
		}
		Set<String> keys = map_result.keySet();
		Iterator<String> iterator = keys.iterator(); 
		while(iterator.hasNext()){
			String key = iterator.next();
			
			Kdd_Report kdd_Report = new Kdd_Report();
			if(key.equals("1")){
				kdd_Report.setKddType(SysUtil.getProperty("kdd_type1"));
			}else if(key.equals("2")){
				kdd_Report.setKddType(SysUtil.getProperty("kdd_type2"));
			}else if(key.equals("3")){
				kdd_Report.setKddType(SysUtil.getProperty("kdd_type3"));
			} 
			
			kdd_Report.setType1("本人签收");
			kdd_Report.setType2("拒绝");
			kdd_Report.setType3("代收");
			kdd_Report.setType4("地址不详");
			kdd_Report.setType5("其他");
			kdd_Report.setType6("已发送");
			kdd_Report.setSum1("0");
			kdd_Report.setSum2("0");
			kdd_Report.setSum3("0");
			kdd_Report.setSum4("0");
			kdd_Report.setSum5("0");
			kdd_Report.setSum6("0");
			
			
			Map<String, String> tmp = map_result.get(key);
			if(tmp != null){
				if(tmp.containsKey("51")){
					kdd_Report.setSum1(tmp.get("51"));
				}
				if(tmp.containsKey("52")){
					kdd_Report.setSum2(tmp.get("52"));
				}
				if(tmp.containsKey("53")){
					kdd_Report.setSum3(tmp.get("53"));
				}
				if(tmp.containsKey("54")){
					kdd_Report.setSum4(tmp.get("54"));
				}
				if(tmp.containsKey("55")){
					kdd_Report.setSum5(tmp.get("55"));
				}
				if(tmp.containsKey("4")){
					kdd_Report.setSum6(tmp.get("4"));
				}
			}
			kdd_Reports.add(kdd_Report);
			int sum1 = Integer.valueOf(Integer.valueOf(heji.getSum1()) + Integer.valueOf(kdd_Report.getSum1()));
			heji.setSum1(sum1+"");
			int sum2 = Integer.valueOf(Integer.valueOf(heji.getSum2()) + Integer.valueOf(kdd_Report.getSum2()));
			heji.setSum2(sum2+"");
			int sum3 = Integer.valueOf(Integer.valueOf(heji.getSum3()) + Integer.valueOf(kdd_Report.getSum3()));
			heji.setSum3(sum3+"");
			int sum4 = Integer.valueOf(Integer.valueOf(heji.getSum4()) + Integer.valueOf(kdd_Report.getSum4()));
			heji.setSum4(sum4+"");
			int sum5 = Integer.valueOf(Integer.valueOf(heji.getSum5()) + Integer.valueOf(kdd_Report.getSum5()));
			heji.setSum5(sum5+"");
			int sum6 = Integer.valueOf(Integer.valueOf(heji.getSum6()) + Integer.valueOf(kdd_Report.getSum6()));
			heji.setSum6(sum6+"");
			
		}
		kdd_Reports.add(heji);
		int zjSum = Integer.valueOf(heji.getSum1()) 
				+ Integer.valueOf(heji.getSum2()) +
				+ Integer.valueOf(heji.getSum3()) +
				+ Integer.valueOf(heji.getSum4()) +
				+ Integer.valueOf(heji.getSum5()) +
				+ Integer.valueOf(heji.getSum6());
		zongji.setType1(zjSum+"");
		kdd_Reports.add(zongji);
		return kdd_Reports;
	}
	
	/**
	 * @param tiaoxingma
	 * @return
	 * 根据条形码获取快递单信息
	 */
	public Kdd_Info getKddInfoByTXM(String tiaoxingma) {
		return baseDao.getKddInfoByTXM(tiaoxingma);
	}
}
