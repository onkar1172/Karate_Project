package com.karate.academy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

    /**
     * Forwards non-API and non-file extension routes to index.html for React Client-Side Routing.
     * Routes with a file extension (e.g. .js, .css, .ico, .svg, .png) bypass this controller
     * and are served directly by Spring Boot's default static resource handler with correct MIME types.
     */
    @GetMapping(value = {
            "/{path:[^\\.]*}",
            "/*/{path:[^\\.]*}",
            "/*/*/{path:[^\\.]*}"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
