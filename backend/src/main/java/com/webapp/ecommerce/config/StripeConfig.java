package com.webapp.ecommerce.config;

import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

@Configuration
public class StripeConfig {

    @Value("${stripe.api.key}")
    private String apiKey;

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
        Stripe.apiKey = apiKey;
    }
}
