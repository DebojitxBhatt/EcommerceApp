<<<<<<< HEAD
// src/main/java/com/webapp/ecommerce/config/WebConfig.java

package com.webapp.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // frontend origin
                .allowedMethods("*");
    }
}
=======
// src/main/java/com/webapp/ecommerce/config/WebConfig.java

package com.webapp.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

>>>>>>> bdc04235f00b2f6b99d6b53985389f642b7ab66b
