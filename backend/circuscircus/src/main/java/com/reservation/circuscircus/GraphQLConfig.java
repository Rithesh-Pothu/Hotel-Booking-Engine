package com.reservation.circuscircus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class GraphQLConfig {

    @Autowired
    private ApplicationProperties appProperties;

    @Bean
    public WebClient webClient() {
        // extending buffer size for fetching from appsync
        final int size = 16 * 1024 * 1024;
        final ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(codecs -> codecs.defaultCodecs().maxInMemorySize(size))
                .build();
        return WebClient.builder()
                .exchangeStrategies(strategies)
                .baseUrl(appProperties.apiUrl)
                .defaultHeader("x-api-key", appProperties.apiKey)
                .build();
    }

}
