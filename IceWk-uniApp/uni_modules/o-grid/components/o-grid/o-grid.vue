<template>
	<view class="grid-wrap">
		<view :class="title?'o-title':'p-1'">{{title}}</view>
		<view :class="['grid', Gutter]">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		name:'oGrid',
		// #ifdef MP-WEIXIN
		options:{ virtualHost:true },
		// #endif
		
		props:{
			title:{
				type:String,
				default:''
			},
			col:{
				type:[Number,String],
				default:3
			},
			square:{
				type:[Boolean,String],
				default:false
			},
			size:{
				type:String,
				default:'md'
			},
			border:{
				type:[Boolean,String],
				default:false
			},
			radius:{
				type:[Boolean,String],
				default:false
			},
			gutter:{
				type:[Boolean,String],
				default:false
			},
			bg:{
				type:String,
				default:''
			}
		},
		
		provide(){
			return{
				grid:this
			}
		},
		
		// data() {
		// 	return {
		// 		key: value
		// 	}
		// },
		
		computed: {
			Gutter(){
				if(!this.gutter || this.gutter=='false') return '';
				else return 'px-8';
			}
		},
	}
</script>

<style lang="scss">
	$u:8rpx;
	.grid-wrap{background-color:#f6f6f6;}
	.o-title{
		font-size: 15px;
		font-weight: 600;
		color: #333;
		background-color: #f6f6f6;
		height:50rpx;
		line-height: 30rpx;
		position: relative;
		padding-left:$u * 5;
		padding-top: $u * 4;
		box-sizing:content-box;
		&::after{
			position: absolute;
			content: "";
			left:15rpx;
			top:$u * 4 + 2rpx;
			height:24rpx;
			width:6rpx;
			border-radius:60rpx;
			background-color: #999;
			z-index: 2;
		}
	}
	.p-1{padding:10rpx;}
	.grid{
		display: flex;
		flex-wrap: wrap;
	}
	.px-8{
		padding: 8rpx;
	}
	
</style>
