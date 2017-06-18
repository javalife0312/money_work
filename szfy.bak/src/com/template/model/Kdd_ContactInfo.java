package com.template.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="ls3x_kdd_contactinfo")
public class Kdd_ContactInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private int id;
	private String jijianren_xingming;			//寄件人_姓名                           
	private String jijianren_shouji;			//寄件人_手机
	private String jijianren_danwei;			//寄件人_单位名称
    private String jijianren_dizhi;			 	//寄件人_地址
    private String jijianren_youbian;			//寄件人_邮编
    private String shoujianren_xingming;		//收件人_姓名
    private String shoujianren_shouji;			//收件人_手机
    private String shoujianren_danwei;			//收件人_单位名称
    private String shoujianren_dizhi;			//收件人_地址(输入十个字自动换行)
    private String shoujianren_youbian;			//收件人_邮编
    private int userid;							//用户的ID
    
    private String jiaojiren_qianming;			//交寄人_签名
    private String jingbanren_qianming;			//经办人_签名
    private String wenjianmingcheng;			//文件/内件名称
    private String beizhuxinxi;					//案件-备注信息
    private String chuanpiaoxinxi;				//传票信息
    

	public String getChuanpiaoxinxi() {
		return chuanpiaoxinxi;
	}

	public void setChuanpiaoxinxi(String chuanpiaoxinxi) {
		this.chuanpiaoxinxi = chuanpiaoxinxi;
	}

	public String getJiaojiren_qianming() {
		return jiaojiren_qianming;
	}

	public void setJiaojiren_qianming(String jiaojiren_qianming) {
		this.jiaojiren_qianming = jiaojiren_qianming;
	}

	public String getJingbanren_qianming() {
		return jingbanren_qianming;
	}

	public void setJingbanren_qianming(String jingbanren_qianming) {
		this.jingbanren_qianming = jingbanren_qianming;
	}

	public String getWenjianmingcheng() {
		return wenjianmingcheng;
	}

	public void setWenjianmingcheng(String wenjianmingcheng) {
		this.wenjianmingcheng = wenjianmingcheng;
	}

	public String getBeizhuxinxi() {
		return beizhuxinxi;
	}

	public void setBeizhuxinxi(String beizhuxinxi) {
		this.beizhuxinxi = beizhuxinxi;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getJijianren_xingming() {
		return jijianren_xingming;
	}

	public void setJijianren_xingming(String jijianren_xingming) {
		this.jijianren_xingming = jijianren_xingming;
	}

	public String getJijianren_shouji() {
		return jijianren_shouji;
	}

	public void setJijianren_shouji(String jijianren_shouji) {
		this.jijianren_shouji = jijianren_shouji;
	}

	public String getJijianren_danwei() {
		return jijianren_danwei;
	}

	public void setJijianren_danwei(String jijianren_danwei) {
		this.jijianren_danwei = jijianren_danwei;
	}

	public String getJijianren_dizhi() {
		return jijianren_dizhi;
	}

	public void setJijianren_dizhi(String jijianren_dizhi) {
		this.jijianren_dizhi = jijianren_dizhi;
	}

	public String getJijianren_youbian() {
		return jijianren_youbian;
	}

	public void setJijianren_youbian(String jijianren_youbian) {
		this.jijianren_youbian = jijianren_youbian;
	}

	public String getShoujianren_xingming() {
		return shoujianren_xingming;
	}

	public void setShoujianren_xingming(String shoujianren_xingming) {
		this.shoujianren_xingming = shoujianren_xingming;
	}

	public String getShoujianren_shouji() {
		return shoujianren_shouji;
	}

	public void setShoujianren_shouji(String shoujianren_shouji) {
		this.shoujianren_shouji = shoujianren_shouji;
	}

	public String getShoujianren_danwei() {
		return shoujianren_danwei;
	}

	public void setShoujianren_danwei(String shoujianren_danwei) {
		this.shoujianren_danwei = shoujianren_danwei;
	}

	public String getShoujianren_dizhi() {
		return shoujianren_dizhi;
	}

	public void setShoujianren_dizhi(String shoujianren_dizhi) {
		this.shoujianren_dizhi = shoujianren_dizhi;
	}

	public String getShoujianren_youbian() {
		return shoujianren_youbian;
	}

	public void setShoujianren_youbian(String shoujianren_youbian) {
		this.shoujianren_youbian = shoujianren_youbian;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}
    
    
}
