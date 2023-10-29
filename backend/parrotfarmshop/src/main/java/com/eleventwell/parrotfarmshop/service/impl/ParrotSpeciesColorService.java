/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.service.impl;

//import com.eleventwell.parrotfarmshop.converter.ParrotSpeciesColorConverter;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.ParrotDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesColorDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesColorEntity;
//import com.eleventwell.parrotfarmshop.repository.GenericsRepository;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import com.eleventwell.parrotfarmshop.repository.ParrotRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesColorRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @author Admin
 */
@Service
public class ParrotSpeciesColorService implements IGenericService<ParrotSpeciesColorDTO> {

    @Autowired
    private ParrotSpeciesColorRepository parrotSpeciesColorRepository;

    @Autowired
    private ParrotSpeciesRepository parrotSpeciesRepository;

    //@Autowired
    //private ParrotSpeciesColorConverter parrotSpeciesColorConverter;

    @Autowired
    private ParrotRepository parrotRepository;

    @Autowired
    private GenericConverter converter;


    @Override
    public List<ParrotSpeciesColorDTO> findAll() {
        // Implement logic to retrieve all ParrotSpeciesColor entities and convert them to DTOs
        List<ParrotSpeciesColorDTO> results = new ArrayList<>();
        List<ParrotSpeciesColorEntity> entities = parrotSpeciesColorRepository.findAllByOrderByIdDesc();

        for (ParrotSpeciesColorEntity entity : entities) {
            ParrotSpeciesColorDTO parrotSpeciesColorDTO = (ParrotSpeciesColorDTO) converter.toDTO(entity, ParrotSpeciesColorDTO.class);
            results.add(parrotSpeciesColorDTO);
        }

        return results;
    }

    @Override
    public ParrotSpeciesColorDTO save(ParrotSpeciesColorDTO parrotSpeciesColorDTO) {
        // Implement logic to save or update ParrotSpeciesColor entities
        ParrotSpeciesColorEntity parrotSpeciesColorEntity = new ParrotSpeciesColorEntity();
        if (parrotSpeciesColorDTO.getId() != null) {
            ParrotSpeciesColorEntity oldEntity = parrotSpeciesColorRepository.findOneById(parrotSpeciesColorDTO.getId());
            parrotSpeciesColorEntity = (ParrotSpeciesColorEntity) converter.updateEntity(parrotSpeciesColorDTO, oldEntity);
        } else {
            parrotSpeciesColorEntity = (ParrotSpeciesColorEntity) converter.toEntity(parrotSpeciesColorDTO, ParrotSpeciesColorEntity.class);
        }
//        ParrotSpeciesEntity parrotSpeciesEntity = parrotSpeciesRepository.findOneById(parrotSpeciesColorDTO.getSpeciesID());
//        parrotSpeciesColorEntity.setParrotSpecies(parrotSpeciesEntity);
        parrotSpeciesColorEntity = parrotSpeciesColorRepository.save(parrotSpeciesColorEntity);
        return (ParrotSpeciesColorDTO) (ParrotSpeciesColorDTO) converter.toDTO(parrotSpeciesColorEntity, ParrotSpeciesColorDTO.class);
    }

    @Override
    public void changeStatus(Long id) {

        ParrotSpeciesColorEntity parrotSpeciesColorEntity = parrotSpeciesColorRepository.findOneById(id);
        if(parrotSpeciesColorEntity.getStatus() == true){
            parrotSpeciesColorEntity.setStatus(false);
        }else{
            parrotSpeciesColorEntity.setStatus(true);
        }
        parrotSpeciesColorRepository.save(parrotSpeciesColorEntity);





    }
    public  ParrotSpeciesColorDTO findOneByParrotId(Long id) {
        return (ParrotSpeciesColorDTO) converter.toDTO(parrotSpeciesColorRepository.findOneById(parrotRepository.findOneById(id).getParrotSpeciesColor().getId()), ParrotSpeciesColorDTO.class);
    }

    public List<ParrotSpeciesColorDTO> findAllBySpeciesId(Long id) {
        List<ParrotSpeciesColorEntity> entities = parrotSpeciesColorRepository.findAllByParrotSpeciesIdOrderByIdDesc(id);
        List<ParrotSpeciesColorDTO>  result = new ArrayList<>();
        for (ParrotSpeciesColorEntity entity:
             entities) {
            ParrotSpeciesColorDTO dto = (ParrotSpeciesColorDTO) converter.toDTO(entity, ParrotSpeciesColorDTO.class);
            result.add(dto);
        }
        return result;
    }
    @Override
    public List<ParrotSpeciesColorDTO> findAll(Pageable pageable){
        // TODO Auto-generated method stub
        List<ParrotSpeciesColorDTO> results = new ArrayList();
        List<ParrotSpeciesColorEntity> entities = parrotSpeciesColorRepository.findAll(pageable).getContent();

        for(ParrotSpeciesColorEntity item : entities) {
            ParrotSpeciesColorDTO newDTO = (ParrotSpeciesColorDTO) converter.toDTO(item, ParrotSpeciesColorDTO.class);
            results.add(newDTO);
        }

        return results;
    }


    public ParrotSpeciesColorDTO findOneById(Long id){
        return (ParrotSpeciesColorDTO) converter.toDTO(parrotSpeciesColorRepository.findOneById(id),ParrotSpeciesColorDTO.class);

    }


    @Override
    public int totalItem() {
        return (int)parrotSpeciesColorRepository.count();
    }
}
