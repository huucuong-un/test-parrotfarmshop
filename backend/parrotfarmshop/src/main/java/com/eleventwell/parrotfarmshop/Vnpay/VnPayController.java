package com.eleventwell.parrotfarmshop.Vnpay;

import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.service.impl.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping(value = "/api/vnpay")
public class VnPayController {
    PayService payService;

    @Autowired
    OrderService orderService;



    public VnPayController(PayService payService) {
        this.payService = payService;
    }

    @PostMapping("/payment")
    public String pay(@RequestBody OrderDTO orderDTO, HttpServletRequest request){
        try {
            return payService.payWithVNPAY(orderDTO, request);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/payment_infor")
    public RedirectView transaction(
            @RequestParam(value = "vnp_Amount") Double amount,
            @RequestParam(value = "vnp_BankCode") String bankCode,
            @RequestParam(value = "vnp_ResponseCode") String responseCode,
            @RequestParam(value = "vnp_TxnRef") String txnRef
    ) {
        String orderIdByUsingLongDataType = txnRef.substring(0, txnRef.length() - 8);
        long result = Long.parseLong(orderIdByUsingLongDataType);
        if ("00".equals(responseCode)) {
            // Trạng thái thành công

            orderService.changeStatus(result);
            return new RedirectView("http://localhost:3000/paid-success");

            // Redirect to the specified URL when the condition is met
        } else {
            orderService.removeOrder(result);
            // Trạng thái thất bại
            return new RedirectView("http://localhost:3000/error");
        }
    }



}
