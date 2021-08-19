<template>

	<view class="content pt10">
		<view class="pl15 pr15 bgcf">
			<view class="flex aic  b-b-1 pb10 pt10">
				<view class="flex aic pr35">
					<text style="color: #F43B31;">*</text>
					<text class="fs15 pl5">公司名称</text>
				</view>
				<view class="pl35 ml5">
					<input type="text" placeholder="请输入公司名称" v-model="title" placeholder-class="fs14 cb" />
				</view>
			</view>
			<view class="flex aic pb10 pt10">
				<view class="flex aic pr35">
					<text style="color: #F43B31;">*</text>
					<text class="fs15 pl5">信用代码</text>
				</view>
				<view class="pl35 ml5">
					<input type="text" placeholder="请输入信用代码" v-model="code" placeholder-class="fs14 cb" />
				</view>
			</view>
		
		</view>
		<view class="bgcf pl15 pr15 mt10">
			<view class="flex aic  b-b-1 pb10 pt10">
				<view class="flex aic pr35">
					<text class="fs15 pl5">法人名称</text>
				</view>
				<view class="pl35 ml10">
					<input type="text" placeholder="请输入法人代表" v-model="name" placeholder-class="fs14 cb" />
				</view>
			</view>
			<view class="flex aic   pb10 pt10">
				<view class="flex aic pr35">
					<text class="fs15 pl5">法人身份证号码</text>
				</view>
				<view class="flex_1">
					<input type="text" placeholder="请输入法人身份证号码" v-model="idcard" placeholder-class="fs14 cb" />
				</view>
			</view>
		</view>
		<view class="bgcf pl15 pr15 mt10">
			<view class="flex aic ju_b  pb12 pt12 b-b-1">
				<view class="flex aic">
					<text class="fs15 pl5">公司类型</text>
				</view>
				<view class="flex_1" style="">
					<picker class="flex_1" style="text-align: center;" @change="bindPickerChange" :range="array">

						<label class="fs14">{{array[index]}}</label>

					</picker>
				</view>
				<view class=" icon-arrow iconfont fs11 cb pl5 "></view>
			</view>
			<view class="flex aic ju_b  pb12 pt12">
				<view class="flex aic">
					<text class="fs15 pl5">公司规模</text>
				</view>
				<view class="flex_1" style="">
					<picker class="flex_1" style="text-align: center;" @change="bindPickerChangeg" :range="arrayg">
			
						<label class="fs14">{{arrayg[indexg]}}</label>
			
					</picker>
				</view>
				<view class=" icon-arrow iconfont fs11 cb pl5 "></view>
			</view>
			<view class="flex aic   pb12 pt12 b-b-1">
				<view class="flex aic" style="padding-right: 166upx;">
					<text class="fs15 pl5">注册资金</text>
				</view>
				<input type="text" placeholder="请输入注册资金" v-model="price" placeholder-class="fs14 cb " />
				<view class=" fs13  pl5 ">万</view>
			</view>
			<view class="flex aic ju_b  pb12 pt12 b-b-1">
				<view class="flex aic">
					<text class="fs15 pl5">注册时间</text>
				</view>
				<view class="flex_1" style="">
					<picker class="flex_1" style="text-align: center;" mode="date" :value="register_time" :start="startDate" :end="endDate" @change="bindDateChange">
						<text class="uni-input fs14">{{register_time?register_time:'请选择注册时间'}}</text>
					</picker>
				</view>
				<view class=" icon-arrow iconfont fs11 cb pl5 "></view>
			</view>
			<!-- <wangding-pickerAddress class="  " @change="change">
				<view class="flex aic ju_b  pb10 pt10">
					<view class="flex aic">
						<text class="fs15 pl5">注册地址</text>
					</view>
					<view class="">
						<input type="text" placeholder="请输入法人身份证号码" v-model="shenf" placeholder-class="fs14 cb" />
					</view>
					<text class=" icon-arrow iconfont fs11 cb pl5"></text>
				</view>
			</wangding-pickerAddress> -->
			<view class="flex aic ju_b  pb10 pt10">
				<view class="flex aic">
					<text class="fs15 pl5">注册地址</text>
				</view>
				<view class="flex_1">
					<input type="text" placeholder="请输入注册地址" v-model="address" placeholder-class="fs14 cb" class="pl15 flex_1" style="text-align: center;"/>
				</view>
				<text class=" icon-arrow iconfont fs11 cb pl5"></text>
			</view>
		</view>

		<!-- <view class="bgcf pl15 pr15 mt10">
			<view class="fs15 pt15">
				个人简介
			</view>
			<textarea value="" placeholder="请输入您的个人简介…"  class="fs14 pt10"/>
		</view> -->
		<view class="flex  pt25" v-if="tile=='新增企业认证'">
			<!-- <view class="funxai flex aic ju_c cf ml15 fs15"  @click='jump' :data-url="'../to_examine/to_examine?id_type='+1+'&id='+1" :data-shifou='true'> -->
			<view class="funxai flex aic ju_c cf ml15 fs15"  @click='bbaoc' :data-url="'../to_examine/to_examine?id_type='+1+'&id='+1" :data-shifou='true'>
				保存并提交认证
			</view>
			<!-- <view class="vaoc flex aic ju_c cf ml20 fs15" @click="bbaoc" >
				保存
			</view> -->
		</view>
		<view class="" v-else>
			
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
				
				
				array: [ '企业', '自媒体'],
				arrayg: ['200', '500'],
				index: 0,
				indexg: 0,
				city: '请输入注册地址',
				tile:'',
				
				
				
				
				
				title:'',
				code:'',
				name:'',
				idcard:'',
				price:'',
				register_time: '',
				address:'',
			}
		},

		onHide() {

		},
		onLoad(option) {
			that = this
			console.log(option)
			if(option.id==1) {
				that.tile='企业信息'
			}else {
				that.tile='新增企业认证'
			}
			uni.setNavigationBarTitle({
			　　title:that.tile
			})
			that.getdata()
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
			getdata(){
				var jkurl='/enterprise/option'
				service.P_post(jkurl, {}).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
						that.array=res.data.type
						that.arrayg=res.data.scale
				
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
				return api.getimg(img)
			},
			jump(e) {
				return api.jump(e)
			},
			bindDateChange: function(e) {
				this.register_time = e.target.value
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			bindPickerChangeg: function(e) {
				this.indexg = e.target.value
			},
			change(data) {

				this.city = data.data.join('')
				console.log(data.data.join(''))
				console.log(this.city);
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
				
				if (!that.title) {
					uni.showToast({
						title: '请输入公司名称',
						icon: 'none',
					});
					return
				} 
				if (!that.code) {
					uni.showToast({
						title: '请输入信用代码',
						icon: 'none',
					});
					return
				} 
				
				if (!that.name) {
					uni.showToast({
						title: '请输入法人名称',
						icon: 'none',
					});
					return
				} 
				if (!that.idcard) {
					uni.showToast({
						title: '请输入法人身份证号码',
						icon: 'none',
					});
					return
				} 
				if (!that.register_time) {
					uni.showToast({
						title: '请选择注册时间',
						icon: 'none',
					});
					return
				} 
				if (!that.address) {
					uni.showToast({
						title: '请输入公司地址',
						icon: 'none',
					});
					return
				} 
				
				var jkurl='/enterprise/add_enterprise'
				var datas={
					title:that.title,
					code:that.code,
					name:that.name,
					idcard:that.idcard,
					
					type:that.array[that.index],
					scale:that.arrayg[that.indexg],
					
					
					price:that.price,
					register_time: that.register_time,
					address:that.address,
				}
				if(that.id){
					jkurl='/enterprise/add_enterprise'
					datas={
						id:that.id,
						title:that.title,
						code:that.code,
						name:that.name,
						idcard:that.idcard,
						
						type:that.array[that.index],
						scale:that.arrayg[that.indexg],
						
						
						price:that.price,
						register_time: that.register_time,
						address:that.address,
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
				return
				uni.showToast({
					title: '保存成功',
					icon: 'none',
				});
				setTimeout(function() {
				wx.navigateBack({
					delta: 1
				})
				}, 1000)
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
		/* width: 319rpx; */
		width: 690rpx;
		height: 80rpx;
background: #FFB017;
		border-radius: 10rpx;
	}
	.vaoc {
		width: 319rpx;
				height: 80rpx;
		
background: #F43B31;
				border-radius: 10rpx;
	}
</style>
