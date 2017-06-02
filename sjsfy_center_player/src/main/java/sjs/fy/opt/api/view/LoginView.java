//package sjs.fy.opt.api.view;
//
//import sjs.fy.opt.api.constant._Constants;
//import sjs.fy.opt.api.service.PropertyService;
//import sjs.fy.opt.api.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import javax.swing.*;
//import java.awt.Toolkit;
//import java.awt.Dimension;
//import java.awt.BorderLayout;
//import javax.swing.GroupLayout.Alignment;
//import java.awt.Color;
//
//import javax.swing.LayoutStyle.ComponentPlacement;
//import java.awt.event.ActionListener;
//import java.awt.event.ActionEvent;
//import java.io.File;
//import java.nio.file.Paths;
//
//@Component
//public class LoginView extends JFrame {
//	private static final long serialVersionUID = 1L;
//
//	@Autowired
//	private UserService userService;
//	@Autowired
//	private PropertyService propertyService;
//	@Autowired
//	private VlcPlayer vlcPlayer;
//
//	private JTextField username_textField;
//	private JPasswordField password_textField;
//	File file = Paths.get(_Constants.PROPERTY_FILE_WIN).toFile();
//
//	public void init(){
//		setSize(new Dimension(450, 300));
//		setUndecorated(false);
//		setTitle("庭审系统-v1.0");
//		setIconImage(Toolkit.getDefaultToolkit().getImage("icon/logo.png"));
//		setResizable(false);
//		setLocation(100,100);
//
//		JPanel login_panel = new JPanel();
//		login_panel.setBackground(new Color(0, 102, 255));
//		getContentPane().add(login_panel, BorderLayout.CENTER);
//
//		JLabel username_label = new JLabel("登录名称:");
//
//		JLabel password_label = new JLabel("登录密码:");
//
//		username_textField = new JTextField();
//		username_textField.setColumns(15);
//
//		password_textField = new JPasswordField();
//		password_textField.setColumns(15);
//
//		JButton submit_btn = new JButton("登录");
//		submit_btn.addActionListener(new ActionListener() {
//			public void actionPerformed(ActionEvent e) {
//				String username = username_textField.getText();
//				String password = password_textField.getText();
//				if(username.equals("") || password.equals("")){
//					JOptionPane.showMessageDialog(getContentPane(), "用户名&密码必须填写", "注册信息提示", JOptionPane.INFORMATION_MESSAGE);
//					return;
//				}
//				boolean flag = userService.exists(username,password);
//				if(!flag){
//					JOptionPane.showMessageDialog(getContentPane(), "用户名&密码错误", "登录信息提示", JOptionPane.INFORMATION_MESSAGE);
//					return;
//				}
//				vlcPlayer._run();
//
//			}
//		});
//
//		JButton zhuce_btn = new JButton("注册");
//		zhuce_btn.addActionListener(new ActionListener() {
//			public void actionPerformed(ActionEvent e) {
//				String username = username_textField.getText();
//				String password = password_textField.getText();
//				if(username.equals("") || password.equals("")){
//					JOptionPane.showMessageDialog(getContentPane(), "用户名&密码必须填写", "注册信息提示", JOptionPane.INFORMATION_MESSAGE);
//					return;
//				}
//				boolean flag = userService.save_or_update(username,password);
//				if(flag){
//					propertyService.put("login_username",username,file);
//					propertyService.put("login_password",password,file);
//					setVisible(false);
//					vlcPlayer._run();
//				}
//
//			}
//		});
//		GroupLayout gl_login_panel = new GroupLayout(login_panel);
//		gl_login_panel.setHorizontalGroup(
//				gl_login_panel.createParallelGroup(Alignment.LEADING)
//						.addGroup(gl_login_panel.createSequentialGroup()
//								.addGap(99)
//								.addGroup(gl_login_panel.createParallelGroup(Alignment.TRAILING, false)
//										.addGroup(gl_login_panel.createSequentialGroup()
//												.addComponent(zhuce_btn)
//												.addPreferredGap(ComponentPlacement.RELATED)
//												.addComponent(submit_btn))
//										.addGroup(gl_login_panel.createSequentialGroup()
//												.addComponent(password_label)
//												.addGap(18)
//												.addComponent(password_textField))
//										.addGroup(gl_login_panel.createSequentialGroup()
//												.addComponent(username_label)
//												.addGap(18)
//												.addComponent(username_textField)))
//								.addContainerGap(177, Short.MAX_VALUE))
//		);
//		gl_login_panel.setVerticalGroup(
//				gl_login_panel.createParallelGroup(Alignment.LEADING)
//						.addGroup(gl_login_panel.createSequentialGroup()
//								.addGap(73)
//								.addGroup(gl_login_panel.createParallelGroup(Alignment.BASELINE)
//										.addComponent(username_label)
//										.addComponent(username_textField, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE))
//								.addGap(18)
//								.addGroup(gl_login_panel.createParallelGroup(Alignment.BASELINE)
//										.addComponent(password_label)
//										.addComponent(password_textField, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE))
//								.addGap(18)
//								.addGroup(gl_login_panel.createParallelGroup(Alignment.LEADING)
//										.addComponent(submit_btn)
//										.addComponent(zhuce_btn))
//								.addContainerGap(98, Short.MAX_VALUE))
//		);
//		login_panel.setLayout(gl_login_panel);
//		setVisible(true);
//	}
//
////	public LoginView() {
////		init();
////	}
//
////	public static void main(String[] args){
////		LoginView login = new LoginView();
////	}
//}
