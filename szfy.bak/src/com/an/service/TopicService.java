package com.an.service;

import java.util.List;

import com.an.model.Topicinfo;

public interface TopicService {

	/**
	 * @param cid
	 * @return
	 * 根据类别ID得到所有的孩子节点
	 */
	public List<Topicinfo> listNodesByCid(int cid);
	
	/**
	 * @param cid
	 * @return
	 * 根据类别ID列出所有其子节点的数量
	 */
	public int listNodesByCidCount(int cid);

	/**
	 * @param cid
	 * @return
	 * 根据类别ID列出所有其子节点 分页查询
	 */
	public List<Topicinfo> listNodesByCid(int first, int limit,int cid);

	/**
	 * @param topic
	 * @return
	 * 添加、修改
	 */
	public void saveOrUpdateTopic(Topicinfo topic);

	/**
	 * @param id
	 * @return
	 * 根据id 查信息
	 */
	public List<Topicinfo> getTopicListById(int id);

	/**
	 * @param id
	 * @return
	 * 类名信息 删除
	 */
	public void deltopicById(int id);
}
