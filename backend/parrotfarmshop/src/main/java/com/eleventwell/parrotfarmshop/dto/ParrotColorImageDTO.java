package com.eleventwell.parrotfarmshop.dto;

import com.eleventwell.parrotfarmshop.entity.ParrotSpeciesColorEntity;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import lombok.*;

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ParrotColorImageDTO extends BaseDTO {
    private Long parrotSpeciesColorId;
    private String imageUrl;
}
