package com.eleventwell.parrotfarmshop.dto;

import com.eleventwell.parrotfarmshop.entity.NestUsageHistoryEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ParrotCoupleDTO extends BaseDTO{


    private Long parrotMaleId;


    private Long parrotFemaleId;


    private Boolean status;

}
