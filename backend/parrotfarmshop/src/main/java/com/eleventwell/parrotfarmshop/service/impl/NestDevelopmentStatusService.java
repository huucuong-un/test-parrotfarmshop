package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.NestDevelopmentDTO;
import com.eleventwell.parrotfarmshop.dto.NestDevelopmentStatusDTO;
import com.eleventwell.parrotfarmshop.entity.NestDevelopmentEntity;
import com.eleventwell.parrotfarmshop.entity.NestDevelopmentStatusEntity;
import com.eleventwell.parrotfarmshop.entity.PostEntity;
import com.eleventwell.parrotfarmshop.repository.NestDevelopmentRepository;
import com.eleventwell.parrotfarmshop.repository.NestDevelopmentStatusRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NestDevelopmentStatusService implements IGenericService<NestDevelopmentStatusDTO> {
    @Autowired
    NestDevelopmentStatusRepository nestDevelopmentStatusRepository;

    @Autowired
    private GenericConverter genericConverter;



    public NestDevelopmentStatusDTO findOneById(long ids) {
        NestDevelopmentStatusEntity nestDevelopmentStatusEntity = nestDevelopmentStatusRepository.findOneById(ids);
        NestDevelopmentStatusDTO nestDevelopmentStatusDTO = (NestDevelopmentStatusDTO) genericConverter.toDTO(nestDevelopmentStatusEntity, NestDevelopmentStatusDTO.class);
        return nestDevelopmentStatusDTO;
    }


    @Override
    public List<NestDevelopmentStatusDTO> findAll() {
        List<NestDevelopmentStatusDTO> result = new ArrayList<>();
        List<NestDevelopmentStatusEntity> nestDevelopmentStatusEntityList = nestDevelopmentStatusRepository.findAll();

        for (NestDevelopmentStatusEntity entity: nestDevelopmentStatusEntityList) {
            NestDevelopmentStatusDTO nestDevelopmentStatusDTO = (NestDevelopmentStatusDTO) genericConverter.toDTO(entity, NestDevelopmentStatusDTO.class);
            result.add(nestDevelopmentStatusDTO);
        }

        return result;
    }

    @Override
    public NestDevelopmentStatusDTO save(NestDevelopmentStatusDTO DTO) {
        NestDevelopmentStatusEntity nestDevelopmentStatusEntity = new NestDevelopmentStatusEntity();
        if (DTO.getId() != null) {
            NestDevelopmentStatusEntity oldEntity = nestDevelopmentStatusRepository.findOneById(DTO.getId());
            nestDevelopmentStatusEntity = (NestDevelopmentStatusEntity) genericConverter.updateEntity(DTO, oldEntity);
        } else {
            nestDevelopmentStatusEntity = (NestDevelopmentStatusEntity) genericConverter.toEntity(DTO, NestDevelopmentStatusEntity.class);
        }
        int countObject = (int) nestDevelopmentStatusRepository.count();
        nestDevelopmentStatusEntity.setSequence(countObject + 1);
        nestDevelopmentStatusRepository.save(nestDevelopmentStatusEntity);
        return (NestDevelopmentStatusDTO) genericConverter.toDTO(nestDevelopmentStatusEntity, NestDevelopmentStatusDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {
        NestDevelopmentStatusEntity nestDevelopmentStatusEntity = nestDevelopmentStatusRepository.findOneById(ids);
        if (nestDevelopmentStatusEntity.getAvailable() == true) {
            nestDevelopmentStatusEntity.setAvailable(false);
        } else {
            nestDevelopmentStatusEntity.setAvailable(true);
        }
        nestDevelopmentStatusRepository.save(nestDevelopmentStatusEntity);
    }

    public void changeSequence(Long ids, Integer newSequence) {
        NestDevelopmentStatusEntity nestDevelopmentStatusEntity = nestDevelopmentStatusRepository.findOneById(ids);

        nestDevelopmentStatusEntity.setSequence(newSequence);

        nestDevelopmentStatusRepository.save(nestDevelopmentStatusEntity);
    }


    @Override
    public int totalItem() {
        return (int)nestDevelopmentStatusRepository.count();
    }

    @Override
    public List<NestDevelopmentStatusDTO> findAll(Pageable pageable) {
        List<NestDevelopmentStatusDTO> result = new ArrayList<>();
        List<NestDevelopmentStatusEntity> nestDevelopmentStatusEntityList = nestDevelopmentStatusRepository.findAll(pageable).getContent();

        for (NestDevelopmentStatusEntity entity: nestDevelopmentStatusEntityList) {
            NestDevelopmentStatusDTO nestDevelopmentStatusDTO = (NestDevelopmentStatusDTO) genericConverter.toDTO(entity, NestDevelopmentStatusDTO.class);
            result.add(nestDevelopmentStatusDTO);
        }

        return result;
    }
    }



