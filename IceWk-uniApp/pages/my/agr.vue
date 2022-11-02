<template>
	<view>
		<view class="content">
		        <view class="text-area">
		            <text class="title">{{agr.title}}</text>
		            <mp-html class="title" :content="agr.content" />
		        </view>
		    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:0,
				agr:{}
			}
		},
		onLoad(options) {
			this.type=options.type;
			this.getAgr();
		},
		methods: {
			getAgr() {
				this.$H.get('agreement/detail',{
					id:this.type
				}).then(res => {
					this.agr = res.result;
				});
			},
		}
	}
</script>

<style lang="scss">
.content {
	margin: 30rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .title {
        font-size: 36rpx;
        color: #8f8f94;
    }
</style>
