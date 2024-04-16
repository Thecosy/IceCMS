package com.ttice.icewkment.commin.vo;

import lombok.Data;

import java.util.List;

/** 分页VO */
@Data
public class ResourcePageVO {
  private List<ResourceVO> data;
  private Long total;
}
