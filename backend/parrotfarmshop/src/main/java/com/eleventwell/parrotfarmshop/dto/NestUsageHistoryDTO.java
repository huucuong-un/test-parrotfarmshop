package com.eleventwell.parrotfarmshop.dto;

import com.eleventwell.parrotfarmshop.entity.NestEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotCoupleEntity;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.util.Date;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NestUsageHistoryDTO extends BaseDTO{
    private Long id;

    private Long parrotCoupleId;

    private Long nestId;

    private Date startDate;

    private Date endDate;
}
