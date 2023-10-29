package com.eleventwell.parrotfarmshop.dto;

import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDetailDTO extends BaseDTO{
    private Long orderId;
    private Long parrotId;
    private Long nestUsageId;
}
