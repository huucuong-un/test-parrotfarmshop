package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
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

//parrotSpeciesID, colorID, parrotSpeciesDetailPrice, createdAt, createdBy,
//parrotSpeciesDetailImageUrl
@Entity
@Table(name = "parrotSpeciesColor")
public class ParrotSpeciesColorEntity extends BaseEntity {


    @Unsigned
    @Column(name = "price")
    private Double price;

    @OneToMany(mappedBy = "parrotSpeciesColor")
    private List<ParrotColorImageEntity> images = new ArrayList<>();


    @NotBlank
    @Column(name = "color")
    private String color;


    @Column(name = "status")
    private Boolean status;

    
    @ManyToOne
    @JoinColumn(name = "species_ID")
    private ParrotSpeciesEntity parrotSpecies;



    
//	@OneToMany(mappedBy = "user")
//	private List<ParrotEntity> parrots = new ArrayList<>();
    @OneToMany(mappedBy = "parrotSpeciesColor")
    private List<ParrotEntity> parrots = new ArrayList<>();

    @OneToMany(mappedBy = "parrotSpeciesColor")
    private List<FeedbackEntity> feedbacks = new ArrayList<>();

}
