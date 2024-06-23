package com.mlp.lab.controller;

import org.springframework.beans.factory.annotation.Value;

public class ApiController {
    @Value("${api.key}")
    String apikey;

    
}
