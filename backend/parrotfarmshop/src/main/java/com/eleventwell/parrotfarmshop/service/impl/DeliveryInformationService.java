package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.DeliveryInformationDTO;
import com.eleventwell.parrotfarmshop.entity.DeliveryInformationEntity;
import com.eleventwell.parrotfarmshop.repository.DeliveryInformationRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeliveryInformationService implements IGenericService<DeliveryInformationDTO> {
    @Autowired
    GenericConverter converter;

    @Autowired
    DeliveryInformationRepository deliveryInformationRepository;


    @Override
    public List<DeliveryInformationDTO> findAll() {
        List<DeliveryInformationDTO> results = new ArrayList<>();
        List<DeliveryInformationEntity> entities = deliveryInformationRepository.findAllByOrderByIdDesc();

        for (DeliveryInformationEntity entity:
             entities) {
            results.add((DeliveryInformationDTO) converter.toDTO(entity, DeliveryInformationDTO.class));
        }


        return results;
    }

    @Override
    public DeliveryInformationDTO save(DeliveryInformationDTO deliveryInformationDTO) {
        DeliveryInformationEntity deliveryInformationEntity = new DeliveryInformationEntity();

        if (deliveryInformationDTO.getId() != null) {
            DeliveryInformationEntity oldEntity = deliveryInformationRepository.findOneById(deliveryInformationDTO.getId());
            deliveryInformationEntity = (DeliveryInformationEntity) converter.updateEntity(deliveryInformationDTO, oldEntity);

        } else {
            deliveryInformationEntity = (DeliveryInformationEntity) converter.toEntity(deliveryInformationDTO , deliveryInformationEntity.getClass());
        }

        deliveryInformationRepository.save(deliveryInformationEntity);
        return (DeliveryInformationDTO) converter.toDTO(deliveryInformationEntity, DeliveryInformationDTO.class);


    }

    @Override
    public void changeStatus(Long ids) {
        DeliveryInformationEntity deliveryInformationEntity = deliveryInformationRepository.findOneById(ids);
        if(deliveryInformationEntity.getStatus() == true ) {
            deliveryInformationEntity.setStatus(false);
        } else {
            deliveryInformationEntity.setStatus(false);
        }

        deliveryInformationRepository.save(deliveryInformationEntity);
    }

    public List<DeliveryInformationDTO> getDeliveryInformationByCustomerId(Long userId) {
        List<DeliveryInformationDTO> results = new ArrayList<>();
        List<DeliveryInformationEntity> entities = deliveryInformationRepository.findAllByUserId(userId);
        for (DeliveryInformationEntity entity: entities) {
            DeliveryInformationDTO dto = (DeliveryInformationDTO) converter.toDTO(entity, DeliveryInformationDTO.class);
            results.add(dto);
        }

        return results;
    }
    public DeliveryInformationDTO findDeliveryInfoById(Long id) {
        return (DeliveryInformationDTO)converter.toDTO(deliveryInformationRepository.findOneById(id), DeliveryInformationDTO.class);
    }


    public DeliveryInformationDTO getDeliveryInformationByCustomerIdWithTruePickingStatus(Long customerId) {
        return (DeliveryInformationDTO)converter.toDTO(deliveryInformationRepository.findOneByIdWithTruePickStatus(customerId), DeliveryInformationDTO.class) ; //Find delivery info with picking status true/ just one true/time/user
    }

    public DeliveryInformationDTO updatePickingStatus(Long deliveryInfoId, Long customerId) {
        List<DeliveryInformationDTO> list = getDeliveryInformationByCustomerId(customerId);
        DeliveryInformationDTO deliveryInformationDTO = findDeliveryInfoById(deliveryInfoId);
        for (DeliveryInformationDTO dto:
             list) {
            dto.setPickingStatus(false);
            deliveryInformationRepository.save((DeliveryInformationEntity) converter.toEntity(dto, DeliveryInformationEntity.class));
        }

        deliveryInformationDTO.setPickingStatus(true);
        deliveryInformationRepository.save((DeliveryInformationEntity) converter.toEntity(deliveryInformationDTO, DeliveryInformationEntity.class));

        return  deliveryInformationDTO;
    }


    @Override
    public List<DeliveryInformationDTO> findAll(Pageable pageable){
        // TODO Auto-generated method stub
        List<DeliveryInformationDTO> results = new ArrayList();
        List<DeliveryInformationEntity> entities = deliveryInformationRepository.findAll(pageable).getContent();

        for(DeliveryInformationEntity item : entities) {
            DeliveryInformationDTO newDTO = (DeliveryInformationDTO) converter.toDTO(item,DeliveryInformationDTO.class);
            results.add(newDTO);

        }

        return results;
    }

    @Override
    public int totalItem() {
        return (int)deliveryInformationRepository.count();
    }



}
