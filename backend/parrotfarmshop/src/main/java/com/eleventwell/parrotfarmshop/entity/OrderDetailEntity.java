package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//*OrderID
//#ServiceID
//#ParrotID
//#ParrotEggNestID
@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "order_detail")
public class OrderDetailEntity extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderEntity orderId;

//	@ManyToOne
//    @JoinColumn(name = "serviceID")
//    private ServiceEntity service;
//

    @OneToOne
    @JoinColumn(name = "parrot_id", unique = true)
    private ParrotEntity parrot;

    @OneToOne
    @JoinColumn(name = "nest_usage_id", unique = true)
    private NestUsageHistoryEntity nestUsageHistory;




}
