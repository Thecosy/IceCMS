package com.ttice.icewkment.Util;

import cn.hutool.extra.mail.MailException;
import com.ttice.icewkment.entity.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class MailUtils {

  @Value("${spring.mail.username}")
  private String from;

  @Autowired private JavaMailSender mailSender;

  public int sendCommonEmail(Email email) {
    // 创建简单邮件消息
    SimpleMailMessage message = new SimpleMailMessage();
    // 发送人
    message.setFrom(from);
    // 接受人
    message.setTo(email.getTos());
    // 邮件标题
    message.setSubject(email.getSubject());
    // 邮件内容
    message.setText(email.getContent());
    try {
      mailSender.send(message);
      return 1;
    } catch (MailException e) {
      e.printStackTrace();
      return 0;
    }
  }

  // 发送内容为html
  public int sendEmailUseHtml(Email email) {
    // 创建一个MIME消息
    MimeMessage message = mailSender.createMimeMessage();
    try {

      MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, true);
      // 发送人
      mimeMessageHelper.setFrom(from);
      // 接收人
      mimeMessageHelper.setTo(email.getTos());
      // 邮件主题
      mimeMessageHelper.setSubject(email.getSubject());
      // 邮件内容 true代表内容是html
      mimeMessageHelper.setText(email.getContent(), true);
      mailSender.send(message);
      return 1;
    } catch (MessagingException e) {
      e.printStackTrace();
      return 0;
    }
  }

  // 带附件的邮件发送
  //    public R enclosureEmail(Email email, File file) {
  //        //创建一个MINE消息
  //        MimeMessage message = mailSender.createMimeMessage();
  //        try {
  //            MimeMessageHelper helper = new MimeMessageHelper(message, true);
  //            //发送人
  //            helper.setFrom(from);
  //            //接收人
  //            helper.setTo(email.getTos());
  //            //邮件主题
  //            helper.setSubject(email.getSubject());
  //            //邮件内容   true 表示带有附件或html
  //            helper.setText(email.getContent(), true);
  //
  //            String fileName = file.getName();
  //            //添加附件
  //            helper.addAttachment(fileName, file);
  //            mailSender.send(message);
  //            return R.success("附件邮件成功");
  //        } catch (MessagingException e) {
  //            e.printStackTrace();
  //            return R.success("附件邮件发送失败" + e.getMessage());
  //        }
  //    }

}
