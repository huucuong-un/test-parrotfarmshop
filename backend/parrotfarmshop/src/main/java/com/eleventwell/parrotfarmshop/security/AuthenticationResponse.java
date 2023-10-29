package com.eleventwell.parrotfarmshop.security;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AuthenticationResponse {
    private Long userId;
    private String userName;
    private String fullName;
    private String email;
    private Boolean status;
    private Long roleId;
    private String token;
    private String imgUrl;
    private Boolean gender;
    private String dob;


}
