package com.ttice.icewkment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ttice.icewkment.entity.Panel;

public interface PanelService extends IService<Panel> {
  Panel SearchPanelInfo();
}
