package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.NestDevelopmentEntity;
import com.eleventwell.parrotfarmshop.entity.NestEntity;
import com.eleventwell.parrotfarmshop.entity.NestUsageHistoryEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NestUsageHistoryRepository extends JpaRepository<NestUsageHistoryEntity, Long> {
    NestUsageHistoryEntity findOneById(Long id);
    List<NestUsageHistoryEntity> findAllByOrderByIdDesc();
    List<NestUsageHistoryEntity> findAllByOrderByIdDesc(Pageable pageable);
}
