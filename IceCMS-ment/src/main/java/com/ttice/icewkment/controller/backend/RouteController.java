package com.ttice.icewkment.controller.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RouteController {

  @GetMapping("/get-async-routes")
  public Map<String, Object> getAsyncRoutes() {
    Map<String, Object> response = new HashMap<>();
    List<Map<String, Object>> routes = new ArrayList<>();

    Map<String, Object> tabsRouter = new HashMap<>();
    tabsRouter.put("path", "/tabs");
    tabsRouter.put(
        "meta",
        new HashMap<String, Object>() {
          {
            put("icon", "tag");
            put("title", "menus.hstabs");
            put("rank", "tabs");
          }
        });

    List<Map<String, Object>> children = new ArrayList<>();
    children.add(
        new HashMap<String, Object>() {
          {
            put("path", "/tabs/index");
            put("name", "Tabs");
            put(
                "meta",
                new HashMap<String, Object>() {
                  {
                    put("title", "menus.hstabs");
                    put("roles", Arrays.asList("admin", "common"));
                  }
                });
          }
        });
    children.add(
        new HashMap<String, Object>() {
          {
            put("path", "/tabs/query-detail");
            put("name", "TabQueryDetail");
            put(
                "meta",
                new HashMap<String, Object>() {
                  {
                    put("showLink", false);
                    put("activePath", "/tabs/index");
                    put("roles", Arrays.asList("admin", "common"));
                  }
                });
          }
        });
    children.add(
        new HashMap<String, Object>() {
          {
            put("path", "/tabs/params-detail/:id");
            put("name", "TabParamsDetail");
            put(
                "meta",
                new HashMap<String, Object>() {
                  {
                    put("showLink", false);
                    put("activePath", "/tabs/index");
                    put("roles", Arrays.asList("admin", "common"));
                  }
                });
          }
        });

    tabsRouter.put("children", children);
    routes.add(tabsRouter);

    response.put("success", true);
    response.put("data", routes);

    return response;
  }
}
