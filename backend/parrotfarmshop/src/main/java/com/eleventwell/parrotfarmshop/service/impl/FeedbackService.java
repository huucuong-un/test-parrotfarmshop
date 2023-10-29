package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.FAQsDTO;
import com.eleventwell.parrotfarmshop.dto.FeedbackDTO;
import com.eleventwell.parrotfarmshop.entity.FAQEntity;
import com.eleventwell.parrotfarmshop.entity.FeedbackEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesColorEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import com.eleventwell.parrotfarmshop.repository.*;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FeedbackService implements IGenericService<FeedbackDTO> {

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    ParrotSpeciesRepository parrotSpeciesRepository;

    @Autowired
    ParrotSpeciesColorRepository parrotSpeciesColorRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GenericConverter genericConverter;

    @Override
    public List<FeedbackDTO> findAll() {
        List<FeedbackDTO> listDTO = new ArrayList<>();
        List<FeedbackEntity> listEntity = feedbackRepository.findAllByOrderByIdDesc();
        for (FeedbackEntity entity : listEntity) {
            FeedbackDTO dto = (FeedbackDTO) genericConverter.toDTO(entity, FeedbackDTO.class);
            listDTO.add(dto);
        }
        return listDTO;
    }

    @Override
    public FeedbackDTO save(FeedbackDTO DTO) {
        FeedbackEntity newEntity = new FeedbackEntity();
        ParrotSpeciesColorEntity pcEntity = parrotSpeciesColorRepository.findOneById(DTO.getColorId());
        ParrotSpeciesEntity pEntity = parrotSpeciesRepository.findOneById(pcEntity.getParrotSpecies().getId());

        if (DTO.getId() != null) {
            FeedbackEntity oldEntity = feedbackRepository.findOneById(DTO.getId());
            newEntity = (FeedbackEntity) genericConverter.updateEntity(DTO, oldEntity);

        } else {

            newEntity = (FeedbackEntity) genericConverter.toEntity(DTO, FeedbackEntity.class);
        }
        newEntity.setUser(userRepository.findOneById(DTO.getUserId()));
        newEntity.setParrotSpeciesColor(parrotSpeciesColorRepository.findOneById(DTO.getColorId()));
        feedbackRepository.save(newEntity);
        pEntity.setParrotAverageRating(calculateAverageFeedbackRatingBySpeciesId(pEntity.getId()));
        parrotSpeciesRepository.save(pEntity);


        return (FeedbackDTO) genericConverter.toDTO(newEntity, FeedbackDTO.class);
    }

    public List<FeedbackDTO> findAllBySpeciesIdAndBelongtoOrRatingOrColorId(Long speciesId, String belongto, Integer rating, Long colorId, Pageable pageable) {
        List<FeedbackDTO> listDTO = new ArrayList<>();
        List<FeedbackEntity> listEntity = new ArrayList<>();


        listEntity = feedbackRepository.findbyspeciesIdAndType(speciesId, belongto, rating, colorId, pageable);


        for (FeedbackEntity entity : listEntity) {
            FeedbackDTO dto = (FeedbackDTO) genericConverter.toDTO(entity, FeedbackDTO.class);
            listDTO.add(dto);
        }
        return listDTO;
    }


    @Override
    public void changeStatus(Long ids) {
FeedbackEntity fEntity  = feedbackRepository.findOneById(ids);
if(fEntity.getStatus() == true){
    fEntity.setStatus(Boolean.FALSE);

}else{
      fEntity.setStatus(Boolean.TRUE);
}
feedbackRepository.save(fEntity);
    }

    @Override
    public List<FeedbackDTO> findAll(Pageable pageable) {
        // TODO Auto-generated method stub
        List<FeedbackDTO> results = new ArrayList();
        List<FeedbackEntity> entities = feedbackRepository.findAll(pageable).getContent();

        for (FeedbackEntity item : entities) {
            FeedbackDTO newDTO = (FeedbackDTO) genericConverter.toDTO(item, FeedbackDTO.class);
            results.add(newDTO);

        }

        return results;
    }

    public Double calculateAverageFeedbackRatingBySpeciesId(Long id) {

        return feedbackRepository.calculateRoundedAverageRating(id);


    }


    public Integer countByRating(Integer rating) {
        return feedbackRepository.countAllByRating(rating);
    }


  //ADD STATUS ==TRUE
    public Integer countBySpeciesId(Long id) {
        return feedbackRepository.countAllByParrotSpeciesColorParrotSpeciesIdAndStatusIsTrue(id);
    }

    public Integer countBySpeciesIdOrSpeciesColorIdAndRating(Long speciesId, Long colorId, Integer rating) {
        return feedbackRepository.countAllByParrotSpeciesColorIdAndRating(speciesId, colorId, rating);
    }

    public List<FeedbackDTO> findByRatingAndColorId(Integer rating, Long colorId, Pageable pageable) {
        List<FeedbackDTO> results = new ArrayList();
        List<FeedbackEntity> entities = feedbackRepository.findAllByRatingAndSpeciesColorId(rating, colorId, pageable);

        for (FeedbackEntity item : entities) {
            FeedbackDTO newDTO = (FeedbackDTO) genericConverter.toDTO(item, FeedbackDTO.class);
            results.add(newDTO);

        }

        return results;
    }

    public List<FeedbackDTO> searchSortForAdmin(Integer rating, Long speciesId, Date searchDate, String username, Boolean status, String sortRating, String sortDate, Pageable pageable) {
        List<FeedbackDTO> results = new ArrayList();
        List<FeedbackEntity> entities = feedbackRepository.searchSortForAdmin(rating, speciesId, searchDate, username, status, sortRating, sortDate, pageable);

        for (FeedbackEntity item : entities) {
            FeedbackDTO newDTO = (FeedbackDTO) genericConverter.toDTO(item, FeedbackDTO.class);
            results.add(newDTO);
        }
        return results;
    }

    public Integer countByOrderId(Long id) {

        return feedbackRepository.countAllByOrderIdId(id);
    }


    @Override
    public int totalItem() {
        return (int) feedbackRepository.count();
    }



}