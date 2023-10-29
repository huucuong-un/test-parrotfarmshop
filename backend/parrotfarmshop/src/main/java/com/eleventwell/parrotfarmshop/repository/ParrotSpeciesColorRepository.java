/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eleventwell.parrotfarmshop.repository;

import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesColorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 *
 * @author Admin
 */
public interface ParrotSpeciesColorRepository extends JpaRepository<ParrotSpeciesColorEntity, Long>{
    
       	ParrotSpeciesColorEntity findOneById(long id);
		   List<ParrotSpeciesColorEntity> findAllByOrderByIdDesc();

		List<ParrotSpeciesColorEntity> findAllByParrotSpeciesIdOrderByIdDesc(Long parrotSpecies_id);



    
}
