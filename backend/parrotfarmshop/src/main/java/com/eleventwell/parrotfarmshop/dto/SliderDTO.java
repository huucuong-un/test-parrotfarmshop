package com.eleventwell.parrotfarmshop.dto;

import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SliderDTO extends BaseDTO{

    private String sliderName;
    private String sliderDescription;
    private String sliderImageURL;
    private Boolean status;
}
