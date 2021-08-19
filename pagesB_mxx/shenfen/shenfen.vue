<template>

	<view class="content">
		<view class="pl15 pr15 bgcf">
			<image src="/static/images/ma/shim_03.png" mode="aspectFill" class="jindu"></image>
		</view>
		<view class="bgcf mt5 pl15 pr15 ">
			<view class="flex ju_b aic pt12 pb15 b-b-1">
				<view class="dis_flex_c">
					<text class="fs14">真实姓名</text>
					<text class="fs11 c9">(企业服务经办人)</text>
				</view>
				<input type="text" placeholder="请输入身份证真实姓名" class="fs14 flex_1 text-right" v-model="real_name"/>
			</view>
			<view class="flex ju_b aic pt15 pb15">
				<text class="fs14">身份证号</text>
				<input type="text" placeholder="请输入真实身份证号" class="fs14 flex_1 text-right"  v-model="card_id"/>
			</view>
		</view>
		<view class="fs11  c9 pl15 pr15 pt10 pb10 lh15">
			<text class="icon-guanyuwomen iconfont fs14 pr5 " style="color: #F43B31;"></text>
			 温馨提示：您填写的所有资料平台都会做加密处理，信息绝对安全，只有在交易促成的情况下我们才会根据情况逐步显示您的必要信息，请您放心填写，有任何疑问都可以咨询我们的客服。
		</view>
		<view class="bgcf p15">
			<view class="time fs14 flex aic fwb">
				上传信息
			</view>
			<view class="dis_flex_c aic pt35">
				<image v-if="url" @tap="scpic(0)" :src="getimg(url)"  mode="aspectFill" class="shen"></image>
				<image v-else @tap="scpic(0)" :src="getimg('/static_s/images/ma/zhengmain_03.png')"  mode="aspectFill" class="shen"></image>
				<view class="fs13 pt10">上传身份证正面</view>
				
			</view>
			<view class="dis_flex_c aic pt15">
				<image v-if="urlf"  @tap="scpic(1)" :src="getimg(urlf)"  mode="aspectFill" class="shen"></image>
				<image v-else  @tap="scpic(1)" :src="getimg('/static_s/images/ma/fanm_06.png')"  mode="aspectFill" class="shen"></image>
				<view class="fs13 pt10">上传身份证反面</view>
				
			</view>
			<view class="dis_flex_c aic pt15">
				<image v-if="urls"  @tap="scpic(2)" :src="getimg(urls)"  mode="aspectFill" class="shen"></image>
				<image v-else  @tap="scpic(2)" :src="getimg('/static_s/images/ma/shouc_03.png')"  mode="aspectFill" class="shen"></image>
				<view class="fs13 pt10">上传手持身份证照片</view>
				
			</view>
			<view class=" flex aic ju_c cf funs fs15 mt15" @click='jump_fuc' data-url='/pagesB_mxx/shenxin/shenxin' :data-shifou='true'>
				去认证
			</view>
		</view>
		
	</view>
</template>

<script>
	import service from '../../components/service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				url:'',
				urlf:'',
				urls:'',
				real_name:'',
				card_id:''
				
			}
		},
		
		onHide() {

		},
		onLoad() {
			that=this
			that.url=that.userinfo.card_z
			that.urlf=that.userinfo.card_f
			that.urls=that.userinfo.card_r
			that.real_name=that.userinfo.name
			that.card_id=that.userinfo.id_card
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			scpic(sc_type) {
			  var that = this
			  
			  uni.showActionSheet({
			  	itemList: ['拍照', '相册'],
			  	success: function(res) {
			  		console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
			  		var sourceType = ['camera', 'album']
			  		if (res.tapIndex == 0) {
			  			sourceType = ['camera']
			  		} else {
			  			sourceType = ['album']
			  		}
			  		uni.chooseImage({
			  			count: 1,
			  			sizeType: ['original', 'compressed'],
			  			sourceType: sourceType,
			  			success: function(res) {
			  				console.log(res)
			  				const tempFilePaths = res.tempFilePaths
			  				
			  				that.upimg(tempFilePaths, sc_type)
			  				
			  			}
			  		});
			  	},
			  	fail: function(res) {
			  		console.log(res.errMsg);
			  	}
			  });
			},
			upimg(imgs, sc_type) {
			  var that = this
			 
			  service.wx_upload(imgs[0]).then(res => {
			  			
			  	that.btn_kg = 0
			  	console.log(res)
			  	if (res.code == 1) {
			  		var datas = res.data
						if(sc_type==0){
							that.url=datas
						}
						if(sc_type==1){
							that.urlf=datas
						}
						if(sc_type==2){
							that.urls=datas
						}
			  	} else {
			  		if (res.msg) {
			  			uni.showToast({
			  				icon: 'none',
			  				title: res.msg
			  			})
			  		} else {
			  			uni.showToast({
			  				icon: "none",
			  				title: "上传失败"
			  			})
			  		}
			  	}
			  }).catch(e => {
			  	that.btn_kg = 0
			  	console.log(e)
			  	uni.showToast({
			  		icon: 'none',
			  		title: '操作失败'
			  	})
			  })
				
				
			 
			},
			
			jump_fuc(){
				if(!that.real_name){
					uni.showToast({
						icon:'none',
						title:'请输入您的真实姓名'
					})
					return
				}
				if(!that.real_name){
					uni.showToast({
						icon:'none',
						title:'请输入您的身份证'
					})
					return
				}
				if(!that.url){
					uni.showToast({
						icon:'none',
						title:'请上传您的身份证正面'
					})
					return
				}
				if(!that.urlf){
					uni.showToast({
						icon:'none',
						title:'上传身份证反面'
					})
					return
				}
				if(!that.urls){
					uni.showToast({
						icon:'none',
						title:'请上传您的身份证正面'
					})
					return
				}
				
				var datas={
					name:that.real_name,
					id_card:that.card_id,
					card_z:that.url,
					card_f:that.urlf,
					card_r:that.urls,
				}
				uni.setStorageSync('rz_data',datas)
				uni.redirectTo({
					url:'/pagesB_mxx/shenxin/shenxin'
				})
			},
			myUpload(rsp) {
				that.url = rsp.path
			
			// 	wx.uploadFile({
			// 		url: '', //仅为示例，非真实的接口地址
			// 		filePath: that.avatar,
			// 		name: 'file',
			// 		formData: {
			
			// 		},
			// 		header: {
			// 			'Authorization': uni.getStorageSync('token') || '',
			// 		},
			// 		success(res) {
			// 			// const data = JSON.parse(res.data)
			// 			console.log(res)
			// 			// that.avatar = data.data
			// 			// that.getimg()
			// 			//do something
			// 		}
			// 	})
			
			},
			myUploadf(rsp) {
				that.urlf = rsp.path
			},
			myUploads(rsp) {
				that.urls = rsp.path
				
			},
		}
	}
</script>

<style>
	page {
		background-color:  #F8F8F8;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color:  #F8F8F8;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	.jindu {
		width: 100%;
 height: 134rpx;		
	}
	.inpurd {
		width: 400rpx;
		color: #DDDDDD !important;
	}
	.time {
		padding-left: 30rpx;
	}
	
	.time:before {
		content: '';
		position: absolute;
		width: 5rpx;
		height: 25rpx;
		left: 39rpx;
		background: #F43B31;
	}
	.shen {
		width: 446rpx;
		height: 263rpx;
	}
	.funs {
		width: 690rpx;
		height: 80rpx;
		background: #F43B31;
		border-radius: 10rpx;
	}
</style>
