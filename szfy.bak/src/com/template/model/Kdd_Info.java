package com.template.model;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Administrator
 * 快递单-京城-市内
 */
@Entity
@Table(name="ls3x_kdd_info")
public class Kdd_Info implements Serializable {

	private static final long serialVersionUID = 6546492416114700066L;
	
	@Id
	@GeneratedValue
	private int id;								//快递单编号
	//通用属性
	private String jijianren_xingming;			//寄件人_姓名                           
	private String jijianren_shouji;			//寄件人_手机
	private String jijianren_danwei;			//寄件人_单位名称
    private String jijianren_dizhi;			 	//寄件人_地址
    private String jijianren_youbian;			//寄件人_邮编
    private String jiaojiren_qianming;			//交寄人_签名
    private String shoujianren_xingming;		//收件人_姓名
    private String shoujianren_shouji;			//收件人_手机
    private String shoujianren_danwei;			//收件人_单位名称
    private String shoujianren_dizhi;			//收件人_地址(输入十个字自动换行)
    private String shoujianren_youbian;			//收件人_邮编
    private String tiaoxingma;					//快递单的条形码
    private int funei_fuwai;					//司法专邮有阜内阜外
    private String kdd_mark;					//快递单备注信息
   
	//京城市内-司法专邮
    private String jingbanren_qianming;			//经办人_签名
    //司法专邮
    private String wenjianmingcheng;			//文件名称
    private String anhao;						//案号
    private String wenshumingcheng;				//文书名勾选)
    private String beizhuxinxi;					//备注信息
    private String chuanpiaoxinxi;				//传票信息
    
    private String youjuren_qianming;			//邮局人签名
    
    //辅助信息
    private int type;							//快递单类型:EMS市内-1 、EMS市外-2 、EMS司法专邮-3
    private double price;						//价格
    private int status;							//快递单状态 1:录入,2:修改
    private String huizhistatus;				//回执的备注信息
    
    private int lururenid;						//录入人id
    private String lururenDeptName;				//录入人部门名称
    private String lururenDeptId;				//录入人部门id
    private	int	dayinrenid;						//打印人id
    private int	huizhirenid;					//回执人id
    private String startdate;					//录入时间
    private String tongjidate;					//邮件发送时间,作为统计的时间,按日
    private String tongjimonth;					//邮件发送时间,作为统计的时间,按月
    private String enddate;						//回执单录入完毕时间
    
    private String baojiajiage;					//类型1的保价价格
    private String daishouhuokuan;				//类型1的代收货款
    
    public String getBaojiajiage() {
		return baojiajiage;
	}
	public void setBaojiajiage(String baojiajiage) {
		this.baojiajiage = baojiajiage;
	}
	public String getDaishouhuokuan() {
		return daishouhuokuan;
	}
	public void setDaishouhuokuan(String daishouhuokuan) {
		this.daishouhuokuan = daishouhuokuan;
	}
	public int getFunei_fuwai() {
    	return funei_fuwai;
    }
    public void setFunei_fuwai(int funei_fuwai) {
    	this.funei_fuwai = funei_fuwai;
    }
    public String getKdd_mark() {
    	return kdd_mark;
    }
    public void setKdd_mark(String kdd_mark) {
    	this.kdd_mark = kdd_mark;
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
	public String getJiaojiren_qianming() {
		return jiaojiren_qianming;
	}
	public void setJiaojiren_qianming(String jiaojiren_qianming) {
		this.jiaojiren_qianming = jiaojiren_qianming;
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
	public String getAnhao() {
		return anhao;
	}
	public void setAnhao(String anhao) {
		this.anhao = anhao;
	}
	public String getWenshumingcheng() {
		return wenshumingcheng;
	}
	public void setWenshumingcheng(String wenshumingcheng) {
		this.wenshumingcheng = wenshumingcheng;
	}
	public String getBeizhuxinxi() {
		return beizhuxinxi;
	}
	public void setBeizhuxinxi(String beizhuxinxi) {
		this.beizhuxinxi = beizhuxinxi;
	}
	public String getChuanpiaoxinxi() {
		return chuanpiaoxinxi;
	}
	public void setChuanpiaoxinxi(String chuanpiaoxinxi) {
		this.chuanpiaoxinxi = chuanpiaoxinxi;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getLururenid() {
		return lururenid;
	}
	public void setLururenid(int lururenid) {
		this.lururenid = lururenid;
	}
	public int getDayinrenid() {
		return dayinrenid;
	}
	public void setDayinrenid(int dayinrenid) {
		this.dayinrenid = dayinrenid;
	}
	public int getHuizhirenid() {
		return huizhirenid;
	}
	public void setHuizhirenid(int huizhirenid) {
		this.huizhirenid = huizhirenid;
	}
	public String getStartdate() {
		return startdate;
	}
	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}
	public String getEnddate() {
		return enddate;
	}
	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}
	public String getTiaoxingma() {
		return tiaoxingma;
	}
	public void setTiaoxingma(String tiaoxingma) {
		this.tiaoxingma = tiaoxingma;
	}
	public String getHuizhistatus() {
		return huizhistatus;
	}
	public void setHuizhistatus(String huizhistatus) {
		this.huizhistatus = huizhistatus;
	}
	public String getLururenDeptName() {
		return lururenDeptName;
	}
	public void setLururenDeptName(String lururenDeptName) {
		this.lururenDeptName = lururenDeptName;
	}
	public String getTongjidate() {
		return tongjidate;
	}
	public void setTongjidate(String tongjidate) {
		this.tongjidate = tongjidate;
	}
	public String getLururenDeptId() {
		return lururenDeptId;
	}
	public void setLururenDeptId(String lururenDeptId) {
		this.lururenDeptId = lururenDeptId;
	}
	public String getYoujuren_qianming() {
		return youjuren_qianming;
	}
	public void setYoujuren_qianming(String youjuren_qianming) {
		this.youjuren_qianming = youjuren_qianming;
	}
	public String getTongjimonth() {
		return tongjimonth;
	}
	public void setTongjimonth(String tongjimonth) {
		this.tongjimonth = tongjimonth;
	}
    
    
}
