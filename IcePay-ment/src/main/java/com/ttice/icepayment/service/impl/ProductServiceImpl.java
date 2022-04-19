package com.ttice.icepayment.service.impl;

import com.ttice.icepayment.entity.Product;
import com.ttice.icepayment.mapper.ProductMapper;
import com.ttice.icepayment.service.ProductService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {

}
