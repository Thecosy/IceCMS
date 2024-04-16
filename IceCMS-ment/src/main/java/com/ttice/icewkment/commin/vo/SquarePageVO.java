package com.ttice.icewkment.commin.vo;

import lombok.Data;

import java.util.List;

@Data
public class SquarePageVO {
  private List<SquareVO> data;
  private Long total;
  private Long Pages;
}
