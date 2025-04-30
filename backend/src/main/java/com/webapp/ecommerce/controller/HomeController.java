
package com.webapp.ecommerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to amazoff";
    }

    @GetMapping("/login")
    public String login() {
        return "login with email///////: ";
    }

    @GetMapping("/register")
    public String register() {
        return "Register user:";
    }


}


