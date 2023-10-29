package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.NestPriceDTO;
import com.eleventwell.parrotfarmshop.entity.NestPriceEntity;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesRepository;
import com.eleventwell.parrotfarmshop.repository.NestPriceRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NestPriceService implements IGenericService<NestPriceDTO> {
    @Autowired
    NestPriceRepository nestPriceRepository;

    @Autowired
    ParrotSpeciesRepository parrotSpeciesRepository;

    @Autowired
    GenericConverter converter;

    @Override
    public List<NestPriceDTO> findAll() {
        List<NestPriceEntity> nestPriceEntities = nestPriceRepository.findAllByOrderByIdDesc();
        List<NestPriceDTO> nestPriceDTOs = new ArrayList<>();

        for (NestPriceEntity entity : nestPriceEntities) {
            NestPriceDTO dto = (NestPriceDTO) converter.toDTO(entity, NestPriceDTO.class);
            nestPriceDTOs.add(dto);
        }
        return nestPriceDTOs;

    }

    @Override
    public NestPriceDTO save(NestPriceDTO dto) {
        NestPriceEntity nestPriceEntity = new NestPriceEntity();
        if(dto.getStatus() == null){
            dto.setStatus(false);
        }
        if (dto.getId() != null) {
            NestPriceEntity oldEntity = nestPriceRepository.findOneById(dto.getId());
            nestPriceEntity = (NestPriceEntity) converter.updateEntity(dto, oldEntity);
        } else {
            nestPriceEntity = (NestPriceEntity) converter.toEntity(dto, nestPriceEntity.getClass());
        }
        nestPriceEntity.setParrotSpecies(parrotSpeciesRepository.findOneById(dto.getSpeciesId()));
        nestPriceRepository.save(nestPriceEntity);
        return (NestPriceDTO) converter.toDTO(nestPriceEntity, NestPriceDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {
        NestPriceEntity nestEntity = nestPriceRepository.findOneById(ids);
        if (nestEntity.getStatus() == true) {
            nestEntity.setStatus(false);
        } else {
            nestEntity.setStatus(true);
        }
        nestPriceRepository.save(nestEntity);
    }

    @Override
    public List<NestPriceDTO> findAll(Pageable pageable){
        // TODO Auto-generated method stub
        List<NestPriceDTO> results = new ArrayList();
        List<NestPriceEntity> entities = nestPriceRepository.findAll(pageable).getContent();

        for(NestPriceEntity item : entities) {
            NestPriceDTO newDTO = (NestPriceDTO) converter.toDTO(item,NestPriceDTO.class);
            results.add(newDTO);
        }
        return results;
    }
//public List<SpeciesEggPriceDTO> findAllBySpeciesId(Long id){
//    List<SpeciesEggPriceDTO> results = new ArrayList();
//    List<SpeciesEggPriceEntity> entities = speciesEggPriceRepository.findAllByParrotSpeciesIdAndStatusTrueOrderById(id);
//
//    for(SpeciesEggPriceEntity item : entities) {
//        SpeciesEggPriceDTO newDTO = (SpeciesEggPriceDTO) converter.toDTO(item,SpeciesEggPriceDTO.class);
//        results.add(newDTO);
//    }
//    return results;
//
//}
    public NestPriceDTO findOneBySpeciesId(Long id){
        return (NestPriceDTO) converter.toDTO(nestPriceRepository.findOneByParrotSpeciesId(id),NestPriceDTO.class);

    }
    @Override
    public int totalItem() {
        return (int)nestPriceRepository.count();
    }
}
