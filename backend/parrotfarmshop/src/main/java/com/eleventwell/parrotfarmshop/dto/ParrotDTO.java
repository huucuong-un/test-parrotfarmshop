/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author ASUS
 */
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ParrotDTO extends BaseDTO {
  
    private int age;

    private Boolean status;

    private Boolean saleStatus;

    private Boolean pregnancyStatus;

    private Boolean healthStatus;

    private Long numberOfChildren;

    private Long ownerID;

    private Long colorID;

    private Long nestID;

    private  Boolean gender;

}
