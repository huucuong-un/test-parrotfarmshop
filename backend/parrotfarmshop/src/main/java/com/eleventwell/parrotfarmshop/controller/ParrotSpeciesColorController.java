package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesColorDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import com.eleventwell.parrotfarmshop.output.ListOutput;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import com.eleventwell.parrotfarmshop.service.impl.ParrotSpeciesColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/parrot-species-color")
public class ParrotSpeciesColorController {
    @Autowired
    private ParrotSpeciesColorService parrotSpeciesColorService;
    
    @GetMapping(value = "") 
    public List<ParrotSpeciesColorDTO> showParrotSpeciesColors() {
        ListOutput result = new ListOutput();
        
        result.setListResult(parrotSpeciesColorService.findAll());
        return result.getListResult();
    }
    @GetMapping(value = "find-one-by-id/{colorid}")
    public List<ParrotSpeciesColorDTO> getParrotSpeciesColorById(@PathVariable("colorid") Long colorid) {
        List<ParrotSpeciesColorDTO> list =  new ArrayList<>();
        list.add(parrotSpeciesColorService.findOneById(colorid));

        return list;
    }

    @GetMapping(value = "find-by-parrot-species-id/{id}")
    public List<ParrotSpeciesColorDTO> getParrotSpeciesColorsBySpeciesId(@PathVariable("id") Long id) {
        ListOutput result = new ListOutput();

        result.setListResult(parrotSpeciesColorService.findAllBySpeciesId(id));
        return result.getListResult();
    }
    @GetMapping(value = "find-by-parrot-id/{id}")
    public List<ParrotSpeciesColorDTO> getParrotSpeciesColorByParrotId(@PathVariable("id") Long id) {

        List<ParrotSpeciesColorDTO> list = new ArrayList<>();

        list.add(parrotSpeciesColorService.findOneByParrotId(id));
        return list;

    }


    @PostMapping(value = "")
    public ParrotSpeciesColorDTO createaPrrotSpeciesColor(@RequestBody ParrotSpeciesColorDTO model) {
        return (ParrotSpeciesColorDTO) parrotSpeciesColorService.save(model);
    }
    
    @PutMapping(value = "{id}")
    public ParrotSpeciesColorDTO updateaPrrotSpeciesColor(@RequestBody ParrotSpeciesColorDTO model, @PathVariable("id") long id) {
        model.setId(id);
        return (ParrotSpeciesColorDTO) parrotSpeciesColorService.save(model);
    }
    
    @DeleteMapping(value = "{id}")
    public void deleteaParrotSpeciesColor(@RequestBody @PathVariable("id") Long id) {
        parrotSpeciesColorService.changeStatus(id);
    }
}
