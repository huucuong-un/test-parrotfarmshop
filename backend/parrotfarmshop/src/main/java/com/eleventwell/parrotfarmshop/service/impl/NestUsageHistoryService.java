package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.NestDevelopmentDTO;
import com.eleventwell.parrotfarmshop.dto.NestUsageHistoryDTO;
import com.eleventwell.parrotfarmshop.entity.NestDevelopmentEntity;
import com.eleventwell.parrotfarmshop.entity.NestEntity;
import com.eleventwell.parrotfarmshop.entity.NestUsageHistoryEntity;
import com.eleventwell.parrotfarmshop.repository.NestDevelopmentRepository;
import com.eleventwell.parrotfarmshop.repository.NestRepository;
import com.eleventwell.parrotfarmshop.repository.NestUsageHistoryRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NestUsageHistoryService implements IGenericService<NestUsageHistoryDTO>{
    @Autowired
    NestUsageHistoryRepository nestUsageHistoryRepository;

    @Autowired
    NestRepository nestRepository;

    @Autowired
    private GenericConverter genericConverter;


    @Override
    public List<NestUsageHistoryDTO> findAll() {
        List<NestUsageHistoryDTO> result = new ArrayList<>();
        List<NestUsageHistoryEntity> nestUsageHistoryEntityList = nestUsageHistoryRepository.findAllByOrderByIdDesc();

        for (NestUsageHistoryEntity entity : nestUsageHistoryEntityList) {
            NestUsageHistoryDTO nestUsageHistoryDTO = (NestUsageHistoryDTO) genericConverter.toDTO(entity, NestUsageHistoryDTO.class);
            result.add(nestUsageHistoryDTO);
        }
        return result;
    }

    @Override
    public NestUsageHistoryDTO save(NestUsageHistoryDTO DTO) {
        NestUsageHistoryEntity nestUsageHistoryEntity = new NestUsageHistoryEntity();
        if (DTO.getId() != null) {
            NestUsageHistoryEntity oldEntity = nestUsageHistoryRepository.findOneById(DTO.getId());
            nestUsageHistoryEntity = (NestUsageHistoryEntity) genericConverter.updateEntity(DTO, oldEntity);
        } else {
            nestUsageHistoryEntity = (NestUsageHistoryEntity) genericConverter.toEntity(DTO, NestUsageHistoryEntity.class);
        }

        NestEntity nestEntity = nestRepository.findOneById(DTO.getNestId());
        nestUsageHistoryRepository.save(nestUsageHistoryEntity);
        nestEntity.setStatus(false);
        nestRepository.save(nestEntity);
        return (NestUsageHistoryDTO) genericConverter.toDTO(nestUsageHistoryEntity, NestUsageHistoryDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {


    }
    public void delete(Long id){
        nestUsageHistoryRepository.deleteById(id);
    }

    @Override
    public int totalItem() {
        return (int)nestUsageHistoryRepository.count();
    }

    @Override
    public List<NestUsageHistoryDTO> findAll(Pageable pageable) {
        List<NestUsageHistoryDTO> result = new ArrayList<>();
        List<NestUsageHistoryEntity> nestUsageHistoryEntityList = nestUsageHistoryRepository.findAll(pageable).getContent();

        for (NestUsageHistoryEntity entity: nestUsageHistoryEntityList) {
            NestUsageHistoryDTO nestUsageHistoryDTO = (NestUsageHistoryDTO) genericConverter.toDTO(entity, NestUsageHistoryDTO.class);
            result.add(nestUsageHistoryDTO);
        }

        return result;
    }
}
