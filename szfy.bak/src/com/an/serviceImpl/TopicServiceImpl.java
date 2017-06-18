package com.an.serviceImpl;

import java.util.List;

import com.an.dao.TopicDao;
import com.an.model.Topicinfo;
import com.an.service.TopicService;

public class TopicServiceImpl implements TopicService {

	private TopicDao topicDao;

	public TopicDao getTopicDao() {
		return topicDao;
	}

	public void setTopicDao(TopicDao topicDao) {
		this.topicDao = topicDao;
	}

	public void deltopicById(int id) {
		topicDao.deltopicById(id);
	}

	public List<Topicinfo> getTopicListById(int id) {
		return topicDao.getTopicListById(id);
	}

	public List<Topicinfo> listNodesByCid(int cid) {
		return topicDao.listNodesByCid(cid);
	}

	public List<Topicinfo> listNodesByCid(int first, int limit, int cid) {
		return topicDao.listNodesByCid(first, limit, cid);
	}

	public int listNodesByCidCount(int cid) {
		return topicDao.listNodesByCidCount(cid);
	}

	public void saveOrUpdateTopic(Topicinfo topic) {
		topicDao.saveOrUpdateTopic(topic);
	}
	
	
}
