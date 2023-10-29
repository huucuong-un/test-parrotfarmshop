/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.NestEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesColorEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import com.eleventwell.parrotfarmshop.entity.PostEntity;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author ASUS
 */
public interface ParrotSpeciesRepository extends JpaRepository<ParrotSpeciesEntity, Long> {

    ParrotSpeciesEntity findOneById(long id);

    List<ParrotSpeciesEntity> findAllByNameLike(String name);

    @Query("SELECT ps FROM ParrotSpeciesEntity ps " +
            "ORDER BY " +
            "CASE WHEN :sortWay = 'PASC'  THEN (SELECT MIN(psc.price) FROM ps.parrotSpeciesColors psc WHERE ps.id = psc.parrotSpecies.id) END ASC, " +
            "CASE WHEN :sortWay = 'PDESC' THEN (SELECT MIN(psc.price) FROM ps.parrotSpeciesColors psc  WHERE ps.id = psc.parrotSpecies.id  ) END DESC, " +
            "CASE WHEN :sortWay = 'NASC' THEN substring(ps.name,1,1) END ASC , " +
            "CASE WHEN :sortWay = 'NDESC' THEN substring(ps.name,1,1) END DESC "
    )
    List<ParrotSpeciesEntity> findAllByPriceAndName(@Param("sortWay") String sortWay, Pageable pageable);


    @Query("SELECT ps FROM ParrotSpeciesEntity ps WHERE ps.name LIKE CONCAT('%', :name, '%') ORDER BY ps.name")
    List<ParrotSpeciesEntity> findAllByName(@Param("name") String name, Pageable pageable);


    List<ParrotSpeciesEntity> findAllByOrderByIdDesc(Pageable pageable);

    Integer countAllByStatusIsTrue();


    @Query("select u from ParrotSpeciesEntity u where (:name is null or u.name like concat('%', :name, '%')) " +
            "and (:quantity is null or u.quantity = :quantity) " +
            "and (:description is null or u.description like concat('%', :description, '%') ) " +
            "and (:origin is null or u.origin like concat('%', :origin, '%')) " +
            "and (:averageWeight is null or u.averageWeight = :averageWeight) " +
            "and (:parrotAverageRating is null or u.parrotAverageRating = :parrotAverageRating) " +
            "and (:status is null or u.status = :status) " +
            "and (:searchDate is null or DATE(u.createdDate) = :searchDate) " +
            "ORDER BY " +
            "case when :sortName = 'NDESC' then u.name end desc, " +
            "case when :sortName = 'NASC' then u.name end asc, " +
            "case when :sortQuantity = 'QDESC' then u.quantity end desc, " +
            "case when :sortQuantity = 'QASC' then u.quantity end asc, " +
            "case when :sortOrigin = 'ODESC' then u.origin end desc, " +
            "case when :sortOrigin = 'OASC' then u.origin end asc, " +
            "case when :sortAverageWeight = 'AWDESC' then u.averageWeight end desc, " +
            "case when :sortAverageWeight = 'AWASC' then u.averageWeight end asc, " +
            "case when :sortParrotAverageRating = 'PARDESC' then u.parrotAverageRating end desc, " +
            "case when :sortParrotAverageRating = 'PARASC' then u.parrotAverageRating end asc, " +
            "case when :sortDate = 'DDESC' then u.id end desc, " +
            "case when :sortDate = 'DASC' then u.id end asc, " +
            "u.id desc")
    List<ParrotSpeciesEntity> searchSortForAdmin(@Param("name") String name,
                                                 @Param("quantity") Long quantity,
                                                 @Param("description") String description,
                                                 @Param("origin") String origin,
                                                 @Param("averageWeight") Double averageWeight,
                                                 @Param("parrotAverageRating") Double parrotAverageRating,

                                                 @Param("status") Boolean status,

                                                 @Param("searchDate") Date searchDate,

                                                 @Param("sortName") String sortName,

                                                 @Param("sortQuantity") String sortQuantity,

                                                 @Param("sortOrigin") String sortOrigin,

                                                 @Param("sortAverageWeight") String sortAverageWeight,

                                                 @Param("sortParrotAverageRating") String sortParrotAverageRating,

                                                 @Param("sortDate") String sortDate, Pageable pageable);

}
//    @NotBlank
//    @Size(max = 30)
//    @Column(name = "name")
//    private String name;
//
//    @Column(name = "quantity")
//    private Long quantity;
//
//    @Column(name = "nest_quantity")
//    private Long nestQuantity;
//
//    @NotBlank
//    @Column(name = "description")
//    private String description;
//
//    @Column(name = "availability_status")
//    private Boolean availabilityStatus;
//
//    @NotBlank
//    @Column(name = "origin")
//    private String origin;
//
//
//    @Column(name = "average_weight")
//    private Double averageWeight;
//
//    @Column(name = "parrot_average_rating")
//    private Double parrotAverageRating;
//
//
//
//    @Column(name = "img")
//    private String img;
//
//    @Column(name="status")
//    private Boolean status;
//
//    @OneToMany(mappedBy = "parrotSpecies")
//    private List<ParrotSpeciesColorEntity> parrotSpeciesColors = new ArrayList<>();
//
//    @OneToMany(mappedBy = "parrotSpecies")
//    private List<NestEntity> nest = new ArrayList<>();

