package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
public class ArticleClass implements Serializable {

    @TableId(type = IdType.AUTO)
    private Integer id;
    private String  name;
    private Integer father;
    private String otherName;
    private String describes;
    private String imgclass;
    private Integer top;
    private Integer num;
}
