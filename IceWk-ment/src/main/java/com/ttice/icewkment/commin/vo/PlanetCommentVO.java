package com.ttice.icewkment.commin.vo;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.ttice.icewkment.entity.PlanetComment;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class PlanetCommentVO {

    private static final long serialVersionUID=1L;

    private Integer id;
    private Integer parentId;
    private Integer userId;
    private Integer toUserId;
    private Integer postId;
    private String responder;
    private String reviewers;
    private Integer responderId;
    private Integer reviewersId;
    private String profile;
    private String content;
    private Integer status;
    /**
     * 添加时间
     */
    @ApiModelProperty(value = "创建时间")
    @TableField(fill = FieldFill.INSERT)//创建注解::自动填充 -DEFAULT没有时，INSERT插入时
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    // @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    // 返回前端自动把Data类型转换为json类型
    private Date addTime;
    /**
     * 回复列表
     */
    private List<PlanetComment> reply = new ArrayList<>();

}
