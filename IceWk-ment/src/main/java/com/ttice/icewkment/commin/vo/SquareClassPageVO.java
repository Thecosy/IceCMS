package com.ttice.icewkment.commin.vo;

import com.ttice.icewkment.entity.SquareClass;
import lombok.Data;

import java.util.List;

@Data
public class SquareClassPageVO {
    private List<SquareClass> data;
    private Long total;
}
