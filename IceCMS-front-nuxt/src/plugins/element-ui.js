import Vue from 'vue'

import { Button } from 'element-ui'    //引入Button按钮
import { Image } from 'element-ui'
import { Carousel } from 'element-ui'
import { CarouselItem } from 'element-ui'
import { Popover } from 'element-ui'
import { Input } from 'element-ui'
import { Switch } from 'element-ui'
import { Pagination } from 'element-ui'
import { Notification } from 'element-ui'
import { Dialog } from 'element-ui'
import { Avatar } from 'element-ui'
import { Form } from 'element-ui'
import { FormItem } from 'element-ui'
import { Aside } from 'element-ui'
import { Main } from 'element-ui'
import { Upload } from 'element-ui'


// Avatar,
//   Button,
//   Image,
//   Carousel,
//   CarouselItem,
//   Popover,
//   Input,
//   Form,
//   FormItem,
//   Select,
//   Dialog,
//   Pagination,

//   Menu,
//   Submenu,
//   MenuItem,
//   MenuItemGroup,
//   Option,
//   OptionGroup,
//   ButtonGroup,
//   Table,
//   TableColumn,
//   DatePicker,
//   TimeSelect,
//   TimePicker,
 
//   Tabs,
//   TabPane,
//   Tag,
//   Switch,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Checkbox,
//   CheckboxButton,
//   CheckboxGroup,
//   Rate,
//   Radio,
//   RadioGroup,
//   RadioButton,
 
//   Breadcrumb,
//   BreadcrumbItem,
//   Slider,
//   Row,
//   Col,
//   Upload,
//   Progress,
//   Card,

//   Header,
//   Aside,
//   Main,
//   Footer,
 
//   MessageBox,
//   Message,
//   Notification,

//   Scrollbar,

//   Loading,
//   Skeleton,
//   skeletonItem
export default ()=>{
    Vue.use(Button)
    Vue.use(Image)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Popover)
    Vue.use(Input)
    Vue.use(Switch)
    Vue.use(Pagination)
    // Vue.use(Notification)
    Vue.use(Dialog)
    Vue.use(Avatar)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Aside)
    Vue.use(Main)
    Vue.use(Upload)
}
// 将 Notification 挂载到 Vue 原型上
Vue.prototype.$notify = Notification