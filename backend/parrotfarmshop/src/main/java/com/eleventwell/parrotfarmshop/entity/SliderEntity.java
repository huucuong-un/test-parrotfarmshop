package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
//*SliderID
//SliderName
//SliderImg
//CreatedAt
//#CreatedBy
@Entity
@Table(name = "slider")
public class SliderEntity extends BaseEntity {


	@NotBlank
	@Size(max=100)
	@Column(name = "slider_name")
	private String sliderName;
        
        @NotBlank
        @Size(max=500)
        @Column(name = "slider_description")
	private String sliderDescription;
        
	@NotBlank
	@Lob
	@Column(name = "slider_imageURL")
	private String sliderImageURL;

	@Column(name = "status")
	private Boolean status;
	
 

}