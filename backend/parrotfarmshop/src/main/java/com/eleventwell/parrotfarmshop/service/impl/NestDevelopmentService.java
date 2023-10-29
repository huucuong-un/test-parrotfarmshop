package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.NestDevelopmentDTO;
import com.eleventwell.parrotfarmshop.dto.SliderDTO;
import com.eleventwell.parrotfarmshop.entity.NestDevelopmentEntity;
import com.eleventwell.parrotfarmshop.entity.NestDevelopmentStatusEntity;
import com.eleventwell.parrotfarmshop.entity.SliderEntity;
import com.eleventwell.parrotfarmshop.repository.NestDevelopmentRepository;
import com.eleventwell.parrotfarmshop.repository.NestDevelopmentStatusRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NestDevelopmentService implements IGenericService<NestDevelopmentDTO> {

    @Autowired
    NestDevelopmentRepository nestDevelopmentRepository;

    @Autowired
    private GenericConverter genericConverter;

    @Autowired
    NestDevelopmentStatusRepository nestDevelopmentStatusRepository;


    @Override
    public List<NestDevelopmentDTO> findAll() {
        List<NestDevelopmentDTO> result = new ArrayList<>();
        List<NestDevelopmentEntity> nestDevelopmentEntities = nestDevelopmentRepository.findAllByOrderByIdDesc();

        for (NestDevelopmentEntity entity : nestDevelopmentEntities) {
            NestDevelopmentDTO nestDevelopmentDTO = (NestDevelopmentDTO) genericConverter.toDTO(entity, NestDevelopmentDTO.class);
            result.add(nestDevelopmentDTO);
        }
    return result;
    }

    @Override
    public NestDevelopmentDTO save(NestDevelopmentDTO DTO) {
        NestDevelopmentEntity nestDevelopmentEntity = new NestDevelopmentEntity();
        if (DTO.getId() != null) {
            NestDevelopmentEntity oldEntity = nestDevelopmentRepository.findOneById(DTO.getId());
            nestDevelopmentEntity = (NestDevelopmentEntity) genericConverter.updateEntity(DTO, oldEntity);
        } else {
            nestDevelopmentEntity = (NestDevelopmentEntity) genericConverter.toEntity(DTO, NestDevelopmentEntity.class);
        }
        nestDevelopmentEntity.setNestDevelopmentStatus(nestDevelopmentStatusRepository.findOneById(DTO.getStatusId()));
        nestDevelopmentRepository.save(nestDevelopmentEntity);
        return (NestDevelopmentDTO) genericConverter.toDTO(nestDevelopmentEntity, NestDevelopmentDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {

    }


    public void changeStatus(Long ids, Boolean action) {
    NestDevelopmentEntity nestDevelopmentEntity = nestDevelopmentRepository.findOneById(ids);
        NestDevelopmentStatusEntity nestDevelopmentStatusEntity= new NestDevelopmentStatusEntity();
        if(action == true) {
         nestDevelopmentStatusEntity = nestDevelopmentStatusRepository.findOneById(nestDevelopmentEntity.getNestDevelopmentStatus().getId() + 1);
    } else {
         nestDevelopmentStatusEntity = nestDevelopmentStatusRepository.findOneById(nestDevelopmentEntity.getNestDevelopmentStatus().getId() - 1);
    }

    nestDevelopmentEntity.setNestDevelopmentStatus(nestDevelopmentStatusEntity);
        nestDevelopmentRepository.save(nestDevelopmentEntity);
    }

    @Override
    public int totalItem() {
        return (int)nestDevelopmentRepository.count();
    }

    @Override
    public List<NestDevelopmentDTO> findAll(Pageable pageable) {
        List<NestDevelopmentDTO> result = new ArrayList<>();
        List<NestDevelopmentEntity> nestDevelopmentEntityList = nestDevelopmentRepository.findAll(pageable).getContent();

        for (NestDevelopmentEntity entity: nestDevelopmentEntityList) {
            NestDevelopmentDTO nestDevelopmentDTO = (NestDevelopmentDTO) genericConverter.toDTO(entity, NestDevelopmentDTO.class);
            result.add(nestDevelopmentDTO);
        }

        return result;
    }
}
