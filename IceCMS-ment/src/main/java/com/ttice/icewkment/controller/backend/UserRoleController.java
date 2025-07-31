package com.ttice.icewkment.controller.backend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.ttice.icewkment.commin.lang.Result;
import com.ttice.icewkment.commin.vo.UserNameVO;
import com.ttice.icewkment.entity.Role;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.RoleMapper;
import com.ttice.icewkment.mapper.UserMapper;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@io.swagger.annotations.Api(tags = "用户角色信息接口")
@RestController
@RequestMapping("/UserRole")
public class UserRoleController {

  @Autowired private UserMapper userMapper;

  @Autowired private RoleMapper roleMapper;

  @ApiOperation(value = "获取全部角色信息")
  @GetMapping("/getAllUserRole")
  public List<Role> getAllUserRole() {
    QueryWrapper<Role> Rolewrapper = new QueryWrapper<>();
    Rolewrapper.select();
    return roleMapper.selectList(Rolewrapper);
  }

  @ApiOperation(value = "获取全部用户名称")
  @GetMapping("/getAllUserName")
  public List<UserNameVO> getAllUserName() {
    List<UserNameVO> result = new ArrayList<>();

    QueryWrapper<User> wrapper = new QueryWrapper<User>();
    wrapper.select("username");
    UserNameVO userNameVO = null;
    List<User> users = userMapper.selectList(wrapper);
    for (User user1 : users) {
      userNameVO = new UserNameVO();
      BeanUtils.copyProperties(user1, userNameVO);
      result.add(userNameVO);
    }
    return result;
  }

  @ApiOperation(value = "根据ID获取角色信息")
  @ApiImplicitParam(name = "id", value = "角色ID", required = true)
  @GetMapping("GetRoleById/{id}")
  public Result GetRoleById(@PathVariable("id") Long id) {

    Role role = roleMapper.selectById(id);

    return Result.succ(role);
  }

  
  @ApiOperation(value = "修改角色信息", notes = "根据角色ID修改角色的名称、分类、状态、备注等信息")
  @ApiImplicitParams({
    @ApiImplicitParam(name = "role", value = "角色信息对象", required = true)
  })
  @PutMapping("/updateRole")
  public Result updateRole(@RequestBody Role role) {
    // 参数验证
    if (role.getId() == null) {
      return Result.fail("角色ID不能为空");
    }
    
    // 检查角色是否存在
    Role existingRole = roleMapper.selectById(role.getId());
    if (existingRole == null) {
      return Result.fail("角色不存在");
    }
    
    // 检查角色名称是否与其他角色重复
    QueryWrapper<Role> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("name", role.getName())
                .ne("id", role.getId());
    Role nameExistingRole = roleMapper.selectOne(queryWrapper);
    if (nameExistingRole != null) {
      return Result.fail("角色名称已存在");
    }
    
    // 检查角色标识是否与其他角色重复
    queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("code", role.getCode())
                .ne("id", role.getId());
    Role codeExistingRole = roleMapper.selectOne(queryWrapper);
    if (codeExistingRole != null) {
      return Result.fail("角色标识已存在");
    }
    
    // 更新修改时间
    role.setUpdateTime(new Date());
    
    // 使用UpdateWrapper更新角色信息
    UpdateWrapper<Role> updateWrapper = new UpdateWrapper<>();
    updateWrapper.eq("id", role.getId());
    
    int rows = roleMapper.update(role, updateWrapper);
    
    if (rows > 0) {
      return Result.succ("角色信息更新成功");
    } else {
      return Result.fail("角色信息更新失败");
    }
  }
  
  @ApiOperation(value = "新增角色", notes = "添加新的角色信息")
  @ApiImplicitParams({
    @ApiImplicitParam(name = "role", value = "角色信息对象", required = true)
  })
  @PostMapping("/addRole")
  public Result addRole(@RequestBody Role role) {
    // 参数验证
    if (role.getName() == null || role.getName().trim().isEmpty()) {
      return Result.fail("角色名称不能为空");
    }
    
    if (role.getCode() == null || role.getCode().trim().isEmpty()) {
      return Result.fail("角色标识不能为空");
    }
    
    // 检查角色名称是否已存在
    QueryWrapper<Role> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("name", role.getName());
    Role existingRole = roleMapper.selectOne(queryWrapper);
    if (existingRole != null) {
      return Result.fail("角色名称已存在");
    }
    
    // 检查角色标识是否已存在
    queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("code", role.getCode());
    existingRole = roleMapper.selectOne(queryWrapper);
    if (existingRole != null) {
      return Result.fail("角色标识已存在");
    }
    
    // 设置创建时间和更新时间
    Date now = new Date();
    role.setCreateTime(now);
    role.setUpdateTime(now);
    
    // 如果状态为空，设置默认值为1（启用）
    if (role.getStatus() == null) {
      role.setStatus(1);
    }
    
    // 确保ID为空，让数据库自增生成
    role.setId(null);
    
    try {
      // 插入新角色
      int rows = roleMapper.insert(role);
      
      if (rows > 0) {
        return Result.succ("角色添加成功");
      } else {
        return Result.fail("角色添加失败");
      }
    } catch (Exception e) {
      return Result.fail("添加角色失败: " + e.getMessage());
    }
  }
  
  @ApiOperation(value = "删除角色", notes = "根据角色ID删除角色")
  @ApiImplicitParam(name = "id", value = "角色ID", required = true)
  @DeleteMapping("/deleteRole/{id}")
  public Result deleteRole(@PathVariable("id") Long id) {
    // 参数验证
    if (id == null) {
      return Result.fail("角色ID不能为空");
    }
    
    // 检查角色是否存在
    Role existingRole = roleMapper.selectById(id);
    if (existingRole == null) {
      return Result.fail("角色不存在");
    }
    
    // 删除角色
    int rows = roleMapper.deleteById(id);
    
    if (rows > 0) {
      return Result.succ("角色删除成功");
    } else {
      return Result.fail("角色删除失败");
    }
  }
}
