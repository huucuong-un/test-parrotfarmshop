package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.NestDevelopmentStatusDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotCoupleDTO;
import com.eleventwell.parrotfarmshop.service.impl.NestDevelopmentStatusService;
import com.eleventwell.parrotfarmshop.service.impl.ParrotCoupleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/parrot-couple")
public class ParrotCoupleController {
    @Autowired
    ParrotCoupleService parrotCoupleService;

    @GetMapping(value = "")
    public PagingModel findAll(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        List<ParrotCoupleDTO> parrotCoupleDTO = parrotCoupleService.findAll(pageable);
        result.setListResult(parrotCoupleDTO);
        result.setTotalPage(((int) Math.ceil((double) (parrotCoupleService.totalItem()) / limit)));
        result.setLimit(limit);
        return result;

    }

    @PutMapping(value = "/admin/update-status")
    public void updateStatus(@RequestBody @RequestParam(value = "id") Long id) {
        parrotCoupleService.changeStatus(id);
    }

    @PostMapping(value = "")
    public ParrotCoupleDTO createNestDevelopment(@RequestBody ParrotCoupleDTO model) {
        return (ParrotCoupleDTO) parrotCoupleService.save(model);
    }


}
