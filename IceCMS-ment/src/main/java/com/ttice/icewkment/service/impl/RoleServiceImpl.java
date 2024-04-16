package com.ttice.icewkment.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ttice.icewkment.entity.Role;
import com.ttice.icewkment.mapper.RoleMapper;
import com.ttice.icewkment.service.ResourceService;
import com.ttice.icewkment.service.RoleService;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {
}
