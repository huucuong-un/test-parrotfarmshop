package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    RoleEntity findOneById(Long id);
    List<RoleEntity> findAllByOrderByIdDesc();
}
