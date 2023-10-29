package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="nest_price")
public class NestPriceEntity extends BaseEntity {

  @OneToOne
  @JoinColumn(name="species_id")
  private ParrotSpeciesEntity parrotSpecies;


  @OneToMany(mappedBy = "nestPrice")
  List<NestEntity> nest = new ArrayList<>();


  @Column(name="price")
  private Double price;

  @Column(name = "status")
  private Boolean status;

}
