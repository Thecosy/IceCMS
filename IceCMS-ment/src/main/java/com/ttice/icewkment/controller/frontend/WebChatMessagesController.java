package com.ttice.icewkment.controller.frontend;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ttice.icewkment.Util.MailUtils;
import com.ttice.icewkment.entity.ChatMessages;
import com.ttice.icewkment.entity.User;
import com.ttice.icewkment.mapper.ChatMessagesMapper;
import com.ttice.icewkment.mapper.UserMapper;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.*;

/**
 * 前端控制器
 *
 * @author admin
 * @since 2022-02-19
 */
@io.swagger.annotations.Api(tags = "Web信息接口")
@RestController
@RequestMapping("/WebchatMessages")
public class WebChatMessagesController {

  @Autowired private UserMapper userMapper;

  @Autowired MailUtils mailUtils;

  @Autowired private ChatMessagesMapper chatMessagesMapper;

  @ApiOperation(value = "获取聊天记录")
  @GetMapping("/getChatMessages/{sender}/{receiver}")
  public ArrayList getChatMessages(
      @PathVariable("sender") Integer sender, @PathVariable("receiver") Integer receiver) {
    ArrayList reust = new ArrayList<>();
    QueryWrapper<ChatMessages> wrapper = new QueryWrapper<>();
    wrapper
        .and(i -> i.eq("from_user_id", sender).eq("to_user_id", receiver))
        .or(j -> j.eq("from_user_id", receiver).eq("to_user_id", sender));
    for (ChatMessages chatMessages : chatMessagesMapper.selectList(wrapper)) {
      if (chatMessages.getToUserId() == sender) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", chatMessages.getToUserId());
        data.put("text", chatMessages.getText());
        data.put("from", 2);
        data.put("time", chatMessages.getTime());
        reust.add(data);
      } else {
        Map<String, Object> data = new HashMap<>();
        data.put("id", chatMessages.getToUserId());
        data.put("text", chatMessages.getText());
        data.put("from", 1);
        data.put("time", chatMessages.getTime());
        reust.add(data);
      }
    }
    return reust;
  }

  @ApiOperation(value = "发送聊天消息")
  @GetMapping("/sendChatMessage/{sender}/{receiver}/{message}")
  public int sendChatMessage(
      @PathVariable("sender") Integer sender,
      @PathVariable("receiver") Integer receiver,
      @PathVariable("message") String message) {

    ChatMessages chatMessage = new ChatMessages();
    chatMessage.setTime(LocalDateTime.now());
    chatMessage.setText(message);
    chatMessage.setToUserId(receiver);
    chatMessage.setFromUserId(sender);
    return chatMessagesMapper.insert(chatMessage);
  }

  @ApiOperation(value = "获取聊天好友列表")
  @GetMapping("/getMessageList/{userid}")
  public ArrayList sendChatMessage(@PathVariable("userid") Integer userid) {
    ArrayList result = new ArrayList<>();

    QueryWrapper<ChatMessages> wrapper = new QueryWrapper<>();
    wrapper.and(i -> i.eq("to_user_id", userid));
    List<ChatMessages> chatMessages = chatMessagesMapper.selectList(wrapper);

    Set<Integer> distinctFromUserIds = new HashSet<>();

    for (ChatMessages chatMessage : chatMessages) {
      Integer fromUserId = chatMessage.getFromUserId();
      distinctFromUserIds.add(fromUserId);
    }

    for (Integer distinctFromUserId : distinctFromUserIds) {
      // 获取每一位 "好友" 的名称和头像 id 信息
      QueryWrapper wrapper1 = new QueryWrapper<>();
      wrapper1.eq("user_id", distinctFromUserId);
      User user = userMapper.selectOne(wrapper1);
      Map<String, Object> data = new HashMap<>();
      data.put("name", user.getName());
      data.put("avatar", user.getProfile());
      data.put("id", distinctFromUserId);
      result.add(data);
    }
    return result;
  }
}
