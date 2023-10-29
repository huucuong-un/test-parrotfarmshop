package com.eleventwell.parrotfarmshop.dto;


import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class NestDevelopmentStatusDTO extends BaseDTO{
    private String name;
    private String description;
    private Boolean available;
    private Integer sequence;
}
