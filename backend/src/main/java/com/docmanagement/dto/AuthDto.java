package com.docmanagement.dto;

public class AuthDto {

    public static class LoginRequest {
        private String username;
        private String password;
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String username;
        private String email;
        private String password;
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class AuthResponse {
        private final String token;
        private final String username;
        private final String role;
        public AuthResponse(String token, String username, String role) {
            this.token = token; this.username = username; this.role = role;
        }
        public String getToken() { return token; }
        public String getUsername() { return username; }
        public String getRole() { return role; }
    }
}
