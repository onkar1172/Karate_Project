package com.karate.academy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpaWebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Forward non-API, non-file requests to index.html for React client-side routing
        registry.addViewController("/{path:^(?!api|h2-console).*}")
                .setViewName("forward:/index.html");
        registry.addViewController("/*/{path:^(?!api|h2-console).*}")
                .setViewName("forward:/index.html");
    }
}
