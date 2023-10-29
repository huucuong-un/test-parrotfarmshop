package com.eleventwell.parrotfarmshop.dto;

import com.eleventwell.parrotfarmshop.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
//Cuong
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RoleDTO extends BaseDTO{
    private String name;
    private String description;
    private Boolean status;
    //private List<UserEntity> users = new ArrayList<>();


}
