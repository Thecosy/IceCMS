package com.ttice.icepayment.service;

import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Repository
public interface PaymentInfoService {

    void createWxPaymentInfo(String plainText);

    void createAliPaymentInfo(HttpServletRequest request) throws IOException;
}
