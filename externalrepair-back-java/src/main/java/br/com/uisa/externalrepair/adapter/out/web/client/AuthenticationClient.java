package br.com.uisa.externalrepair.adapter.out.web.client;

import br.com.uisa.externalrepair.adapter.out.web.dto.AuthRequest;
import br.com.uisa.externalrepair.adapter.out.web.dto.AuthResponse;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import java.time.Duration;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationClient {

    public AuthResponse login(String username, String password) {
        return WebClient.builder()
                .build()
                .post()
                .uri("https://sensedia.uisa.com.br/digital-work-permit/api/v1/auth/login")
                .bodyValue(new AuthRequest(username, password))
                .header("Content-Type", "application/json")
                .header("CLIENT_ID", "366545bc-1f87-4c59-97a5-d2e2dbe6706e")
                .header("ACCESS_TOKEN", "f331470c-38b0-4520-ba40-42f0ddbec9a2")
                .retrieve()
                .bodyToMono(AuthResponse.class)
                .doOnError(error -> log.error("Login failed", error))
                .block();
    }

    @Bean
    @Primary
    public WebClient webClient(WebClient.Builder webClientBuilder) {
        HttpClient httpClient =
                HttpClient.create()
                        .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000)
                        .responseTimeout(Duration.ofMillis(10000))
                        .doOnConnected(
                                conn ->
                                        conn.addHandlerLast(new ReadTimeoutHandler(10000, TimeUnit.MILLISECONDS))
                                                .addHandlerLast(new WriteTimeoutHandler(10000, TimeUnit.MILLISECONDS)));

        return webClientBuilder.clientConnector(new ReactorClientHttpConnector(httpClient)).build();
    }
}
