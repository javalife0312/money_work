package com.an.model;

/**
 * Topicinfo entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Topicinfo implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 
	 */
	private Integer id;
	private String topicnum;//题号1,2，
	private String topic;
	private String optiona;
	private String optionb;
	private String optionc;
	private String optiond;
	private String asnum;
	private String isfour;
	private String remark;
	private String cnum;//所属类别编号，即简称
	private Integer cid;//所属类别id

	// Constructors
	public Topicinfo() {
		super();
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTopic() {
		return this.topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public String getTopicnum() {
		return topicnum;
	}

	public void setTopicnum(String topicnum) {
		this.topicnum = topicnum;
	}

	public String getCnum() {
		return this.cnum;
	}

	public void setCnum(String cnum) {
		this.cnum = cnum;
	}

	public String getOptiona() {
		return this.optiona;
	}

	public void setOptiona(String optiona) {
		this.optiona = optiona;
	}

	public String getOptionb() {
		return optionb;
	}

	public void setOptionb(String optionb) {
		this.optionb = optionb;
	}

	public String getOptionc() {
		return this.optionc;
	}

	public void setOptionc(String optionc) {
		this.optionc = optionc;
	}

	public String getOptiond() {
		return this.optiond;
	}

	public void setOptiond(String optiond) {
		this.optiond = optiond;
	}

	public String getAsnum() {
		return this.asnum;
	}

	public void setAsnum(String asnum) {
		this.asnum = asnum;
	}

	public String getIsfour() {
		return this.isfour;
	}

	public void setIsfour(String isfour) {
		this.isfour = isfour;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getCid() {
		return cid;
	}

	public void setCid(Integer cid) {
		this.cid = cid;
	}


}