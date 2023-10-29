package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.UserDTO;
import com.eleventwell.parrotfarmshop.entity.UserEntity;
import com.eleventwell.parrotfarmshop.repository.UserRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements IGenericService<UserDTO> {
    @Autowired
    GenericConverter genericConverter;


    @Autowired
    UserRepository userRepository;

    //find an account by email

    public UserDTO findByUsername(String username) {
        if (userRepository.findOneByUserName(username) != null) return (UserDTO)genericConverter.toDTO(userRepository.findOneByUserName(username), UserDTO.class);
        return null;
    }
    public UserDTO findByEmail(String email) {

        if (userRepository.findByEmail(email).isPresent()) return (UserDTO)genericConverter.toDTO(userRepository.findByEmail(email).orElseThrow(), UserDTO.class);
        return null;
    }


    //find all users
    @Override
    public List<UserDTO> findAll() {
        List<UserDTO> results = new ArrayList<>();
        List<UserEntity> entities = userRepository.findAllByOrderByIdDesc();
        for (UserEntity entity:
             entities) {
            UserDTO userDTO = (UserDTO) genericConverter.toDTO(entity, UserDTO.class);
            results.add(userDTO);
        }
        return results;
    }


    @Override
    public UserDTO save(UserDTO dto) {
        UserEntity userEntity = new UserEntity();
        if(dto.getId() == null) {   //if user did not exist before -> create a userEntity for insert database action
            userEntity = (UserEntity) genericConverter.toEntity(dto, userEntity.getClass());
        } else {
            UserEntity oldUserEntity = userRepository.findOneById(dto.getId());
            userEntity =  (UserEntity) genericConverter.updateEntity(dto, oldUserEntity);
            //if user exists -> update user's info
            //           convert UserDTO to UserEntity for updating info to database
        }

        userRepository.save(userEntity);    //save entity to database !!

        return (UserDTO) genericConverter.toDTO(userEntity, dto.getClass());
    }

    @Override
    public void changeStatus(Long ids) {
        UserEntity userEntity = userRepository.findOneById(ids);
        if (userEntity.getStatus() == true) {
            userEntity.setStatus(false);
        } else {
            userEntity.setStatus(true);
        }
        userRepository.save(userEntity);


    }

    @Override
    public List<UserDTO> findAll(Pageable pageable){
        // TODO Auto-generated method stub
        List<UserDTO> results = new ArrayList();
        List<UserEntity> entities = userRepository.findAll(pageable).getContent();

        for(UserEntity item : entities) {
            UserDTO newDTO = (UserDTO) genericConverter.toDTO(item,UserDTO.class);
            results.add(newDTO);
        }
        return results;
    }
    public UserDTO findOneById(Long id){

        return (UserDTO) genericConverter.toDTO(userRepository.findOneById(id),UserDTO.class);

    }

    @Override
    public int totalItem() {
        return (int)userRepository.count();
    }
}
