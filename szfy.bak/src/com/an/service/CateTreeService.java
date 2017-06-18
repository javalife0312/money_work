package com.an.service;

import java.util.List;

import com.an.model.Categoryinfo;


public interface CateTreeService {
	
	/**
	 * @param node
	 * @return
	 * 根据父节点得到所有的孩子节点
	 */
	public List<Categoryinfo> listNodesByParent(String node);

	/**
	 * @param node
	 * @return
	 * 检测该节点下是否有孩子节点
	 */
	public boolean hasChild(String node);
	
	/**
	 * @param id
	 * @return
	 * 根据父节点id列出所有其子节点的数量
	 */
	public int listNodesByParentCount(int id);

	/**
	 * @param id
	 * @return
	 * 根据父节点id列出所有其子节点 分页查询
	 */
	public List<Categoryinfo> listNodesByParent(int first, int limit,int id);

	/**
	 * @param id
	 * @return
	 * 类名的添加、修改
	 */
	public void saveOrUpdateCates(Categoryinfo cate);

	/**
	 * @param id
	 * @return
	 * 根据id 查类名信息
	 */
	public List<Categoryinfo> getCateListById(int id);

	/**
	 * @param id
	 * @return
	 * 类名信息 删除
	 */
	public void delCatesById(int id);

}
