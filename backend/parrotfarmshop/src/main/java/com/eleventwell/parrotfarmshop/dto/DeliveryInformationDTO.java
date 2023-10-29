package com.eleventwell.parrotfarmshop.dto;

import com.eleventwell.parrotfarmshop.entity.UserEntity;
import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DeliveryInformationDTO extends BaseDTO {
    private String name;
    private String phoneNumber;
    private String address;
    private Long userId;
    private Boolean status;
    private Boolean pickingStatus;

}
