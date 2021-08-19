<template>

	<view class="content pt10">
		<view class="pl15 pr15 bgcf">
			<view class="flex aic  b-b-1 pb10 pt10">
				<view class="flex aic pr35 fwb">
					<text style="color: #F43B31;">*</text>
					<text class="fs15 pl5">联系人</text>
				</view>
				<view class="pl30">
					<input type="text" placeholder="请输入联系人(最多6个字符)" v-model="name" placeholder-class="fs14 cb" maxlength="6"/>
				</view>
			</view>
			<view class="flex aic pb10 b-b-1 pt10">
				<view class="flex aic pr35 fwb">
					<text style="color: #F43B31;">*</text>
					<text class="fs15 pl5">性别</text>
				</view>
				<view class="pl35 ml10">
					<radio-group @change="radioChange" class="flex">
						<label :key="''+1">
							<radio :value="''+1" :checked="sex==1" />
							<text class="fs13 pr20">男</text>
						</label>
						<label :key="''+2">
							<radio :value="''+2" :checked="sex==2" />
							<text class="fs13 pr20">女</text>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="flex aic   pb10 pt10">
				<view class="flex aic pr30 fwb">
					<text style="color: #F43B31;">*</text>
					<text class="fs15 pl5">手机号码</text>
				</view>
				<view class="pl20 ">
					<input type="number" placeholder="请输入手机号码" v-model="phone" placeholder-class="fs14 cb" />
				</view>
			</view>
		</view>

		<view class="bgcf pl15 pr15 mt10">
			<wangding-pickerAddress class="  " @change="change">
				<view class="flex aic ju_b b-b-1  pb10 pt10">
					<view class="flex aic fwb">
						<text style="color: #F43B31;">*</text>
						<text class="fs15 pl5">所在地区</text>
					</view>
					<view class=" ">
						<text class="fs14  pr35 mr20" style="margin-left: 8upx;">{{city.length>0?city.join(''):'请选择省/市/区县'}}</text>

					</view>
					<text class=" icon-arrow iconfont fs11 cb pl5"></text>
				</view>
			</wangding-pickerAddress>
			<view class="flex aic ju_b pb12 pt12 b-b-1">
				<view class="dis_flex">
					<view class="flex aic fwb">
						<text style="color: #F43B31;">*</text>
						<text class="fs15 pl5">详细地址</text>
					</view>
					<view class="pr5" style="margin-left: 102upx;">
						<input type="text" placeholder="请选择详细街道、楼牌号等" v-model="address" placeholder-class="fs14 cb" />
					</view>
				</view>
				<view class=" icon-arrow iconfont fs11 cb prl5 "></view>
			</view>
<view class="flex aic ju_b  pb12 pt12 b-b-1">
				<view class="flex aic">
					<text class="fs15 pl5 fwb">职位</text>
				</view>
				<view class="flex_1" style="width: 235rpx;">
					<picker style="width: 100%;text-align: center;" @change="bindPickerChange" :range="array">

						<label class="fs14 ">{{array[index]}}</label>

					</picker>
				</view>
				<view class=" icon-arrow iconfont fs11 cb pl5 "></view>
			</view>
			<view class="flex ju_b  pb12 pt12 aic">
				<text class="fs15 fwb">设为默认地址</text>
				
			<switch class="section-right" :checked="is_default==1" @change="switchChange" color="#F43B31" style="transform: scale(.98,.82);" />
			
			</view>
		</view>

		<!-- <view class="bgcf pl15 pr15 mt10">
			<view class="fs15 pt15">
				个人简介
			</view>
			<textarea value="" placeholder="请输入您的个人简介…"  class="fs14 pt10"/>
		</view> -->
		<view class="flex  pt25 absolute bottom15">
			
			<view class="vaoc flex aic ju_c cf ml15 fs15" @click="bbaoc">
				保存
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
			const currentDate = this.getDate({
				format: true
			})

			return {
				treatmentStatu: {
					checked: false
				},
				current: 0,
				list: ['a', 'b', 'c', 'd'],
				changeid: 1,
				money: 0,
				showxq2: false,			
				
				
				
				array: ['企业法人', '企业', '自媒体'],
				index: 0,
			
				
				
				
				
				
				
				name:'',
				phone:'',
				sex:1,
				city: [],
				address:'',
				is_default:2
			}
		},

		onHide() {
			uni.removeStorageSync('lxr_msg')
		},
		onLoad(option) {
			that = this
			console.log(option)
			var lxr_msg=uni.getStorageSync('lxr_msg')
			if(lxr_msg) {
				that.tile='联系人信息'
			}else {
				that.tile='新增联系人信息'
			}
			uni.setNavigationBarTitle({
			　　title:that.tile
			})
			that.getdata(lxr_msg)
		},
		onShow() {

		},

		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getdata(lxr_msg){
				var  jkurl='/user/option'
				var datas={}
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
						that.array=datas
						that.name=lxr_msg.name
						that.id=lxr_msg.id
						that.phone=lxr_msg.phone
						that.city[0]=lxr_msg.province
						that.city[1]=lxr_msg.city
						that.city[2]=lxr_msg.county
						that.address=lxr_msg.address
						that.sex=lxr_msg.sex
						that.index=that.array.indexOf(lxr_msg.position)
						that.is_default=lxr_msg.is_default
					} else {
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
			},
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
				that.jg = this.array[this.index]
				console.log(that.jg)
			},
			
			change(data) {
				console.log(data)
				this.city = data.data
				console.log(data.data.join(''))
				console.log(this.city);
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			switchChange(e) {
				console.log(e.detail.value)
				that.is_default=e.detail.value?1:2
			},
			
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bbaoc() {
				if (!that.name) {
					uni.showToast({
						title: '请输入联系人',
						icon: 'none',
					});
					return
				} 
				if (that.phone == '' || !(/^1\d{10}$/.test(that.phone))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (that.city.length==0) {
					uni.showToast({
						title: '请选择省/市/区县',
						icon: 'none',
					});
					return
				} 
				if (!that.address) {
					uni.showToast({
						title: '请选择详细街道、楼牌号等',
						icon: 'none',
					});
					return
				} 
				var jkurl='/user/address_add'
				var datas={
					name: this.name,
					phone: this.phone,
					province: this.city[0],
					city: this.city[1],
					county: this.city[2],
					address: this.address,
					sex: this.sex,
					position: this.array[that.index],
					is_default:that.is_default
				}
				if(that.id){
					jkurl='/user/address_edit'
					datas={
						id:that.id,
						name: this.name,
						phone: this.phone,
						province: this.city[0],
						city: this.city[1],
						county: this.city[2],
						address: this.address,
						sex: this.sex,
						position: this.array[that.index],
						is_default:that.is_default
					}
				}
				if(that.btnkg ==1){
					return
				}
				that.btnkg =1
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
						uni.showToast({
							title: '提交成功',
							icon:'none',
							success() {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							}
						})
				
					} else {
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
			},
			radioChange: function(e) {
				console.log(e.detail.value)
				that.sex=e.detail.value
			},
			changeys(index) {
				this.changeid = index + 1;
			},
			xq2() {
				if (this.showxq2 == false) {
					this.showxq2 = true;
				} else {
					this.showxq2 = false;
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #F8F8F8;
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

	.funs {
		width: 690rpx;
		height: 80rpx;
		background: #F43B31;
		border-radius: 10rpx;
	}

	.funxai {
		width: 319rpx;
		height: 80rpx;
		background: #FFB017;
		border-radius: 10rpx;
	}

	.vaoc {
		width: 690rpx;
		height: 80rpx;

		background: #F43B31;
		border-radius: 10rpx;
	}
	
</style>
