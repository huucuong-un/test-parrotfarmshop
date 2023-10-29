package com.eleventwell.parrotfarmshop.dto;


import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NestDTO extends BaseDTO{

    private Boolean status;

    private Long nestPriceId;


}
