package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.PromotionDTO;
import com.eleventwell.parrotfarmshop.service.impl.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/promotion")
public class PromotionController {

    @Autowired
    PromotionService promotionService;

    @GetMapping(value= "")
    public List<PromotionDTO> show(){

       List<PromotionDTO> list = promotionService.findAll();
        return list;

    }

    @GetMapping(value= "find-one-by-code")
    public PromotionDTO findOneByCode(@RequestBody @RequestParam("code") String code){

      return promotionService.findOneByCode(code);

    }


    @PostMapping(value= "")
    public PromotionDTO create(@RequestBody PromotionDTO model){
        return (PromotionDTO) promotionService.save(model);
    }

    @PutMapping(value= "{id}")
    public PromotionDTO update(@RequestBody PromotionDTO model, @PathVariable("id") long id){
        model.setId(id);
        return (PromotionDTO) promotionService.save(model);
    }

//    @DeleteMapping(value = "")
//    public void delete(@RequestBody long[] ids){
//        promotionService.delete(ids);
//    }
    @PutMapping(value = "change-status/{id}")
    public void changeStatus(@RequestBody @PathVariable("id") Long id){
        promotionService.changeStatus(id);
    }


}
