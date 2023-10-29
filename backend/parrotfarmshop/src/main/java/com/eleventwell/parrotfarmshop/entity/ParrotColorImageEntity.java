package com.eleventwell.parrotfarmshop.entity;


import jakarta.persistence.*;
import lombok.*;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "parrot_color_image")
public class ParrotColorImageEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "color_id")
    private ParrotSpeciesColorEntity parrotSpeciesColor;

    @Lob
    @Column(name = "image_url")
    private String imageUrl;
}
