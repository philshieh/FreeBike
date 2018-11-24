package cn.xiefei.pojo;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="user")
public class User {
	
	@Id
	private String id;
	@Indexed
	private String phoneNum;
	private Double deposit;
	private Date regDate;
	private String nickName;
	private String idNum;
	private Integer status;
	
	public void setId(String id) {
		this.id = id;
	}
	public String getId() {
		return id;
	}
	
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}
	public String getPhoneNum() {
		return phoneNum;
	}
	
	public void setDeopsit(Double deposit) {
		this.deposit =deposit;
	}
	public Double getDeposit() {
		return deposit;
	}
	
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public Date getRegDate() {
		return regDate;
	}
	
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getNickName() {
		return nickName;
	}
	
	public void setIdNum(String idNum) {
		this.idNum = idNum;
	}
	public String getIdNum() {
		return idNum;
	}
	
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getStatus() {
		return status;
	}
	
	public String toString() {
		return "用户信息：[手机号是："+phoneNum+"，已付押金："+deposit+"，注册日期是："+ regDate+"，昵称是：" +nickName+",身份证号是："+idNum+",状态是："+status+"]";
	}
	
}
