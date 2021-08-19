<template>

	<view class="content">
		<view class="pl15 pr15 bgcf">
			<image src="/static/images/ma/jineng_03.png" mode="aspectFill" class="jindu"></image>


		</view>
		<view class="box-sw-t  p15 mt10 bgcf ">
			<view class="fs16 fwb">
				请添加您的服务领域
			</view>
			<view class="flex flex-wrap mt10">
				<view class="flex aic ju_c mr10 lis mb15 " :class="{'lii': rSelect.indexOf(arr)!=-1}"
					v-for="(arr,index) in service_all" :key='index' @tap="tapInfo(arr)">
					<text class="flex fs10">{{arr}}</text>
				</view>
			</view>
			<view class="funxai flex aic ju_c cf  fs15" @click='tiClick'
				:data-url="'../to_examine/to_examine?id_type='+1+'&id='+2" :data-shifou='true'>
				提交
			</view>
		</view>

	</view>
</template>

<script>
	import service from '../../components/service.js';
	import yudatetimepicker from '../../components/yu-datetime-picker/yu-datetime-picker.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			yudatetimepicker
		},
		data() {

			return {
				nums: ['公司注册', '财税服务', '审计报价', '知识产权', '建筑资质', '许可证办理', '建筑资质'],
				// pinas: [],
				rSelect: [],
				info:'',
				service_all:'',
				rz_data:'',
				rz_data1:'',
			}
		},

		onHide() {

		},
		onLoad(option) {
			that = this
			that.rz_data=uni.getStorageSync('rz_data')
			that.rz_data1=uni.getStorageSync('rz_data1')
			var service_all=that.userinfo.service_all||''
			if(service_all.length>0){
				that.service_all=service_all.split(',')
			}
			if(that.userinfo.service.length>0){
				that.rSelect=that.userinfo.service.split(',')
			}
		},
		onShow() {

		},
		watch:{
			hasLogin(val){
				if(val){
					var service_all=that.userinfo.service_all
					if(service_all.length>0){
						that.service_all=service_all.split(',')
					}
				}
			}
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
			tapInfo(e) {
				// console.log(this.rSelect) //是数组，数组也有indexOf
				if (this.rSelect.indexOf(e) == -1) {
					// console.log(e) //打印下标
					this.rSelect.push(e); //选中添加到数组里
				} else {
					this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
				}
			},
			tiClick(){
				var service_ly = [];
				// for (var i = 0; i < this.rSelect.length; i++) {
				// 	service_ly[i]=this.nums[i]
				// }
				service_ly=this.rSelect.join(',')
				if(service_ly.length == 0){
					uni.showToast({
						title:'至少选择一个服务区域',
						icon:'none'
					})
					return
				}
				
				var data = {
					name:this.rz_data.name,
					id_card:this.rz_data.id_card,
					card_z:this.rz_data.card_z,
					card_f:this.rz_data.card_f,
					card_r:this.rz_data.card_r,
					sex:this.rz_data1.sex,
					start_time:this.rz_data1.start_time,
					address:this.rz_data1.address,
					content:this.rz_data1.content,
					service:service_ly
				}
				
				
				service.P_post('/user/service', data).then(res => {
					
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
						uni.showToast({
							title:'提交成功',
							icon:'none'
						})
						service.wxlogin('token')
						setTimeout(function(){
							that.bntkg=0
							uni.navigateBack({
								delta:1
							})
						},1000)
					} else {
						that.btnkg = 0
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			}

		}
	}
</script>

<style>
	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.jindu {
		width: 100%;
		height: 134rpx;
	}

	.lis {
		min-width: 118rpx;
		padding: 5rpx 15rpx;
		/* height: 51rpx; */
		background: #FFFFFF;
		border: 1px solid #ccc;
		color: #ccc;
		border-radius: 4rpx;
	}

	.lii {
		min-width: 118rpx;
		padding: 5rpx 15rpx;
		/* height: 51rpx; */
		border: 1px solid #F43B31 !important;
		border-radius: 4rpx;
		background: #F43B31 !important;
		color: #fff !important;
	}

	.funxai {
		width: 690rpx;
		height: 72rpx;
		background: #F43B31;
		border-radius: 36rpx;
		margin-top: 250rpx;
	}
</style>
