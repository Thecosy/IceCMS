<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from "../../../stores/useUserStore";
// import { useCookies } from 'vue3-cookies';
import { createSquare, getAllSquare, likeClickComments } from "../../../api/websquare";
// import { formatDate } from "../../utils/date.js";
import { getPlanetIdComment, addPlanetComment, likeClickComment } from "../../../api/WebSquareComment";
import { getSquareClasslist, getArticleClassByotherName } from "../../../api/websquareClass";
import { getAnnouncementslistByNum } from "../../../api/webannouncements";
import { updateImage } from '../../../api/updateImage';
import EmojiPicker from '../../components/emoji/index.vue'
// import UploadPicker from './component/upload/picker.vue'
// import UploadView from './component/upload/view.vue'

// import { ElButton } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useInput } from '../../hooks/useInput'
import { useEmoji } from '../../hooks/useEmoji'
import { useUpload } from '../../hooks/useUpload'

const route = useRoute();
const router = useRouter();
// const { cookies } = useCookies();

// 添加渲染表情的函数
function renderEmojiContent(content: string | null | undefined): string {
  if (!content) return '';
  
  // 正则表达式匹配 [emoji_name] 格式
  const emojiRegex = /\[([^\]]+?)\]/g;
  return content.replace(emojiRegex, (match, emojiName) => {
    // 将 [emoji_name] 转换为 <img> 标签
    return `<img src="/emoji/${emojiName}.png" class="emoji-icon" alt="${emojiName}" style="width: 24px; height: 24px; vertical-align: middle;" />`;
  });
}

definePageMeta({
  validate: async (route) => {
    // 检查id是否由数字组成
    return /^\d+$/.test(route.params.id)
  }
})

// data
const announcementsList = ref([]);
const isDark = ref(false);
const pagetotal = ref(0);
const isLoading = ref(false);
const isSubmitting = ref(false); // 添加提交状态
const dialogImageUrl = ref('');
const userJudje = ref<boolean>(false);
const dialogVisible = ref(false);
// const fileList = ref([]);
const imageList = ref([]);
const newFile = ref(new FormData());
const sentence = ref('');
const page = ref(1);
const MyEmoge = ref('');
const showDialog = ref(false);
const planetInfo = ref({});
const classlist = ref([]);
const squaredata = ref([]);
const isClient = ref(false); // 判断是否为客户端渲染
const postForm = reactive({
  image: [],
  isLock: false,
  content: '',
  author: '',
  sortClass: ''
});
const postReplyForm = reactive({
  content: '',
  parentId: '',
  userId: '',
  postId: ''
});
const postReplysForm = reactive({
  content: '',
  parentId: '',
  userId: '',
  postId: ''
});
const postReplysToUserForm = reactive({
  content: '',
  parentId: '',
  userId: '',
  toUserId: '',
  postId: ''
});
const shownologin = ref(false);
const comment = ref([]);
// 标题栏默认值为 'nav-link active'
const acticve = ref<string>("nav-link active");
const setting = ref<any>({});

const emit = defineEmits<{
  (e: 'blur'): void
  (e: 'submit', value?: any): void
}>()

const props = withDefaults(
    defineProps<{
      pid?: string
      reply_id?: string
    }>(),
    {
      pid: '',
      reply_id: ''
    }
)

// 输入框
const {
  commenterRef, // 根元素实力
  richInputRef, // 输入框实力
  inputFocus, // 输入框聚焦
  placeholder, // 描述
  inputLength, // 输入长度
  onRichFocus, // 事件-聚焦输入框
  onInputText, // 事件-输入文字
  clearInputText, // 事件-清空输入框文字
  moveCursorToEnd // 移动光标至最后
} = useInput()

await handlegetAnnouncementslistByNum();
async function handlegetAnnouncementslistByNum() {
  try {
    const result = await getAnnouncementslistByNum(4);
    announcementsList.value = result
  } catch (error) {
    console.error('获取Announcementslist出错:', error);
  }
};

// 表情
const { appendEmoji } = useEmoji()
// 照片
const { fileList, onUpload, removeFile } = useUpload()

watch(
    inputFocus,
    (value) => {
      if (value == true) return
      setTimeout(() => {
        emit('blur')
      }, 300)
    },
    { immediate: false }
)

// 发送
const onSend = async () => {
  if (inputLength.value >= 1000) {
    ElMessage.warning('字数超过限制，请删减后发送')
    return
  }

  if (isSubmitting.value) {
    ElMessage.warning('正在发布中，请勿重复点击')
    return
  }

  const content = (richInputRef.value as HTMLInputElement).innerHTML
  const regex = /<img src="\/emoji\/(.+?)".*?>/g

  let replacedStr = content
  let match
  const emojis = []

  while ((match = regex.exec(content)) !== null) {
    const emojiUrl: any = match[1]
    const emojiText = `[${emojiUrl.split('/').pop().split('.')[0]}]`
    emojis.push(emojiText)
    replacedStr = replacedStr.replace(match[0], emojiText)
  }

  // 检查内容是否为空
  if (!replacedStr.trim() && fileList.value.length === 0) {
    ElMessage.warning('请输入内容或上传图片')
    return
  }

  const userStore = useUserStore()
  if (!userStore.userid) {
    ElMessage.warning('请先登录')
    shownologin.value = true
    return
  }

  isSubmitting.value = true

  try {
    // 设置发布内容
    postForm.content = replacedStr
    postForm.author = userStore.userid
    postForm.sortClass = route.params.id as string || ''
    postForm.image = JSON.stringify(fileList.value.map(file => ({ url: file.url, name: file.name })))

    const squareId = route.params.id || 'circle'
    await createSquare(postForm)
    
    // 清空输入内容
    clearInputContent()
    postForm.content = ''
    postForm.image = '[]'
    
    // 刷新数据
    await fetchData()
    
    ElMessage.success('发表成功')
  } catch (error) {
    console.error('发布失败:', error)
    ElMessage.error('发布失败，请重试')
  } finally {
    setTimeout(() => {
      isSubmitting.value = false
    }, 1000)
  }
}

// 粘贴
const onPasteContent = async (event: any) => {
  event.preventDefault()
  const text = (event.originalEvent || event).clipboardData.getData(
      'text/plain'
  )
  document.execCommand('insertText', false, text)
}

// 清空评论内容
const clearInputContent = () => {
  clearInputText()
  fileList.value = []
}

defineExpose({ onRichFocus, clearInputContent })

import { useSettingStore } from '../../../stores/setting';
const settingStore = useSettingStore();
setting.value = settingStore.settings

// watch
// watch(() => route.params.id, () => fetchData());

// Methods
const fetchData = async () => {
  squaredata.value = [];
  await handlegetSquare();
};

async function handlegetSquare() {
  if (squaredata.value.length !== pagetotal.value) {
    isLoading.value = true;
  }
  try {
    const squareResponse = await getAllSquare(route.params.id, page.value, 6);
    pagetotal.value = squareResponse.total;
    squaredata.value = squaredata.value.concat(squareResponse.data.map((item: any) => {
      item.image = JSON.parse(item.image);
      return item;
    }));

    const response = await getArticleClassByotherName(route.params.id);
    planetInfo.value = response;

  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

await handlgetSquareClasslist();
async function handlgetSquareClasslist() {
  try {
    const response = await getSquareClasslist();
    classlist.value = response;
    if (!route.params.id && classlist.value.length > 0) {
      router.push({ path: `/planet/${classlist.value[0].id}` });
    }
  } catch (error) {
    console.error(error);
  }
};

const getUserInfo = () => {
  // const user = cookies.get("access-user");
  // userJudje.value = !user;
  // if (user) {
  //   postForm.author = user.userid;
  //   shownologin.value = false;
  // } else {
  //   shownologin.value = true;
  // }
};

const getTime = (time: string) => {
  const now = new Date();
  const nowTime = now.getTime();
  const timeTime = new Date(time).getTime();
  const timeDiff = nowTime - timeTime;
  const dayDiff = Math.floor(timeDiff / (24 * 3600 * 1000));
  const yearDiff = Math.floor(timeDiff / (24 * 3600 * 1000 * 365));

  if (dayDiff === 0) {
    if (Math.floor(timeDiff / (3600 * 1000)) === 0) {
      return Math.floor(timeDiff / (60 * 1000)) === 0 ? '刚刚' : `${Math.floor(timeDiff / (60 * 1000))}分钟前`;
    } else {
      return `${Math.floor(timeDiff / (3600 * 1000))}小时前`;
    }
  } else if (dayDiff === 1) {
    return '昨天';
  } else if (dayDiff === 2) {
    return '前天';
  } else if (dayDiff > 2 && dayDiff < 7) {
    return '最近一周';
  } else if (yearDiff === 1) {
    return '去年';
  } else if (yearDiff > 1) {
    return `${yearDiff}年前`;
  } else {
    return new Date(time).toLocaleDateString();
  }
};

const formatDate = (time: string) => {
  return formatDate(new Date(time), 'yyyy-MM-dd');
};

const likeClick = async (item: any) => {
  if (!item.isLike) {
    item.isLike = true;
    item.loveNum++;
    await likeClickComment(item.id);
  } else {
    item.isLike = false;
    item.loveNum--;
  }
};

const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handlePreview = (file: any) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const BeforeUpload = (file: any) => {
  if (file) {
    newFile.value.append('file', file);
  } else {
    return false;
  }
};

const Upload = async () => {
  const newData = newFile.value.get('file');
  const form = new FormData();
  form.append('editormd-image-file', newData, newData.name);
  try {
    const resp = await updateImage(form);
    const imgUrl = resp.data.url;
    imageList.value.push({ url: imgUrl, name: imgUrl });
    fileList.value.push({ url: imgUrl, name: imgUrl });
  } catch (error) {
    console.error(error);
  }
};

const getNextUser = () => {
  window.onscroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const bottomOfWindow = (scrollTop + windowHeight) - scrollHeight;
    if (bottomOfWindow === 0.5 || bottomOfWindow === 0) {
      page.value++;
      handlegetSquare();
    }
    if (squaredata.value.length === pagetotal.value) {
      isLoading.value = false;
    }
  };
};

// 分享功能相关状态
const shareUrl = ref('');
const shareTitle = ref('社区动态 - IceCMS');
const shareDescription = ref('发现更多有趣内容，参与社区讨论');

// 圈子帮助弹窗相关状态
const showHelpModal = ref(false);
const helpModalType = ref('');
const helpModalTitle = ref('');
const helpModalContent = ref('');

// 帮助内容数据
const helpContents = {
  create: {
    title: '怎么创建圈子？',
    content: `
      <div class="help-content">
        <h3>创建圈子指南</h3>
        <div class="step-list">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>准备工作</h4>
              <p>确保您已经完成实名认证，并且账户状态正常。新用户需要注册满7天才能创建圈子。</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>提交申请</h4>
              <p>点击"创建圈子"按钮，填写圈子名称、描述、分类等基本信息。圈子名称需要具有独特性，不能与现有圈子重复。</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>审核流程</h4>
              <p>提交申请后，管理员会在1-3个工作日内完成审核。审核通过后，您将收到通知，圈子正式开放。</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>圈子管理</h4>
              <p>作为圈主，您可以邀请管理员、制定圈子规则、管理成员、发布公告等。请确保圈子内容健康、积极。</p>
            </div>
          </div>
        </div>
        <div class="help-tips">
          <h4>💡 小贴士</h4>
          <ul>
            <li>圈子名称建议简洁明了，便于用户理解和搜索</li>
            <li>详细的圈子描述有助于吸引更多志同道合的用户</li>
            <li>选择合适的分类能让更多用户发现您的圈子</li>
            <li>定期发布优质内容，活跃圈子氛围</li>
          </ul>
        </div>
      </div>
    `
  },
  communication: {
    title: '如何进行沟通？',
    content: `
      <div class="help-content">
        <h3>圈子沟通指南</h3>
        <div class="comm-section">
          <h4>🗣️ 发布动态</h4>
          <ul>
            <li>在圈子首页点击发布框，分享您的想法、经验或问题</li>
            <li>支持文字、图片、链接等多种内容形式</li>
            <li>使用话题标签，让内容更容易被发现</li>
            <li>遵守圈子规则，发布有价值的内容</li>
          </ul>
        </div>
        
        <div class="comm-section">
          <h4>💬 评论互动</h4>
          <ul>
            <li>在感兴趣的动态下方进行评论</li>
            <li>可以回复其他用户的评论，形成讨论</li>
            <li>使用表情包让交流更生动有趣</li>
            <li>尊重他人观点，保持友善讨论</li>
          </ul>
        </div>
        
        <div class="comm-section">
          <h4>👍 点赞收藏</h4>
          <ul>
            <li>对喜欢的内容点赞，表达支持</li>
            <li>收藏有价值的内容，方便日后查看</li>
            <li>分享优质内容给更多朋友</li>
          </ul>
        </div>
        
        <div class="comm-section">
          <h4>🔔 消息通知</h4>
          <ul>
            <li>及时查看系统通知和私信</li>
            <li>关注感兴趣的用户，获取最新动态</li>
            <li>开启推送通知，不错过重要消息</li>
          </ul>
        </div>
        
        <div class="help-tips">
          <h4>💡 沟通技巧</h4>
          <ul>
            <li>保持积极正面的沟通态度</li>
            <li>用事实和逻辑支撑观点</li>
            <li>避免人身攻击和恶意言论</li>
            <li>多倾听他人意见，开放讨论</li>
          </ul>
        </div>
      </div>
    `
  },
  terms: {
    title: '圈子条款',
    content: `
      <div class="help-content">
        <h3>IceCMS 圈子服务条款</h3>
        
        <div class="terms-section">
          <h4>第一条 服务说明</h4>
          <p>IceCMS圈子是为用户提供的社区交流服务平台。用户可以在圈子中发布内容、参与讨论、分享经验等。</p>
        </div>
        
        <div class="terms-section">
          <h4>第二条 用户行为规范</h4>
          <ol>
            <li><strong>内容规范：</strong>不得发布违法、有害、虚假、侵权的内容</li>
            <li><strong>言论规范：</strong>保持文明用语，不得进行人身攻击或恶意诽谤</li>
            <li><strong>版权规范：</strong>尊重他人知识产权，不得未经授权转载他人作品</li>
            <li><strong>隐私规范：</strong>不得泄露他人隐私信息</li>
          </ol>
        </div>
        
        <div class="terms-section">
          <h4>第三条 圈主权利与义务</h4>
          <ol>
            <li><strong>管理权利：</strong>圈主有权制定圈子规则、管理成员、删除违规内容</li>
            <li><strong>维护义务：</strong>圈主应维护圈子秩序，确保内容健康积极</li>
            <li><strong>责任义务：</strong>对圈子内违法违规行为承担管理责任</li>
          </ol>
        </div>
        
        <div class="terms-section">
          <h4>第四条 平台权利</h4>
          <ol>
            <li>对违规内容进行删除、屏蔽处理</li>
            <li>对违规用户进行警告、限制、封禁等处理</li>
            <li>对违规圈子进行整改、关闭等处理</li>
            <li>根据法律法规要求配合相关部门调查</li>
          </ol>
        </div>
        
        <div class="terms-section">
          <h4>第五条 免责声明</h4>
          <p>平台不对用户发布的内容承担法律责任，用户应对自己的言行负责。因用户违规行为导致的任何法律后果，由用户自行承担。</p>
        </div>
        
        <div class="terms-section">
          <h4>第六条 条款变更</h4>
          <p>平台有权根据法律法规变化和业务发展需要修改本条款。修改后的条款将在平台公布，用户继续使用服务即视为同意新条款。</p>
        </div>
        
        <div class="terms-section">
          <h4>第七条 联系方式</h4>
          <p>如有疑问或建议，请通过以下方式联系我们：</p>
          <ul>
            <li>邮箱：support@icecms.cn</li>
            <li>客服QQ：123456789</li>
            <li>工作时间：周一至周五 9:00-18:00</li>
          </ul>
        </div>
        
        <div class="update-time">
          <p><small>最后更新时间：2024年1月1日</small></p>
        </div>
      </div>
    `
  }
};

// 显示帮助弹窗
const showHelp = (type: string) => {
  const content = helpContents[type];
  if (content) {
    helpModalType.value = type;
    helpModalTitle.value = content.title;
    helpModalContent.value = content.content;
    showHelpModal.value = true;
  }
};

// 关闭帮助弹窗
const closeHelpModal = () => {
  showHelpModal.value = false;
  helpModalType.value = '';
  helpModalTitle.value = '';
  helpModalContent.value = '';
};

// 初始化分享信息
if (process.client) {
  shareUrl.value = window.location.href;
}

// 社交分享功能方法
// QQ分享
const shareToQQ = (item?: any) => {
  const url = encodeURIComponent(shareUrl.value);
  const title = encodeURIComponent(item ? `${item.author} 的动态` : shareTitle.value);
  const desc = encodeURIComponent(item ? item.content.replace(/<[^>]*>/g, '').substring(0, 100) : shareDescription.value);

  const qqShareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&desc=${desc}&summary=${desc}&site=IceCMS`;
  window.open(qqShareUrl, '_blank', 'width=600,height=400');
};

// 微博分享
const shareToWeibo = (item?: any) => {
  const url = encodeURIComponent(shareUrl.value);
  const title = encodeURIComponent(item ? `${item.author} 的动态` : shareTitle.value);
  const content = `${title} ${url}`;

  const weiboShareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${content}&pic=`;
  window.open(weiboShareUrl, '_blank', 'width=600,height=400');
};

// 微信分享（复制链接）
const shareToWechat = (item?: any) => {
  const shareContent = item ? `${item.author} 的动态: ${item.content.replace(/<[^>]*>/g, '').substring(0, 50)}...` : shareTitle.value;
  navigator.clipboard?.writeText(`${shareContent} ${shareUrl.value}`).then(() => {
    alert('内容已复制到剪切板，可以分享到微信了！');
  }).catch(() => {
    prompt('请复制以下内容分享到微信:', `${shareContent} ${shareUrl.value}`);
  });
};

// 复制链接
const copyLink = (item?: any) => {
  navigator.clipboard?.writeText(shareUrl.value).then(() => {
    alert('链接已复制到剪切板！');
  }).catch(() => {
    prompt('请复制以下链接:', shareUrl.value);
  });
};

// 其他分享平台
const shareToOther = (platform: string, item?: any) => {
  const url = encodeURIComponent(shareUrl.value);
  const title = encodeURIComponent(item ? `${item.author} 的动态` : shareTitle.value);

  let shareUrlTemplate = '';

  switch (platform) {
    case 'twitter':
      shareUrlTemplate = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
    case 'facebook':
      shareUrlTemplate = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'linkedin':
      shareUrlTemplate = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'telegram':
      shareUrlTemplate = `https://t.me/share/url?url=${url}&text=${title}`;
      break;
    default:
      return;
  }

  window.open(shareUrlTemplate, '_blank', 'width=600,height=400');
};

onMounted(() => {
  isClient.value = true; // 客户端渲染时更新
  fetchData();
  getUserInfo();
  getNextUser();
  const userStore = useUserStore();  // 获取 Pinia store 实例
  // 判断用户是否已登录
  if (userStore.userid) {
    userJudje.value = true; // 已登录，不显示登录提示
    console.log("用户已登录:", userStore.name);
  } else {
    userJudje.value = false; // 未登录，显示登录提示
    console.log("用户未登录");
  }
});

// 缺失的函数实现
const setPullDown = async (item: any) => {
  // 设置评论为空
  comment.value = [];
  if (!item.isShow) {
    try {
      const res = await getPlanetIdComment(item.id);
      comment.value = res.data || [];
    } catch (error) {
      console.error('获取评论失败:', error);
      comment.value = [];
    }
    // 使用 Vue.set 的替代方案
    if (!Object.prototype.hasOwnProperty.call(item, 'isShow')) {
      item.isShow = false;
    }
    item.isShow = !item.isShow;
  } else {
    item.isShow = !item.isShow;
  }
};

const setReplayPullDown = (item: any) => {
  if (!Object.prototype.hasOwnProperty.call(item, 'isShow')) {
    item.isShow = false;
  }
  item.isShow = !item.isShow;
};

const setReplaysPullDown = (reply: any) => {
  if (!Object.prototype.hasOwnProperty.call(reply, 'isShow')) {
    reply.isShow = false;
  }
  reply.isShow = !reply.isShow;
};

const likeClickMains = async (item: any) => {
  // 如果当前是踩状态，先取消踩
  if (item.isLose) {
    item.isLose = false;
  }

  if (!item.isLike) {
    // 点赞
    if (!Object.prototype.hasOwnProperty.call(item, 'isLike')) {
      item.isLike = false;
    }
    item.isLike = true;
    item.loveNum = (item.loveNum || 0) + 1;
    try {
      await likeClickComments(item.id);
    } catch (error) {
      console.error('点赞失败:', error);
      // 回滚状态
      item.isLike = false;
      item.loveNum = Math.max(0, item.loveNum - 1);
    }
  } else {
    // 取消点赞
    item.isLike = false;
    item.loveNum = Math.max(0, (item.loveNum || 0) - 1);
  }
};

const LoseClickMains = (item: any) => {
  // 如果当前是赞状态，先取消赞
  if (item.isLike) {
    item.isLike = false;
    item.loveNum = Math.max(0, (item.loveNum || 0) - 1);
  }

  if (!Object.prototype.hasOwnProperty.call(item, 'isLose')) {
    item.isLose = false;
  }

  // 切换踩状态
  item.isLose = !item.isLose;
};

const likeClicks = async (item: any) => {
  if (!item.isLike) {
    if (!Object.prototype.hasOwnProperty.call(item, 'isLike')) {
      item.isLike = false;
    }
    item.isLike = !item.isLike;
    try {
      await likeClickComment(item.id);
    } catch (error) {
      console.error('点赞失败:', error);
    }
    item.loveNum++;
  } else {
    item.loveNum--;
    item.isLike = !item.isLike;
  }
};

const setUpPostReply = async (item: any) => {
  // 防止重复提交
  if (isSubmitting.value) {
    console.log('正在提交评论，请勿重复点击');
    return;
  }

  // 检查评论内容
  if (!postReplyForm.content || postReplyForm.content.trim() === '') {
    ElMessage.warning('评论内容不能为空');
    return;
  }

  postReplyForm.postId = item.id;
  const userStore = useUserStore();
  
  if (!userStore.userid) {
    shownologin.value = true;
    ElMessage.warning('请先登录');
    return;
  } else {
    postReplyForm.userId = userStore.userid;
    shownologin.value = false;
  }

  isSubmitting.value = true;
  
  try {
    console.log('提交评论:', postReplyForm);
    const result = await addPlanetComment(postReplyForm);
    console.log('评论提交结果:', result);
    
    // 清空评论内容
    postReplyForm.content = '';
    
    // 刷新评论数据
    await fetchData();
    
    ElMessage.success('评论发布成功');
  } catch (error) {
    console.error('发布评论失败:', error);
    ElMessage.error('评论发布失败，请重试');
  } finally {
    // 重置提交状态
    setTimeout(() => {
      isSubmitting.value = false;
    }, 1000);
  }
};

const setUpPostReplys = async (userId: string, id: string, postId: string) => {
  postReplysForm.postId = postId;
  postReplysForm.parentId = id;
  const userStore = useUserStore();
  if (!userStore.userid) {
    shownologin.value = true;
    return;
  } else {
    postReplysForm.userId = userStore.userid;
    shownologin.value = false;
  }

  try {
    const res = await addPlanetComment(postReplysForm);
    if (res.code === 0) {
      postReplysForm.content = '';
      await fetchData();
    }
  } catch (error) {
    console.error('发布回复失败:', error);
  }
};

const setUpPostReplysTouser = async (usersId: string, id: string, postId: string, uId: string) => {
  postReplysToUserForm.postId = postId;
  postReplysToUserForm.parentId = id;
  postReplysToUserForm.toUserId = uId;
  const userStore = useUserStore();
  if (!userStore.userid) {
    shownologin.value = true;
    return;
  } else {
    postReplysToUserForm.userId = userStore.userid;
    shownologin.value = false;
  }

  try {
    const res = await addPlanetComment(postReplysToUserForm);
    if (res.code === 0) {
      postReplysToUserForm.content = '';
      await fetchData();
    }
  } catch (error) {
    console.error('发布回复失败:', error);
  }
};
</script>
<template>
  <div class="content">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app macwk-animation">
          <top :message5="acticve" />
          <div>
            <div class="body">
              <div class="container">
                <div class="row">
                  <el-aside width="260px">
                    <div class="sidebar-innter widget-ffixed">
                      <section id="b2-widget-circle-info-2" class="
                                mobile-hidden
                                widget
                                b2-widget-circle-info
                                mg-b
                                box
                                b2-radius-aside-left
                              ">
                        <div class="b2-widget-title">
                          <h2 class="widget-title">找到你自己的圈子</h2>
                        </div>
                        <div class="b2-widget-box">
                          <div class="about-widget">
                            <div class="user-w-announcement">
                              <ul class="planet-aside-ul">
                                <li class="
                                          planet-aside-li
                                          el-icon-ice-cream-round
                                        ">
                                  <a href="javascript:void(0)" @click="showHelp('create')">怎么创建圈子？</a>
                                </li>
                                <li class="
                                          planet-aside-li
                                          el-icon-ice-cream-round
                                        ">
                                  <a href="javascript:void(0)" @click="showHelp('communication')">如何进行沟通？</a>
                                </li>
                                <li class="
                                          planet-aside-li
                                          el-icon-ice-cream-round
                                        ">
                                  <a href="javascript:void(0)" @click="showHelp('terms')">圈子条款</a>
                                </li>
                              </ul>
                            </div>
                            <div class="circle-widget-button">
                              <nuxt-link to="/CreatePlanet">
                                <button class="text-great">
                                  创建圈子
                                </button>
                              </nuxt-link>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div class="sidebar-innter widget-ffixed">
                      <section id="b2-widget-circle-info-2" class="
                                mobile-hidden
                                widget
                                b2-widget-circle-info
                                mg-b
                                box
                                b2-radius-aside-left-plant
                              ">
                        <div class="b2-widget-title">
                          <h2 class="widget-title-plant">推荐圈子</h2>
                        </div>
                        <div class="b2-widget-box">
                          <div class="about-widget">
                            <div v-if="isClient"class="PlanetListCare">
                              <div v-for="item in classlist" :key="item.id" class="PlanetListItem">
                                <NuxtLink :href="'/planet/' + item.id">
                                  <div style="margin-left: 10px" class="PlanetListItems">
                                    <div class="PlanetListItem-img">
                                      <el-avatar shape="square" :size="38" :src="item.imgclass"></el-avatar>
                                    </div>
                                    <div class="PlanetListItem-info">
                                      <div class="PlanetListItem-title">
                                        <a class="planetTitletext" href="#">
                                          <span>{{ item.name }}</span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </NuxtLink>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="widget-mission-footer">
                          <NuxtLink to="/AllPlanet" class="allad">全部圈子</NuxtLink>
                        </div>
                      </section>
                    </div>
                  </el-aside>
                  <el-main>
                    <div class="circle-top white">
                      <div id="po-topic-box" class="box b2-radius">
                        <div class="po-topic">
                          <div class="circle-info">
                            <div class="circle-info-in">
                              <div class="circle-info-left">
                                <img data-src="" alt="" :src="planetInfo.imgclass" data-was-processed="true"
                                     class="topimg" />
                                <h1 class="planeth1">
                                  <p>
                                    <b>{{ planetInfo.name }}</b>
                                    <span class="mobile-show">
                                      <i class="
                                                  b2font
                                                  b2-arrow-right-s-line
                                                  picked
                                                "></i></span>
                                  </p>
                                  <a target="_blank"><span>Alextao</span>
                                    <span>(圈主)</span></a>
                                </h1>
                                <div class="mobile-show po-top-submit">
                                  <button class="empty">发布话题</button>
                                </div>
                              </div>
                              <div class="circle-admin-info" style="">
                                <!-- <div>
                                    <a href="https://www.zmki.cn/circle-users?circle_id=850" target="_blank"
                                      class="link-block"></a>
                                    <b>4987</b> <span>圈友</span>
                                    <i class="b2font b2-parent-line"></i>
                                  </div>
                                  <div>
                                    <b>52</b> <span>话题</span>
                                    <i class="b2font b2-chat-smile-3-line"></i>
                                  </div> -->
                                <div>
                                  <div class="top-card">

                                    <span class="">所有圈子(3)</span>
                                  </div>
                                  <i class="b2font b2-donut-chart-fill"></i>
                                </div>
                                <!---->
                                <span class="mobile-show close-admin-box"><i class="b2font b2-close-line"></i></span>
                              </div>
                            </div>
                            <p class="circle-desc tip-radius">
                              公共区域，请文明发言!
                            </p>
                            <div v-if="!userJudje" class="nologin">
                              <div class="nologintext">
                                <h5>您还未登录</h5>
                              </div>
                              <div class="nologintext">
                                <p class="circle-desc">
                                  登录后可阅读更多话题
                                </p>
                              </div>
                            </div>
                            <div v-else>
                              <!-- <div class="postFormDiv" style="padding: 14px">
                                <nuxt-link to='/userinfo/index/'>
                                  <div class="avatar">
                                    <el-avatar :size="58" :src="user.profile"></el-avatar>
                                  </div>
                                </nuxt-link>   
                              </div> -->
                              <div class="commenter-container" ref="commenterRef">
                                <div class="commenter-wrapper" :class="{ 'commenter-focused': inputFocus }"
                                     @click="onRichFocus">
                                  <!--内容输入-->
                                  <div id="rich-input" ref="richInputRef" class="rich-input" tabindex="-3"
                                       contenteditable="true" :data-placeholder="placeholder" @focus="inputFocus = true"
                                       @blur="inputFocus ? onRichFocus() : ''" @input="onInputText"
                                       @paste="onPasteContent"></div>
                                  <!--@keyup="onInputText"-->

                                  <!--图片上传-->
                                  <div class="commenter-upload">
                                    <!-- <UploadView
                                      :fileList="fileList"
                                      @remove="removeFile"
                                  ></UploadView> -->
                                  </div>

                                  <!--底部-->
                                  <div style="display: flex;
                                      flex-direction: row;
                                      flex-wrap: wrap;
                                      align-content: flex-start;
                                      justify-content: center;
                                      align-items: flex-start;
                                  " class="commenter-footer flex items-center justify-between px-3 pb-3 pt-2"
                                       @click="moveCursorToEnd">
                                    <div class="flex items-center gap-x-5" @click.stop>
                                      <!--表情选择组件-->
                                      <EmojiPicker @show="moveCursorToEnd" @append="
                                        appendEmoji($event);
                                      inputLength += 1
                                        "></EmojiPicker>

                                      <!--图片选择组件-->
                                      <!-- <UploadPicker @upload="onUpload"></UploadPicker> -->
                                    </div>
                                    <div style="
                                        display: flex;
                                        justify-content: flex-start;
                                        align-content: center;
                                        flex-wrap: wrap;
                                        flex-direction: row-reverse;
                                    " class="flex items-center gap-x-5">
                                      <ElButton class="!text-base" type="primary" @click="onSend">
                                        发送
                                      </ElButton>
                                      <div class="text-xs" style="    padding: 6px;"
                                           :class="[inputLength >= 1000 ? 'text-error' : 'text-[#666]']">
                                        {{ inputLength }} / 1000
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="PutContent">
                                <div class="leftMenu"></div>
                                <!-- <div class="leftMenu">

                                  <a class="nav-link p-0 cursor-pointer">
                                    <i @click="showemoge()" class="icon-smile fs-18" />
                                    <div class="myVEmojiPicker">

                                      <el-popover placement="left" trigger="manual" v-model="showDialog">
                                        <VEmojiPicker :style="{ width: '340px', height: '200' }" labelSearch="Search"
                                            lang="pt-BR" @select="onSelectEmoji" />
                                      </el-popover>

                                    </div>
                                  </a>

                                  <a class="nav-links p-0 cursor-pointer">
                                    <el-popover placement="bottom-start" title="身份名牌" width="200" trigger="hover"
                                      content="独树一帜的名牌,让你眼前一亮。">

                                      <i slot="reference" @click="MainLock()" class="el-icon-postcard" />
                                    </el-popover>
                                  </a>

                                  <a v-if="postForm.isLock" class="nav-links p-0 cursor-pointer">
                                    <el-popover placement="bottom-start" title="私密圈子" width="200" trigger="hover"
                                      content="选择之后,你所发布的内容只有你自己可见。">

                                      <i slot="reference" @click="MainLock()" class="el-icon-lock" />
                                    </el-popover>
                                  </a>

                                  <a v-else class="nav-links p-0 cursor-pointer">
                                    <el-popover placement="bottom-start" title="私密圈子" width="200" trigger="hover"
                                      content="选择之后,你所发布的内容只有你自己可见。">

                                      <i slot="reference" @click="MainLock()" class="el-icon-unlock" />
                                    </el-popover>
                                  </a>
                                </div> -->
                                <!-- <el-button @click="sitmap()" class="PutContentBut" type="success" round>发布</el-button> -->
                              </div>
                              <div style="    padding: 30px;;margin-left: 56px;">
                                <!-- <el-upload class="upload-demo" action="" :on-preview="handlePreview"
                                  :on-remove="handleRemove" :file-list="fileList" :before-upload="BeforeUpload"
                                  :http-request="Upload" list-type="picture-card">
                                  <el-button size="small" type="primary">点击上传</el-button>
                                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2mb</div>
                                </el-upload> -->
                                <!-- <el-upload action="#" list-type="picture-card" :auto-upload="false">
                                    <i slot="default" class="el-icon-plus"></i>
                                    <div slot="file" slot-scope="{file}">
                                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                      <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview"
                                          @click="handlePictureCardPreview(file)">
                                          <i class="el-icon-zoom-in"></i>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                          @click="handleDownload(file)">
                                          <i class="el-icon-download"></i>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                          @click="handleRemove(file)">
                                          <i class="el-icon-delete"></i>
                                        </span>
                                      </span>
                                    </div>
                                  </el-upload> -->
                              </div>
                              <!-- <el-dialog :visible.sync="dialogVisible">
                                  <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog> -->
                            </div>
                          </div>
                          <div id="show-form" class="po-form-box">
                            <div class="po-form-box-in" style="opacity: 1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="topic-type-menu white">
                      <ul class="planetul">
                        <li class="planetli">
                          <el-button type="primary" round>全部</el-button>
                        </li>
                        <li class="planetli">
                          <el-button round>最近</el-button>
                        </li>
                        <li class="planetli">
                          <el-button round>热门</el-button>
                        </li>
                        <!-- <li class="planetli">
                            <el-button round>我说</el-button>
                          </li>
                          <li class="planetli">
                            <el-button round>提问</el-button>
                          </li>
                          <li class="planetli">
                            <el-button round>投票</el-button>
                          </li>
                          <li class="planetli">
                            <el-button round>你猜</el-button>
                          </li> -->
                      </ul>
                      <div class="topic-drop">
                        <button class="planettext">
                          <i class="el-icon-lollipop"></i><span>筛选</span>
                        </button>
                        <!---->
                      </div>
                    </div>

                    <div v-for="item in squaredata" :key="item.id" class="circle-contenr-out white">

                      <div class="circle-contenr">
                        <div class="topic-header">
                          <div class="topic-header-left">
                            <nuxt-link :to="'/otheruserinfo/' + item.userid">

                              <div class="topic-avatar">
                                <el-avatar :src="item.authorImg"></el-avatar>
                              </div>
                            </nuxt-link>
                            <div class="topic-name">
                              <div>
                                <nuxt-link :to="'/otheruserinfo/' + item.userid">

                                  <div class="topic-name-data">
                                    <a target="_blank"><b>{{ item.author }}</b></a>
                                    <!---->
                                    <!---->
                                  </div>
                                </nuxt-link>
                                <div class="topic-user-lv">
                                  <!-- <p>
                                      <span class="lv-icon user-vip b2-vip3"
                                        ><i style="border-color: #ff8223"></i
                                        ><b style="color: #ff8223"
                                          >永久会员</b
                                        ></span
                                      >
                                    </p>
                                    <p>
                                      <span class="lv-icon user-lv b2-lv5"
                                        ><b>荣誉用户</b><i>lv5</i></span
                                      >
                                    </p> -->
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="topic-header-right">
                          <span class="topic-date topic-circle"><a target="_blank"><b class="circle-hash"><svg
                              width="16" height="16" viewBox="0 0 36 36">
                                  <g fill-rule="evenodd">
                                    <path
                                        d="M18 0c9.941 0 18 8.059 18 18 0 2.723-.604 5.304-1.687 7.617v6.445a2.25 2.25 0 0 1-2.096 2.245l-.154.005-6.446.001A17.932 17.932 0 0 1 18 36C8.059 36 0 27.941 0 18S8.059 0 18 0z"
                                        fill-opacity=".1"></path>
                                    <path
                                        d="M23.32 7.875c.517 0 .948.18 1.293.54.296.294.444.632.444 1.015a.589.589 0 0 1-.037.202l-.258 2.17c0 .18.087.27.259.27h.96c.592 0 1.097.185 1.516.557.419.372.628.828.628 1.369 0 .54-.21 1.003-.628 1.386a2.166 2.166 0 0 1-1.515.574h-1.478c-.197 0-.308.09-.333.27l-.517 3.684c-.025.158.049.237.221.237h1.22c.591 0 1.096.191 1.515.574.419.384.628.845.628 1.386 0 .54-.21 1.003-.628 1.386a2.166 2.166 0 0 1-1.515.574h-1.7c-.172 0-.27.08-.296.237l-.273 2.062c-.05.495-.283.912-.702 1.25a2.282 2.282 0 0 1-1.478.507c-.518 0-.949-.18-1.294-.54-.295-.294-.443-.632-.443-1.015 0-.067.012-.135.037-.202l.236-2.062c.025-.158-.049-.237-.221-.237h-3.732c-.198 0-.296.08-.296.237l-.31 2.062a1.96 1.96 0 0 1-.721 1.25c-.407.338-.88.507-1.423.507-.517 0-.948-.18-1.293-.54-.296-.294-.444-.632-.444-1.015v-.202l.274-2.062c.025-.158-.062-.237-.259-.237h-.739a2.166 2.166 0 0 1-1.515-.574c-.419-.383-.628-.845-.628-1.386 0-.54.21-1.002.628-1.386a2.166 2.166 0 0 1 1.515-.574h1.257c.172 0 .27-.079.295-.237l.48-3.684c.025-.18-.06-.27-.258-.27h-.924a2.166 2.166 0 0 1-1.515-.574c-.419-.383-.628-.84-.628-1.37 0-.529.21-.985.628-1.368a2.166 2.166 0 0 1 1.515-.575h1.515c.197 0 .308-.09.333-.27L13.01 9.6c.074-.474.314-.88.72-1.217.407-.338.881-.507 1.423-.507.518 0 .949.18 1.294.54.27.294.406.62.406.98v.237l-.294 2.17c-.025.18.061.27.259.27h3.769c.172 0 .27-.09.295-.27l.295-2.203c.074-.474.314-.88.72-1.217.407-.338.881-.507 1.423-.507zm-3.316 7.875h-3.49c-.157 0-.256.071-.296.213l-.014.077-.45 3.956c-.02.145.029.228.144.249l.064.005h3.524c.134 0 .22-.059.26-.176l.016-.078.484-3.956c.02-.166-.037-.26-.17-.284l-.072-.006z"
                                        fill-rule="nonzero"></path>
                                  </g>
                                </svg></b>
                              <b>{{ item.sortName }}</b></a></span>
                        </div>
                      </div>

                      <div class="topic-content">
                        <div v-html="renderEmojiContent(item.content)" class="topic-content-text"></div>
                      </div>
                      <div v-if="item.image !== null && item.image != ''"
                           style=" padding: 30px;display: flex;flex-direction: row;width: 521px;height: 230px;margin-right: 10px;">
                        <div class="topic-img-inner" v-for="imagess in item.image" :key="imagess.id">
                          <el-image style="margin-right: 10px;max-width: 400px;height: 200px; /* 可以调整图像之间的间距 */"
                                    :src="imagess.url" fit="scale-down">{{ imagess.url }}</el-image>
                        </div>
                      </div>
                      <div class="topic-footer">
                        <div class="topic-footer-left">
                          <button v-if="!item.isLike" @click="likeClickMains(item)" class="planettext like-btn">
                            <i class="el-icon-caret-top"></i>
                            <span class="el-icon-caret-planettext">{{ item.loveNum > 0
                                ? item.loveNum + '赞' : '赞'
                              }}</span>
                          </button>
                          <button v-else @click="likeClickMains(item)" class="planettext like-btn active-like">
                            <i class="el-icon-caret-top"></i>
                            <span class="el-icon-caret-planettext">{{ item.loveNum > 0
                                ? item.loveNum + '赞' : '赞'
                              }}</span>
                          </button>

                          <button v-if="!item.isLose" class="planettext dislike-btn" @click="LoseClickMains(item)">
                            <img class="link-icon--right" src="../../static/image/right.svg" />
                            <span>踩</span>
                          </button>
                          <button v-else class="planettext dislike-btn active-dislike" @click="LoseClickMains(item)">
                            <img class="link-icon--right" src="../../static/image/right.svg" />
                            <span>踩</span>
                          </button>

                          <span class="topic-date"><b><time class="b2timeago" datetime="2021-12-27 21:58:17"
                                                            itemprop="datePublished"><span v-text="getTime(item.addTime)">
                                </span> </time></b></span>
                          <!---->
                          <div class="topic-meta-more-box">
                            <el-popover
                                placement="bottom-start"
                                title="分享与更多"
                                :width="280"
                                trigger="hover"
                                popper-class="share-popover"
                            >
                              <template #reference>
                                <button class="topic-date topic-meta-more">
                                  <div>更多</div>
                                </button>
                              </template>

                              <div class="share-content">
                                <!-- 分享标题 -->
                                <div class="share-title">
                                  <i class="el-icon-share"></i>
                                  <span>分享动态</span>
                                </div>

                                <!-- 分享按钮组 -->
                                <div class="share-buttons">
                                  <div class="share-row">
                                    <button @click="shareToQQ(item)" class="share-btn qq-btn" title="分享到QQ">
                                      <div class="share-icon qq-icon">QQ</div>
                                      <span>QQ</span>
                                    </button>

                                    <button @click="shareToWeibo(item)" class="share-btn weibo-btn" title="分享到微博">
                                      <div class="share-icon weibo-icon">微博</div>
                                      <span>微博</span>
                                    </button>

                                    <button @click="shareToWechat(item)" class="share-btn wechat-btn" title="分享到微信">
                                      <div class="share-icon wechat-icon">微信</div>
                                      <span>微信</span>
                                    </button>

                                    <button @click="copyLink(item)" class="share-btn copy-btn" title="复制链接">
                                      <div class="share-icon copy-icon">链接</div>
                                      <span>复制</span>
                                    </button>
                                  </div>

                                  <!-- <div class="share-row">
                                    <button @click="shareToOther('twitter', item)" class="share-btn twitter-btn" title="分享到Twitter">
                                      <div class="share-icon twitter-icon">X</div>
                                      <span>Twitter</span>
                                    </button>

                                    <button @click="shareToOther('facebook', item)" class="share-btn facebook-btn" title="分享到Facebook">
                                      <div class="share-icon facebook-icon">FB</div>
                                      <span>Facebook</span>
                                    </button>

                                    <button @click="shareToOther('telegram', item)" class="share-btn telegram-btn" title="分享到Telegram">
                                      <div class="share-icon telegram-icon">TG</div>
                                      <span>Telegram</span>
                                    </button>

                                    <button @click="shareToOther('linkedin', item)" class="share-btn linkedin-btn" title="分享到LinkedIn">
                                      <div class="share-icon linkedin-icon">IN</div>
                                      <span>LinkedIn</span>
                                    </button>
                                  </div> -->
                                </div>

                                <!-- 其他操作 -->
                                <div class="more-actions">
                                  <div class="action-divider"></div>
                                  <button class="action-btn report-btn">
                                    <i class="el-icon-warning"></i>
                                    <span>举报</span>
                                  </button>
                                  <button class="action-btn collect-btn">
                                    <i class="el-icon-star-off"></i>
                                    <span>收藏</span>
                                  </button>
                                </div>
                              </div>
                            </el-popover>
                          </div>
                        </div>
                        <div class="topic-footer-right">
                          <el-button v-if="!item.isShow" icon="el-icon-caret-bottom" @click="setPullDown(item)"
                                     size="small" plain>
                            <span><b>{{ item.commentNum }}</b>条讨论</span>
                          </el-button>
                          <el-button v-if="item.isShow" icon="el-icon-caret-top" @click="setPullDown(item)" size="small"
                                     plain>
                            <span>收起评论</span>
                          </el-button>
                        </div>
                      </div>
                      <div v-show="item.isShow">
                        <div class="reply-box-root">
                          <el-input type="textarea" :rows="2" placeholder="写评论" v-model="postReplyForm.content">
                          </el-input>
                          <div class="form-group-button">
                            <el-button size="small" class="replyBut" type="success" round
                                       @click="setUpPostReply(item)">发布</el-button>
                          </div>
                        </div>
                        <div class="commentBox">
                          <div class="css-we6n55">
                            <div class="css-vpssrj">
                              <div class="css-1k10w8f">
                                {{ item.commentNum }} 条评论
                              </div>
                            </div>
                          </div>
                          <div>
                            <p class="commentCons" v-if="!comment || comment.length == 0">
                              暂无评论，我来发表第一篇评论！
                            </p>
                            <div v-else>
                              <div class="comments" v-for="(item, index) in comment" :key="index">
                                <div v-if="item">
                                  <div class="circle-contenr">
                                    <div class="topic-header">
                                      <div class="topic-header-left">
                                        <div class="topic-avatar">
                                          <!-- <el-avatar :src="item.profile"></el-avatar> -->
                                        </div>
                                        <div class="topic-name">
                                          <div>
                                            <div class="topic-name-data" v-once>
                                              <a target="_blank"><b>{{
                                                  item.reviewers
                                                }}</b></a>
                                              <!---->
                                              <!---->
                                            </div>
                                            <div class="topic-user-lv">
                                              <p>
                                                <span class="
                                                            lv-icon
                                                            user-vip
                                                            b2-vip3
                                                          "><i style="
                                                              border-color: #ff8223;
                                                            "></i><b style="color: #ff8223">永久会员</b></span>
                                              </p>
                                              <p>
                                                <span class="
                                                            lv-icon
                                                            user-lv
                                                            b2-lv5
                                                          "><b>荣誉用户</b><i>lv5</i></span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div v-once class="topic-content">
                                    <div v-html="renderEmojiContent(item.content)" class="topic-content-text"></div>
                                  </div>
                                  <div class="topic-footer">
                                    <div class="topic-footer-left">
                                      <span v-once class="topic-date"><b><time class="b2timeago"
                                                                               datetime="2021-12-27 21:58:17" itemprop="datePublished"><span
                                          v-text="getTime(item.addTime)">
                                            </span> </time></b></span>
                                      <!---->
                                      <!-- <div class="topic-meta-more-box">
                                          <el-popover
                                            placement="bottom"
                                            title="更多信息"
                                            width="200"
                                            trigger="hover"
                                            content="更多信息"
                                          >
                                            <button
                                              slot="reference"
                                              class="topic-date topic-meta-more"
                                            >
                                              <i
                                                class="el-icon-more-outline"
                                              ></i>
                                            </button>
                                          </el-popover>
                                        </div> -->
                                    </div>
                                    <div class="chat-dot-round">
                                      <span @click="setReplayPullDown(item)" class="comment-reply"><i
                                          class="iconfont icon-comment"></i><b>
                                          <span>回复</span>
                                        </b></span>
                                      <div>
                                        <span @click="likeClick(item)" v-if="!item.isLike" class="like">
                                          <i class="iconfont icon-like"></i>
                                          <span class="like-num">{{ item.loveNum > 0 ? item.loveNum + '人赞' :
                                              '赞'
                                            }}</span>
                                        </span>
                                        <span @click="likeClick(item)" v-else class="like active">
                                          <i class="iconfont icon-like"></i>
                                          <span class="like-num">{{ item.loveNum > 0 ? item.loveNum + '人赞' :
                                              '赞'
                                            }}</span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div v-show="item.isShow" class="reply-box">
                                    <el-input type="textarea" :rows="2" placeholder="请输入内容"
                                              v-model="postReplysForm.content">
                                    </el-input>
                                    <el-button size="small" class="replyBut" type="success" round @click="
                                      setUpPostReplys(
                                        item.responderId,
                                        item.id,
                                        item.postId
                                      )
                                      ">发布</el-button>
                                  </div>
                                  <div class="comments" v-if="item.reply && item.reply.length > 0">
                                    <div class="reply" v-for="reply in item.reply" :key="reply.id">
                                      <div class="circle-contenr">
                                        <div class="topic-header">
                                          <div class="topic-header-left">
                                            <div class="topic-avatar">
                                              <!-- <el-avatar :src="reply.profile"></el-avatar> -->
                                            </div>
                                            <div class="topic-name">
                                              <div>
                                                <div v-if="reply.responder != null && reply.responder != item.reviewers
                                                " class="topic-name-data">
                                                  <a target="_blank"><b>{{ reply.reviewers }}{{ "\xa0" }} <i class="
                                                                  el-icon-caret-right " style="
                                                                  font-size: 12px;
                                                                  font-weight: 500;
                                                                "></i>{{ "\xa0" }}{{ reply.responder }}</b></a>
                                                  <!---->
                                                  <!---->
                                                </div>
                                                <div v-else class="topic-name-data">
                                                  <a target="_blank"><b>{{
                                                      reply.reviewers
                                                    }}</b></a>
                                                  <!---->
                                                  <!---->
                                                </div>
                                                <div class="topic-user-lv">
                                                  <p>
                                                    <span class="
                                                                lv-icon
                                                                user-vip
                                                                b2-vip3
                                                              "><i style="
                                                                  border-color: #ff8223;
                                                                "></i><b style="color: #ff8223">永久会员</b></span>
                                                  </p>
                                                  <p>
                                                    <span class="
                                                                lv-icon
                                                                user-lv
                                                                b2-lv5
                                                              "><b>荣誉用户</b><i>lv5</i></span>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="topic-content">
                                        <div v-html="renderEmojiContent(reply.content)" class="topic-content-text"></div>
                                      </div>
                                      <div class="topic-footer">
                                        <div class="topic-footer-left">
                                          <span class="topic-date"><b><time class="b2timeago"
                                                                            datetime="2021-12-27 21:58:17" itemprop="datePublished"><span v-text="getTime(reply.addTime)
                                                  ">
                                                </span> </time></b></span>
                                          <!---->
                                          <!-- <div class="topic-meta-more-box">
                                              <el-popover
                                                placement="bottom"
                                                title="更多"
                                                width="200"
                                                trigger="hover"
                                                content="更多信息"
                                              >
                                                <button
                                                  slot="reference"
                                                  class="
                                                    topic-date topic-meta-more
                                                  "
                                                >
                                                  <i
                                                    class="el-icon-more-outline"
                                                  ></i>
                                                </button>
                                              </el-popover>
                                            </div> -->
                                        </div>
                                        <div class="chat-dot-round">
                                          <span @click="setReplaysPullDown(reply)" class="comment-reply"><i
                                              class="iconfont icon-comment"></i><b>
                                              <span>回复</span>
                                            </b></span>
                                          <div>
                                            <span @click="likeClicks(reply)" v-if="!reply.isLike" class="like">
                                              <i class="iconfont icon-like"></i>
                                              <span class="like-num">{{ reply.loveNum > 0 ? reply.loveNum + '人赞' :
                                                  '赞'
                                                }}</span>
                                            </span>
                                            <span @click="likeClicks(reply)" v-else class="like active">
                                              <i class="iconfont icon-like"></i>
                                              <span class="like-num">{{ reply.loveNum > 0 ? reply.loveNum + '人赞' :
                                                  '赞'
                                                }}</span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div v-show="reply.isShow" class="reply-box">
                                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="postReplysToUserForm.content
                                          ">
                                        </el-input>
                                        <el-button size="small" class="replyBut" type="success" round @click="
                                          setUpPostReplysTouser(
                                            reply.responderId,
                                            item.id,
                                            reply.postId,
                                            reply.userId
                                          )
                                          ">发布</el-button>
                                      </div>
                                    </div>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-main>
                  <el-aside width="260px">
                    <section id="b2-widget-user-6" class="
                              mobile-hidden
                              widget
                              b2-widget-user
                              mg-b
                              
                              b2-radius b2-radius-aside-right
                            ">

                      <div class="b2-widget-box">
                        <div id="user-widget" class="user-widget">
                          <div class="user-widget-content">
                            <div style="">
                              <!---->
                              <div>

                                <div class="user-w-logon">
                                  <div class="tools">
                                    <div class="circle">
                                      <span class="red box1"></span>
                                    </div>
                                    <div class="circle">
                                      <span class="yellow box1"></span>
                                    </div>
                                    <div class="circle">
                                      <span class="green box1"></span>
                                    </div>
                                  </div>
                                  <p class="user-w-logon-title b2-color">
                                    {{ sentence }}
                                  </p>
                                  <!-- <p class="user-w-logon-titlep">
                                    尽情畅所欲言吧
                                  </p> -->
                                </div>
                                <div>
                                  <div class="oauth-login-button">
                                    <a href="" class="login-weixin">微信登录</a>
                                    <a href="" class="login-weibo">Github登录</a>
                                    <a href="https://graph.qq.com/oauth2.0/authorize?client_id=101057247&amp;state=6b96c86f14fab2f3ce7af8fc5d72c943&amp;response_type=code&amp;redirect_uri=https%3A%2F%2F7b2.com%2Fopen%3Ftype%3Dqq"
                                       class="login-qq">qq登录</a>
                                  </div>
                                </div>
                              </div>
                              <div class="user-w-announcement">
                                <div>
                                  <ul class="planet-aside-ul">
                                    <div v-for="item in announcementsList" :key="item.id">
                                      <li class="planet-aside-li-ad">
                                        <b>{{ item.title }}:</b>
                                        <span href="#">{{ item.content }}</span>
                                      </li>
                                    </div>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div class="widget-mission-footer">
                              <router-link to="/Notification/system" class="allad" target="_blank">全部公告</router-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </el-aside>
                </div>
              </div>
              <div class="clearfix pt-8"></div>
            </div>
          </div>
        </div>
        <!-- <foot /> -->
        <div v-if="isLoading" class="loading-indicator">
          <div class="loader"></div>
          <!-- Add your loading indicator here -->
        </div>
        <div v-else>
          <div class="loading-indicator">我是有底线的</div>
        </div>
        <div infos="0">
          <div class="
                    adBanner
                    pub_300x250 pub_300x250m pub_728x90
                    text-ad
                    textAd
                    text_ad text_ads text-ads text-ad-links
                  "></div>
        </div>
      </div>
    </div>

    <!-- 帮助弹窗 -->
    <div v-if="showHelpModal" class="help-modal-overlay" @click="closeHelpModal">
      <div class="help-modal" @click.stop>
        <div class="help-modal-header">
          <h2>{{ helpModalTitle }}</h2>
          <button class="help-modal-close" @click="closeHelpModal">
            <i class="el-icon-close"></i>
          </button>
        </div>
        <div class="help-modal-body">
          <div v-html="helpModalContent"></div>
        </div>
        <div class="help-modal-footer">
          <button class="help-modal-btn" @click="closeHelpModal">我知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 
<script>
import { createSquare, getAllSquare, likeClickComments } from "@/api/websquare";
import { formatDate } from "@/utils/date.js";
import { getCarousel } from "@/api/setting";
import { getPlanetIdComment, addPlanetComment, likeClickComment } from "@/api/WebSquareComment";
import {
  getSquareClasslist,
  getArticleClassByotherName,
} from "@/api/websquareClass";
import { getAnnouncementslistByNum } from "@/api/webannouncements";
import { updateImage } from '@/api/updateImage'

// import Tinymce from "@/components/Tinymce";
// import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";
import FormData from 'form-data';

export default {
  name: "Home",
  watch: {
    $route(to, from) {
      //清空
      // squaredata = [];
      // 获取全部评论
      // getAllSquare(1, page, 6).then((response) => {
      //   // console.log(response);
      //   // squaredata = squaredata.concat(response.data.data)
      //   for (let i = 0; i < response.data.data.length; i++) {
      //     response.data.data[i].image = JSON.parse(response.data.data[i].image)
      //   }

      //   squaredata = response.data.data
      // });
      // // 更新菜单数据
      // getArticleClassByotherName($route.params.square).then(
      //   (response) => {
      //     planetInfo = response.data;
      //   }
      // );
    }

  },
  created() {
    //数据回填
    fetchData();
    //检测token是否有效
    getUserInfo();
    console.log($cookies.get("token"))
    const elements = [
      "念念不忘，必有回响",
      "星光与君皆负我，也无山色也无波。",
      "枕头里藏满了发了霉的梦，梦里住满了无法拥有的人。",
      "日子紧凑，常驻光明里。",
      "他从未见过金阁，但此后谈及美好，他总说美如金阁。",
      "人生而自由，却无往不在枷锁之中。",
      "愿你熬过万丈孤独，藏下星辰大海。",
      "别怕美好的一切消失，咱们先来让它存在。",
      "凡事一知半解，却夸夸其谈、品头论足，必令听者闻之生厌。",
      "偏见这个东西的真正意思——你好奇和感兴趣，但所知甚少。",
    ]
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)]
    sentence = random(elements)
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData",
    MyEmoge(val) {
      // $router.go(0);
      postForm.content += val
    }
  },
  mounted() {
    getNextUser();
  },
  methods: {
    getTime(time) {
      let now = new Date();
      let nowTime = now.getTime();
      let timeTime = new Date(time).getTime();
      let timeDiff = nowTime - timeTime;
      let dayDiff = Math.floor(timeDiff / (24 * 3600 * 1000));
      let weekDiff = Math.floor(timeDiff / (24 * 3600 * 1000 * 7));
      let monthDiff = Math.floor(timeDiff / (24 * 3600 * 1000 * 30));
      let yearDiff = Math.floor(timeDiff / (24 * 3600 * 1000 * 365));

      if (dayDiff == 0) {
        if (Math.floor(timeDiff / (3600 * 1000)) == 0) {
          if (Math.floor(timeDiff / (60 * 1000)) == 0) {
            return "刚刚";
          } else {
            return Math.floor(timeDiff / (60 * 1000)) + "分钟前";
          }
        } else { return Math.floor(timeDiff / (3600 * 1000)) + "小时前"; }
      } else if (dayDiff == 1) {
        return "昨天";
      } else if (dayDiff == 2) {
        return "前天";
      } else if (dayDiff > 2 && dayDiff < 7) {
        return "最近一周";
      } else if (dayDiff >= 7 && dayDiff < 30) {
        return "一个月内";
      } else if (dayDiff >= 30 && dayDiff < 60) {
        return "一个月前";
      } else if (dayDiff >= 60 && dayDiff < 90) {
        return "二个月前";
      } else if (dayDiff >= 90 && dayDiff < 120) {
        return "三个月前";
      } else if (dayDiff >= 120 && dayDiff < 160) {
        return "四个月前";
      } else if (dayDiff >= 160 && dayDiff < 180) {
        return "五个月前";
      } else if (dayDiff >= 180 && dayDiff < 210) {
        return "六个月前";
      } else if (dayDiff >= 210 && dayDiff < 240) {
        return "七个月前";
      } else if (dayDiff >= 240 && dayDiff < 270) {
        return "八个月前";
      } else if (dayDiff >= 270 && dayDiff < 300) {
        return "9个月前";
      } else if (dayDiff >= 300 && dayDiff < 330) {
        return "10个月前";
      } else if (dayDiff >= 330 && dayDiff < 365) {
        return "11个月前";
      } else if (yearDiff == 1) {
        return '去年';
      } else if (yearDiff > 1) {
        return yearDiff + '年前';
      } else {
        let weekday = new Array(7);
        weekday[0] = "周日";
        weekday[1] = "周一";
        weekday[2] = "周二";
        weekday[3] = "周三";
        weekday[4] = "周四";
        weekday[5] = "周五";
        weekday[6] = "周六";

        return weekday[new Date(time).getDay()];
      }
    },
    getSquare() {
      if (squaredata.length != pagetotal) {
        isLoading = true; // 开始加载数据时显示进度
      }
      getArticleClassByotherName($route.params.id).then(
        (response) => {
          planetInfo = response.data;
        }
      );
      //获取全部评论
      getAllSquare($route.params.id, page, 6).then((response) => {
        pagetotal = response.data.total
        for (let i = 0; i < response.data.data.length; i++) {
          response.data.data[i].image = JSON.parse(response.data.data[i].image)
        }
        // var str = JSON.parse(response.data.data[0].image)
        squaredata = squaredata.concat(response.data.data)
      });
    },
    getAnnouncements() {
      getAnnouncementslistByNum(2).then(
        (response) => {
          console.log(response)
          announcementsList = response.data;
        }
      );
    },
    fetchData() {
      //数据置空
      squaredata = [];
      getSquare();
      //获取公告
      getAnnouncements();
      //获取圈子列表
      getSquareClasslist().then((res) => {
        classlist = res.data;
        if ($route.params.id == undefined) {
      // 前往classlist第一个圈子
      $router.push({ path: '/planet/' + classlist[0].id })
    }
      });
    },
    refreshPage() {
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    handlePictureCardPreview(file) {
      dialogImageUrl = file.url;
      dialogVisible = true;
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
      dialogImageUrl = file.url;
      dialogVisible = true;
    },
    BeforeUpload(file) {
      if (file) {
        newFile.append('file', file); //  2. 上传之前，拿到file对象，并将它添加到刚刚定义的FormData对象中。
      } else {
        return false;
      }
    },
    Upload() {
      const newData = newFile.get('file'); //  3. 拿到刚刚的数据，并将其传给后台
      var form = new FormData();
      form.append('editormd-image-file', newData, newData.name)
      updateImage(form).then(resp => {
        $message({
          message: '上传成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
        //上传一张后重置数据
        newFile = new FormData()
        var imgUrl = resp.data.url;//根据返回值得不同这里要自己定义
        tempUrl = imgUrl
        //  fileList.append('url',tempUrl);
        var aa = {
          "url": tempUrl,
          "name": tempUrl,
        }
        imageList.push(aa)
        fileList.push(aa)
      }).catch((e) => {
        $message.error('抱歉,上传失败');
        theprogress = false
        console.log("上传失败")
      })

    },
    getNextUser() {
      window.onscroll = () => {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        let bottomOfWindow = (scrollTop + windowHeight) - scrollHeight;
        if (bottomOfWindow == 0.5 || bottomOfWindow == 0) {
          page++;
          getSquare().then(() => { });
        }
        if (squaredata.length === pagetotal) {
          isLoading = false; // 数据加载完成后隐藏进度
          console.log("没有更多数据了");
        }
      }
    },
    MainLock() {
      postForm.isLock = !postForm.isLock;
    },
    onSelectEmoji(emoji) {
      MyEmoge = emoji.data;
    },
    showemoge() {
      showDialog = !showDialog;
    },
    LoseClickMains(item) {
      if (item.isLike) {
        item.isLike = false;
        item.loveNum--
      }
      if (!item.isLose) {
        $set(item, "isLose", false);
        item.isLose = !item.isLose;

      } else {
        item.isLose = !item.isLose;
      }
    },
    likeClickMains(item) {
      if (item.isLose) {
        item.isLose = false;
      }
      if (!item.isLike) {
        $set(item, "isLike", false);
        item.isLike = !item.isLike;
        likeClickComments(item.id).then((res) => {
        });
        item.loveNum++
      } else {
        item.loveNum--
        item.isLike = !item.isLike;
      }
    },
    likeClicks(item) {
      if (!item.isLike) {
        $set(item, "isLike", false);
        item.isLike = !item.isLike;
        likeClickComment(item.id).then((res) => {
        });
        item.loveNum++
      } else {
        item.loveNum--
        item.isLike = !item.isLike;
      }
    },
    likeClick(item) {
      if (!item.isLike) {
        $set(item, "isLike", false);
        item.isLike = !item.isLike;
        likeClickComment(item.id).then((res) => {
        });
        item.loveNum++
      } else {
        item.loveNum--
        item.isLike = !item.isLike;
      }
    },
    formatDate(time) {
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd");
    },
    setUpPostReply(item) {
      postReplyForm.postId = item.id;
      const user = $cookies.get("access-user")
      userJudje = user == null;
      if (userJudje) {
        // console.log("未登录");
        //显示需要登录
        shownologin = true;
      } else {
        // console.log("已登录");
        postReplyForm.userId = user.userid;
        //显示需要登录
        shownologin = false;
      }
      addPlanetComment(postReplyForm).then((res) => {
        postReplyForm.content = null;
      });
    },
    setUpPostReplys(userId, id, postId) {
      postReplysForm.postId = postId;
      postReplysForm.parentId = id;
      const user = $cookies.get("access-user")
      userJudje = user == null;
      if (userJudje) {
        // console.log("未登录");
        //显示需要登录
        shownologin = true;
      } else {
        // console.log("已登录");
        postReplysForm.userId = user.userid;
        //显示需要登录
        shownologin = false;
      }
      addPlanetComment(postReplysForm).then((res) => {
        if (res.code == 0) {
          // $message.success("评论成功");
          fetchData();
        } else {
          // $message.error(res.msg);
        }
      });
    },
    setUpPostReplysTouser(usersId, id, postId, uId) {
      postReplysToUserForm.postId = postId;
      postReplysToUserForm.parentId = id;
      postReplysToUserForm.toUserId = uId;
      const user = $cookies.get("access-user")
      userJudje = user == null;
      if (userJudje) {
        // console.log("未登录");
        //显示需要登录
        shownologin = true;
      } else {
        // console.log("已登录");
        postReplysToUserForm.userId = user.userid;
        //显示需要登录
        shownologin = false;
      }
      console.log(postReplysToUserForm);
      addPlanetComment(postReplysToUserForm).then((res) => {
        if (res.code == 0) {
          // $message.success("评论成功");
          fetchData();
        } else {
          // $message.error(res.msg);
        }
      });
    },
    setReplayPullDown(item) {
      if (!item.isShow) {
        $set(item, "isShow", false);
        item.isShow = !item.isShow;
      } else {
        item.isShow = !item.isShow;
      }
    },
    setReplaysPullDown(reply) {
      if (!reply.isShow) {
        $set(reply, "isShow", false);

        reply.isShow = !reply.isShow;
      } else {
        reply.isShow = !reply.isShow;
      }
    },
    setPullDown(item) {
      //设置commen为空
      comment = [];
      if (!item.isShow) {
        getPlanetIdComment(item.id).then((res) => {
          comment = res.data;
        });
        $set(item, "isShow", false);
        item.isShow = !item.isShow;
      } else {
        item.isShow = !item.isShow;
      }
    },


    sitmap() {
      if ($route.params.square) {
        var images = JSON.stringify(imageList);
        console.log(images);

        postForm.image = images
        createSquare(postForm, $route.params.square).then((response) => {
          fetchData();
          postForm.content = null;
        });

      } else {
        // console.log("circle");
        var images = JSON.stringify(imageList);
        console.log(images);

        postForm.image = images
        createSquare(postForm, "circle").then((response) => {
          fetchData();
          postForm.content = null;
        });
      }
      // $message.success("发表成功");
      // 刷新页面


    },
    //时间如果是最近一天，则显示时间，如果是最近一周，则显示周几

    getUserInfo() {
      const user = $cookies.get("access-user")
      userJudje = user == null;
      if (userJudje) {
        // console.log("未登录");
        //显示需要登录
        shownologin = true;
      } else {
        // console.log("已登录");
        user = user;
        postForm.author = user.userid;
        //显示需要登录
        shownologin = false;
      }
    },
  },


  data() {
    return {
      announcementsList: [],
      isDark: false,
      pagetotal: 0,
      isLoading: false,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      imageList: [],
      newFile: new FormData(), //   1. 定义一个newFile变量（FormData 对象）
      sentence: "",
      page: 1,
      MyEmoge: "",
      showDialog: false,
      planetInfo: {},
      classlist: "",
      //二级回复
      postReplysToUserForm: {
        content: "",
        parentId: "",
        userId: "",
        toUserId: "",
        postId: "",
      },
      //一级回复
      postReplysForm: {
        content: "",
        parentId: "",
        userId: "",
        postId: "",
      },
      //一级评论
      postReplyForm: {
        content: "",
        parentId: "",
        userId: "",
        postId: "",
      },
      squaredata: [],
      //圈子
      postForm: {
        image: [],
        isLock: false,
        content: "",
        author: "",
        sortClass: "",
      },
      shownologin: false,
      acticve: "nav-link active",
      comment: [],
    };
  },
};
</script> -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/mycss/planet.css";
@import "../../static/mycss/user_info.css";
</style>

<style lang="scss">
.em {
  display: inline-block;
  height: 1em;
  width: 1em;
  overflow: hidden;
  font-size: 20px;
  line-height: 20px;
  vertical-align: middle;
  margin-top: -4px;
  color: transparent !important;
  background-size: 4100%;
}

.commenter-container {
  .commenter-focused {
    background: #ffffff !important;
    border: 1px solid var(--el-color-primary) !important;
  }

  .commenter-wrapper {
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: #f5f5f5;
    transition: all 0.3s;

    .commenter-upload {
      background: inherit;
      transition: all 0.3s;
    }

    .rich-input {
      min-height: 60px;
      width: 100%;
      border-radius: 4px;
      padding: 10px 10px;
      background: inherit;
      transition: all 0.3s;

      //&:empty:before {
      //    content: '请输入';
      //    white-space: pre;
      //    color: red;
      //}
      &::after {
        content: attr(data-placeholder);
        color: #cccaca;
        cursor: text;
      }

      &:focus-visible {
        outline: none;
      }

      img {
        display: inline-block;
      }
    }

    .commenter-footer {
      background: inherit;
      transition: all 0.3s;
    }
  }
}
</style>

<style scoped>
.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  /* 根据您的需要设置高度 */
  background-color: #F3F5F7;
  /* 背景颜色 */
}

.loader {
  position: relative;
  width: 40px;
  height: 40px;
}

.loader::before {
  content: '';
  position: absolute;
  width: 40px;
  height: 40px;
  border: 8px solid #3498db;
  /* 边框颜色 */
  border-top: 8px solid transparent;
  /* 透明边框，创建圆形 */
  border-radius: 50%;
  animation: spin 1s linear infinite;
  /* 旋转动画 */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
  /* 渐变背景色，尾部渐变为透明 */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.delayImg {
  height: 100px;
  width: 145px;
}

/* .body {
  background-color: #f3f5f7;
} */
</style>


<style scoped>
.white1 {
  background-color: rgb(255, 255, 255);
  z-index: -1;
}

.index1 {
  z-index: 555;
}

.index {
  z-index: -1;
}

.outsection {
  display: flex;
  align-items: center;
  justify-content: center;
}

.Thecarousel {
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  width: 1435px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}


.el-col {
  margin-top: 8px;
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

<style scoped>
.py-7 {
  padding-top: 3px;
}

.tip-radius {
  margin-left: 30px;
  position: relative;
  margin-top: 8px;
}

.nologin {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.nologintext {
  display: flex;
}

.PutContent {
  display: flex;
  margin-right: 12px;
  margin-left: 86px;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
}

.PutContentBut {
  margin-top: 10px;
  display: flex;
}

.circle-desc {
  display: flex;
}

.reply {
  margin: 15px 0 10px 34px;
}

.commentBox {
  margin: 10px;
}

.commentBox {
  border: 1px solid rgb(235, 235, 235);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.css-we6n55 {
  border-bottom: 1px solid rgb(235, 235, 235);
  box-sizing: border-box;
  margin-top: 0px;
  min-width: 0px;
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  padding-left: 20px;
  padding-right: 20px;
  height: 50px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  display: flex;
}

.css-vpssrj {
  box-sizing: border-box;
  margin-top: 0px;
  min-width: 0px;
  font-size: 15px;
  color: rgb(68, 68, 68);
  font-weight: 600;
}

.topic-footer-left {
  margin-left: 30px;
}

.topic-footer {
  padding: 15px 20px 0px;
}

.reply-box {
  margin-top: 10px;
  margin-left: 68px;
  margin-right: 10px;
}

.replyBut {
  margin-left: auto;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.commentCons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.reply-box-root {
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  margin-left: 50px;
  margin-top: 8px;
}

.form-group-button {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
}

.postFormDiv {
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  margin-top: 10px;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: flex-start;
}

.avatar {
  margin-left: 5px;
  margin-right: 7px;
}

.PlanetListItems {
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
}

.PlanetListItem-img {
  margin-top: 5px;
  padding: 4px;
}

.PlanetListItem:hover {
  box-shadow: 0px 0px 2px #ccc;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  background-color: #f5f6f7;
  border-radius: 4px;
}

.planetTitletext {
  font-size: 15px;
  font-weight: 600;
  margin-left: 5px;
}

.PlanetListCare {
  margin-top: 5px;
}

.b2-widget-circle-info .user-w-announcement {
  padding: 0 0px;
}

.planet-aside-li-ad {
  margin-left: 10px;
  margin-left: 20px;
  padding: 8px;
  font-size: 13px;

  font-style: inherit;
  font-weight: inherit;
  color: inherit;
}
</style>
<style lang="scss">
.chat-dot-round {

  display: flex;
  align-items: center;
  font-size: 14px;
  color: #909399;

  .like {
    display: flex;
    align-items: center;
    margin-left: 8px;
    cursor: pointer;

    &.active,
    &:hover {
      color: #409EFF;
    }

    .iconfont {
      font-size: 14px;
      margin-right: 5px;
    }
  }

  .comment-reply {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: #333;
    }

    .iconfont {
      font-size: 16px;
      margin-right: 5px;
    }
  }
}

.active {
  color: #3E9EFF;
}

/* 点赞按钮样式 */
.like-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 8px;
}

.like-btn:hover {
  border-color: #409EFF;
  color: #409EFF;
}

.like-btn.active-like {
  background: #409EFF;
  border-color: #409EFF;
  color: #fff;
}

.like-btn.active-like:hover {
  background: #337ecc;
  border-color: #337ecc;
}

/* 踩按钮样式 */
.dislike-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 8px;
}

.dislike-btn:hover {
  border-color: #F56C6C;
  color: #F56C6C;
}

.dislike-btn.active-dislike {
  background: #F56C6C;
  border-color: #F56C6C;
  color: #fff;
}

.dislike-btn.active-dislike:hover {
  background: #dd4a4a;
  border-color: #dd4a4a;
}

.dislike-btn .link-icon--right {
  width: 14px;
  height: 14px;
  transform: rotate(180deg);
  filter: invert(0.4);
}

.dislike-btn.active-dislike .link-icon--right {
  filter: invert(1);
}

.dislike-btn:hover .link-icon--right {
  filter: invert(0.4) sepia(1) saturate(5) hue-rotate(320deg);
}
</style>
<style scoped>
.myVEmojiPicker :deep(.category) {
  background: none;
}

.myVEmojiPicker :deep(.border) {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}

.myVEmojiPicker :deep(.myVEmojiPicker[data-v-3bfe90b7]) {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}

.myVEmojiPicker :deep(.border) {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}

.myVEmojiPicker :deep(.category.active[data-v-6d975e7c]) {
  border-bottom: 3px solid #50a1ff;
}

/* 分享弹窗样式 */
:deep(.share-popover) {
  padding: 0 !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15) !important;
  border: 1px solid #e1e8ed !important;
}

.share-content {
  padding: 20px;
  background: #fff;
  border-radius: 12px;
}

.share-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 15px;
}

.share-title i {
  font-size: 18px;
  color: #1890ff;
}

.share-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.share-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.share-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-height: 65px;
  justify-content: center;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.share-btn span {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.share-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
}

/* QQ按钮样式 */
.qq-btn .share-icon {
  background: linear-gradient(135deg, #12b7f5 0%, #0e9fe3 100%);
}

.qq-btn:hover {
  border-color: #12b7f5;
}

.qq-btn:hover span {
  color: #12b7f5;
}

/* 微博按钮样式 */
.weibo-btn .share-icon {
  background: linear-gradient(135deg, #ff6b35 0%, #e85d2c 100%);
}

.weibo-btn:hover {
  border-color: #ff6b35;
}

.weibo-btn:hover span {
  color: #ff6b35;
}

/* 微信按钮样式 */
.wechat-btn .share-icon {
  background: linear-gradient(135deg, #1aad19 0%, #169917 100%);
}

.wechat-btn:hover {
  border-color: #1aad19;
}

.wechat-btn:hover span {
  color: #1aad19;
}

/* 复制链接按钮样式 */
.copy-btn .share-icon {
  background: linear-gradient(135deg, #666 0%, #555 100%);
}

.copy-btn:hover {
  border-color: #666;
}

.copy-btn:hover span {
  color: #666;
}

/* Twitter按钮样式 */
.twitter-btn .share-icon {
  background: linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%);
}

.twitter-btn:hover {
  border-color: #1da1f2;
}

.twitter-btn:hover span {
  color: #1da1f2;
}

/* Facebook按钮样式 */
.facebook-btn .share-icon {
  background: linear-gradient(135deg, #1877f2 0%, #166fe5 100%);
}

.facebook-btn:hover {
  border-color: #1877f2;
}

.facebook-btn:hover span {
  color: #1877f2;
}

/* Telegram按钮样式 */
.telegram-btn .share-icon {
  background: linear-gradient(135deg, #0088cc 0%, #006bb3 100%);
}

.telegram-btn:hover {
  border-color: #0088cc;
}

.telegram-btn:hover span {
  color: #0088cc;
}

/* LinkedIn按钮样式 */
.linkedin-btn .share-icon {
  background: linear-gradient(135deg, #0077b5 0%, #005885 100%);
}

.linkedin-btn:hover {
  border-color: #0077b5;
}

.linkedin-btn:hover span {
  color: #0077b5;
}

/* 其他操作区域 */
.more-actions {
  margin-top: 15px;
  padding-top: 15px;
}

.action-divider {
  height: 1px;
  background: #f0f0f0;
  margin-bottom: 15px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  background: #fff;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 8px;
  text-decoration: none;
}

.action-btn:hover {
  background: #f8f9fa;
  border-color: #d1d9e0;
  color: #333;
}

.action-btn i {
  font-size: 14px;
}

.report-btn:hover {
  border-color: #ff4d4f;
  color: #ff4d4f;
}

.collect-btn:hover {
  border-color: #faad14;
  color: #faad14;
}

/* 帮助弹窗样式 */
.help-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.help-modal {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.help-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px;
  border-bottom: 1px solid #e1e5e9;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
}

.help-modal-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.help-modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.help-modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.help-modal-body {
  padding: 0;
  max-height: 60vh;
  overflow-y: auto;
}

.help-modal-body::-webkit-scrollbar {
  width: 8px;
}

.help-modal-body::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.help-modal-body::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.help-modal-body::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.help-modal-footer {
  padding: 20px 25px;
  border-top: 1px solid #e1e5e9;
  text-align: right;
  background: #f8f9fa;
}

.help-modal-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.help-modal-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
}

/* 帮助内容样式 */
.help-content {
  padding: 25px;
  line-height: 1.6;
  color: #333;
}

.help-content h3 {
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.help-content h4 {
  color: #34495e;
  font-size: 18px;
  margin: 20px 0 10px 0;
  font-weight: 600;
}

.help-content p {
  margin-bottom: 15px;
  color: #555;
}

/* 步骤列表样式 */
.step-list {
  margin: 20px 0;
}

.step-item {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
}

.step-number {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.step-content p {
  margin: 0;
  color: #666;
}

/* 沟通部分样式 */
.comm-section {
  margin: 20px 0;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.comm-section h4 {
  margin-top: 0;
  color: #2c3e50;
}

.comm-section ul {
  margin: 10px 0;
  padding-left: 20px;
}

.comm-section li {
  margin-bottom: 8px;
  color: #555;
}

/* 条款部分样式 */
.terms-section {
  margin: 20px 0;
  padding: 15px;
  background: #fff;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
}

.terms-section h4 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
}

.terms-section ol {
  padding-left: 20px;
}

.terms-section li {
  margin-bottom: 8px;
  color: #555;
}

.terms-section strong {
  color: #2c3e50;
}

/* 小贴士样式 */
.help-tips {
  background: linear-gradient(135deg, #3b82f615, #1d4ed815);
  border: 1px solid #3b82f630;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
}

.help-tips h4 {
  margin-top: 0;
  color: #3b82f6;
}

.help-tips ul {
  margin: 10px 0 0 0;
  padding-left: 20px;
}

.help-tips li {
  margin-bottom: 8px;
  color: #555;
}

/* 更新时间样式 */
.update-time {
  text-align: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e1e5e9;
}

.update-time p {
  margin: 0;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .help-modal {
    width: 95%;
    max-height: 90vh;
  }

  .help-modal-header {
    padding: 15px 20px;
  }

  .help-modal-header h2 {
    font-size: 18px;
  }

  .help-content {
    padding: 20px;
  }

  .help-content h3 {
    font-size: 20px;
  }

  .step-item {
    flex-direction: column;
  }

  .step-number {
    margin-bottom: 10px;
    margin-right: 0;
  }
}

/* .myVEmojiPicker     :deep .grid-emojis[data-v-5c988bee] {
  background: #ffffff;
}
.myVEmojiPicker     :deep .emoji-picker[data-v-f1d527bc] {
  --ep-color-bg: #ffffff;
  --ep-color-sbg: none;
} */
/* .myVEmojiPicker {
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 390px;
  bottom: 20px;
  z-index: 10;
} */
.myVEmojiPicker :deep(.emoji-picker[data-v-f1d527bc]) {
  background-color: #FFFFFF;
  border-radius: 0px;
}

.myVEmojiPicker :deep(.emoji-picker[data-v-f1d527bc]) {
  --ep-color-border: #FFFFFF;
  --ep-color-bg: #FFFFFF;
}

.leftMenu {
  display: flex;
}

.nav-links {
  margin-left: 8px;
  font-weight: 900;
;
  font-size: 19px;
}

.p-0 {

  display: flex;
  padding: 0 !important;
  align-content: center;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
}

@media screen and (max-width:991px) {
  .el-aside {
    display: none;
  }
}


.tools {
  display: flex;
  align-items: center;
  padding: 9px;
}

.circle {
  padding: 0 4px;
}

/* .box {
 display: inline-block;
 align-items: center;
 width: 10px;
 height: 10px;
 padding: 1px;
 border-radius: 50%;
} */

.red {
  background-color: #ff605c;
}

.yellow {
  background-color: #ffbd44;
}

.green {
  background-color: #00ca4e;
}

.box1 {
  display: inline-block;
  align-items: center;
  width: 10px;
  height: 10px;
  padding: 1px;
  border-radius: 50%;
}

button:hover {
  animation: var(--timing) linear dance6123 infinite;
  transform: scale(1.1) translateY(-1px);
}

.top-card {
  display: flex;
  justify-content: center;
  align-items: center;
  --width: 150px;
  --timing: 8s;
  border: 0;
  width: 100px;
  height: 40px;
  padding-block: 1em;
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  background: rgb(64, 192, 87);
  transition: all 0.2s;
  border-radius: 8px;
  background-image: linear-gradient(to right, rgb(250, 82, 82), rgb(250, 82, 82) 16.65%, rgb(190, 75, 219) 16.65%, rgb(190, 75, 219) 33.3%, rgb(76, 110, 245) 33.3%, rgb(76, 110, 245) 49.95%, rgb(64, 192, 87) 49.95%, rgb(64, 192, 87) 66.6%, rgb(250, 176, 5) 66.6%, rgb(250, 176, 5) 83.25%, rgb(253, 126, 20) 83.25%, rgb(253, 126, 20) 100%, rgb(250, 82, 82) 100%);
  animation: var(--timing) linear dance6123 infinite;
}

@keyframes dance6123 {
  to {
    background-position: var(--width);
  }
}

.circle-top {
  height: 296px;
}
.link-icon--right {
  transform: rotate(360deg);
}
</style>
