package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.OrderDetailHistoryModel;
import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.Response.OrderResponseForManagement;
import com.eleventwell.parrotfarmshop.dto.NestDevelopmentDTO;
import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.dto.PostDTO;
import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.impl.NestDevelopmentService;
import com.eleventwell.parrotfarmshop.service.impl.SliderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/nest-development")
public class NestDevelopmentController {
    @Autowired
    NestDevelopmentService nestDevelopmentService;

    @GetMapping(value = "")
    public PagingModel findAllOrder(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        List<NestDevelopmentDTO> nestDevelopment = nestDevelopmentService.findAll(pageable);



        result.setListResult(nestDevelopment);
        result.setTotalPage(((int) Math.ceil((double) (nestDevelopmentService.totalItem()) / limit)));
        result.setLimit(limit);
        return result;

    }

    @PutMapping(value = "/admin/update-status")
    public void updateStatus(@RequestBody @RequestParam(value = "id") Long id, @RequestParam(value = "action") Boolean action) {
        nestDevelopmentService.changeStatus(id, action);
    }

    @PostMapping(value = "")
    public NestDevelopmentDTO createNestDevelopment(@RequestBody NestDevelopmentDTO model) {
        return (NestDevelopmentDTO) nestDevelopmentService.save(model);
    }

}
