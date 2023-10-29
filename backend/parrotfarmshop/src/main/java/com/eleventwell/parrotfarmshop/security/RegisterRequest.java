package com.eleventwell.parrotfarmshop.security;

import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class RegisterRequest {

    private String userName;
    private String email;

   @Size(min = 8, max = 50)
    private String password;
    private String fullName;
    private Boolean status;
    private Long roleId;
    private String imgUrl;
    private Boolean gender;
    private String dob;

}
