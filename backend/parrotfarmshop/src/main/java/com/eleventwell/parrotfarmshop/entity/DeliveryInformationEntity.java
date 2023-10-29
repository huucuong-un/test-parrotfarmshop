package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;


@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity

@Table(name = "delivery_information")
public class DeliveryInformationEntity extends BaseEntity {

	@NotBlank
	@Column(name = "name")
	private String name;
	
	@NotBlank
	@Size(min = 10, max = 11)
	@Column(name = "phone_number")
	private String phoneNumber;


	@NotBlank
	@Column(name = "address")
	private String address;
	

	@ManyToOne
    @JoinColumn(name = "userID")
    private UserEntity user;

	@Column(name = "status")
	private Boolean status;

	@Column(name = "picking_status")
	private Boolean pickingStatus;

	@OneToMany(mappedBy = "deliveryInformation")
	private List<OrderEntity> orderId = new ArrayList<>();



}
