package com.eleventwell.parrotfarmshop.entity;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jdk.jfr.Unsigned;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter


//parrotSpeciesID:pk, parrotSpeciesName, parrotSpeciesQuantity, parrotSpeciesPrice
//parrotSpeciesDescription, createdBy:fk, createdAt, availabilityStatus, parrotSpeciesOrigin,
//parrotSpeciesAverageWeight, averageRating
@Entity
@Table(name = "parrotSpecies")
public class ParrotSpeciesEntity extends BaseEntity{


	// Đổi tên cột để phù hợp với quy tắc đặt tên
	@NotBlank
	@Size(max = 30)
	@Column(name = "name")
	private String name;

	@Column(name = "quantity")
	private Long quantity;

	@Column(name = "nest_quantity")
	private Long nestQuantity;

	@NotBlank
	@Column(name = "description")
	private String description;

	@Column(name = "availability_status")
	private Boolean availabilityStatus;

	@NotBlank
	@Column(name = "origin")
	private String origin;


	@Column(name = "average_weight")
	private Double averageWeight;

	@Column(name = "parrot_average_rating")
	private Double parrotAverageRating;



	@Column(name = "img")
	private String img;

	@Column(name="status")
	private Boolean status;

	@OneToMany(mappedBy = "parrotSpecies")
	private List<ParrotSpeciesColorEntity> parrotSpeciesColors = new ArrayList<>();



	@OneToOne(mappedBy = "parrotSpecies")
	@PrimaryKeyJoinColumn
	private NestPriceEntity nestPriceEntity;




//	@NotBlank
//	@Size(max=30)
//	@Column(name = "parrotSpeciesName")
//	private String parrotSpeciesName;
//
//	@Unsigned
//	@Column(name = "parrotSpeciesQuantity")
//	private Long parrotSpeciesQuantity;
//
//	@Unsigned
//	@Column(name = "parrotSpeciesNestQuantity")
//	private Long parrotSpeciesNestQuantity;
//
//	@NotBlank
//	@Column(name = "parrotSpeciesDescription")
//	private String parrotSpeciesDescription;
//
//	@Column(name = "availabilityStatus")
//	private Boolean availabilityStatus;
//
//
//	@NotBlank
//	@Size(max=20)
//	@Column(name = "parrotSpeciesOrigin")
//	private String parrotSpeciesOrigin;
//
//	@NotBlank
//	@Unsigned
//	@Column(name = "parrotSpeciesAverageWeight")
//	private Double parrotSpeciesAverageWeight;
//
//	@Unsigned
//	@Column(name = "parrotAverageRating")
//	private Double parrotAverageRating;
//
//	@Unsigned
//	@Column(name = "nestAverageRating")
//	private Double nestAverageRating;





}
