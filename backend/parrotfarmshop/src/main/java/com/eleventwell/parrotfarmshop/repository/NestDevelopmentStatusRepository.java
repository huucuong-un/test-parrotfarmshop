package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.NestDevelopmentEntity;
import com.eleventwell.parrotfarmshop.entity.NestDevelopmentStatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NestDevelopmentStatusRepository extends JpaRepository<NestDevelopmentStatusEntity, Long> {
    NestDevelopmentStatusEntity findOneById(Long id);
    List<NestDevelopmentStatusEntity> findAllByOrderByIdDesc();
}
