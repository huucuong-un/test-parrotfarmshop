package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

/**
 * parrotID:pk parrotName, #parrotSpeciesDetailID: fk #ParrotEggNest parrotAge
 * availabilityStatus pregnancyStatus healthStatus numberOfChildren,
 * ownerID:fk-User parrotMomID:fk parrotDadID:fk
 */
import java.util.ArrayList;
import java.util.List;

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

@Entity
@Table(name = "parrot")
public class ParrotEntity extends BaseEntity {

   
@Unsigned
    @Column(name = "age")
    private int age;


    @Column(name = "status")
    private Boolean status;

    @Column(name = "pregnancy_status")
    private Boolean pregnancyStatus;

    @Column(name = "health_status")
    private Boolean healthStatus;

    @Column(name = "sale_status")
    private Boolean saleStatus;

    @Unsigned
    @Column(name = "number_of_children")
    private Long numberOfChildren;

    
    
      @ManyToOne
    @JoinColumn(name = "owner_Id")
    private UserEntity owner;

//	
//	
    @ManyToOne
    @JoinColumn(name = "color_ID")
    private ParrotSpeciesColorEntity parrotSpeciesColor;

    @Column(name = "gender")
    private  Boolean gender;

//    @OneToOne(mappedBy = "parrot")
//    private OrderDetailEntity orderDetail;
    @OneToOne(mappedBy = "parrot")
    @PrimaryKeyJoinColumn
    private OrderDetailEntity orderDetail;
//
	@OneToMany(mappedBy = "parrotMale")
	private List<ParrotCoupleEntity> parrotMales = new ArrayList<>();

    @OneToMany(mappedBy = "parrotFemale")
    private List<ParrotCoupleEntity> parrotFemale = new ArrayList<>();




//    @OneToMany(mappedBy = "parrot")
//    private List<ReproductiveHistoryEntity> reproductiveHistories = new ArrayList<>();
//
//    @OneToMany(mappedBy = "parrotMom")
//    private List<ParrotEggNestEntity> parrotMomInNests = new ArrayList<>();
//
//    @OneToMany(mappedBy = "parrotDad")
//    private List<ParrotEggNestEntity> parrotDadInNests = new ArrayList<>();

}
