//package com.template.action;
//
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.InputStream;
//import java.io.PrintWriter;
//import java.text.SimpleDateFormat;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import net.sf.json.JSONObject;
//
//import org.apache.commons.io.FileUtils;
//import org.apache.poi.hssf.usermodel.HSSFSheet;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.poifs.filesystem.POIFSFileSystem;
//import org.apache.poi.ss.usermodel.Row;
//import org.apache.struts2.ServletActionContext;
//
//import com.opensymphony.xwork2.ActionSupport;
//import com.template.model.Kdd_Info;
//import com.template.model.Org_Department;
//import com.template.service.KddInfoService;
//import com.template.util.SysUtil;
//import com.template.util.Type;
//
//public class UploadAction extends ActionSupport {
//
//	private static final long serialVersionUID = -8066307209543067006L;
//	public HttpServletResponse response = ServletActionContext.getResponse();
//	private HttpServletRequest request = ServletActionContext.getRequest();
//
//	private KddInfoService kddInfoService;
//	public KddInfoService getKddInfoService() {
//		return kddInfoService;
//	}
//	public void setKddInfoService(KddInfoService kddInfoService) {
//		this.kddInfoService = kddInfoService;
//	}
//
//
//	private File urlName;
//	private SysUtil sysUtil;
//	public File getUrlName() {
//		return urlName;
//	}
//
//	public void setUrlName(File urlName) {
//		this.urlName = urlName;
//	}
//	public SysUtil getSysUtil() {
//		return sysUtil;
//	}
//	public void setSysUtil(SysUtil sysUtil) {
//		this.sysUtil = sysUtil;
//	}
//
//	/**
//	 * 上传用户信息
//	 */
//	public void upload() {
//		String userid = Type.getString(request.getSession().getAttribute("uid"));
//		String kdd_upload_type = request.getParameter("kdd_upload_type");
//
//		Map<String, Object> map = new HashMap<String, Object>();
//		InputStream inputStream = null;
//		// 上传文件
//		String upload_path = SysUtil.getProperty("upload_path");
//		String opt_upload_file = upload_path + "/" + "upload_usr_"+System.currentTimeMillis()+".xls";
//		try {
//			FileUtils.copyFile(urlName, new File(opt_upload_file));
//			inputStream = new FileInputStream(new File(opt_upload_file));
//			POIFSFileSystem fs = new POIFSFileSystem(inputStream);
//			HSSFWorkbook wb = new HSSFWorkbook(fs);
//			HSSFSheet sheet = wb.getSheetAt(0);
//			if(kdd_upload_type.equals("3") || kdd_upload_type.equals("2")){//司法专邮
//				for(int i=1;i<sheet.getLastRowNum();i++){
//					Row row = sheet.getRow(i);
//					if(row==null || row.getLastCellNum()!=22){
//						continue;
//					}
//					Kdd_Info kdd_inof = upload_generateKDD(row,userid,kdd_upload_type);
//					kddInfoService.saveOrUpdate(kdd_inof);
//				}
//			}else if(kdd_upload_type.equals("1")){
//				for(int i=1;i<sheet.getLastRowNum();i++){
//					Row row = sheet.getRow(i);
//					if(row==null || row.getLastCellNum()!=20){
//						continue;
//					}
//					Kdd_Info kdd_inof = upload_generateKDD(row,userid,kdd_upload_type);
//					kddInfoService.saveOrUpdate(kdd_inof);
//				}
//			}
//			inputStream.close();
//			map.put("success", true);
//			System.out.println(map);
//			String json = JSONObject.fromObject(map).toString();
//			PrintWriter writer = response.getWriter();
//			writer.print(json);
//			writer.flush();
//		} catch (Exception e) {
//			map.put("success", false);
//			e.printStackTrace();
//		}
//	}
//
//	private String getJiage(String value){
//		String[] result = {"0","0","0","0","0"};
//		try{
//			int tmp = (int) Double.parseDouble(value);
//			String tmpStr = tmp+"";
//			if(tmp>0){
//				result[4] = (tmpStr).substring(tmpStr.length()-1,tmpStr.length());
//			}
//			if(tmp>=10){
//				result[3] = (tmpStr).substring(tmpStr.length()-2,tmpStr.length()-1);
//			}
//			if(tmp>=100){
//				result[2] = (tmpStr).substring(tmpStr.length()-3,tmpStr.length()-2);
//			}
//			if(tmp>=1000){
//				result[1] = (tmpStr).substring(tmpStr.length()-4,tmpStr.length()-3);
//			}
//			if(tmp>=10000){
//				result[0] = (tmpStr).substring(0,tmpStr.length()-4);
//			}
//		}catch (Exception e){
//			e.printStackTrace();
//		}
//		return result[0]+","+result[1]+","+result[2]+","+result[3]+","+result[4];
//	}
//
//
//
//	/**
//	 * 使用上传的方式录入快递单
//	 */
//	private Kdd_Info upload_generateKDD(Row row,String userid,String kdd_upload_type){
//
//		//通用属性
//		String jijianren_xingming = row.getCell(0).toString();			//寄件人_姓名
//		String jijianren_zuoji = row.getCell(1).toString();				//寄件人_座机
//		String jijianren_phone = row.getCell(2).toString();				//寄件人_移动手机
//		String jijianren_shouji = jijianren_phone+","+jijianren_zuoji;  //寄件人_手机
//		String jijianren_danwei = row.getCell(3).toString();		    //寄件人_单位名称
//	    String jijianren_dizhi = row.getCell(4).toString();			 	//寄件人_地址
//	    String jijianren_youbian = row.getCell(5).toString();			//寄件人_邮编
//
//	    String shoujianren_xingming = row.getCell(6).toString();		//收件人_姓名
//	    String shoujianren_guhua_home = row.getCell(7).toString();			//收件人_座机
//		String shoujianren_guhua_work = row.getCell(8).toString();			//收件人_座机
//		String shoujianren_phone = row.getCell(9).toString();			//收件人_移动手机
//		String shoujianren_shouji = shoujianren_guhua_home+","+shoujianren_guhua_work+","+shoujianren_phone;	//收件人_手机
//		String shoujianren_danwei = row.getCell(10).toString();			//收件人_单位名称
//	    String shoujianren_dizhi = row.getCell(11).toString();				//收件人_地址(输入十个字自动换行)
//	    String shoujianren_youbian = row.getCell(12).toString();			//收件人_邮编
//
//	    String jiaojiren_qianming = row.getCell(13).toString();			//交寄人_签名
//	    String jingbanren_qianming = row.getCell(14).toString();			//经办人_签名
//
//	    String wenjianmingcheng = row.getCell(15).toString();				//文件名称
//		String wenshumingcheng = "0";										//文书名勾选
//		String beizhuxinxi = row.getCell(16).toString();					//备注信息称
//
//	    String chuanpiaoxinxi = row.getCell(17).toString();				//传票信息
//
//		String anhao = "";
//		String funei_fuwai = "0";
//		if(kdd_upload_type.equals("2") || kdd_upload_type.equals("3")){ // 司法专邮 & 京城市内
//			String anhao1 = row.getCell(18).toString();						//案号1
//			String anhao2 = row.getCell(19).toString();						//案号1
//			String anhao3= row.getCell(20).toString();						//案号1
//			anhao = anhao1+","+anhao2+","+anhao3;
//			funei_fuwai = row.getCell(21).toString();				//阜内阜外
//			if(funei_fuwai != null){
//				if(funei_fuwai.equals("内阜")){
//					funei_fuwai = "1";
//				}
//				if(funei_fuwai.equals("外阜")){
//					funei_fuwai = "2";
//				}
//			}
//		}
//		String baojiajiage = "0,0,0,0,0";
//		String daishouhuokuan = "0,0,0,0,0";
//		if(kdd_upload_type.equals("1")){ // 国内市外
//			String excel_baojiajiage = row.getCell(18).toString();				//保价价格
//			String excel_daishouhuokuan = row.getCell(19).toString();				//代收货款
//			baojiajiage = getJiage(excel_baojiajiage);
//			daishouhuokuan = getJiage(excel_daishouhuokuan);
//		}
//
//	    //辅助信息
//	    String status = "2";									//快递单状态
//
//		Kdd_Info kdd_Info = new Kdd_Info();
//
//		kdd_Info.setStartdate(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
//		kdd_Info.setStatus(Integer.valueOf(status));
//		kdd_Info.setJijianren_xingming(jijianren_xingming);
//		kdd_Info.setJijianren_shouji(jijianren_shouji);
//		kdd_Info.setJijianren_danwei(jijianren_danwei);
//		kdd_Info.setJijianren_dizhi(jijianren_dizhi);
//		kdd_Info.setJijianren_youbian(jijianren_youbian);
//		kdd_Info.setShoujianren_xingming(shoujianren_xingming);
//		kdd_Info.setShoujianren_shouji(shoujianren_shouji);
//		kdd_Info.setShoujianren_danwei(shoujianren_danwei);
//		kdd_Info.setShoujianren_dizhi(shoujianren_dizhi);
//		kdd_Info.setShoujianren_youbian(shoujianren_youbian);
//
//		kdd_Info.setJiaojiren_qianming(jiaojiren_qianming);
//
//		//快递单类型:EMS市内-1 、EMS市外-2 、EMS司法专邮-3
//		String type = kdd_upload_type;
//		kdd_Info.setType(Type.GetInt(type));
//		kdd_Info.setJingbanren_qianming(jingbanren_qianming);
//		if(type.equals("2") || type.equals("3")){
//			kdd_Info.setFunei_fuwai(Integer.valueOf(funei_fuwai));
//		}else if(type.equals("1")){
//			kdd_Info.setFunei_fuwai(0);
//		}
//		if(type.equals("1")){
//			kdd_Info.setPrice(10);
//		}
//		if(type.equals("2")){
//			kdd_Info.setPrice(20);
//		}
//		if(type.equals("3")){
//			kdd_Info.setPrice(30);
//		}
//
//		kdd_Info.setWenjianmingcheng(Type.getString(wenjianmingcheng));
//		kdd_Info.setAnhao(anhao);
//		kdd_Info.setWenshumingcheng(Type.getString(wenshumingcheng));
//		kdd_Info.setBeizhuxinxi(Type.getString(beizhuxinxi));
//		kdd_Info.setChuanpiaoxinxi(Type.getString(chuanpiaoxinxi));
//		kdd_Info.setBaojiajiage(baojiajiage);
//		kdd_Info.setDaishouhuokuan(daishouhuokuan);
//
//
//
//		kdd_Info.setLururenid(Integer.valueOf(userid));
//		Org_Department department = kddInfoService.getDeptmentByUid(userid);
//		if(department != null){
//			kdd_Info.setLururenDeptId(department.getId()+"");
//			kdd_Info.setLururenDeptName(department.getName());
//		}
//		return kdd_Info;
//	}
//}
