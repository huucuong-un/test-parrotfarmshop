package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.NestDevelopmentEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


import java.util.List;

public interface NestDevelopmentRepository extends JpaRepository<NestDevelopmentEntity,Long> {
    NestDevelopmentEntity findOneById(Long id);
    List<NestDevelopmentEntity> findAllByOrderByIdDesc();
}
