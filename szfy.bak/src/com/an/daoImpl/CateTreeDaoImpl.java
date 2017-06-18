package com.an.daoImpl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;

import com.an.dao.CateTreeDao;
import com.an.model.Categoryinfo;
import com.an.model.Topicinfo;


public class CateTreeDaoImpl implements CateTreeDao {
	
	private HibernateTemplate hibernateTemplate;
	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}

	/**
	 * @param id
	 * @return
	 * 根据父节点得到所有的孩子节点
	 */
	@SuppressWarnings("unchecked")
	public List<Categoryinfo> listNodesByParent(String id) {
		List<Categoryinfo> list = null;
		try {
			String hql = "from Categoryinfo where fatherid = " + id;
			list = hibernateTemplate.find(hql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * @param id
	 * @return
	 * 判断父节点是否有孩子节点
	 */
	@SuppressWarnings("unchecked")
	public boolean hasChild(String id) {
		boolean leaf = true;
		List<Categoryinfo> list = null;
		try {
			String hql = "from Categoryinfo where fatherid = " + id;
			list = hibernateTemplate.find(hql);
			if(list != null && list.size() > 0) {
				leaf = false;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return leaf;
	}
	

	/**
	 * @param id
	 * @return
	 * 根据父节点id列出所有其子节点的数量
	 */
	@SuppressWarnings("unchecked")
	public int listNodesByParentCount(int id) {
		int count = 0;
		try {
			String hql = "select count(id) from Categoryinfo where fatherid = " + id;
			count = Integer.parseInt(hibernateTemplate.find(hql).get(0).toString()) ;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}
	
	/**
	 * @param id
	 * @return
	 * 根据父节点id列出所有其子节点 分页查询
	 */
	@SuppressWarnings("unchecked")
	public List<Categoryinfo> listNodesByParent(final int first, final int limit, final int id) {
		List<Categoryinfo> list = null;
		try {
			list = hibernateTemplate.executeFind(new HibernateCallback<Topicinfo>(){

				public Topicinfo doInHibernate(Session session)
						throws HibernateException, SQLException {
					String hql = "from Categoryinfo where fatherid = " +id;
					Query query = session.createQuery(hql);
					query.setFirstResult(first);
					query.setMaxResults(limit);
					return null;
				}
				
			});
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	/**
	 * @param id
	 * @return
	 * 类名的添加、修改
	 */
	@SuppressWarnings("unchecked")
	public void saveOrUpdateCates(final Categoryinfo cate) {
		try {
			hibernateTemplate.saveOrUpdate(cate);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @param id
	 * @return
	 * 根据id 查类名信息
	 */
	@SuppressWarnings("unchecked")
	public List<Categoryinfo> getCateListById(final int id) {
		List<Categoryinfo> list = new ArrayList<Categoryinfo>();
		try {
			String hql = "from Categoryinfo where id = " +id;
			list = hibernateTemplate.find(hql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * @param id
	 * @return
	 * 类名信息 删除
	 */
	@SuppressWarnings("unchecked")
	public void delCatesById(final int id) {
		try {
			List<Categoryinfo> list = getCateListById(id); //根据id查询要删除的类名信息
			hibernateTemplate.deleteAll(list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
