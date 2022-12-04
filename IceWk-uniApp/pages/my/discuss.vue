<template>
	<view>
		<discuss-list :list="discussList" :loadStatus="loadStatus"></discuss-list>
	</view>
</template>

<script>
	import discussList from '../../components/discuss-list/discuss-list.vue';
	export default {
		components: {
			discussList
		},
		data() {
			return {
				discussList: [],
				loadStatus: "loadmore",
				page: 1
			};
		},
		onLoad() {
			this.getDiscussList();
		},
		onReachBottom() {
			this.page++;
			this.getDiscussList();
		},
		methods: {
			getDiscussList() {
				this.loadStatus = "loading";
				this.$H.post("discuss/myDis", {
					page: this.page
				}).then(res => {
					this.discussList = this.discussList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
