package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;

import com.eleventwell.parrotfarmshop.dto.ParrotColorImageDTO;

import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesColorDTO;
import com.eleventwell.parrotfarmshop.entity.ParrotColorImageEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesColorEntity;
import com.eleventwell.parrotfarmshop.repository.ParrotColorImageRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesColorRepository;
import com.eleventwell.parrotfarmshop.repository.ParrotSpeciesRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParrotColorImageService implements IGenericService<ParrotColorImageDTO> {
    @Autowired
    ParrotColorImageRepository parrotColorImageRepository;

    @Autowired
    GenericConverter converter;

    @Autowired
    ParrotSpeciesColorRepository parrotSpeciesColorRepository;

    @Autowired
    ParrotSpeciesRepository parrotSpeciesRepository;


    @Override
    public List<ParrotColorImageDTO> findAll() {
        return null;
    }

    public List<ParrotColorImageDTO> findAllByColorId(Long colorId) {
        if(colorId == null) return null;
        List<ParrotColorImageDTO> result = new ArrayList<>();
        List<ParrotColorImageEntity> entities = parrotColorImageRepository.findAllByColorId(colorId);
        for (ParrotColorImageEntity entity: entities) {
                result.add((ParrotColorImageDTO)converter.toDTO(entity, ParrotColorImageDTO.class));
        }

        return result;
    }

    @Override
    public ParrotColorImageDTO save(ParrotColorImageDTO dto) {
        ParrotColorImageEntity entity = new ParrotColorImageEntity();
        if (dto.getId() != null) {
            ParrotColorImageEntity oldEntity = parrotColorImageRepository.findOneById(dto.getId());
            entity = (ParrotColorImageEntity)  converter.updateEntity(dto, oldEntity);


        } else {
            entity = (ParrotColorImageEntity)  converter.toEntity(dto, ParrotColorImageEntity.class);

        }

        entity = parrotColorImageRepository.save(entity);

        return (ParrotColorImageDTO) converter.toDTO(entity, ParrotColorImageDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {

    }

    @Override
    public int totalItem() {
        return 0;
    }

    @Override
    public List<ParrotColorImageDTO> findAll(Pageable pageable) {
        return null;
    }

    public List<ParrotColorImageDTO> findAllBySpeciesId(Long speciesId) {
        List<ParrotColorImageDTO> result = new ArrayList<>();
        List<ParrotSpeciesColorEntity> colorEntities = parrotSpeciesColorRepository.findAllByParrotSpeciesIdOrderByIdDesc(speciesId);
        List<ParrotSpeciesColorDTO> colorDTOs = new ArrayList<>();
        for (ParrotSpeciesColorEntity entity:
        colorEntities) {
            colorDTOs.add((ParrotSpeciesColorDTO)converter.toDTO(entity, ParrotSpeciesColorDTO.class));
        }

        for (ParrotSpeciesColorDTO colorDTO : colorDTOs) {
            for (ParrotColorImageDTO imageDTO:
                 findAllByColorId(colorDTO.getId())) {
                result.add(imageDTO);
            }
        }

        return result;
    }

    public List<String> findAllImagesBySpeciesId(Long speciesId) {
        List<String> result = new ArrayList<>();
        List<ParrotSpeciesColorEntity> colorEntities = parrotSpeciesColorRepository.findAllByParrotSpeciesIdOrderByIdDesc(speciesId);
        List<ParrotSpeciesColorDTO> colorDTOs = new ArrayList<>();
        for (ParrotSpeciesColorEntity entity:
                colorEntities) {
            colorDTOs.add((ParrotSpeciesColorDTO)converter.toDTO(entity, ParrotSpeciesColorDTO.class));
        }

        for (ParrotSpeciesColorDTO colorDTO : colorDTOs) {
            for (ParrotColorImageDTO imageDTO:
                    findAllByColorId(colorDTO.getId())) {
                result.add(imageDTO.getImageUrl());
            }
        }

        return result;
    }

    public boolean deleteImage(Long imageId) {
        if(imageId == null) return false;
        parrotColorImageRepository.deleteById(imageId);
        return true;
    }
}
