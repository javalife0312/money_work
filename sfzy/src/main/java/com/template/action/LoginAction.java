package com.template.action;



import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.template.model.Org_User;
import com.template.serviceImpl.LoginServiceImpl;
import com.template.util.SysUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginAction{


	@Autowired
	private LoginServiceImpl loginService;

	/*********************************************************************************
	 * Spring注入
	 * @throws IOException
	 *********************************************************************************/

	@RequestMapping("/login")
	public String login(Model data,HttpServletRequest request, HttpServletResponse response) throws IOException {
		Org_User org_user = null;
		Map<String, String> result = new HashMap<String, String>();
		String goToWhere = "login";
		try {
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");

			String username = request.getParameter("username");
			String password = request.getParameter("password");

			boolean checkFlag = SysUtil.loginGuoQiCheck();
			checkFlag = true;
			if(checkFlag){
				org_user = loginService.isExitAuthorizationUser(username, password);
				if(org_user != null){
					request.getSession().setAttribute("uid", org_user.getId());
					result.put("success", "true");
					result.put("msg", "myWeb/system/home.jsp");
					goToWhere = "home";
				}else {
					result.put("success", "false");
					goToWhere = "login";
				}
			}else{
				result.put("success", "false");
				goToWhere = "guoqi";
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
//			response.getWriter().print(JSONObject.fromObject(result));
			data.addAllAttributes(result);
			if(goToWhere.equals("home")){
//				response.sendRedirect("myWeb/system/home.jsp");
				return "system/home";
			}else if(goToWhere.equals("guoqi")){
//				response.sendRedirect("myWeb/login/login_guoqi.jsp");
				return "login/login_guoqi";
			}else{
//				response.sendRedirect("myWeb/login/login.jsp");
				return "login/login";
			}
		}
	}

	@RequestMapping("/login_guoqi")
	public String login_guoqi(HttpServletRequest request,HttpServletResponse response) throws IOException {
		return  "login/login_guoqi";
	}
}
