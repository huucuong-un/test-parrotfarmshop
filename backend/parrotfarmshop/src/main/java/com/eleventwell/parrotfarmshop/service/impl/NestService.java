package com.eleventwell.parrotfarmshop.service.impl;

//import com.eleventwell.parrotfarmshop.converter.ParrotConverter;


import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.NestDTO;
import com.eleventwell.parrotfarmshop.entity.NestEntity;
import com.eleventwell.parrotfarmshop.repository.NestRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NestService implements IGenericService<NestDTO> {

    @Autowired
    private ParrotRepository parrotRepository;

    @Autowired
    private ParrotSpeciesRepository parrotSpeciesRepository;

    @Autowired
    private NestRepository parrotEggNestRepository;

    @Autowired
    GenericConverter genericConverter;


    @Override
    public List<NestDTO> findAll() {
//        List<NestDTO> result = new ArrayList<>();
//        List<NestEntity> parrotEggNestEntities = parrotEggNestRepository.findAllByOrderByIdDesc();
//
//        for (NestEntity entity : parrotEggNestEntities) {
//            result.add((NestDTO) genericConverter.toDTO(entity, NestDTO.class));
//        }
//
//        return result;
        return null;
    }

    @Override
    public NestDTO save(NestDTO nestDTO) {
        NestEntity parrotEggNestEntity = new NestEntity();

        if (nestDTO.getId() != null) {
            NestEntity oldEntity = parrotEggNestRepository.findOneById(nestDTO.getId());
            parrotEggNestEntity = (NestEntity) genericConverter.updateEntity(nestDTO, oldEntity);

        } else {
            parrotEggNestEntity = (NestEntity) genericConverter.toEntity(nestDTO, NestEntity.class);
        }
        parrotEggNestRepository.save(parrotEggNestEntity);
        return (NestDTO) genericConverter.toDTO(parrotEggNestEntity, NestDTO.class);
    }
//    public void changeSaleStatus(Long id){
//        NestEntity parrotEggNestEntity = parrotEggNestRepository.findOneById(id);
//        if(parrotEggNestEntity.getSaleStatus() == true){
//            parrotEggNestEntity.setSaleStatus(false);
//        }else{
//            parrotEggNestEntity.setSaleStatus(true);
//        }
//        parrotEggNestRepository.save(parrotEggNestEntity);
//    }

//    public Long countAvaiableNestById(Long id){
//        return parrotEggNestRepository.countAllBySaleStatusAndStatusAndBreedStatusAndSpeciesEggPriceParrotSpeciesId(false,true,"Done",id);
//    }


    @Override
    public void changeStatus(Long ids) {
        NestEntity parrotEggNestEntity = parrotEggNestRepository.findOneById(ids);
        if (parrotEggNestEntity.getStatus() == true) {
            parrotEggNestEntity.setStatus(false);
        } else {
            parrotEggNestEntity.setStatus(true);
        }
        parrotEggNestRepository.save(parrotEggNestEntity);
    }

//    public void changeBreedStatus(Long id){
//        ParrotEggNestEntity parrotEggNestEntity = parrotEggNestRepository.findOneById(id);
//        if(parrotEggNestEntity.getBreedStatus() == true){
//            parrotEggNestEntity.setBreedStatus(false);
//        }else{
//            parrotEggNestEntity.setBreedStatus(true);
//        }
//        parrotEggNestRepository.save(parrotEggNestEntity);
//    }

//    public void changeSaleStatus(Long id){

//    }

    @Override
    public List<NestDTO> findAll(Pageable pageable) {
        // TODO Auto-generated method stub
        List<NestDTO> results = new ArrayList();
        List<NestEntity> entities = parrotEggNestRepository.findAll(pageable).getContent();

        for (NestEntity item : entities) {
            NestDTO newDTO = (NestDTO) genericConverter.toDTO(item, NestDTO.class);
            results.add(newDTO);

        }

        return results;
    }
    public NestDTO findOneBySpeciesId(Long id){
        List<NestEntity> nests = parrotEggNestRepository.findOneBySpeciesIdAndStatusTrue(id);
return (NestDTO) genericConverter.toDTO(nests.get(0),NestDTO.class);

    }

    @Override
    public int totalItem() {
        return (int) parrotEggNestRepository.count();
    }
}
