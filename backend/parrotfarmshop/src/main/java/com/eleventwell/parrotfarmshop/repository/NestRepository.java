package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.NestEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NestRepository extends JpaRepository<NestEntity, Long> {
    NestEntity findOneById(Long id);

    List<NestEntity> findAllByOrderByIdDesc(Pageable pageable);



 @Query("SELECT u FROM NestEntity u WHERE u.nestPrice.parrotSpecies.id = :id AND u.status = true")
 List<NestEntity> findOneBySpeciesIdAndStatusTrue(@Param("id") Long id);

//    @Query("SELECT u FROM NestEntity u WHERE u.status = true AND u.saleStatus = false AND u.breedStatus='Done' AND u.speciesEggPrice.parrotSpecies.id = :speciesId ORDER BY u.id")
//    List<NestEntity> findTopNByStatusIsTrue(@Param("speciesId") Long speciesId, Pageable pageable);
//
//    Long countAllBySaleStatusAndStatusAndBreedStatusAndSpeciesEggPriceParrotSpeciesId(Boolean saleStatus,Boolean status ,String breedStatus, Long id);



}