package com.ttice.icepayment.service.impl;

import com.ttice.icepayment.entity.OrderInfo;
import com.ttice.icepayment.entity.Product;
import com.ttice.icepayment.entity.Resource;
import com.ttice.icepayment.entity.VipProduct;
import com.ttice.icepayment.enums.OrderStatus;
import com.ttice.icepayment.mapper.OrderInfoMapper;
import com.ttice.icepayment.mapper.ProductMapper;
import com.ttice.icepayment.mapper.PayResourceMapper;
import com.ttice.icepayment.mapper.VipProductMapper;
import com.ttice.icepayment.service.OrderInfoService;
import com.ttice.icepayment.util.OrderNoUtils;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.swagger.models.auth.In;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Service
@Slf4j
public class OrderInfoServiceImpl extends ServiceImpl<OrderInfoMapper, OrderInfo> implements OrderInfoService {

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private PayResourceMapper resourceMapper;

    @Autowired
    private VipProductMapper vipProductMapper;

    @Override
    public OrderInfo createOrderTempByAliResourceId(Long ResourceId , String payMent) {

        //查找已存在但未支付的订单
        OrderInfo orderInfo = this.getNoPayOrderByProductId(ResourceId,payMent);
        if( orderInfo != null && orderInfo.getUserId() == null){
            return orderInfo;
        }

        //获取商品信息
        Resource resource = resourceMapper.selectById(ResourceId);

        //生成订单
        orderInfo = new OrderInfo();
        orderInfo.setTitle(resource.getTitle());
        orderInfo.setOrderNo(OrderNoUtils.getOrderNo()); //订单号
        orderInfo.setPayMent(payMent);
        orderInfo.setProductId(ResourceId);
        orderInfo.setTotalFee(resource.getPrice()); //分
        orderInfo.setOrderStatus(OrderStatus.NOTPAY.getType());
        baseMapper.insert(orderInfo);

        return orderInfo;
    }

    @Override
    public OrderInfo createOrderLoginByAliResourceId(Long ResourceId , String payMent, Integer userid) {

        //查找已存在但未支付的订单
        OrderInfo orderInfo = this.getNoPayOrderByProductId(ResourceId,payMent);
        if( orderInfo != null && orderInfo.getUserId() != null){
            return orderInfo;
        }

        //获取商品信息
        Resource resource = resourceMapper.selectById(ResourceId);

        //生成订单
        orderInfo = new OrderInfo();
        orderInfo.setTitle(resource.getTitle());
        orderInfo.setOrderNo(OrderNoUtils.getOrderNo()); //订单号
        orderInfo.setUserId(Long.valueOf(userid)); //订单号
        orderInfo.setPayMent(payMent);
        orderInfo.setProductId(ResourceId);
        orderInfo.setTotalFee(resource.getPrice()); //分
        orderInfo.setOrderStatus(OrderStatus.NOTPAY.getType());
        baseMapper.insert(orderInfo);

        return orderInfo;
    }

    @Override
    public OrderInfo createOrdervipIntegralLoginByPrice(Integer price , String payMent, Integer userid) {

        //查找已存在但未支付的订单
        OrderInfo orderInfo = this.getNoPayOrderByProductIdAndFee(1L, price , userid,"支付宝");
        if( orderInfo != null && orderInfo.getUserId() != null){
            return orderInfo;
        }

        //获取商品信息
        QueryWrapper<VipProduct> wrapper = new QueryWrapper<>();
        wrapper.eq("id",1);
        VipProduct vipProduct = vipProductMapper.selectOne(wrapper);

        //生成订单
        orderInfo = new OrderInfo();
        orderInfo.setTitle(vipProduct.getTitle());
        orderInfo.setOrderNo(OrderNoUtils.getOrderNo()); //订单号
        orderInfo.setUserId(Long.valueOf(userid)); //订单号
        orderInfo.setPayMent(payMent);
        orderInfo.setProductId(1L);
        orderInfo.setTotalFee(price); //分
        orderInfo.setOrderStatus(OrderStatus.NOTPAY.getType());
        baseMapper.insert(orderInfo);

        return orderInfo;
    }

    @Override
    public OrderInfo createOrdervipLoginByPrice(Integer price , String payMent, Integer userid, Integer payid) {

        //查找已存在但未支付的订单
        OrderInfo orderInfo = this.getNoPayOrderByProductIdAndFee(Long.valueOf(payid), price , userid,"支付宝");

        if( orderInfo != null && orderInfo.getUserId() != null){
            return orderInfo;
        }

        //获取商品信息
        QueryWrapper<VipProduct> wrapper = new QueryWrapper<>();
        wrapper.eq("id",payid);
        VipProduct vipProduct = vipProductMapper.selectOne(wrapper);

        //生成订单
        orderInfo = new OrderInfo();
        orderInfo.setTitle(vipProduct.getTitle());
        orderInfo.setOrderNo(OrderNoUtils.getOrderNo()); //订单号
        orderInfo.setUserId(Long.valueOf(userid)); //订单号
        orderInfo.setPayMent(payMent);
        orderInfo.setProductId(Long.valueOf(payid));
        orderInfo.setTotalFee(price); //分
        orderInfo.setOrderStatus(OrderStatus.NOTPAY.getType());
        baseMapper.insert(orderInfo);

        return orderInfo;
    }

    @Override
    public OrderInfo createOrderByAliProductId(Long productId , String payMent) {

        //查找已存在但未支付的订单
        OrderInfo orderInfo = this.getNoPayOrderByProductId(productId,payMent);
        if( orderInfo != null){
            return orderInfo;
        }

        //获取商品信息
        Product product = productMapper.selectById(productId);

        //生成订单
        orderInfo = new OrderInfo();
        orderInfo.setTitle(product.getTitle());
        orderInfo.setOrderNo(OrderNoUtils.getOrderNo()); //订单号
        orderInfo.setPayMent(payMent);
        orderInfo.setProductId(productId);
        orderInfo.setTotalFee(product.getPrice()); //分
        orderInfo.setOrderStatus(OrderStatus.NOTPAY.getType());
        baseMapper.insert(orderInfo);

        return orderInfo;
    }

    @Override
    public OrderInfo createOrderTempByWxResourceId(Long resourceId , String payMent) {

        //查找已存在但未支付的订单
        OrderInfo orderInfo = this.getNoPayOrderByProductId(resourceId,"微信");
        if( orderInfo != null && orderInfo.getUserId() == null){
            return orderInfo;
        }

        //获取商品信息
        Resource resource = resourceMapper.selectById(resourceId);

        //生成订单
        orderInfo = new OrderInfo();
        orderInfo.setTitle(resource.getTitle());
        orderInfo.setOrderNo(OrderNoUtils.getOrderNo()); //订单号
        orderInfo.setPayMent(payMent);
        orderInfo.setProductId(resourceId);
        orderInfo.setTotalFee(resource.getPrice()); //分
        orderInfo.setOrderStatus(OrderStatus.NOTPAY.getType());
        baseMapper.insert(orderInfo);

        return orderInfo;
    }

    @Override
    public OrderInfo createOrderForVipIntegralLoginByPrice(Integer price , String payMent, Integer userid) {

        //查找已存在但未支付的订单
        OrderInfo orderInfo = this.getNoPayOrderByProductIdAndFee(1L, price , userid,"微信");
        if( orderInfo != null && orderInfo.getUserId()!= null){
            return orderInfo;
        }

        //获取商品信息
        QueryWrapper<VipProduct> wrapper = new QueryWrapper<>();
        wrapper.eq("id",1);
        VipProduct vipProduct = vipProductMapper.selectOne(wrapper);
        //生成订单
        orderInfo = new OrderInfo();
        orderInfo.setTitle(vipProduct.getTitle());
        orderInfo.setUserId(Long.valueOf(userid));
        orderInfo.setOrderNo(OrderNoUtils.getOrderNo()); //订单号
        orderInfo.setPayMent(payMent);
        orderInfo.setProductId(1L);
        orderInfo.setTotalFee(price); //分
        orderInfo.setOrderStatus(OrderStatus.NOTPAY.getType());
        baseMapper.insert(orderInfo);

        return orderInfo;
    }

    @Override
    public OrderInfo createOrderForVipLoginByPrice(Integer price , String payMent, Integer userid, Integer payid) {

        //查找已存在但未支付的订单
        OrderInfo orderInfo = this.getNoPayOrderByProductIdAndFee(Long.valueOf(payid), price , userid,"微信");
        if( orderInfo != null && orderInfo.getUserId()!= null){
            return orderInfo;
        }

        //获取商品信息
        QueryWrapper<VipProduct> wrapper = new QueryWrapper<>();
        wrapper.eq("id",payid);
        VipProduct vipProduct = vipProductMapper.selectOne(wrapper);
        //生成订单
        orderInfo = new OrderInfo();
        orderInfo.setTitle(vipProduct.getTitle());
        orderInfo.setUserId(Long.valueOf(userid));
        orderInfo.setOrderNo(OrderNoUtils.getOrderNo()); //订单号
        orderInfo.setPayMent(payMent);
        orderInfo.setProductId(Long.valueOf(payid));
        orderInfo.setTotalFee(price); //分
        orderInfo.setOrderStatus(OrderStatus.NOTPAY.getType());
        baseMapper.insert(orderInfo);

        return orderInfo;
    }

    @Override
    public OrderInfo createOrderLoginByWxResourceId(Long resourceId , String payMent, Integer userid) {

        //查找已存在但未支付的订单
        OrderInfo orderInfo = this.getNoPayOrderByProductIdAndUser(resourceId,userid,"微信");
        if( orderInfo != null && orderInfo.getUserId()!= null){
            return orderInfo;
        }

        //获取商品信息
        Resource resource = resourceMapper.selectById(resourceId);

        //生成订单
        orderInfo = new OrderInfo();
        orderInfo.setTitle(resource.getTitle());
        orderInfo.setUserId(Long.valueOf(userid));
        orderInfo.setOrderNo(OrderNoUtils.getOrderNo()); //订单号
        orderInfo.setPayMent(payMent);
        orderInfo.setProductId(resourceId);
        orderInfo.setTotalFee(resource.getPrice()); //分
        orderInfo.setOrderStatus(OrderStatus.NOTPAY.getType());
        baseMapper.insert(orderInfo);

        return orderInfo;
    }


    @Override
    public OrderInfo createOrderByWxProductId(Long productId , String payMent) {

        //查找已存在但未支付的订单
        OrderInfo orderInfo = this.getNoPayOrderByProductId(productId,"微信");
        if( orderInfo != null){
            return orderInfo;
        }

        //获取商品信息
        Product product = productMapper.selectById(productId);

        //生成订单
        orderInfo = new OrderInfo();
        orderInfo.setTitle(product.getTitle());
        orderInfo.setOrderNo(OrderNoUtils.getOrderNo()); //订单号
        orderInfo.setPayMent(payMent);
        orderInfo.setProductId(productId);
        orderInfo.setTotalFee(product.getPrice()); //分
        orderInfo.setOrderStatus(OrderStatus.NOTPAY.getType());
        baseMapper.insert(orderInfo);

        return orderInfo;
    }

    /**
     * 存储订单二维码
     * @param orderNo
     * @param codeUrl
     */
    @Override
    public void saveCodeUrl(String orderNo, String codeUrl,String payMent) {

        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("order_no", orderNo);
        queryWrapper.eq("pay_ment", payMent);

        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setCodeUrl(codeUrl);

        baseMapper.update(orderInfo, queryWrapper);
    }

    /**
     * 查询订单列表，并倒序查询
     * @return
     */
    @Override
    public List<OrderInfo> listOrderByCreateTimeDesc() {

        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<OrderInfo>().orderByDesc("create_time");
        return baseMapper.selectList(queryWrapper);
    }

    /**
     * 根据id查询订单列表
     * @return
     */
    @Override
    public List<OrderInfo> listOrderById(Integer userId) {

        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<OrderInfo>().orderByDesc("create_time");
        queryWrapper.eq("user_id",userId);
        return baseMapper.selectList(queryWrapper);
    }

    /**
     * 根据订单号更新订单状态
     * @param orderNo
     * @param orderStatus
     */
    @Override
    public void updateStatusByOrderNo(String orderNo, OrderStatus orderStatus) {

        log.info("更新订单状态 ===> {}", orderStatus.getType());

        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("order_no", orderNo);

        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setOrderStatus(orderStatus.getType());

        baseMapper.update(orderInfo, queryWrapper);
    }

    /**
     * 根据订单号获取订单状态
     * @param orderNo
     * @return
     */
    @Override
    public String getOrderStatus(String orderNo) {

        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("order_no", orderNo);
        OrderInfo orderInfo = baseMapper.selectOne(queryWrapper);
        if(orderInfo == null){
            return null;
        }
        return orderInfo.getOrderStatus();
    }

    /**
     * 根据订单号获取订单状态
     * @param userid
     * @return
     */
    @Override
    public String getOrderStatusBytrue(String userid,String resourceid) {

        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userid);
        queryWrapper.eq("product_id", resourceid);
        OrderInfo orderInfo = baseMapper.selectOne(queryWrapper);
        if(orderInfo == null){
            return null;
        }
        return orderInfo.getOrderStatus();
    }

    /**
     * 查询创建超过minutes分钟并且未支付的订单
     * @param minutes
     * @return
     */
    @Override
    public List<OrderInfo> getNoPayOrderByDuration(int minutes) {

        Instant instant = Instant.now().minus(Duration.ofMinutes(minutes));

        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("order_status", OrderStatus.NOTPAY.getType());
        queryWrapper.ge("create_time", instant);

        List<OrderInfo> orderInfoList = baseMapper.selectList(queryWrapper);

        return orderInfoList;
    }

    /**
     * 根据订单号获取订单
     * @param orderNo
     * @return
     */
    @Override
    public OrderInfo getOrderByOrderNo(String orderNo) {

        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("order_no", orderNo);
        OrderInfo orderInfo = baseMapper.selectOne(queryWrapper);

        return orderInfo;
    }


    /**
     * 根据商品id查询未支付订单
     * 防止重复创建订单对象
     * @param productId
     * @return
     */
    private OrderInfo getNoPayOrderByProductId(Long productId,String payMent) {

        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("product_id", productId);
        queryWrapper.eq("pay_ment", payMent);
        queryWrapper.eq("order_status", OrderStatus.NOTPAY.getType());
//        queryWrapper.eq("user_id", userId);
        OrderInfo orderInfo = baseMapper.selectOne(queryWrapper);
        return orderInfo;
    }

    /**
     * 根据商品id查询未支付订单
     * 防止重复创建订单对象
     * @param productId
     * @return
     */
    private OrderInfo getNoPayOrderByProductIdAndFee(Long productId ,Integer fee , Integer Userid,String payMent) {

        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("product_id", productId);
        queryWrapper.eq("total_fee", fee);
        queryWrapper.eq("user_id", Userid);
        queryWrapper.eq("pay_ment", payMent);
        queryWrapper.eq("order_status", OrderStatus.NOTPAY.getType());
//        queryWrapper.eq("user_id", userId);
        OrderInfo orderInfo = baseMapper.selectOne(queryWrapper);
        return orderInfo;
    }
    /**
     * 根据商品id查询未支付订单
     * 防止重复创建订单对象
     * @param productId
     * @return
     */
    private OrderInfo getNoPayOrderByProductIdAndUser(Long productId ,Integer Userid ,String payMent) {

        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("product_id", productId);
        queryWrapper.eq("user_id", Userid);
        queryWrapper.eq("pay_ment", payMent);
        queryWrapper.eq("order_status", OrderStatus.NOTPAY.getType());
//        queryWrapper.eq("user_id", userId);
        OrderInfo orderInfo = baseMapper.selectOne(queryWrapper);
        return orderInfo;
    }

}
