package cn.xiefei.service;

import java.util.List;

import org.springframework.data.geo.GeoResult;

import cn.xiefei.pojo.Bike;

public interface BikeService {
	public void save(Bike bike);
	List<GeoResult<Bike>> findNear(double longitude, double latitude);
}
