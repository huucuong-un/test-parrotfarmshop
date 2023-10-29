package com.eleventwell.parrotfarmshop.controller;


import com.eleventwell.parrotfarmshop.Model.OrderDetailHistoryModel;
import com.eleventwell.parrotfarmshop.dto.OrderDetailDTO;
import com.eleventwell.parrotfarmshop.service.impl.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/orderdetail")
public class OderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;
    @GetMapping(value="findAllByOrderId/{id}")
    public List<OrderDetailDTO> findAllByOrderId(@RequestBody @PathVariable Long id){


        return orderDetailService.findAllByOrderId(id);

    }

    @GetMapping(value="find-all-model-order-detail-by-id/{id}")
    public List<OrderDetailHistoryModel> findAllModelByOrderId(@RequestBody @PathVariable Long id){

        return orderDetailService.createOrderDetailHistoryModelList(id);

    }

}
