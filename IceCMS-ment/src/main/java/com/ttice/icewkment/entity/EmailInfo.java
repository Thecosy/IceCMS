package com.ttice.icewkment.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@TableName("s_mail_info")
public class EmailInfo {

    /** id */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /** 邮箱发送用户名 */
    private String username;

    /** 邮箱发送密码 */
    private String password;

    /** email主机 */
    private String host;

    /** email端口 */
    private String protocol;
}
