/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author Admin
 */
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ParrotSpeciesColorDTO extends BaseDTO {
    private Double price;
    private String imageUrl;
    private String color;
    private Boolean status;
    private long speciesID; // This field represents the ID of the related ParrotSpeciesEntity

    
    
}
