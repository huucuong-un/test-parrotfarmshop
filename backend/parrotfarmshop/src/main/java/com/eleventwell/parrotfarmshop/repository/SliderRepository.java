package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.SliderEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface SliderRepository extends JpaRepository<SliderEntity, Long> {
    SliderEntity findOneById(long id);
    List<SliderEntity> findAllByOrderByIdDesc();

    @Query("SELECT u FROM SliderEntity u WHERE (:searchDate IS NULL OR DATE(u.createdDate) = :searchDate) AND (:status IS NULL OR u.status = :status) AND (:slidername IS NULL OR u.sliderName LIKE CONCAT('%', :slidername, '%')) " +
    "ORDER BY " +
    "CASE WHEN :sortDate = 'DDESC' THEN u.id END DESC, " +
    "CASE WHEN :sortDate = 'DASC' THEN u.id END ASC, " +
    "u.id DESC")
    List<SliderEntity> searchSortForAdmin(@Param("searchDate") Date searchDate, @Param("status") Boolean status, @Param("slidername") String slidername, @Param("sortDate") String sortDate, Pageable pageable );

}
