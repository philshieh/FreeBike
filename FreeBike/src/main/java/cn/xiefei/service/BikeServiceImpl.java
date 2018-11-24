package cn.xiefei.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Metrics;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.NearQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import cn.xiefei.pojo.Bike;

@Service
public class BikeServiceImpl implements BikeService {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Override
	public void save(Bike bike) {
		//保存bike数据到mongodb 
		mongoTemplate.insert(bike);
		
	}

	@Override
	public List<GeoResult<Bike>> findNear(double longitude, double latitude) {
		//查找所有的单车
        //return mongoTemplate.findAll(Bike.class);
		
		//查找附近的单车
		//创建NearQuery
		NearQuery nearQuery = NearQuery.near(longitude, latitude);
		//查找的范围和距离单位
		nearQuery.maxDistance(1, Metrics.KILOMETERS);
		//查找可用的20辆单车
		GeoResults<Bike>  georesults = mongoTemplate.geoNear(nearQuery.query(new Query(Criteria.where("status").is(0)).limit(20)), Bike.class);
		return georesults.getContent();
	}

}
