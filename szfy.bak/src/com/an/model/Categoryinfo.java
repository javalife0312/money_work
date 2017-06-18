package com.an.model;

/**
 * Categoryinfo entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Categoryinfo implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String catenum;
	private String catename;
	private Integer fatherid;
	private String remark;

	
	// Property accessors

	public Categoryinfo() {
		super();
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCatenum() {
		return this.catenum;
	}

	public void setCatenum(String catenum) {
		this.catenum = catenum;
	}

	public String getCatename() {
		return this.catename;
	}

	public void setCatename(String catename) {
		this.catename = catename;
	}

	public Integer getFatherid() {
		return fatherid;
	}

	public void setFatherid(Integer fatherid) {
		this.fatherid = fatherid;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}