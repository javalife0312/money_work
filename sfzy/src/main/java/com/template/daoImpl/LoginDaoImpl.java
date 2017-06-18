package com.template.daoImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.template.dao.LoginDao;
import com.template.model.Org_User;
import org.springframework.stereotype.Component;

/**
 * @author JGW
 * 
 */
@Component
public class LoginDaoImpl implements LoginDao{

	@Autowired
	private JdbcTemplate jdbcTemplate;
	/**
	 * @param username
	 * @param password
	 * @return 根据用户名密码得到权限用户
	 */
	@SuppressWarnings("unchecked")
	public Org_User isExitAuthorizationUser(String username,String password){
		Org_User authorizationUser = null;
		List<Org_User> list = null;
		try {
			String hql = "select * from from ls3x_org_user where username = '"+username+"' and password = '"+password+"'";
			list = jdbcTemplate.queryForList(hql,Org_User.class);
			if(list != null && list.size() > 0) {
				authorizationUser = list.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return authorizationUser;
	}
}
