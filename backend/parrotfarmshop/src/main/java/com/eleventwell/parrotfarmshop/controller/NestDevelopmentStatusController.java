package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.Model.PagingModel;
import com.eleventwell.parrotfarmshop.dto.NestDevelopmentDTO;
import com.eleventwell.parrotfarmshop.dto.NestDevelopmentStatusDTO;
import com.eleventwell.parrotfarmshop.service.impl.NestDevelopmentService;
import com.eleventwell.parrotfarmshop.service.impl.NestDevelopmentStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/nest-development-status")
public class NestDevelopmentStatusController {
    @Autowired
    NestDevelopmentStatusService nestDevelopmentStatusService;

    @GetMapping(value = "")
    public PagingModel findAll(@RequestBody @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        PagingModel result = new PagingModel();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);

        List<NestDevelopmentStatusDTO> nestDevelopmentStatusDTO = nestDevelopmentStatusService.findAll(pageable);
        result.setListResult(nestDevelopmentStatusDTO);
        result.setTotalPage(((int) Math.ceil((double) (nestDevelopmentStatusService.totalItem()) / limit)));
        result.setLimit(limit);
        return result;

    }

    @PutMapping(value = "/admin/update-status")
    public void updateStatus(@RequestBody @RequestParam(value = "id") Long id) {
        nestDevelopmentStatusService.changeStatus(id);
    }

    @PostMapping(value = "")
    public NestDevelopmentStatusDTO createNestDevelopment(@RequestBody NestDevelopmentStatusDTO model) {
        return (NestDevelopmentStatusDTO) nestDevelopmentStatusService.save(model);
    }

    @PutMapping(value = "/admin/update-sequence")
    public void updateSequence(@RequestBody @RequestParam(value = "id") Long id, @RequestParam(value = "sequence") Integer sequence) {
        nestDevelopmentStatusService.changeSequence(id, sequence);
    }

    @DeleteMapping(value = "{id}")
    public void changeStatus(@RequestBody @PathVariable("id") long id){
        nestDevelopmentStatusService.changeStatus(id);
    }
}
