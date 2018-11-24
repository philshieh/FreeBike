package cn.xiefei.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.xiefei.pojo.User;
import cn.xiefei.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	//获取手机验证码
	@RequestMapping("/genCode")
	@ResponseBody
	public boolean genVerifyCode(String countryCode,String phoneNum) {
		boolean flag = userService.sendMsg(countryCode,phoneNum);
		return flag;
	}
	//检验手机验证码
	@RequestMapping("/verify")
	@ResponseBody
	public boolean checkVerify(String phoneNum,String verifyCode) {
		boolean flag= userService.checkVerify(phoneNum, verifyCode);
		return flag;		
	}
	//保存用户注册信息
	@RequestMapping("/register")
	@ResponseBody
	public boolean register(@RequestBody User user) {
		boolean flag = true;
		try {
			userService.saveUser(user);
		}
		catch(Exception e) {
			e.printStackTrace();
			flag = false;
		}
		return flag;
	}
	//模拟用户充值押金	
	@RequestMapping("/deposit")
	@ResponseBody
	public boolean payDeposit(@RequestBody User user) {
		boolean flag = true;
		try {
			userService.update(user);
		}
		catch(Exception e) {
			e.printStackTrace();
			flag = false;
		}
		return flag;
	}
	//模拟用户实名认证	
	@RequestMapping("/identify")
	@ResponseBody
	public boolean identify(@RequestBody User user) {
		boolean flag = true;
		try {
			userService.update(user);
		}
		catch(Exception e) {
			e.printStackTrace();
			flag = false;
		}
		return flag;
	}
}
