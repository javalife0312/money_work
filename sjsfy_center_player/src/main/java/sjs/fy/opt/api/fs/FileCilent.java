//package sjs.fy.opt.api.fs;
//
//import com.alibaba.fastjson.JSONObject;
//import org.springframework.stereotype.Component;
//
//import java.io.FileInputStream;
//import java.io.InputStream;
//import java.io.OutputStream;
//import java.net.Socket;
//
//@Component
//public class FileCilent {
//	final int BYTE_FILE_HEADER = 1024;
//
//	/**
//	 * @param args
//	 */
//	public static void main(String[] args) {
//
//		FileCilent fileCilent = new FileCilent();
//		JSONObject upload_params = new JSONObject();
//		upload_params.put("host","localhost");
//		upload_params.put("port",9999);
//		upload_params.put("upload_filepath","/Users/jinguowei/Downloads/");
//		upload_params.put("upload_filename","TestNettyFile.zip");
//		upload_params.put("upload_serverpath","/Users/jinguowei/Downloads/upload_test/");
//
//
//
//		fileCilent.sendFile(upload_params);
//
//	}
//
//
//	public boolean sendFile(JSONObject params){
//		Socket socket;
//		InputStream inputStream;
//		OutputStream outputStream;
//		try {
//			//参数解析
//			String host = params.getString("host");
//			host = "localhost";
//			int port = params.getIntValue("port");
//			port = 9999;
//			String upload_serverpath = params.getString("upload_serverpath");
//			upload_serverpath = "/Users/jinguowei/Downloads/upload_test/";
//
//			String upload_filepath = params.getString("upload_filepath");
//			String upload_filename = params.getString("upload_filename");
//
//			socket = new Socket(host,port);
//			outputStream = socket.getOutputStream();
//
//			/**
//			 * 处理头文件
//			 */
//			JSONObject header = new JSONObject();
//			header.put("upload_serverpath",upload_serverpath);
//			header.put("upload_filename",upload_filename);
//			System.out.println("Header : " + header.toJSONString());
//			outputStream.write(byte_1024(header));
//
//
//			/**
//			 * 处理文件上传
//			 */
//			byte[] bytes = new byte[BYTE_FILE_HEADER];
//			inputStream = new FileInputStream(upload_filepath+upload_filename);
//			int receive_lenth;
//			while ((receive_lenth=inputStream.read(bytes))!=-1){
//				outputStream.write(bytes, 0, receive_lenth);
//			}
//			outputStream.flush();
//
//			/**
//			 * 关闭各种流
//			 */
//			outputStream.close();
//			inputStream.close();
//			socket.close();
//		} catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
//		return true;
//	}
//
//
//	/**
//	 * 生成1024长度的头文件
//	 * @return
//	 */
//	private byte[] byte_1024(JSONObject jsonObject) throws Exception {
//		byte[] bytes_1024 = new byte[BYTE_FILE_HEADER];
//		System.out.println(jsonObject.toJSONString());
//		byte[] input = jsonObject.toJSONString().getBytes();
//		if(input.length>1024){
//			throw new Exception("输入的内容长度>1024");
//		}
//		for(int i=0;i<input.length;i++){
//			bytes_1024[i] = input[i];
//		}
//		return bytes_1024;
//	}
//
//
//
//
//}
