            package com.eleventwell.parrotfarmshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.eleventwell.parrotfarmshop")
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })

public class ParrotfarmshopApplication {
    
	public static void main(String[] args) {
		SpringApplication.run(ParrotfarmshopApplication.class, args);
	}

}
