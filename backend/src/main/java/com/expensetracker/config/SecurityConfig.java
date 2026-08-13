package com.expensetracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    // =====================================================
    // SECURITY FILTER CHAIN
    // =====================================================

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {

        http

            // =================================================
            // CSRF
            // =================================================

            .csrf(csrf -> csrf.disable())


            // =================================================
            // CORS
            // =================================================

            .cors(cors ->
                cors.configurationSource(
                    corsConfigurationSource()
                )
            )


            // =================================================
            // AUTHORIZATION
            // =================================================

            .authorizeHttpRequests(auth -> auth


                // =============================================
                // PUBLIC
                // =============================================

                .requestMatchers(
                    "/",
                    "/error"
                ).permitAll()


                // =============================================
                // AUTH
                // =============================================

                .requestMatchers(
                    "/api/auth/**"
                ).permitAll()


                // =============================================
                // GOVERNMENT SCHEMES
                // =============================================

                .requestMatchers(
                    "/api/schemes/**"
                ).permitAll()


                // =============================================
                // NOTIFICATIONS
                // =============================================

                .requestMatchers(
                    "/api/notifications/**"
                ).permitAll()


                // =============================================
                // EXPENSES
                // =============================================

                .requestMatchers(
                    "/api/expenses/**"
                ).permitAll()


                // =============================================
                // REMINDERS
                // =============================================

                .requestMatchers(
                    "/api/reminders/**"
                ).permitAll()


                // =============================================
                // CROPS
                // =============================================

                .requestMatchers(
                    "/api/crops/**"
                ).permitAll()


                // =============================================
                // ADMIN
                // =============================================

                .requestMatchers(
                    "/api/admin/**"
                ).permitAll()


                // =============================================
                // CORS PREFLIGHT
                // =============================================

                .requestMatchers(
                    HttpMethod.OPTIONS,
                    "/**"
                ).permitAll()


                // =============================================
                // OTHER REQUESTS
                // =============================================

                .anyRequest().authenticated()
            );


        return http.build();
    }


    // =====================================================
    // CORS CONFIGURATION
    // =====================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();


        // =================================================
        // ALLOWED FRONTENDS
        // =================================================

        configuration.setAllowedOrigins(
            Arrays.asList(

                // Local React frontend
                "http://localhost:3000",

                // Deployed React frontend
                "https://expense-tracker-frontend-rqn7.onrender.com"
            )
        );


        // =================================================
        // ALLOWED HTTP METHODS
        // =================================================

        configuration.setAllowedMethods(
            Arrays.asList(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "PATCH",
                "OPTIONS"
            )
        );


        // =================================================
        // ALLOWED HEADERS
        // =================================================

        configuration.setAllowedHeaders(
            Arrays.asList("*")
        );


        // =================================================
        // CREDENTIALS
        // =================================================

        configuration.setAllowCredentials(true);


        // =================================================
        // REGISTER CORS CONFIGURATION
        // =================================================

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
            "/**",
            configuration
        );


        return source;
    }
}