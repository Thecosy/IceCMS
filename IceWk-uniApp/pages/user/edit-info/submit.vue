<template>
	<view class="container">
		<block v-if="type == 'tag_str'">
			<view class="f-wrap">
				<view class="title">已选择标签</view>
				<view @click="onTagDel(index)" v-for="(item, index) in value" :key="index" class="tag">{{ item }}</view>
			</view>
			<view class="f-wrap">
				<view class="title">自定义标签</view>
				<view class="tag-add" @click="showAddTag = true"><u-icon color="#999" size="50" name="plus"></u-icon></view>
				<!-- 添加弹窗 -->
				<u-popup v-model="showAddTag" mode="center" border-radius="20" width="80%">
					<view class="popup-wrap">
						<view class="title">自定义标签</view>
						<input v-model="addValue" class="tag-input" type="text" placeholder="最长4个字" />
					</view>
					<view class="btn-wrap">
						<view @click="onCancel" class="btn-cancel">取消</view>
						<view @click="onConfirm" class="btn-confirm">保存</view>
					</view>
				</u-popup>
			</view>
			<view class="f-wrap">
				<view class="title">标签</view>
				<view @click="onTagAdd(item)" v-for="(item, index) in tagList" :key="index" class="tag">{{ item }}</view>
			</view>
		</block>
		<block v-else><input v-model="value" class="input" type="text" /></block>
		<view style="margin-top: 50rpx;"><q-button @click="submit">保存</q-button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showAddTag: false,
			type: '',
			value: '',
			tagList: ['摄影师', '自媒体', '内容创作者', '文案', '主播', '导师', '新萌'],
			addValue: ''
		};
	},
	onLoad(options) {
		this.type = options.type;
		if (options.value) {
			this.value = JSON.parse(options.value);
		}
	},
	methods: {
		onCancel() {
			this.showAddTag = false;
			this.addValue = '';
		},
		onConfirm() {
			if (!this.addValue) {
				this.$u.toast('自定义标签不能为空');
				return;
			}

			if (this.addValue.length > 4) {
				this.$u.toast('不能超过4个字');
				return;
			}

			let str = this.value.toString();
			if (str.includes(this.addValue)) {
				this.$u.toast('已存在相同标签');
				return;
			}

			this.value.push(this.addValue);
			this.showAddTag = false;
			this.addValue = '';
		},
		submit() {
			uni.showLoading({
				mask: true,
				title: '正在保存'
			});
			let obj = {};
			let type = this.type;

			obj[type] = this.value;

			this.$H.post('user/userInfoEdit', obj).then(res => {
				if (res.code == 200) {
					this.$store.commit('login',res.result);
					uni.navigateBack();
				}
				uni.hideLoading();
			});
		},
		onTagDel(index) {
			this.value.splice(index, 1);
		},
		onTagAdd(name) {
			let str = this.value.toString();
			if (str.includes(name)) {
				this.$u.toast('已存在相同标签');
				return;
			}

			this.value.push(name);
		}
	}
};
</script>

<style>
page {
	background-color: #f5f5f5;
}

.popup-wrap {
	padding: 50rpx 30rpx;
}

.popup-wrap .tag-input {
	background-color: #f5f5f5;
	margin-bottom: 30rpx;
	padding: 20rpx;
}

.popup-wrap > .title {
	text-align: center;
	font-weight: bold;
	margin-bottom: 20rpx;
}

.btn-wrap {
	display: flex;
}

.btn-wrap .btn-cancel {
	width: 50%;
	padding: 20rpx 0;
	text-align: center;
	background-color: #f5f5f5;
}

.btn-wrap .btn-confirm {
	background-color: #8687fd;
	width: 50%;
	padding: 20rpx 0;
	text-align: center;
	color: #ffffff;
}

.input {
	border-bottom: 1px solid #e2e2e2;
	padding: 10rpx;
}

.tag-add {
	padding: 20rpx;
	background-color: #f5f5f5;
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}

/* 标签 */

.tag {
	padding: 10rpx 20rpx;
	border-radius: 20rpx;
	font-size: 24rpx;
	display: inline-block;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	background-color: #ffebe5;
}

.tag:nth-child(2n) {
	background-color: #ecf9f2;
}

.tag:nth-child(3n) {
	background-color: #fff7e5;
}

.tag:nth-child(5n) {
	background-color: #b3e0ff;
}
</style>
