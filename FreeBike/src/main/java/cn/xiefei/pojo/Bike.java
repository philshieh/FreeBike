package cn.xiefei.pojo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

//与mongodb的bike映射
@Document(collection="bike")
public class Bike {
	
	//主键
	@Id
	private String id;
	//地球球面索引
	@GeoSpatialIndexed(type=GeoSpatialIndexType.GEO_2DSPHERE)
    private double  location  [];
	//索引
	private long bikeNum;
	private int status;
	
	public void setId(String id) {
		this.id = id;
	}
	public String getId() {
		return id;
	}
	
	public void setLocation(double location[]) {
		this.location = location;
	}
	public double[] getLocation() {
		return location;
	}
	
	public void setBikeNum(long bikeNum) {
		this.bikeNum = bikeNum;
	}
	public long getBikeNum() {
		return bikeNum;
	}
	
	
	public void setStatus(int status) {
		this.status = status;
	}
	public int getStatus() {
		return status;
	}
	
	public Bike() {}
	public Bike(double longitude,double latitude,int status) {
		setStatus(status);
	}
	
	public String toString() {
		return "该自行车的信息：[id："+id+"，状态："+status+"，[经度，纬度]:"+location.toString()+"自行车编号："+bikeNum+"]";
	}
}
