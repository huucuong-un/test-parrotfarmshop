package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.ParrotCoupleEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParrotCoupleRepository extends JpaRepository<ParrotCoupleEntity, Long> {

    ParrotCoupleEntity findOneById(Long id);
    List<ParrotCoupleEntity> findAllByOrderByIdDesc(Pageable pageable);

}
