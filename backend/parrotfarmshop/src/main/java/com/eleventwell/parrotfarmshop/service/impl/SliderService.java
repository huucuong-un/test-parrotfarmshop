package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.SliderDTO;
import com.eleventwell.parrotfarmshop.entity.SliderEntity;
import com.eleventwell.parrotfarmshop.repository.SliderRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class SliderService implements IGenericService<SliderDTO> {

    @Autowired
    SliderRepository sliderRepository;

    @Autowired
    private GenericConverter genericConverter;

    @Override
    public List<SliderDTO> findAll() {
        List<SliderDTO> result = new ArrayList<>();
        List<SliderEntity> sliderEntities = sliderRepository.findAllByOrderByIdDesc();

        for (SliderEntity entity : sliderEntities
        ) {
            SliderDTO sliderDTO = (SliderDTO) genericConverter.toDTO(entity, SliderDTO.class);
            result.add(sliderDTO);

        }
        return result;
    }

    @Override
    public SliderDTO save(SliderDTO sliderDTO) {
        SliderEntity sliderEntity = new SliderEntity();
        if (sliderDTO.getId() != null) {
            SliderEntity oldEntity = sliderRepository.findOneById(sliderDTO.getId());
            sliderEntity = (SliderEntity) genericConverter.updateEntity(sliderDTO, oldEntity);
        } else {
            sliderEntity = (SliderEntity) genericConverter.toEntity(sliderDTO, SliderEntity.class);
        }
        sliderRepository.save(sliderEntity);
        return (SliderDTO) genericConverter.toDTO(sliderEntity, SliderDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {
        SliderEntity sliderEntity = sliderRepository.findOneById(ids);
        if (sliderEntity.getStatus() == true) {
            sliderEntity.setStatus(false);
        } else {
            sliderEntity.setStatus(true);
        }
        sliderRepository.save(sliderEntity);
    }
    public SliderDTO findOneById(Long id){
        return (SliderDTO) genericConverter.toDTO(sliderRepository.findOneById(id),SliderDTO.class);
    }

    @Override
    public List<SliderDTO> findAll(Pageable pageable){
        // TODO Auto-generated method stub
        List<SliderDTO> results = new ArrayList();
        List<SliderEntity> entities = sliderRepository.findAll(pageable).getContent();

        for(SliderEntity item : entities) {
            SliderDTO newDTO = (SliderDTO) genericConverter.toDTO(item,SliderDTO.class);
            results.add(newDTO);
        }
        return results;
    }

    public List<SliderDTO> searchSortForAdmin(Date searchDate, Boolean status ,String slidername, String sortDate,Pageable pageable ){
        List<SliderDTO> results = new ArrayList<>();
        List<SliderEntity> entities = sliderRepository.searchSortForAdmin(searchDate, status, slidername, sortDate, pageable);
        for (SliderEntity sliderEntity : entities
             ) {
            SliderDTO newDTO = (SliderDTO) genericConverter.toDTO(sliderEntity, SliderDTO.class);
            results.add(newDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int)sliderRepository.count();
    }
}
