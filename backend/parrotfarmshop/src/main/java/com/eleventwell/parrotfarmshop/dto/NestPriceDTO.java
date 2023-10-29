package com.eleventwell.parrotfarmshop.dto;

import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NestPriceDTO extends BaseDTO {

    private Long speciesId;

    private Double price;

    private Boolean status;
}
