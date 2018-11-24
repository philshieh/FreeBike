package cn.xiefei.service;

import cn.xiefei.pojo.User;

public interface UserService {
	boolean sendMsg(String countryCode, String phoneNum );
	boolean checkVerify(String phoneNum,String verifyCode);
	void saveUser(User user);
	void update(User user);
}
