package cn.xiefei;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//是SpringBoot的入口程序，在Spring程序启动时，会进行扫描有特殊注解的类
@SpringBootApplication
public class FreeBikeApplication {

	public static void main(String[] args) {
		SpringApplication.run(FreeBikeApplication.class, args);
	}
}
