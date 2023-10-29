package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "nest_usage_history")
public class NestUsageHistoryEntity extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "parrot_couple_id")
    private ParrotCoupleEntity parrotCouple;

    @ManyToOne
    @JoinColumn(name = "nest_id")
    private NestEntity nest;

    @OneToMany(mappedBy = "nestUsageHistory")
    private List<NestDevelopmentEntity> nestDevelopmentEntity;

    @OneToOne(mappedBy = "nestUsageHistory")
    private OrderDetailEntity orderDetailEntity;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

}
