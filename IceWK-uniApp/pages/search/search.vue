<template>
	<view class="container">
		<u-search placeholder="动态|圈子|用户" :show-action="false" v-model="keyword" @custom="onChange" @search="onChange" @change="onChange"></u-search>
		<!-- tabs -->
		<block v-if="keyword">
			<view class="tabs-box"><u-tabs :list="tabList" :is-scroll="false" :current="current" @change="tabChange"></u-tabs></view>

			<view v-show="current === 0"><post-list :list="postList" :loadStatus="loadStatus"></post-list></view>
			<view v-show="current === 1"><user-list :list="userList" :loadStatus="loadStatus"></user-list></view>
			<view v-show="current === 2"><topic-list :list="topicList" :loadStatus="loadStatus" loadmoreBgColor="#fff"></topic-list></view>
		</block>
		<block v-else>
			<view class="empty-box">
				<image class="empty-img" mode="widthFix" src="../../static/search.png"></image>
				<text>搜索动态，圈子，用户</text>
			</view>
		</block>
	</view>
</template>

<script>
import postList from '../../components/post-list/post-list.vue';
import topicList from '../../components/topic-list/topic-list.vue';
import userList from '../../components/user-list/user-list.vue';
export default {
	components: {
		postList,
		topicList,
		userList
	},
	data() {
		return {
			keyword: '',
			tabList: [
				{
					name: '动态'
				},
				{
					name: '用户'
				},
				{
					name: '圈子'
				}
			],
			current: 0,
			postList: [],
			userList: [],
			topicList: [],
			cartList: [],
			goodsList: [],
			pagePost: 1,
			pageUser: 1,
			topicPage: 1,
			cartPage: 1,
			goodsPage: 1,
			loadStatus: 'loadmore',
			cartList: [],
			modelShow: false,
			checkCart: {}
		};
	},
	onReachBottom() {
		let type = this.current;
		if (type === 0) {
			this.pagePost++;
			this.getPostList();
		}
		
		if (type === 1) {
			this.pageUser++;
			this.getUserList();
		}
		
		if (type === 2) {
			this.topicPage++;
			this.getTopicList();
		}
	},
	methods: {
		onChange() {
			if (this.keyword) {
				let type = this.current;
				
				this.pagePost = 1;
				this.pageUser = 1;
				this.topicPage = 1;
				
				if (type === 0) {
					this.postList = [];
					this.getPostList();
				}

				if (type === 1) {
					this.userList = [];
					this.getUserList();
				}

				if (type === 2) {
					this.topicList = [];
					this.getTopicList();
				}
			}
		},
		getUserList() {
			this.loadStatus = 'loading';
			this.$H
				.get('user/search', {
					keyword: this.keyword,
					page: this.pageUser
				})
				.then(res => {
					this.userList = this.userList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loadmore';
					}
				});
		},
		getTopicList() {
			this.loadStatus = 'loading';
			this.$H
				.get('topic/search', {
					keyword: this.keyword,
					page: this.topicPage
				})
				.then(res => {
					this.topicList = this.topicList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loadmore';
					}
				});
		},
		getPostList() {
			this.loadStatus = 'loading';
			this.$H
				.get('post/search', {
					keyword: this.keyword,
					page: this.pagePost
				})
				.then(res => {
					this.postList = this.postList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loadmore';
					}
				});
		},
		tabChange(index) {
			this.current = index;

			if (index === 0) {
				this.postList = [];
				this.getPostList();
			}

			if (index === 1) {
				this.userList = [];
				this.getUserList();
			}

			if (index === 2) {
				this.topicList = [];
				this.getTopicList();
			}
		}
	}
};
</script>
<style>
page {
	background-color: #fff !important;
}
</style>
<style lang="scss" scoped>
@import 'search.scss';
</style>
