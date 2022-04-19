package com.ttice.icepayment.service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public interface PaymentInfoService {

    void createWxPaymentInfo(String plainText);

    void createAliPaymentInfo(HttpServletRequest request) throws IOException;
}
