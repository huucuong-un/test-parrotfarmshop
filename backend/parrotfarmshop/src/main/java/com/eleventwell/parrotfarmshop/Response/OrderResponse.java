package com.eleventwell.parrotfarmshop.Response;

import com.eleventwell.parrotfarmshop.Model.OrderDetailHistoryModel;
import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import lombok.*;

import java.util.List;
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderResponse {
    private OrderDTO orderDTO;

    private List<OrderDetailHistoryModel> listOrderDetailHistoryModel;

}
