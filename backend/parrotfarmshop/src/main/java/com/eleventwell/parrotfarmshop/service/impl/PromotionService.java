package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.PromotionDTO;
import com.eleventwell.parrotfarmshop.dto.PromotionDTO;
import com.eleventwell.parrotfarmshop.entity.PromotionEntity;
import com.eleventwell.parrotfarmshop.entity.RoleEntity;
import com.eleventwell.parrotfarmshop.repository.PromotionRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
@Service
public class PromotionService implements IGenericService<PromotionDTO> {


    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private GenericConverter converter;

    @Override
    public List<PromotionDTO> findAll() {
        List<PromotionDTO> result = new ArrayList<>();
        List<PromotionEntity> entities = promotionRepository.findAllByOrderByIdDesc();

        for (PromotionEntity entity: entities
             ) {
            PromotionDTO promotionDTO = (PromotionDTO) converter.toDTO(entity, PromotionDTO.class);
            result.add(promotionDTO);

        }
        return result;
    }

    @Override
    public PromotionDTO save(PromotionDTO promotionDTO) {
        PromotionEntity promotionEntity = new PromotionEntity();
        if(promotionDTO.getId() != null){
            PromotionEntity oldEntity = promotionRepository.findOneById(promotionDTO.getId());
            promotionEntity = (PromotionEntity) converter.updateEntity(promotionDTO, oldEntity);
        }else{
            promotionEntity = (PromotionEntity) converter.toEntity(promotionDTO, PromotionEntity.class);
        }
        promotionRepository.save(promotionEntity);
        return (PromotionDTO) converter.toDTO(promotionEntity, PromotionDTO.class);
    }

    public PromotionDTO findOneByCode(String code){
        Date currentDate = Calendar.getInstance().getTime();
        PromotionDTO dto = new PromotionDTO();
        try{

             dto = (PromotionDTO)converter.toDTO(promotionRepository.findOneByCodeAndCheckValidDate(code,currentDate),PromotionDTO.class);

        }catch (Exception e){
            return null;
        }


    return dto;
    }
    public PromotionDTO findOneById(Long id){
        return (PromotionDTO) converter.toDTO(promotionRepository.findOneById(id),PromotionDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {
        PromotionEntity promotionEntity = promotionRepository.findOneById(ids);
        if(promotionEntity.getStatus() == true){
            promotionEntity.setStatus(false);
        }else{
            promotionEntity.setStatus(true);
        }
        promotionRepository.save(promotionEntity);
    }


    @Override
    public List<PromotionDTO> findAll(Pageable pageable){
        // TODO Auto-generated method stub
        List<PromotionDTO> results = new ArrayList();
        List<PromotionEntity> entities = promotionRepository.findAll(pageable).getContent();

        for(PromotionEntity item : entities) {
            PromotionDTO newDTO = (PromotionDTO) converter.toDTO(item,PromotionDTO.class);
            results.add(newDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int)promotionRepository.count();

    }



}
