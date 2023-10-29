// Java Program to Illustrate EmailDetails Class
package com.eleventwell.parrotfarmshop.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Annotations
@Data
@AllArgsConstructor
@NoArgsConstructor

// Class
public class EmailDetailsEntity {

    // Class data members
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
}