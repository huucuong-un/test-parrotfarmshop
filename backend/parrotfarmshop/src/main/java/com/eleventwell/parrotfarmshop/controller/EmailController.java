package com.eleventwell.parrotfarmshop.controller;

import com.eleventwell.parrotfarmshop.entity.EmailDetailsEntity;
import com.eleventwell.parrotfarmshop.service.impl.EmailService;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.TemplateEngine;

@RestController
public class EmailController {
    @Autowired
    private EmailService emailService;


    // Sending a simple Email
    @PostMapping("/api/send-mail")
    public String sendMail(@RequestBody EmailDetailsEntity details)
    {
        String status = emailService.sendSimpleMail(details);
        return status;
    }

    // Sending email with attachment
    @PostMapping("/api/send-mail-with-attachment")
    public String sendMailWithAttachment(@RequestBody EmailDetailsEntity details)
    {
        String status = emailService.sendMailWithAttachment(details);
        return status;
    }
}
