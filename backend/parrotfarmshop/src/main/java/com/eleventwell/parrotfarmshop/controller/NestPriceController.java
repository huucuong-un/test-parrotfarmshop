package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.NestDTO;
import com.eleventwell.parrotfarmshop.dto.NestPriceDTO;
import com.eleventwell.parrotfarmshop.service.impl.NestPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/nest-price")
public class NestPriceController {
    @Autowired
    private NestPriceService nestPriceService;

    @GetMapping
    public List<NestPriceDTO> showSpeciesEggPrie() {
        List<NestPriceDTO> results = new ArrayList<>();

        results = (nestPriceService.findAll());
        return results;
    }

    @GetMapping(value = "find-by-species-id")
    public NestPriceDTO findBySpeciesId(@RequestBody @RequestParam(value = "speciesId") Long speciesId) {

        return nestPriceService.findOneBySpeciesId(speciesId);
    }
//    @GetMapping(value = "find-by-species-id/{speciesId}")
//    public List<NestPriceDTO> findBySpeciesId(@RequestBody @PathVariable("speciesId") Long id) {
//        List<SpeciesEggPriceDTO> results = new ArrayList<>();
//
//        results = (nestPriceService.findAllBySpeciesId(id));
//        return results;
//    }


    @PostMapping
    public NestPriceDTO createRole(@RequestBody NestPriceDTO model) {
        return nestPriceService.save(model);
    }

    //accept editing description and status only
    @PutMapping(value = "{id}")
    public NestPriceDTO updateRole(@RequestBody NestPriceDTO model, @PathVariable("id") long id) {
        model.setId(id);
        return  nestPriceService.save(model);
    }

    @DeleteMapping(value = "{id}")
    public void changeStatus(@RequestBody @PathVariable("id") long id){
        nestPriceService.changeStatus(id);
    }
}
