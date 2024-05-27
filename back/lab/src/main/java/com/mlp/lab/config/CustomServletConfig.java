package com.mlp.lab.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.mlp.lab.controller.formatter.LocalDateFormatter;

@Configuration
public class CustomServletConfig implements WebMvcConfigurer {
  @SuppressWarnings("null")
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addFormatter(new LocalDateFormatter());
    }

    // @SuppressWarnings("null")
    // @Override
    // public void addCorsMappings(CorsRegistry registry) {

    //     registry.addMapping("/**")
    //             .allowedOrigins("*")
    //             .allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS")
    //             .maxAge(300)
    //             .allowedHeaders("Authorization", "Cache-Control", "Content-Type");
    // }
}


