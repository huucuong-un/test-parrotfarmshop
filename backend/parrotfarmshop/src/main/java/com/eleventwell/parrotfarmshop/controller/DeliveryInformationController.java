package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.DeliveryInformationDTO;
import com.eleventwell.parrotfarmshop.service.impl.DeliveryInformationService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/delivery-information")
public class DeliveryInformationController {
   @Autowired
    private DeliveryInformationService deliveryInformationService;

    @GetMapping(value = "{customerid}")
    public List<DeliveryInformationDTO> showDeliveryInformationByCustomerId(@PathVariable("customerid") Long customerId) {
        return deliveryInformationService.getDeliveryInformationByCustomerId(customerId);
    }

    @GetMapping(value = "/picking-status/{customerid}")
    public DeliveryInformationDTO findDeliveryInfoWithTruePickStatus(@PathVariable("customerid") Long customerId) {
        return deliveryInformationService.getDeliveryInformationByCustomerIdWithTruePickingStatus(customerId);
    }
    
      @GetMapping(value = "/admin/find-one-by-id/{id}")
    public DeliveryInformationDTO findDeliveryInfoById(@PathVariable("id") Long id) {
        return deliveryInformationService.findDeliveryInfoById(id);
    }


    @PostMapping(value = "")
    public DeliveryInformationDTO createDeliveryInformation(@RequestBody DeliveryInformationDTO model) {
        return deliveryInformationService.save(model);
    }

    @PutMapping(value = "")
    public DeliveryInformationDTO updateDeliveryInformation(@RequestBody DeliveryInformationDTO model) {
        model.setId(model.getId());
        return deliveryInformationService.save(model);
    }

    @PutMapping(value = "/update-picking-status")
    public DeliveryInformationDTO updatePickingStatus(@RequestBody DeliveryInformationDTO deliveryInfo) {
        return deliveryInformationService.updatePickingStatus(deliveryInfo.getId(), deliveryInfo.getUserId());
    }

}
