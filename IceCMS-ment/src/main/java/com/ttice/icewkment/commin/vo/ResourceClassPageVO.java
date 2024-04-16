package com.ttice.icewkment.commin.vo;

import com.ttice.icewkment.entity.ResourceClass;
import lombok.Data;

import java.util.List;

@Data
public class ResourceClassPageVO {
  private List<ResourceClass> data;
  private Long total;
}
