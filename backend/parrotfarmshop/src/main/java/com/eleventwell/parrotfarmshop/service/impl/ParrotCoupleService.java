package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.OrderDTO;
import com.eleventwell.parrotfarmshop.dto.ParrotCoupleDTO;
import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotCoupleEntity;
import com.eleventwell.parrotfarmshop.repository.ParrotCoupleRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParrotCoupleService implements IGenericService<ParrotCoupleDTO> {

    @Autowired
    ParrotCoupleRepository parrotCoupleRepository;

    @Autowired
    GenericConverter genericConverter;

    @Override
    public List<ParrotCoupleDTO> findAll() {
        List<ParrotCoupleDTO> results = new ArrayList();
        List<ParrotCoupleEntity> entities = parrotCoupleRepository.findAll();

        for(ParrotCoupleEntity item : entities) {
            ParrotCoupleDTO newDTO = (ParrotCoupleDTO) genericConverter.toDTO(item,ParrotCoupleDTO.class);
            results.add(newDTO);

        }

        return results;


    }

    @Override
    public ParrotCoupleDTO save(ParrotCoupleDTO DTO) {
        ParrotCoupleEntity entity = new ParrotCoupleEntity();
        entity = (ParrotCoupleEntity) genericConverter.toEntity(DTO, ParrotCoupleEntity.class);

        parrotCoupleRepository.save(entity);

        return (ParrotCoupleDTO) genericConverter.toDTO(entity, ParrotCoupleDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {

        ParrotCoupleEntity entity = parrotCoupleRepository.findOneById(ids);
        if(entity.getStatus()==true){
            entity.setStatus(false);
        }else{
            entity.setStatus(true);

        }

    }

    @Override
    public int totalItem() {
        return (int)parrotCoupleRepository.count();
    }

    @Override
    public List<ParrotCoupleDTO> findAll(Pageable pageable) {
        List<ParrotCoupleDTO> results = new ArrayList();
        List<ParrotCoupleEntity> entities = parrotCoupleRepository.findAllByOrderByIdDesc(pageable);

        for(ParrotCoupleEntity item : entities) {
            ParrotCoupleDTO newDTO = (ParrotCoupleDTO) genericConverter.toDTO(item,ParrotCoupleDTO.class);
            results.add(newDTO);

        }

        return results;

    }
}
