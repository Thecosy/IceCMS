package com.ttice.icewkment.commin.vo;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * 资源列表
 */

@Data
public class ResourceVO {
    private Integer id;
    private LocalDateTime addTime;
    private LocalDateTime createTime;
    private String author;
    private String authorThumb;
    private String title;
    private String intro;
    private Integer ownerTag;
    private String status;
    private String price;
    private String thumb;
    private String sortClass;
    private String profile;
}
