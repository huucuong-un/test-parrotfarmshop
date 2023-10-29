package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.DeliveryInformationDTO;
import com.eleventwell.parrotfarmshop.dto.FAQsDTO;
import com.eleventwell.parrotfarmshop.entity.DeliveryInformationEntity;
import com.eleventwell.parrotfarmshop.entity.FAQEntity;
import com.eleventwell.parrotfarmshop.repository.FAQsRepositoty;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class FAQsService  implements IGenericService<FAQsDTO> {

    @Autowired
    private FAQsRepositoty faqsRepository;

    @Autowired
    private GenericConverter converter;



    @Override
    public List findAll() {
        List<FAQsDTO> result = new ArrayList<>();
        List<FAQEntity> entities = faqsRepository.findAllByOrderByIdDesc();

        for (FAQEntity entity: entities
             ) {
            FAQsDTO faQsDTO = (FAQsDTO) converter.toDTO(entity, FAQsDTO.class);
            result.add(faQsDTO);
        }
        return result;
    }

    @Override
    public FAQsDTO save(FAQsDTO faQsDTO) {
        FAQEntity faqEntity = new FAQEntity();
        if(faQsDTO.getStatus() == null){
            faQsDTO.setStatus(false);
        }
        if(faQsDTO.getId() != null){
            FAQEntity oldEntity = faqsRepository.findOneById(faQsDTO.getId());
            faqEntity = (FAQEntity) converter.updateEntity(faQsDTO, oldEntity);
        }else{
            faqEntity = (FAQEntity) converter.toEntity(faQsDTO, FAQEntity.class);
        }

        faqsRepository.save(faqEntity);
        return (FAQsDTO) converter.toDTO(faqEntity, FAQsDTO.class);
    }



    @Override
    public void changeStatus(Long ids) {
        FAQEntity faqEntity = faqsRepository.findOneById(ids);
        if(faqEntity.getStatus() == true){
            faqEntity.setStatus(false);
        }else{
            faqEntity.setStatus(true);
        }
        faqsRepository.save(faqEntity);
    }
    @Override
    public List<FAQsDTO> findAll(Pageable pageable){
        // TODO Auto-generated method stub
        List<FAQsDTO> results = new ArrayList();
        List<FAQEntity> entities = faqsRepository.findAll(pageable).getContent();

        for(FAQEntity item : entities) {
            FAQsDTO newDTO = (FAQsDTO) converter.toDTO(item,FAQsDTO.class);
            results.add(newDTO);

        }

        return results;
    }

    @Override
    public int totalItem() {
        return (int)faqsRepository.count();
    }


}
