package com.eleventwell.parrotfarmshop.entity;
//*ParrotEggNestID
//ParrotMomID
//ParrotDadID
//ParrotEggNestStatus
//CreatedAt
//CreatedBy

import jakarta.persistence.*;

import jdk.jfr.Unsigned;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "nest")
public class NestEntity extends BaseEntity {


    @Column(name = "status")
    private Boolean status;


    @OneToMany(mappedBy = "nest")
    private List<NestUsageHistoryEntity> nestUsageHistory = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "nest_price_id")
    private NestPriceEntity nestPrice;


//    @OneToOne(mappedBy = "parrotEggNest")
//    private OrderDetailEntity orderDetailEntity;


}
