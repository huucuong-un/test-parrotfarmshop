/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.service.impl;

//import com.eleventwell.parrotfarmshop.converter.ParrotConverter;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.ParrotDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import com.eleventwell.parrotfarmshop.repository.ParrotRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesColorRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

/**
 * @author Admin
 */
@Service
public class ParrotService implements IGenericService<ParrotDTO> {


    @Autowired
    private ParrotRepository parrotRepository;

    @Autowired
    private ParrotSpeciesColorRepository parrotSpeciesColorRepository;

    @Autowired
    private GenericConverter parrotConverter;


    @Override
    public List<ParrotDTO> findAll() {
        List<ParrotDTO> result = new ArrayList<>();
        List<ParrotEntity> entities = parrotRepository.findAllByOrderByIdDesc();

        for (ParrotEntity entity : entities) {
            ParrotDTO dto = (ParrotDTO) parrotConverter.toDTO(entity, ParrotDTO.class);
            result.add(dto);

        }

        return result;
    }

    @Override
    public ParrotDTO save(ParrotDTO parrotDTO) {
        ParrotEntity parrotEntity = new ParrotEntity();

        if (parrotDTO.getId() != null) {
            ParrotEntity oldEntity = parrotRepository.findOneById(parrotDTO.getId());
            parrotEntity = (ParrotEntity) parrotConverter.toEntity(parrotDTO, ParrotEntity.class);


        } else {
            parrotEntity = (ParrotEntity) parrotConverter.toEntity(parrotDTO, ParrotEntity.class);
        }
        parrotEntity.setParrotSpeciesColor(parrotSpeciesColorRepository.findOneById(parrotDTO.getColorID()));
        // parrotEntity.setOwner();
        //parrotEntity.setParrotEggNest(parrotEggNest);
        parrotRepository.save(parrotEntity);
        return (ParrotDTO) parrotConverter.toDTO(parrotEntity, ParrotDTO.class);
    }

    @Override
    public void changeStatus(Long id) {
        ParrotEntity parrotEntity = parrotRepository.findOneById(id);
        if (parrotEntity.getStatus() == true) {
            parrotEntity.setStatus(false);
        } else {
            parrotEntity.setStatus(true);
        }
        parrotRepository.save(parrotEntity);
    }

    public Long countAvaiableParrotById(Long id) {
        return parrotRepository.countAllBySaleStatusAndStatusAndParrotSpeciesColorId(true, true, id);
    }

    public void changeSaleStatus(Long id) {
        ParrotEntity entity = parrotRepository.findOneById(id);
        if (entity.getSaleStatus() == true) {
            entity.setSaleStatus(false);

        } else {
            entity.setSaleStatus(true);
        }
        parrotRepository.save(entity);
    }

    public void changeHealthStatus(Long id) {
        ParrotEntity parrotEntity = parrotRepository.findOneById(id);
        if (parrotEntity.getHealthStatus() == true) {
            parrotEntity.setHealthStatus(false);
        } else {
            parrotEntity.setHealthStatus(true);
        }
        parrotRepository.save(parrotEntity);
    }

    public void changePregnancyStatus(Long id) {
        ParrotEntity parrotEntity = parrotRepository.findOneById(id);
        if (parrotEntity.getPregnancyStatus() == true) {
            parrotEntity.setHealthStatus(false);
        } else {
            parrotEntity.setHealthStatus(true);
        }
        parrotRepository.save(parrotEntity);
    }

    @Override
    public List<ParrotDTO> findAll(Pageable pageable) {
        // TODO Auto-generated method stub
        List<ParrotDTO> results = new ArrayList();
        List<ParrotEntity> entities = parrotRepository.findAll(pageable).getContent();

        for (ParrotEntity item : entities) {
            ParrotDTO newDTO = (ParrotDTO) parrotConverter.toDTO(item, ParrotDTO.class);
            results.add(newDTO);

        }

        return results;
    }

    @Override
    public int totalItem() {
        return (int) parrotRepository.count();
    }

    public List<ParrotDTO> searchSortForAdmin(Integer age,
                                              Boolean status,
                                              Boolean pregnancyStatus,
                                              Boolean healthStatus,
                                              Boolean saleStatus,
                                              Long numberOfChildren,
                                              Boolean gender,

                                              Date searchDate,
                                              String sortAge,
                                              String sortNumberOfChildren,

                                              String sortGender,
                                              String sortDate,
                                              Pageable pageable) {
        List<ParrotDTO> results = new ArrayList<>();
        List<ParrotEntity> entities = parrotRepository.searchSortForAdmin(age, status, pregnancyStatus, healthStatus, saleStatus, numberOfChildren,
                gender, searchDate, sortAge, sortNumberOfChildren,
                sortGender, sortDate, pageable);
        for (ParrotEntity parrotEntity : entities
        ) {
            ParrotDTO newDTO = (ParrotDTO) parrotConverter.toDTO(parrotEntity, ParrotDTO.class);
            results.add(newDTO);
        }
        return results;
    }
}
