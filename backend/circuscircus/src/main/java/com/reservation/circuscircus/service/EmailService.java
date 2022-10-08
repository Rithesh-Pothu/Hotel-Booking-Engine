package com.reservation.circuscircus.service;

import com.reservation.circuscircus.ApplicationProperties;
import freemarker.template.Template;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import freemarker.template.Configuration;

import javax.mail.internet.MimeMessage;
import java.util.Map;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private ApplicationProperties applicationProperties;
    @Autowired
    private Configuration config;

    public Boolean sendOtpMessage(String to, Integer otp, String bookingId) {
        try {
            MimeMessage msg = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true);
            helper.setTo(to);
            helper.setSubject("OTP Verification");
            helper.setText("OTP to verify your cancellation of booking with bookingId "+bookingId+" is: "+otp);
            javaMailSender.send(msg);
            return true;
        }
        catch(Exception e){
            return false;
        }
    }
    public Boolean sendHtmlMail(Map<String, String> model) {
        try {
            Template template = config.getTemplate("email_template.ftl");
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(model.get("recipient"));
            helper.setSubject(model.get("subject"));
            helper.setText(html, true);
            javaMailSender.send(message);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

}