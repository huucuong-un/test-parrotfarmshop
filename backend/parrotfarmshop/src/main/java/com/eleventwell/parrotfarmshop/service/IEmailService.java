package com.eleventwell.parrotfarmshop.service;

import com.eleventwell.parrotfarmshop.entity.EmailDetailsEntity;


/*
The EmailService interface defines two methods:

String sendSimpleMail(EmailDetails details): This method can be used to send a simple
                                                  text email to the desired recipient.

String sendMailWithAttachment(EmailDetails details): This method can be used to send
                           an email along with an attachment to the desired recipient.
*/

public interface IEmailService {


    // Method
    // To send a simple email
    String sendSimpleMail(EmailDetailsEntity details);

    // Method
    // To send an email with attachment
    String sendMailWithAttachment(EmailDetailsEntity details);
}

