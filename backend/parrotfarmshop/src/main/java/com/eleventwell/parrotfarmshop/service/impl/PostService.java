package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.FeedbackDTO;
import com.eleventwell.parrotfarmshop.dto.PostDTO;
import com.eleventwell.parrotfarmshop.dto.PromotionDTO;
import com.eleventwell.parrotfarmshop.dto.SliderDTO;
import com.eleventwell.parrotfarmshop.entity.FeedbackEntity;
import com.eleventwell.parrotfarmshop.entity.PostEntity;
import com.eleventwell.parrotfarmshop.entity.PromotionEntity;
import com.eleventwell.parrotfarmshop.entity.SliderEntity;
import com.eleventwell.parrotfarmshop.repository.PostRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PostService implements IGenericService<PostDTO> {


    @Autowired
    private PostRepository postRepository;


    @Autowired
    private GenericConverter genericConverter;

    @Override
    public List<PostDTO> findAll() {
        List<PostDTO> result = new ArrayList<>();
        List<PostEntity> entities = postRepository.findAllByOrderByIdDesc();

        for (PostEntity entity : entities) {
            PostDTO postDTO = (PostDTO) genericConverter.toDTO(entity, PostDTO.class);
            result.add(postDTO);
        }
        return result;
    }

    @Override
    public PostDTO save(PostDTO postDTO) {
        PostEntity postEntity = new PostEntity();
        if (postDTO.getId() != null) {
            PostEntity oldEntity = postRepository.findOneById(postDTO.getId());
            postEntity = (PostEntity) genericConverter.updateEntity(postDTO, oldEntity);
        } else {
            postEntity = (PostEntity) genericConverter.toEntity(postDTO, PostEntity.class);
        }
        postRepository.save(postEntity);
        return (PostDTO) genericConverter.toDTO(postEntity, PostDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {
        PostEntity postEntity = postRepository.findOneById(ids);
        if (postEntity.getStatus() == true) {
            postEntity.setStatus(false);
        } else {
            postEntity.setStatus(true);
        }
        postRepository.save(postEntity);
    }


    @Override
    public List<PostDTO> findAll(Pageable pageable){
        // TODO Auto-generated method stub
        List<PostDTO> results = new ArrayList();
        List<PostEntity> entities = postRepository.findAll(pageable).getContent();

        for(PostEntity item : entities) {
            PostDTO newDTO = (PostDTO) genericConverter.toDTO(item,PostDTO.class);
            results.add(newDTO);
        }
        return results;
    }
    
    public PostDTO findOneById(Long id){
        
        return (PostDTO) genericConverter.toDTO(postRepository.findOneById(id),PostDTO.class);
        
    }

    @Override
    public int totalItem() {
        return (int)postRepository.count();

    }

    public List<PostDTO> searchSortForAdmin(String title,
                                            String content,
                                            String description,
                                            Date searchDate,
                                            Boolean status,
                                            String sortTitle,
                                            String sortDate,
                                            Pageable pageable ){
        List<PostDTO> results = new ArrayList<>();
        List<PostEntity> entities = postRepository.searchSortForAdmin(title, content, description, searchDate, status, sortTitle, sortDate, pageable);
        for (PostEntity postEntity : entities
             ) {
            PostDTO newDTO = (PostDTO) genericConverter.toDTO(postEntity, PostDTO.class);
            results.add(newDTO);
        }
        return results;
    }
//    public List<FeedbackDTO> searchSortForAdmin(Integer rating, Long speciesId, Date searchDate, String username, Boolean status, String sortRating, String sortDate, Pageable pageable) {
//        List<FeedbackDTO> results = new ArrayList();
//        List<FeedbackEntity> entities = feedbackRepository.searchSortForAdmin(rating, speciesId, searchDate, username, status, sortRating, sortDate, pageable);
//
//        for (FeedbackEntity item : entities) {
//            FeedbackDTO newDTO = (FeedbackDTO) genericConverter.toDTO(item, FeedbackDTO.class);
//            results.add(newDTO);
//        }
//        return results;
//    }

}
