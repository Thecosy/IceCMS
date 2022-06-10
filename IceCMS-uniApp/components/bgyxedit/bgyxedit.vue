<template>
	<view style="align-items: center; width: 670rpx;display: flex;flex-direction: column;border-radius: 8rpx; border: 1rpx solid #d8d8d8;padding: 12rpx;">
		<view style="width: 100%;" v-for="(u,i) in taskinfodtv">
			<view @longpress="delthisel(i)" v-if="u.type=='text'" style="width: 100%;">
				<textarea @confirm="returnthisinfo()" @input="returnthisinfo()" @blur="returnthisinfo()" style="width: 100%;padding: 8rpx;" auto-height placeholder="请输入..." :focus="u.f" :clearable="false" v-model="taskinfodtv[i].value" />
			</view>
			<view v-if="u.type=='img'" style="width: 100%;">
				<image @longpress="delthisel(i)" :src="taskinfodtv[i]['value']" style="width: 680rpx;margin: auto;" mode="widthFix"></image>
			</view>
			<!-- <view v-if="u.type=='video'" style="width: 100%;">
				<video @longpress="delthisel(i)" src="/static/55.mp4" style="width: 680rpx;margin: auto;" controls></video>
			</view> -->
		</view>
		<view style="width: 100%;display: flex;justify-content: space-between;align-items: center;margin-top: 100rpx;">
			<view style="margin:8rpx 24rpx 0rpx 10rpx;">
				<image v-if="showdone" @click="returnthisinfo()" src="./done.png" style="width: 50rpx;height: 50rpx;" mode="widthFix"></image>
			</view>
			
			<view style="display: flex;align-items: center;">
				<view style="margin:8rpx 24rpx 0rpx 3rpx;">
					<image @click="addvuetype(0)" src="./wenben.png" style="width: 42rpx;height: 42rpx;" mode="widthFix"></image>
				</view>
				<view style="margin:8rpx 24rpx 0rpx 3rpx;">
					<image @click="addvuetype(1)" src="./tupian.png" style="width: 50rpx;height: 50rpx;" mode="widthFix"></image>
				</view>
				<!-- <view style="margin:8rpx 6rpx 0rpx 3rpx;">
					<image @click="addvuetype(2)" src="./shipin.png" style="width: 50rpx;height: 50rpx;" mode="widthFix"></image>
				</view> -->
			</view>
			
		</view>
		
	</view>
</template>

<script>
export default {
	name:'bgyxedit',
	props: {
		taskinfodtv: {
			type: Array,
			default() {
				return [{type:'text',value:'',f:false}];
			}
		},
		mtype: {
			type: Array,
			default() {
				return ['text','img','video'];
			}
		},
		uploadurl: {
			type: String,
			default: ''
		},
		showdone: {
			type: Boolean,
			default: false
		},
		filename: {
			type: String,
			default: 'uploadfile'
		}
	},
	data() {
		return {
			htmlinfo:''
		};
	},
	methods: {
		returnthisinfo:function(){
			console.log(this.taskinfodtv)
			this.$emit('bgyxchange', this.returninfo());
		},
		returninfo:function(){
			var that = this
			var infoarr = that.taskinfodtv
			var info = '';
			for(var o in infoarr){
				var arr = infoarr[o]
				if(arr.value){
					if(arr.type == 'text'){
						info = info + '<p style="margin:5px auto;">'+arr.value+'</p>';
					}
					if(arr.type == 'img'){
						info = info + '<p style="text-align:center;margin:5px auto;"><img style="width:300px;margin:auto;" src="'+arr.value+'"></p>';
					}
					if(arr.type == 'video'){
						info = info + '<p style="text-align:center;margin:5px auto;"><video controls="controls" style="width:300px;margin:auto;" src="'+arr.value+'"></video></p>';
					}
				}
			}
			if(info){
				info = '<p style="text-align:center;margin:5px auto;">' + info + '</p>'
				return {'html':info,'data':infoarr};
			}else{
				return {'html':'','data':infoarr};
			}
		},
		addvuetype:function(e){
			var that = this
			if(e == 0){
				this.taskinfodtv.push({type:'text',value:'',f:true})
			}
			if(e == 1){
				
				uni.chooseImage({
					count:1,
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.showLoading({
							title:'上传中...'
						})
				        uni.uploadFile({
				            url: that.uploadurl, //上传后返回文件保存的路径即可
				            filePath: tempFilePaths[0],
				            name: 'img',
				            success: (uploadFileRes) => {
				                console.log(uploadFileRes.data);
								var upimg = uploadFileRes.data
								that.taskinfodtv.push({type:'img',value:upimg})
								that.$emit('bgyxchange', that.returninfo());
								uni.hideLoading()
				            }
				        });
				    }
				});
			}
			if(e == 2){
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function (res) {
						var vd = res.tempFilePath;
						uni.showLoading({
							title:'上传中...'
						})
						uni.uploadFile({
						    url: that.uploadurl, //上传后返回文件保存的路径即可
						    filePath: vd,
						    name: 'video',
						    success: (uploadFileRes) => {
						        console.log(uploadFileRes.data);
								var video = uploadFileRes.data
								that.taskinfodtv.push({type:'video',value:video})
								that.$emit('bgyxchange', that.returninfo());
								uni.hideLoading()
						    }
						});
					}
				});
			}
		},
		delthisel:function(i){
			var that = this
			var arr = this.taskinfodtv
			// if(i == 0){
			// 	var list = ['↓下移↓', '删除']
			// }
			// if(i == arr.length-1){
			// 	var list = ['↑上移↑', '删除']
			// }
			
			uni.showActionSheet({
			    itemList: ['↑上移↑','↓下移↓', '删除'],
			    success: function (res) {
			        var k = res.tapIndex
					console.log(k)
					if(k == 0){
						if(i>0){
							var ls = arr[i]
							arr[i] = arr[i-1]
							arr[i-1] = ls
							that.taskinfodtv = []
							for(var o in arr){
								that.taskinfodtv.push(arr[o])
							}
							that.$emit('bgyxchange', that.returninfo());
							console.log(that.taskinfodtv)
						}
					}
					if(k==1){
						if(i<(arr.length-1)){
							var ls = arr[i]
							arr[i] = arr[i+1]
							arr[i+1] = ls
							that.taskinfodtv = []
							for(var o in arr){
								that.taskinfodtv.push(arr[o])
							}
							that.$emit('bgyxchange', that.returninfo());
							console.log(that.taskinfodtv)
						}
					}
					if(k==2){
						that.taskinfodtv.splice(i,1)
						that.$emit('bgyxchange', that.returninfo());
						console.log(that.taskinfodtv)
					}
			    },
			    fail: function (res) {
			        console.log(res.errMsg);
			    }
			});
			
			
		}
	}
};
</script>
