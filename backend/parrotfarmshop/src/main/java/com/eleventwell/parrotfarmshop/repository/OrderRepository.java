package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.OrderEntity;
import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    OrderEntity findOneById(Long id);
List<OrderEntity> findAllByOrderByIdDesc(Pageable pageable);

    @Query("SELECT ps FROM OrderEntity ps " +
            "WHERE ps.user.id = :userId " +
            "AND (:dateSearch IS NULL OR DATE(ps.createdDate) = :dateSearch)"+
            "AND (:status IS NULL OR ps.status = :status)"+

            "ORDER BY  " +
            "CASE WHEN :sortPrice ='PDESC' THEN ps.totalPrice  END DESC ," +
            "CASE WHEN :sortPrice ='PASC' THEN ps.totalPrice  END ASC ,"+
            "CASE WHEN :sortDate ='DDESC' THEN ps.id END DESC ," +
            "CASE WHEN :sortDate ='DASC' THEN ps.id  END ASC ,"+
            "ps.id desc")
List<OrderEntity> findAllByUserIdOrderByIdDescANDSearchSort(@Param("userId") Long id,@Param("dateSearch") Date dateSearch,@Param("status") String status,@Param("sortPrice") String sortPrice ,@Param("sortDate") String sortDate,Pageable pageable);


    @Query("SELECT ps FROM OrderEntity ps " +
            "WHERE (:email IS NULL OR ps.user.email LIKE CONCAT('%', :email, '%')) " +
            "AND (:phone IS NULL OR ps.deliveryInformation.phoneNumber LIKE CONCAT('%', :phone, '%'))  " +
             "AND (:dateSearch IS NULL OR DATE(ps.createdDate) = :dateSearch)"+
            "AND (:status IS NULL OR ps.status = :status)"+

            "ORDER BY  " +
            "CASE WHEN :sortPrice ='PDESC' THEN ps.totalPrice  END DESC ," +
            "CASE WHEN :sortPrice ='PASC' THEN ps.totalPrice  END ASC ,"+
            "CASE WHEN :sortDate ='DDESC' THEN ps.id END DESC ," +
            "CASE WHEN :sortDate ='DASC' THEN ps.id  END ASC ,"+
            "ps.id desc")
    List<OrderEntity> searchByEmailOrPhone(@Param("email") String email, @Param("phone") String phone , @Param("dateSearch") Date dateSearch,@Param("status") String status,@Param("sortPrice") String sortPrice ,@Param("sortDate") String sortDate,Pageable pageable );

}
