package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


//*PostID
//PostTitle
//PostContent
//PostImg
//StartDate
//EndDate
//CreatedAt
//#CreatedBy

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "post")
public class PostEntity extends BaseEntity {


	@NotBlank
	@Column(name = "title")
	private String title;

	@NotBlank

	@Column(name = "content")
	private String content;

	@NotBlank
	@Column(name = "description")
	private String description;

	@NotBlank
	@Lob
	@Column(name = "image_url")
	private String imageUrl;
	
	@Column(name = "start_date")
	private String startDate;
	
	@Column(name = "end_date")
	private String endDate;
	
	@Column(name = "status")
	private Boolean status;
	

	
}
