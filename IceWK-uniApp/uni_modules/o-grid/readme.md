## 说明

比Uni官方版还好用的宫格组件，包含grid、grid-item两个组件，当前为uni_modules版本 ^_^

## 特性

- 常用的移动端页面宫格组件
- 支持角标红点和数字
- 图标 支持图片和字体，自动识别
- 内置300多个图标，图标内容在示例中有展示
- 兼容APP、H5及微信小程序
- QQ交流群 1136131487



## 使用方法

在 template 中使用组件 

```html
<template>
	<view>

		<o-grid col="4" title="4列/其他参数默认">
			<o-grid-item text="普通跳转" dot icon="/static/logo.png" @click="goTo('../test/test')" />
			<o-grid-item text="图标列表" icon="icon-viewlist" @click="goTo('../tabbar/tabbar','tabbar')" />
			<o-grid-item text="普通跳转" dot icon="/static/logo.png" @click="goTo('../test/test')" />
			<o-grid-item text="图标列表" icon="icon-camera" @click="goTo('../tabbar/tabbar','tabbar')" />
			<o-grid-item text="普通跳转" icon="icon-feeds" @click="goTo('../test/test')" />
			<o-grid-item text="普通跳转" icon="icon-service" @click="goTo('../test/test')" />
			<o-grid-item text="普通跳转" icon="icon-feeds" @click="goTo('../test/test')" />
			<o-grid-item text="普通跳转" icon="icon-service" @click="goTo('../test/test')" />
		</o-grid>
	
		<o-grid col="4" border="0" square title="正方/无边/小图标" size="sm">
			<o-grid-item text="内容标题" icon="icon-help1"></o-grid-item>
			<o-grid-item text="内容标题" badge="99+" icon="/static/logo.png"></o-grid-item>
			<o-grid-item text="内容标题" dot icon="/static/logo.png"></o-grid-item>
			<o-grid-item text="内容标题" icon="icon-help"></o-grid-item>
		</o-grid>
	
		<o-grid col="5" square title="5列/正方/小图标" size="sm">
			<o-grid-item text="内容标题" icon="icon-help1"></o-grid-item>
			<o-grid-item text="内容标题" badge="99+" icon="/static/logo.png"></o-grid-item>
			<o-grid-item text="内容标题" dot icon="/static/logo.png"></o-grid-item>
			<o-grid-item text="内容标题" icon="icon-help"></o-grid-item>
			<o-grid-item text="内容标题" icon="/static/logo.png"></o-grid-item>
		</o-grid>
	
		<o-grid col="2" gutter radius title="两列/间隔/圆角">
			<o-grid-item text="内容标题" icon="icon-Newuserzone-fill"></o-grid-item>
			<o-grid-item text="内容标题" badge="99+" icon="/static/logo.png"></o-grid-item>
			<o-grid-item text="内容标题" dot icon="/static/logo.png"></o-grid-item>
			<o-grid-item text="内容标题" icon="icon-product-fill"></o-grid-item>
		</o-grid>
	
		<o-grid gutter title="间隔/其他默认">
			<o-grid-item text="内容标题" badge="99+" icon="/static/logo.png" />
			<o-grid-item text="内容标题" icon="icon-brand-fill" />
			<o-grid-item text="内容标题" dot icon="/static/logo.png" />
		</o-grid>
		
		<o-grid col="4" gutter square title="4列/间隔/方正">
			<o-grid-item text="内容标题" icon="icon-filter"></o-grid-item>
			<o-grid-item text="内容标题" badge="99+" icon="/static/logo.png"></o-grid-item>
			<o-grid-item text="内容标题" dot icon="/static/logo.png"></o-grid-item>
			<o-grid-item text="内容标题" icon="icon-block"></o-grid-item>
			<o-grid-item text="内容标题" icon="/static/logo.png"></o-grid-item>
			<o-grid-item text="内容标题" icon="/static/logo.png"></o-grid-item>
		</o-grid>
		
		<o-grid col="5" gutter square radius title="间隔/圆角/正方/大图标" size="sm">
			<o-grid-item text="内容标题1" icon="icon-pcm" @click="goTo('../test/test')" />
			<o-grid-item text="tabbar" icon="icon-clock" @click="goTo('../tabbar/tabbar','tabbar')" />
			<o-grid-item text="跳转" dot icon="icon-color" @click="goTo('../test/test')" />
			<o-grid-item text="内容标题" icon="icon-jpge-fill"></o-grid-item>
			<o-grid-item text="内容标题" icon="/static/logo.png"></o-grid-item>
		</o-grid>

	</view>
</template>

<script>
	
	export default {
		data() {
			return { }
		},
		methods: {
			goTo(url,type){
				switch (type) {
					case 'tabbar':{ //跳转到tabbar页
						uni.switchTab({ url:url })
						break;
					}
					case 'back':{ //返回上一页，只有当前为非tabbar页起作用
						uni.navigateBack({ delta:1 });
						break;
					}
					case 'modal':{ //弹出对话框
						uni.showModal({
							title:url,
							content:'test'
						});
						break;
					}
					case 'toast':{ //弹出提示框
						uni.showToast({
							icon:'none',
							title:url
						});
						break;
					}
					default:{ //非tabbar页跳转
						if (!url) { console.log('没填写路径!') }
						else {
							uni.navigateTo({ url:url});
							console.log('点了')
						}
					}
				}
			}
		}
	}
</script>

```



## API

### oGrid Props

| 属性名   | 类型           | 默认值 | 可选值      | 说明                            |
| -------- | -------------- | ------ | ----------- | ------------------------------ |
| col      | Number,String  | 3      | 2~5         | 列，可填任意数，<2则=2，>5则=5  |
| title    | String         | -      |             | Grid组标题                     |
| border   | Number,String  | false  | true,0      | 是否显示边框 非gutter模式有效   |
| size     | String         | md     | sm、md、lg  | 图标尺寸 差值6rpx              |
| square   | Boolean,String | false  | false、true | 开启正方格                      |
| gutter   | Boolean,String | false  | false、true | 开启间隔                        |
| radius   | Boolean,String | false  | false、true | 开启圆角，gutter模式下有效       |



### oGridItem Props

| 属性名     | 类型          | 默认值 | 可选值 | 说明                      |
| ---------- | ------------- | ------ | ------ | ------------------------ |
| text       | String        | -      | -      | 文字                     |
| icon       | String        | -      | -      | 图标，支持图片和字体      |
| hoverClass | String        | -      | -      | 点击时的样式类            |
| dot        | Boolean       | -      | -      | 红点角标                 |
| badge      | Number,String | -      | -      | 数字角标                 |

### oGridItem Events
| 事件名称 | 说明                                        | 返回参数 |
| ------- | ------------------------------------------ | ------ |
| @click  | 监听GridItem点击事件, 通常用于调用methods方法  | - |