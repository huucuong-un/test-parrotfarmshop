package com.eleventwell.parrotfarmshop.dto;

import com.eleventwell.parrotfarmshop.entity.RoleEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;


@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO extends BaseDTO {
    private String userName;
    private String email;
    private String password;
    private String fullName;
    private Boolean status;
    private Long roleId;
    private String imgUrl;
    private Boolean gender;
    private String dob;
}
