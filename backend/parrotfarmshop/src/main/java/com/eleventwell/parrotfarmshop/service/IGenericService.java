package com.eleventwell.parrotfarmshop.service;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IGenericService<T> {
    List<T> findAll();
    T save(T DTO);

    void changeStatus(Long ids);
    int totalItem();
    
    List<T> findAll(Pageable pageable);
}
