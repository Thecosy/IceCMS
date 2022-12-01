import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import VueQriously from 'vue-qriously'

import { getSetting } from '@/api/websetting'


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
import SlideVerify from 'vue-monoplasty-slide-verify';

Vue.use(SlideVerify);

Vue.config.productionTip = false

Vue.use(VueQriously)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 请求接口保存全局数据
const  getUpdateList = (async()=>{
    await getSetting().then(resp => {   
      store.dispatch("glabledata",resp.data);
    })
})
getUpdateList()

// 按需引入：base.css 基础样式必须引入，其它组件样式按需引入
import "element-ui/packages/theme-chalk/lib/base.css";
import "element-ui/packages/theme-chalk/lib/collapse.css";
import "element-ui/packages/theme-chalk/lib/collapse-item.css";
import "element-ui/packages/theme-chalk/lib/select.css";
import "element-ui/packages/theme-chalk/lib/option.css";

import {
  Avatar,
  Button,
  Image,
  Carousel,
  CarouselItem,
  Popover,
  Input,
  Form,
  FormItem,
  Select,
  Dialog,
  Pagination,

  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Option,
  OptionGroup,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
 
  Tabs,
  TabPane,
  Tag,
  Switch,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Rate,
  Radio,
  RadioGroup,
  RadioButton,
 
  Breadcrumb,
  BreadcrumbItem,
  Slider,
  Row,
  Col,
  Upload,
  Progress,
  Card,

  Header,
  Aside,
  Main,
  Footer,
 
  MessageBox,
  Message,
  Notification,

  Scrollbar
} from 'element-ui';

Vue.use(Scrollbar);
Vue.use(Popover);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Image);
Vue.use(Avatar);

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(OptionGroup);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Slider);
Vue.use(Card);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Switch);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Rate);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Pagination);
Vue.prototype.$notify = Notification;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
// Vue.prototype.$loading = Loading.service;

// Vue.use(Pagination);
// Vue.use(Autocomplete);
// Vue.use(InputNumber);
// Vue.use(Tooltip);
// Vue.use(Tree);
// Vue.use(Alert);
// Vue.use(Icon);
// Vue.use(Spinner);
// Vue.use(Badge);
// Vue.use(Steps);
// Vue.use(Step);
// Vue.use(Collapse);
// Vue.use(CollapseItem);
// Vue.use(Cascader);
// Vue.use(ColorPicker);
// Vue.use(Transfer);
// Vue.use(Container);
// Vue.use(Timeline);
// Vue.use(TimelineItem);
// Vue.use(Link);
// Vue.use(Divider);
// Vue.use(Calendar);
// Vue.use(Backtop);
// Vue.use(PageHeader);
// Vue.use(CascaderPanel);
// Vue.use(Loading.directive);

