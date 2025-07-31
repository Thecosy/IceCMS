<template>
	<view class="template-message">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed :bottomShadow="false" backTitle=" ">
      <view class="" @click="showModal">
        <text class="tn-text-lg">消息</text>
        <text class="tn-text-xl tn-padding-left-sm tn-icon-group-circle"></text>  
      </view>
    </tn-nav-bar>
    
    <!-- <tn-nav-bar fixed :bottomShadow="false">消息通知</tn-nav-bar> -->
    
    <!-- 方式1 start-->
    <view class="tn-flex tn-message-fixed" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-orange tn-color-white">
            <view class="tn-icon-topics-fill">
              <!-- <tn-badge backgroundColor="#E72F8C" fontColor="#FFFFFF" :absolute="true" :fontSize="16">
                <text>16</text>
              </tn-badge> -->
            </view>
          </view>  
          <view class="tn-color-black tn-text-center">
            <text class="tn-text-ellipsis">评论</text>
          </view>
        </view>
      </view>
      <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-red tn-color-white">
            <view class="tn-icon-like-fill">
              <tn-badge backgroundColor="#E72F8C" fontColor="#FFFFFF" :absolute="true" :fontSize="16">
                <text>12</text>
              </tn-badge>
            </view>
          </view>  
          <view class="tn-color-black tn-text-center">
            <text class="tn-text-ellipsis">爱心</text>
          </view>
        </view>
      </view>
      <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-cyan tn-color-white">
            <view class="tn-icon-praise-fill">
              <!-- <tn-badge backgroundColor="#E72F8C" fontColor="#FFFFFF" :absolute="true" :fontSize="16">
                <text>39</text>
              </tn-badge> -->
            </view>
          </view>  
          <view class="tn-color-black tn-text-center">
            <text class="tn-text-ellipsis">赞赏</text>
          </view>
        </view>
      </view>
      <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius">
        <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
          <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-blue tn-color-white">
            <view class="tn-icon-notice-fill">
              <tn-badge backgroundColor="#E72F8C" fontColor="#FFFFFF" :absolute="true" :fontSize="16">
                <text>99+</text>
              </tn-badge>
            </view>
          </view>  
          <view class="tn-color-black tn-text-center">
            <text class="tn-text-ellipsis">系统</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 方式1 end-->
    
    <tn-modal v-model="show1" :custom="true">
      <view class="custom-modal-content">
        <view class="tn-text-center tn-padding-top-sm tn-text-xxl tn-text-bold">提 示</view>
        <view class="tn-text-center tn-padding-top tn-text-lg tn-color-gray">确定将所有消息标为已读吗？</view>
        <view class="tn-flex tn-flex-row-between tn-margin-top-xl">
          <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
            <tn-button backgroundColor="#00FFC6" padding="40rpx 0" width="90%" shadow fontBold shape="round">
              <text class="tn-color-black">取 消</text>
            </tn-button>
          </view>
          <view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
            <tn-button backgroundColor="#FFF00D" padding="40rpx 0" width="90%" shadow fontBold shape="round">
              <text class="tn-color-black">确 定</text>
            </tn-button>
          </view>
        </view>
      </view>
    </tn-modal>
    
    <view class="tn-safe-area-inset-bottom tn-margin-bottom-sm" style="margin-top: 260rpx;" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <tn-swipe-action>
        <tn-swipe-action-item v-for="(item,index) in 12" :key="index" :name="index" :options="options">
          <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding">
            <view class="justify-content-item">
              <view class="tn-flex tn-flex-col-center tn-flex-row-left">
                <view class="logo-pic">
                  <view class="logo-image">
                    <view class="tn-shadow-blur" style="background-image:url('https://resource.tuniaokj.com/images/blogger/blogger_beibei.jpg');width: 110rpx;height: 110rpx;background-size: cover;">
                    </view>
                  </view>
                </view>
                <view class="tn-padding-right tn-color-black">
                  <view class="tn-padding-right tn-padding-left-sm tn-text-lg tn-text-bold">
                    麻烦动态清凌女士
                  </view>
                  <view class="tn-padding-right tn-padding-top-xs tn-text-ellipsis tn-padding-left-sm">
                    <text class="tn-color-grey">这个锅，我背定了</text>
                  </view>
                </view>
              </view>
            </view>
            <view class="justify-content-item">
              <view class="tn-flex tn-flex-row-right">
                <view class="">2022-05-21</view>
              </view>
              <view class="tn-flex tn-flex-row-right">
                <tn-badge backgroundColor="tn-cool-bg-color-1" fontColor="tn-color-white" :radius="40" margin="10rpx 0rpx 10rpx 10rpx"><text>6</text></tn-badge>
              </view>
            </view>
          </view>
        </tn-swipe-action-item>
      </tn-swipe-action>
    </view>
    
	</view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
    name: 'TemplateMessage',
    mixins: [template_page_mixin],
		data() {
			return {
        show1: false,
				options: [{
				    icon: 'star',
				    style: {
				      backgroundColor: '#FFA726',
				      width: '80rpx',
				      height: '80rpx',
				      margin: '0 12rpx',
				      borderRadius: '100rpx'
				    }
				  },
				  {
				    icon: 'delete',
				    style: {
				      backgroundColor: '#E83A30',
				      width: '80rpx',
				      height: '80rpx',
				      margin: '0 12rpx',
				      borderRadius: '100rpx'
				    }
				  }
				]
			}
		},
		onLoad() {

		},
		methods: {
      // 弹出模态框
      showModal(event) {
        this.openModal()
      },
      // 打开模态框
      openModal() {
        this.show1 = true
      },
		}
	}
</script>

<style lang="scss" scoped>
	.template-message{
	}
  
  .tn-message-fixed{
    position: fixed;
    background-color: rgba(255,255,255,1);
    box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
    top: 0;
    width: 100%;
    transition: all 0.25s ease-out;
    z-index: 100;
  }
  
  /* 图标容器1 start */
  .icon1 {
    &__item {
      width: 30%;
      background-color: #FFFFFF;
      border-radius: 10rpx;
      padding: 30rpx;
      margin: 20rpx 10rpx;
      transform: scale(1);
      transition: transform 0.3s linear;
      transform-origin: center center;
      
      &--icon {
        width: 90rpx;
        height: 90rpx;
        font-size: 60rpx;
        border-radius: 50%;
        margin-bottom: 18rpx;
        position: relative;
        z-index: 1;
        
        &::after {
          content: " ";
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          left: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 1;
          transform: scale(1, 1);
          background-size: 100% 100%;
          background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg5.png);
        }
      }
    }
  }
  
  /* 用户头像 start */
  .logo-image {
    width: 90rpx;
    height: 90rpx;
    position: relative;
  }
  
  .logo-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    // box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    overflow: hidden;
    // background-color: #FFFFFF;
  }
</style>
