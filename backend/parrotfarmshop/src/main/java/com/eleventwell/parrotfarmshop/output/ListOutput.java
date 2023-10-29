/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eleventwell.parrotfarmshop.output;

import com.eleventwell.parrotfarmshop.dto.ParrotSpeciesDTO;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author ASUS
 */
/**
 * Create a object with list with page and limit page
 *
 * @param num1 The first integer.
 * @param num2 The second integer.
 * @return list with page and limit page.
 */
@Getter
@Setter
public class ListOutput<T> {
    
    List<T> listResult = new ArrayList<>();

}
