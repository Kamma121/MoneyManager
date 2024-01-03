package com.moneymanager.backend.controller;

import com.moneymanager.backend.form.ContactForm;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class EmailController {
    public static final String EMAIL_ADDRESS = "moneymanager.app.contact@gmail.com";

    @PostMapping("/contact")
    public ResponseEntity<String> sendEmail(@RequestBody ContactForm form) {
        Email from = new Email(EMAIL_ADDRESS);
        Email to = new Email(EMAIL_ADDRESS);
        String subject = "MoneyManager contact";
        Content content = new Content("text/plain",
                "Email: " + form.getEmail() + "\n" +
                        "Name: " + form.getName() + "\n" +
                        "Message: " + form.getMessage() + "\n");
        Mail mail = new Mail(from, subject, to, content);
        SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            sg.api(request);
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email");
        }
        return ResponseEntity.ok("Email successfully sent.");
    }
}
