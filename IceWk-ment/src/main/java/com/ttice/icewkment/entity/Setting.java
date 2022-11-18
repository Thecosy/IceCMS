package com.ttice.icewkment.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * <p>
 *
 * </p>
 *
 * @author admin
 * @since 2022-01-13
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class Setting implements Serializable {

    private static final long serialVersionUID=1L;

    private Integer id;

    private String beian;

    private String banquan;

    private boolean comment_show;

    private String sitTitle;

    private String sitLogo;

    private boolean imageFormat;

}
