package com.ttice.icewkment.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Announcements {

    /** id */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /** 公告id */
    private String title;

    /** 公告内容 */
    private String content;

    /** 公告创建时间 */
    @ApiModelProperty(value = "创建时间")
    @TableField(fill = FieldFill.INSERT) // 创建注解::自动填充 -DEFAULT没有时，INSERT插入时
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    // @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    // 返回前端自动把Data类型转换为json类型
    private Data created;

    /** 公告更新时间 */
    @ApiModelProperty(value = "更新时间")
    @TableField(fill = FieldFill.INSERT_UPDATE) // 更新注解::自动填充
    @JsonFormat(
            shape = JsonFormat.Shape.STRING,
            pattern = "yyyy-MM-dd HH:mm:ss",
            timezone = "GMT+8") // 返回前端自动把Data类型转换为json类型
    private Data updated;

    /** 公告作者 */
    private String author;

    /** 公告有效值 1有效，0无效 */
    private Boolean is_active;
}
