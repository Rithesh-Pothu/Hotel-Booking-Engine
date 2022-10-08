package com.reservation.circuscircus;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationProperties {
    @Value("${API_URL}")
    public String apiUrl;
    @Value("${API_KEY}")
    public String apiKey;
    @Value("${EMAIL_SENDER}")
    public String sender;
}
