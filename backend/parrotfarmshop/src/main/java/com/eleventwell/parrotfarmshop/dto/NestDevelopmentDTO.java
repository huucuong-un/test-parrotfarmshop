package com.eleventwell.parrotfarmshop.dto;


import com.eleventwell.parrotfarmshop.entity.NestUsageHistoryEntity;
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
public class NestDevelopmentDTO extends BaseDTO {

    private Long nestUsageHistoryId;

    private Long statusId;

    private Date eventDate;

    private String description;
}
