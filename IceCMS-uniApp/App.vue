<script>
	export default {
		onLaunch: function() {
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/nPro/base.scss';
	@import '@/theme/dark.scss';
	/* #ifndef APP-NVUE */
	page {
		height: 100%;
	}
	/* #endif */
</style>


<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "common/demo.scss";
	
</style>

<style>
/* @import url("./base.css"); */
/* 解决小程序和app滚动条的问题 */
/* #ifdef MP-WEIXIN || APP-PLUS */
::-webkit-scrollbar {  
      width: 10px !important;  
      height: 1px !important;  
}  
::-webkit-scrollbar-thumb { //滑块部分  
      border-radius: 5px !important;  
      background-color: rgb(175, 74, 240) !important;  
}  
::-webkit-scrollbar-track { //轨道部分  
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2) !important;  
      background: #ededed !important;  
      border-radius: 5px !important;  
}
/* #endif */
/* 解决H5 的问题 */
/* #ifdef H5 */
    uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
    /* 隐藏滚动条，但依旧具备可以滚动的功能 */
display: none
    }
/* #endif */
</style>
