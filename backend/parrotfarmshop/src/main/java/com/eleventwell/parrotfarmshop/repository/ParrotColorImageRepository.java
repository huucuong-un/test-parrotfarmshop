package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotColorImageEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParrotColorImageRepository extends JpaRepository<ParrotColorImageEntity, Long> {
    ParrotColorImageEntity findOneById(long id);

    @Query("SELECT img FROM ParrotColorImageEntity img WHERE img.parrotSpeciesColor.id = :colorId ")
    List<ParrotColorImageEntity> findAllByColorId(@Param("colorId") long colorId);


}
