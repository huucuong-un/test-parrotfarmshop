package com.eleventwell.parrotfarmshop.Request;

import com.eleventwell.parrotfarmshop.Model.CartModel;
import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import lombok.*;

import java.util.List;
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderRequest {
    private OrderDTO orderDTO;
    private List<CartModel> cartList;

}
