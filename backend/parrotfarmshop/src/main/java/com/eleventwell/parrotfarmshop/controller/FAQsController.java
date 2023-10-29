package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.FAQsDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.impl.FAQsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/faqs")

public class FAQsController {

    @Autowired
    IGenericService<FAQsDTO> faQsDTOIGenericService;


    @GetMapping(value = "")
    public ListOutput showFAQs(){
        ListOutput result = new ListOutput();
        result.setListResult(faQsDTOIGenericService.findAll());
        return result;
    }

    @PostMapping
    public FAQsDTO createFaqs(@RequestBody FAQsDTO model){
        return  faQsDTOIGenericService.save(model);
    }

    @PutMapping(value = "{id}")
    public FAQsDTO updateFAQs(@RequestBody FAQsDTO model, @PathVariable("id") long id){
        model.setId(id);
        return faQsDTOIGenericService.save(model);
    }

    @DeleteMapping(value = "{id}")
    public void deleteFAQs(@RequestBody @PathVariable("id") long id) {

        faQsDTOIGenericService.changeStatus(id);
    }

}
