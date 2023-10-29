package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.NestPriceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NestPriceRepository extends JpaRepository<NestPriceEntity,Long> {

    NestPriceEntity findOneById(Long id);

    NestPriceEntity findOneByParrotSpeciesId(Long id);


    List<NestPriceEntity> findAllByOrderByIdDesc();

}
