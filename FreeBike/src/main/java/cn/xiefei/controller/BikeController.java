package cn.xiefei.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.GeoResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.xiefei.pojo.Bike;
import cn.xiefei.service.BikeService;

@Controller
@RequestMapping("/bike")
public class BikeController {
	
	@Autowired
	private BikeService bikeService;

	@RequestMapping("/addBike")
	@ResponseBody
	public String add(@RequestBody Bike bike) {
		System.out.println(bike);
		bikeService.save(bike);
		return "success";
	}
	//查找附近的单车	
	@RequestMapping("/findNear")
	@ResponseBody
	public List<GeoResult<Bike>> findNear(double longitude,double latitude){
			return bikeService.findNear(longitude,latitude);
		
	}
}
