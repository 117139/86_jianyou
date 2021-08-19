<template>

	<view class="content">
		<view class="pl15 pr15 bgcf">
			<image src="/static/images/ma/shenf_03.png" mode="aspectFill" class="jindu"></image>
			<!-- <view class="flex aic ju_b b-b-1 pb10 pt10">
				<view class="flex aic">
					<text style="color: #F43B31;">*</text>
					<text class="fs15 pl5">姓名</text>
				</view>
				<view class="">
					<input type="text" placeholder="请输入您的姓名" v-model="xinngm" class="fs14 cd text-right" />
				</view>
			</view> -->
			<view class="flex aic ju_b pb12 pt12">
				<view class="flex aic">
					<text style="color: #F43B31;">*</text>
					<text class="fs15 pl5">性别</text>
				</view>
				<view class="">
					<picker @change="bindPickerChange" :range="array">
						<!-- <input type="text" placeholder="请选择" v-model="array[index]" class="inpuus mt12 fs15  pl8" /> -->
						<label class="fs14 c9  ">{{array[index]}}</label>
						<text class=" icon-arrow iconfont fs11 c9 pl5"></text>
						</image>
					</picker>
				</view>
			</view>
		</view>
		<view class="bgcf pl15 pr15 mt10">
			<view class="flex aic ju_b b-b-1 pb10 pt10">
				<view class="flex aic">
					<text style="color: #F43B31;">*</text>
					<text class="fs15 pl5">开业时间</text>
				</view>
				<view class="flex aic ">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<text class="uni-input fs14 c9">{{date?date:'请选择'}}</text>
						<text class=" icon-arrow iconfont fs11 c9 pl5"></text>
					</picker>
					</image>
				</view>
			</view>
			<wangding-pickerAddress class="  " @change="change">
				<view class="flex aic ju_b  pb10 pt10">
					<view class="flex aic">
						<text style="color: #F43B31;">*</text>
						<text class="fs15 pl5">经营地区</text>
					</view>
					<view class=" ">
						<text class="fs14  c9">{{city?city:'请选择'}}</text>
						<text class=" icon-arrow iconfont fs11 c9 pl5"></text>
						</image>
					</view>
				</view>
			</wangding-pickerAddress>
		</view>

		<view class="bgcf pl15 pr15 mt10">
			<view class="fs15 pt15">
				个人简介
			</view>
			<textarea value="" v-model="jian" placeholder="请输入您的个人简介…" class="fs14 pt10" />
		</view>
		<view class="funxai flex aic ju_c cf ml15 fs15" @click='endClick'>
			下一步
		</view>
	</view>
</template>

<script>
	import api from '../../components/service.js';
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
				xinngm: '',
				array: ['男', '女'],
				index: 0,
				city: '',
				date: '',
				jian: ''
			}
		},

		onHide() {

		},
		onLoad() {
			that = this
			
			that.index=that.userinfo.sex=='女'?1:0
			that.city=that.userinfo.address
			that.date=that.userinfo.start_time
			that.jian=that.userinfo.content
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
			getimg(img) {
				return api.getimg(img)
			},
			jump(e) {
				return api.jump(e)
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
				that.jg = this.array[this.index]
				console.log(that.jg)
			},
			change(data) {

				this.city = data.data.join('')
				console.log(data.data.join(''))
				console.log(this.city);
			},
			bindDateChange: function(e) {
				this.date = e.target.value
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
			endClick() {
			
				if (!this.date) {
					uni.showToast({
						title: '请正确填写开业时间',
						icon: 'none'
					})
					return
				}
				
				
				if (!this.city) {
					uni.showToast({
						title: '请正确填写经营地区',
						icon: 'none'
					})				}
				
				let item = {
					sex: this.array[this.index],
					start_time: this.date,
					address: this.city,
					content: this.jian
				}
				uni.setStorageSync('rz_data1',item)
				uni.redirectTo({
					url: '/pagesB_mxx/shenjinen/shenjinen',
						
				})
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
		width: 690rpx;
		height: 72rpx;
		background: #F43B31;
		border-radius: 36rpx;
		margin-top: 120rpx;
	}
</style>
