package backendlite.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import backendlite.component.JauthFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

        @Autowired
        private JauthFilter jauthFilter;

        @SuppressWarnings({ "removal", "deprecation" })
        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http.csrf(csrf -> csrf.disable())
                                .authorizeRequests(authZ -> authZ.requestMatchers("/**", "/user/**", "/goals/**",
                                                "/shops/**", "/plans/**")
                                                .permitAll()
                                                .anyRequest()
                                                .authenticated())
                                .oauth2Login(oauth2 -> oauth2.defaultSuccessUrl("http://localhost:5173/auth", true))
                                .addFilterBefore(jauthFilter, UsernamePasswordAuthenticationFilter.class);
                return http.build();

        }

}
