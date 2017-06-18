package com.an.serviceImpl;

import java.util.List;

import com.an.dao.CateTreeDao;
import com.an.model.Categoryinfo;
import com.an.service.CateTreeService;

public class CateTreeServiceImpl implements CateTreeService {
	
	private CateTreeDao cateTreeDao;

	public CateTreeDao getCateTreeDao() {
		return cateTreeDao;
	}

	public void setCateTreeDao(CateTreeDao cateTreeDao) {
		this.cateTreeDao = cateTreeDao;
	}

	/**
	 * @param node
	 * @return
	 * 根据父节点得到所有的孩子节点
	 */
	public List<Categoryinfo> listNodesByParent(String node) {
		return cateTreeDao.listNodesByParent(node);
	}
	
	/**
	 * @param node
	 * @return
	 * 检测该节点下是否有孩子节点
	 */
	public boolean hasChild(String node) {
		return cateTreeDao.hasChild(node);
	}

	public int listNodesByParentCount(int id) {
		return cateTreeDao.listNodesByParentCount(id);
	}

	public List<Categoryinfo> listNodesByParent(int first, int limit,
			int id) {
		return cateTreeDao.listNodesByParent(first,limit,id);
	}

	public void saveOrUpdateCates(Categoryinfo cate) {
		cateTreeDao.saveOrUpdateCates(cate);
	}

	public List<Categoryinfo> getCateListById(int id) {
		return cateTreeDao.getCateListById(id);
	}

	public void delCatesById(int id) {
		cateTreeDao.delCatesById(id);
		
	}




}
