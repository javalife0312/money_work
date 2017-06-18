package com.an.util;

import org.springframework.orm.hibernate3.HibernateTemplate;

public class SysUtil {
	
	private HibernateTemplate hibernateTemplate;
	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}
	
	
	public boolean isCodeExit(String code,String ModelName,String column){
		boolean flag = true;
		try {
			String hql = "select count(id) from " + ModelName + " where " + column + " = '" + code + "'";
			String count = hibernateTemplate.find(hql).get(0).toString();
			if(Integer.parseInt(count) == 0){
				flag = false;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}
	

}
