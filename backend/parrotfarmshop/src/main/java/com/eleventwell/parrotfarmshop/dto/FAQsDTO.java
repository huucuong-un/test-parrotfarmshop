package com.eleventwell.parrotfarmshop.dto;


import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FAQsDTO extends BaseDTO{

    private String title;

    private String content;

    private Boolean status;
}
