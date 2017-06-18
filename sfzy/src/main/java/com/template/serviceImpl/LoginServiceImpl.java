package com.template.serviceImpl;

import com.template.dao.LoginDao;
import com.template.daoImpl.LoginDaoImpl;
import com.template.model.Org_User;
import com.template.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author JGW
 * 
 */
@Component
public class LoginServiceImpl implements LoginService{


	@Autowired
	private LoginDaoImpl loginDao;
	/**
	 * @param username
	 * @param password
	 * @return 根据用户名密码得到权限用户
	 */
	public Org_User isExitAuthorizationUser(String username,String password){
		return loginDao.isExitAuthorizationUser(username, password);
	}
}
