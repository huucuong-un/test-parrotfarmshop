package com.eleventwell.parrotfarmshop.entity;

import jakarta.persistence.*;
import lombok.*;

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

@Table(name = "parrot_couple")
public class ParrotCoupleEntity extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "parrot_male")
	private ParrotEntity parrotMale;

	@ManyToOne
	@JoinColumn(name = "parrot_female")
	private ParrotEntity parrotFemale;

	@OneToMany(mappedBy = "parrotCouple")
	private List<NestUsageHistoryEntity> nestUsageHistory = new ArrayList<>();

	@Column(name="status")
	private Boolean status;

}
