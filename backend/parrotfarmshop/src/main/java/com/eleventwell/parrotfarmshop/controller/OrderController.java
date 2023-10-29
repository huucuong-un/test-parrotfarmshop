package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.CartModel;
import com.eleventwell.parrotfarmshop.Model.OrderDetailHistoryModel;
import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.Request.OrderRequest;
import com.eleventwell.parrotfarmshop.Response.OrderResponse;
import com.eleventwell.parrotfarmshop.Response.OrderResponseForManagement;
import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.service.impl.OrderDetailService;
import com.eleventwell.parrotfarmshop.service.impl.OrderService;
import com.eleventwell.parrotfarmshop.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderDetailService orderDetailService;
    @Autowired
    private UserService userService;

    @GetMapping(value = "admin/order_management/list")
    public PagingModel findAllOrder(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        List<OrderDTO> orders = orderService.findAll(pageable);
        List<OrderResponseForManagement> orderResponses = new ArrayList<>();

        List<OrderDetailHistoryModel> orderDetailHistoryModel = new ArrayList<>();

        for (OrderDTO dto : orders) {
            OrderResponseForManagement orderResponse = new OrderResponseForManagement();
            orderDetailHistoryModel = orderDetailService.createOrderDetailHistoryModelList(dto.getId());
            orderResponse.setOrderDTO(dto);
            orderResponse.setListOrderDetailHistoryModel(orderDetailHistoryModel);
            UserDTO user = userService.findOneById(dto.getUserID());
            orderResponse.setUserDTO(user);


            orderResponses.add(orderResponse);
        }

        result.setListResult(orderResponses);
        result.setTotalPage(((int) Math.ceil((double) (orderService.totalItem()) / limit)));
        result.setLimit(limit);
      return  result;

    }
    @GetMapping(value = "admin/order_management/search")
    @PreAuthorize("hasAnyAuthority('1')")
    public PagingModel searchOrderByPhoneAnd(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit,@RequestParam(value = "email", required = false) String email,@RequestParam(value = "phone", required = false) String phone, @RequestParam(value = "date", required = false)  @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,@RequestParam(value = "status",required = false) String status,@RequestParam(value = "sortPrice", required = false) String sortPrice,@RequestParam(value = "sortDate", required = false) String sortDate) {



        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        List<OrderDTO> orders = orderService.searchByEmailOrPhone(email,phone,date,status,sortPrice,sortDate,pageable);
        List<OrderResponseForManagement> orderResponses = new ArrayList<>();

        List<OrderDetailHistoryModel> orderDetailHistoryModel = new ArrayList<>();

        for (OrderDTO dto : orders) {
            OrderResponseForManagement orderResponse = new OrderResponseForManagement();
            orderDetailHistoryModel = orderDetailService.createOrderDetailHistoryModelList(dto.getId());
            orderResponse.setOrderDTO(dto);
            orderResponse.setListOrderDetailHistoryModel(orderDetailHistoryModel);
            UserDTO user = userService.findOneById(dto.getUserID());
            orderResponse.setUserDTO(user);


            orderResponses.add(orderResponse);
        }

        result.setListResult(orderResponses);
        result.setTotalPage(((int) Math.ceil((double) (orderService.totalItem()) / limit)));
        result.setLimit(limit);
        return result;
    }

    @GetMapping(value = "order-history-search-sort")
    public PagingModel findAllByOrderId(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit,@RequestParam(value = "userId", required = false) Long userId  ,@RequestParam(value = "date", required = false)  @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,@RequestParam(value = "status",required = false) String status,@RequestParam(value = "sortPrice", required = false) String sortPrice,@RequestParam(value = "sortDate", required = false) String sortDate) {

        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);


        List<OrderDTO> orders = orderService.findAllByUserIdAndSearchSort(userId,date,status,sortPrice,sortDate,pageable);
        List<OrderResponse> orderResponses = new ArrayList<>();

        List<OrderDetailHistoryModel> orderDetailHistoryModes = new ArrayList<>();

        for (OrderDTO dto : orders) {
            OrderResponse orderResponse = new OrderResponse();
            orderDetailHistoryModes = orderDetailService.createOrderDetailHistoryModelList(dto.getId());
            orderResponse.setOrderDTO(dto);
            orderResponse.setListOrderDetailHistoryModel(orderDetailHistoryModes);

            orderResponses.add(orderResponse);
        }


        result.setListResult(orderResponses);
        result.setTotalPage(((int) Math.ceil((double) (orderService.totalItem()) / limit)));
        result.setLimit(limit);

        return result;

    }

    @PostMapping(value = "find-all-order-with-user")
    public List<OrderResponseForManagement> findAllOrderWithUserInfo() {
        List<OrderDTO> orders = orderService.findAll();
        List<OrderResponseForManagement> orderResponses = new ArrayList<>();

        List<OrderDetailHistoryModel> orderDetailHistoryModel = new ArrayList<>();

        for (OrderDTO dto : orders) {
            OrderResponseForManagement orderResponse = new OrderResponseForManagement();
            orderDetailHistoryModel = orderDetailService.createOrderDetailHistoryModelList(dto.getId());
            orderResponse.setOrderDTO(dto);
            orderResponse.setListOrderDetailHistoryModel(orderDetailHistoryModel);
            UserDTO user = userService.findOneById(dto.getUserID());
            orderResponse.setUserDTO(user);


            orderResponses.add(orderResponse);
        }


        return orderResponses;

    }

    @GetMapping(value = "find-all-model-order-detail-by-id/{id}")
    public List<OrderDetailHistoryModel> findAllModelByOrderId(@RequestBody @PathVariable Long id) {

        return orderDetailService.createOrderDetailHistoryModelList(id);

    }
//    @PostMapping(value = "/{parrotIds}/{nestIds}")
//    public void createOrder(
//            @RequestBody OrderDTO model,
//            @PathVariable Long[] parrotIds,
//            @PathVariable Long[] nestIds
//    ) {
//        orderService.createOrderDetail(model, parrotIds, nestIds);
//    }


    @PostMapping(value = "/{species}/{product}")
    public OrderDTO createOrder(@RequestBody OrderDTO dto, @PathVariable Long species, @PathVariable String product) {

      return  orderService.createOrderDetail(dto, species, product);
    }

    @PostMapping(value = "cart")
    public OrderDTO createOrderByCart(@RequestBody OrderRequest orderRequest) {
        OrderDTO dto = orderRequest.getOrderDTO();
        List<CartModel> listcart = orderRequest.getCartList();
      return  orderService.createOrderDetailsByCart(dto, listcart);
    }

    @DeleteMapping(value = "{id}")
    public void deleteParrot(@RequestBody @PathVariable("id") Long id) {
        orderService.changeStatus(id);
    }


}

