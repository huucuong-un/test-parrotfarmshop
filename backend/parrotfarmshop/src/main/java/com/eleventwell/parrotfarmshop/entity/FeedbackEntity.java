package com.eleventwell.parrotfarmshop.entity;

//
//feedbackId, userID, feedbackContent, feedbackRating, parrotSpeciesID,createdAt, createdBy
import com.eleventwell.parrotfarmshop.converter.DateConverter;
import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesColorDTO;
import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import jdk.jfr.Unsigned;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "feedback")
public class FeedbackEntity extends BaseEntity {

	@NotBlank
	@Column(name = "content")
	private String content;

	@Unsigned
	@Column(name = "rating")
	private Integer rating;

	@Column(name = "status")
	private Boolean status;

	@Unsigned
	@Column(name = "belong_to")
	private String belongTo;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserEntity user;

	@ManyToOne
	@JoinColumn(name = "replyer_id")
	private UserEntity replyer;


	@Column(name = "reply_content")
	private String replyContent;


	@Temporal(TemporalType.DATE)
	@Column(name = "reply_date")
	@CreationTimestamp
	@Convert(converter = DateConverter.class) // Use a custom converter
	private Date replyDate;

	@ManyToOne
	@JoinColumn(name = "color_id")
	private ParrotSpeciesColorEntity parrotSpeciesColor;

	@OneToOne
	@JoinColumn(name = "order_id", unique = true)
	private OrderEntity orderId;











}