package com.eleventwell.parrotfarmshop.security;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class ChangePasswordRequest {
    private String currentUsername;
    private String currentPassword;
    private String newPassword;
    private String confirmNewPassword;
}
