/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author ASUS
 */

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ParrotSpeciesDTO extends BaseDTO {

	private String name;

	private Long quantity;

	private Long nestQuantity;

	private String description;

	private Boolean availabilityStatus;

	private String origin;

	private Double averageWeight;

	private Double parrotAverageRating;


	private String img;

	private Boolean status;
	
}
