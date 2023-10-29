package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.dto.ParrotColorImageDTO;
import com.eleventwell.parrotfarmshop.service.impl.ParrotColorImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/color-image")
public class ParrotColorImageController {

    @Autowired
    ParrotColorImageService parrotColorImageService;

    @PostMapping("/find-by-color/{colorId}")
    public List<ParrotColorImageDTO> getImagesByColorId(@PathVariable("colorId") Long colorId ) {
        if (colorId == null) return null;
        return parrotColorImageService.findAllByColorId(colorId);
    }

    @PostMapping
    public ParrotColorImageDTO addImage(@RequestBody ParrotColorImageDTO image){
        return parrotColorImageService.save(image);
    }

    @PostMapping("/find-by-species/{speciesId}")
    public List<ParrotColorImageDTO> getImagesDTOBySpeciesId(@PathVariable("speciesId") Long speciesId ) {
        if (speciesId == null) return null;
        return parrotColorImageService.findAllBySpeciesId(speciesId);
    }

    @PostMapping("/find-by-species/images/{speciesId}")
    public List<String> getImagesBySpeciesId(@PathVariable("speciesId") Long speciesId ) {
        if (speciesId == null) return null;
        return parrotColorImageService.findAllImagesBySpeciesId(speciesId);
    }

    @DeleteMapping("/delete-image/{imageId}")
    public Boolean deleteImageById(@PathVariable("imageId") Long imageId) {
        if (imageId == null) return false;
        parrotColorImageService.deleteImage(imageId);
        return true;
    }
}
