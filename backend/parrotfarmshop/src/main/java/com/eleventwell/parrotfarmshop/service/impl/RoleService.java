package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.converter.GenericConverter;
import com.eleventwell.parrotfarmshop.dto.RoleDTO;
import com.eleventwell.parrotfarmshop.dto.SliderDTO;
import com.eleventwell.parrotfarmshop.entity.RoleEntity;
import com.eleventwell.parrotfarmshop.entity.SliderEntity;
import com.eleventwell.parrotfarmshop.repository.RoleRepository;
import com.eleventwell.parrotfarmshop.service.IGenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
//Cuong
@Service
public class RoleService implements IGenericService<RoleDTO> {
    @Autowired
    GenericConverter roleConverter;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<RoleDTO> findAll() {
        List<RoleDTO> results = new ArrayList<>();

        List<RoleEntity> entities = roleRepository.findAllByOrderByIdDesc();
        for (RoleEntity entity :
                entities) {
            RoleDTO roleDTO = (RoleDTO) roleConverter.toDTO(entity, RoleDTO.class);
            results.add(roleDTO);
        }


        return results;
    }

    //accept editing description and status only

    @Override
    public RoleDTO save(RoleDTO dto) {
        RoleEntity roleEntity = new RoleEntity();
        if(dto.getId() == null) { //not have been added before
            roleEntity = (RoleEntity) roleConverter.toEntity(dto, RoleEntity.class);
        } else {
            RoleEntity oldRoleEntity = roleRepository.findOneById(dto.getId());
            roleEntity = (RoleEntity) roleConverter.updateEntity(dto, oldRoleEntity);
        }

        roleRepository.save(roleEntity);



        return (RoleDTO) roleConverter.toDTO(roleEntity, RoleDTO.class);
    }

    @Override
    public void changeStatus(Long ids) {
        RoleEntity roleEntity = roleRepository.findOneById(ids);
        if(roleEntity.getStatus() == true){
            roleEntity.setStatus(false);
        }else{
            roleEntity.setStatus(true);
        }
        roleRepository.save(roleEntity);
    }

    @Override
    public List<RoleDTO> findAll(Pageable pageable){
        // TODO Auto-generated method stub
        List<RoleDTO> results = new ArrayList();
        List<RoleEntity> entities = roleRepository.findAll(pageable).getContent();

        for(RoleEntity item : entities) {
            RoleDTO newDTO = (RoleDTO) roleConverter.toDTO(item,RoleDTO.class);
            results.add(newDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int)roleRepository.count();
    }

    public RoleDTO findOneById(long id) {
        return (RoleDTO) roleConverter.toDTO(roleRepository.findOneById(id), RoleDTO.class);
    }
}
