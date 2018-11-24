package cn.xiefei.service;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.github.qcloudsms.SmsSingleSender;
import com.github.qcloudsms.SmsSingleSenderResult;
import com.github.qcloudsms.httpclient.HTTPException;

import cn.xiefei.pojo.User;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private StringRedisTemplate stringRedisTemplate;
	
	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public boolean sendMsg(String countryCode, String phoneNum) {
//		//在Redis中取数据
//		// 短信应用SDK AppID
//		int appid = Integer.parseInt(stringRedisTemplate.opsForValue().get("appid")); 
//		// 短信应用SDK AppKey
//		String appkey = stringRedisTemplate.opsForValue().get("appkey");
		//生成随机的数字
		String code = (int) ((Math.random() * 9 + 1)*1000) + "";
		
		// 调用腾讯云的短信API
//		try {
//		    SmsSingleSender ssender = new SmsSingleSender(appid, appkey);
//		    SmsSingleSenderResult result = ssender.send(0, countryCode, phoneNum,
//		        "您的登录验证码是:"+code, "", "");
			//保存数据到Redis中
		    stringRedisTemplate.opsForValue().set(phoneNum, code, 300, TimeUnit.SECONDS);
		    
//		} catch (HTTPException e) {
//		    // HTTP响应码错误
//		    e.printStackTrace();
//		} catch (JSONException e) {
//		    // json解析错误
//		    e.printStackTrace();
//		} catch (IOException e) {
//		    // 网络IO错误
//		    e.printStackTrace();
//		}
		
		return false;
	}

	@Override
	public boolean checkVerify(String phoneNum, String verifyCode) {
		//在redis中根据手机号查出对应验证码
		String code = stringRedisTemplate.opsForValue().get(phoneNum);
		//将查出的验证码与传入的验证码对比
		if(code.equals(verifyCode)) {
			return true;
		}else {
			return false;
		}

	}

	@Override
	public void saveUser(User user) {
		//
		mongoTemplate.insert(user);

	}

	@Override
	public void update(User user) {
		// 更新用户数据
		Update up = new Update();
		if(user.getDeposit() != null) {
			 up = up.set("deposit", user.getDeposit());
		}
		if(user.getNickName() != null) {
			up = up.set("nickName", user.getNickName());
		}
		if(user.getIdNum() != null) {
			up = up.set("idNum", user.getIdNum());
		}
		if(user.getStatus() != null) {
			up = up.set("status", user.getStatus());
		}
		mongoTemplate.updateFirst(new Query(Criteria.where("phoneNum").is(user.getPhoneNum())), 
				up, User.class);
		
	}

}
