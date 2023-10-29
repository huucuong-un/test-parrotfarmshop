package com.eleventwell.parrotfarmshop.dto;

import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jdk.jfr.Unsigned;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class PromotionDTO extends BaseDTO{

    private String code;
    private String description;
    private Double value;
    private Date startDate;
    private Date endDate;
    private Boolean status;

}
