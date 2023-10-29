package com.eleventwell.parrotfarmshop.Model;

import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartModel {
    Long speicesId;
    Integer quantity;
    String type;
}
