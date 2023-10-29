package com.eleventwell.parrotfarmshop.dto;

import com.eleventwell.parrotfarmshop.entity.BaseEntity;
import com.eleventwell.parrotfarmshop.entity.OrderDetailEntity;
import com.eleventwell.parrotfarmshop.entity.PromotionEntity;
import com.eleventwell.parrotfarmshop.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDTO extends BaseDTO {




    private Long userID;


    private Long deliveryInformationId;


    private Long promotionID;

    private String status;

    private Double totalPrice;

    private int quantity;

    public String vnp_OrderInfo = "Parrot";

    public String vnp_OrderType = "200000";
    public String vnp_TxnRef;
}
