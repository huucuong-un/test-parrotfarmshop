package com.eleventwell.parrotfarmshop.service.impl;

import com.eleventwell.parrotfarmshop.entity.EmailDetailsEntity;
import com.eleventwell.parrotfarmshop.service.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;


import java.io.File;


@Service
public class EmailService implements IEmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;


    @Value("${spring.mail.username}")
    private String sender;


    private String processThymeleafTemplate() {
        Context context = new Context();
        context.setVariable("customerName", "Huu cuong");
        context.setVariable("productName", "Grey Parrot");

        context.setVariable("quantity", 10);
        context.setVariable("price", 1000000);

        context.setVariable("totalAmount", 10);
        context.setVariable("shopLink", "https://huucuong-un.github.io/htmlcss-1112studio/?fbclid=IwAR177w5Ref1WUBg432KBNieE9wKll9rdKw70B_YpFL8V1vJNGZZWgOlBfLE#");

        return templateEngine.process("email-template", context);
    }

    //Method 1
    //To send a simple mail
    @Override
    public String sendSimpleMail(EmailDetailsEntity details) {
        try {
            //Creating a simple mail message
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            //Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            String emailContent = processThymeleafTemplate();

            mailMessage.setText(emailContent);
            mailMessage.setSubject(details.getSubject());

            // Sending the mail
            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";

        } catch (Exception e) {
            return "Error while Sending Mail";
        }

    }

    // Method 2
    // To send an email with attachment
    @Override
    public String sendMailWithAttachment(EmailDetailsEntity details) {
        // Creating a mime message
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

        // Setting multipart as true for attachments to
        // be send

        mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        mimeMessageHelper.setFrom(sender);
        mimeMessageHelper.setTo(details.getRecipient());

        mimeMessageHelper.setSubject(details.getSubject());

        String htmlContent = processThymeleafTemplate();
        mimeMessageHelper.setText(htmlContent, true);


            // Adding the attachment
        FileSystemResource file = new FileSystemResource(new File(details.getAttachment()));

        mimeMessageHelper.addAttachment(file.getFilename(), file);

        // Sending the mail
        javaMailSender.send(mimeMessage);
        return "Mail sent Successfully";
    }

    // Catch block to handle MessagingException
        catch (MessagingException e) {

        // Display message when exception occurred
        return "Error while sending mail!!!";
    }
    }
}
