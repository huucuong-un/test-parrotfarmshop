package com.eleventwell.parrotfarmshop.Response;

import com.eleventwell.parrotfarmshop.Model.OrderDetailHistoryModel;
import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.dto.UserDTO;
import lombok.*;

import java.util.List;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderResponseForManagement {
    private OrderDTO orderDTO;

    private List<OrderDetailHistoryModel> listOrderDetailHistoryModel;

    private UserDTO userDTO;
}
