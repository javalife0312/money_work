package com.an.daoImpl;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;

import com.an.dao.TopicDao;
import com.an.model.Topicinfo;

public class TopicDaoImpl implements TopicDao {

	private HibernateTemplate hibernateTemplate;

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}

	/**
	 * @param cid
	 * @return
	 * 根据类别ID得到所有的孩子节点
	 */
	@SuppressWarnings("unchecked")
	public List<Topicinfo> listNodesByCid(int cid){
		List<Topicinfo> list = null;
		try {
			String hql = "from Topicinfo where cid = " + cid;
			list = hibernateTemplate.find(hql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * @param cid
	 * @return
	 * 根据类别ID列出所有其子节点的数量
	 */
	public int listNodesByCidCount(int cid){
		int count = 0;
		try {
			String hql = "select count(id) from Topicinfo where cid = " + cid;
			count = Integer.parseInt(hibernateTemplate.find(hql).get(0).toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}

	/**
	 * @param cid
	 * @return
	 * 根据类别ID列出所有其子节点 分页查询
	 */
	@SuppressWarnings("unchecked")
	public List<Topicinfo> listNodesByCid(final int first, final int limit,int cid){
		List<Topicinfo> list = null;
		try {
			final String hql = "from Topicinfo where cid = " + cid;
			list = hibernateTemplate.executeFind(new HibernateCallback<Topicinfo>(){

				public Topicinfo doInHibernate(Session session)
						throws HibernateException, SQLException {
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
	 * @param topic
	 * @return
	 * 添加、修改
	 */
	public void saveOrUpdateTopic(Topicinfo topic){
		try {
			hibernateTemplate.saveOrUpdate(topic);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @param id
	 * @return
	 * 根据id 查信息
	 */
	@SuppressWarnings("unchecked")
	public List<Topicinfo> getTopicListById(int id){
		List<Topicinfo> list = null;
		try {
			String hql = "from Topicinfo where id = " + id;
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
	public void deltopicById(int id){
		try {
			List<Topicinfo> list = getTopicListById(id);//根据id查询要删除的信息
			hibernateTemplate.deleteAll(list);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
