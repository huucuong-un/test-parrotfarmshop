package com.eleventwell.parrotfarmshop.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.Date;
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

//*PromotionID
//PromotionName
//Description
//Value
//CreatedAt
//StartDate
//EndDate
//Status
//#CreatedBy
@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "Promotion")
public class PromotionEntity extends BaseEntity {


	@NotBlank
	@Size(max=30)
	@Column(name = "code")
	private String code;

	@NotBlank
	@Column(name = "description")
	private String description;

	@Unsigned
	@Column(name = "value")
	private Double value;
	
	@Column(name = "start_date")
	private Date startDate;
	
	@Column(name = "end_date")
	private Date endDate;
	
	@Column(name = "status")
	private Boolean status;
	

	@OneToMany(mappedBy = "promotion")
	private List<OrderEntity> orders = new ArrayList<>();
	
}
