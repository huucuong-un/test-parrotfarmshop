/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.ParrotEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

/**
 *
 * @author Admin
 */
public interface ParrotRepository extends JpaRepository<ParrotEntity, Long>{
    ParrotEntity findOneById(Long id);
    List<ParrotEntity> findAllByOrderByIdDesc();
    @Query("SELECT u FROM ParrotEntity u WHERE u.status = true AND u.healthStatus = true AND u.saleStatus = true AND u.parrotSpeciesColor.id = :colorid")
    List<ParrotEntity> findTopNByStatusIsTrue(@Param("colorid") Long colorid, Pageable pageable);

    Long countAllBySaleStatusAndStatusAndParrotSpeciesColorId(Boolean saleStatus, Boolean status, Long id);

    @Query("select u from ParrotEntity  u where(:age is null or u.age = :age ) " +
            "and (:status is null or u.status = :status) " +
            "and (:pregnancyStatus is null or u.pregnancyStatus = :pregnancyStatus) " +
            "and (:healthStatus is null or u.healthStatus = :healthStatus) " +
            "and (:saleStatus is null or u.saleStatus = :saleStatus) " +
            "and (:numberOfChildren is null or u.numberOfChildren = :numberOfChildren) " +
            "and (:gender is null or u.gender = :gender) " +

            "and (:searchDate is null or DATE(u.createdDate) = :searchDate) " +
            "ORDER BY " +
            "case when :sortAge = 'ADESC' then u.age end desc, " +
            "case when :sortAge = 'AASC' then u.age end asc, " +
            "case when :sortNumberOfChildren = 'NOCDESC' then u.numberOfChildren end desc, " +
            "case when :sortNumberOfChildren = 'NOCASC' then u.numberOfChildren end asc, " +

            "case when :sortGender = 'GDESC' then u.gender end desc, " +
            "case when :sortGender = 'GASC' then u.gender end desc, " +
            "case when :sortDate = 'DDESC' then u.id end desc, " +
            "case when :sortDate = 'DASC' then u.id end asc, " +
            "u.id desc"
    )
    List<ParrotEntity> searchSortForAdmin(@Param("age") Integer age,
                                          @Param("status") Boolean status,
                                          @Param("pregnancyStatus") Boolean pregnancyStatus,
                                          @Param("healthStatus") Boolean healthStatus,
                                          @Param("saleStatus") Boolean saleStatus,
                                          @Param("numberOfChildren") Long numberOfChildren,
                                          @Param("gender") Boolean gender,

                                          @Param("searchDate") Date searchDate,
                                          @Param("sortAge") String sortAge,
                                          @Param("sortNumberOfChildren") String sortNumberOfChildren,

                                          @Param("sortGender") String sortGender,
                                          @Param("sortDate") String sortDate, Pageable pageable
                                          );

}
