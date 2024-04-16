package com.ttice.icewkment.configuration;

import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * 返回本机ip地址和端口
 *
 * @author admin
 * @since 2022-02-19
 */
@Component
public class ServerConfig implements ApplicationListener<WebServerInitializedEvent> {
  private Integer port;

  public String getUrl() {
    InetAddress address = null;
    try {
      address = InetAddress.getLocalHost();
    } catch (UnknownHostException e) {
      e.printStackTrace();
    }
    return "http://" + address.getHostAddress() + ":" + "8181";
  }

  @Override
  public void onApplicationEvent(WebServerInitializedEvent webServerInitializedEvent) {
    this.port = webServerInitializedEvent.getWebServer().getPort();
  }
}
