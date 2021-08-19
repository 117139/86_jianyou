<template>

	<view class="content pt10"> 
		<view class="flex aic bgcf pl15 pr15 pt10 pb5">
			<text class="fs13 fwb">服务质量</text>
			<view :class="{starActive:item} " @click="choise(index)" class="flex-item flex aic pl15 "
				v-for="(item,index) in clicked_list">

				<view class="flex aic">
					<view v-if="item" class=" icon-Starmarker iconfont fs22">
					</view>
					<view v-else class=" icon-Starmarker iconfont fs22 ce">

					</view>
				</view>
			</view>
			

		</view>
		<view class="flex aic bgcf pl15 pr15 pt10 pb5">
			<text class="fs13 fwb">服务效率</text>
			<view :class="{starActive:item} " @click="choisex(index)" class="flex-item flex aic pl15 "
				v-for="(item,index) in clicked_listx">
		
				<view class="flex aic">
					<view v-if="item" class=" icon-Starmarker iconfont fs22">
					</view>
					<view v-else class=" icon-Starmarker iconfont fs22 ce">
		
					</view>
				</view>
			</view>
			
		
		</view>
		<view class="flex aic bgcf pl15 pr15 pt10 pb5">
			<text class="fs13 fwb">专业程度</text>
			<view :class="{starActive:item} " @click="choisez(index)" class="flex-item flex aic pl15 "
				v-for="(item,index) in clicked_listz">
		
				<view class="flex aic">
					<view v-if="item" class=" icon-Starmarker iconfont fs22">
					</view>
					<view v-else class=" icon-Starmarker iconfont fs22 ce">
		
					</view>
				</view>
			</view>
			
		
		</view>
		<view class="flex aic bgcf pl15 pr15 pt10 pb5">
			<text class="fs13 fwb">服务承诺</text>
			<view :class="{starActive:item} " @click="choisec(index)" class="flex-item flex aic pl15 "
				v-for="(item,index) in clicked_listc">
		
				<view class="flex aic">
					<view v-if="item" class=" icon-Starmarker iconfont fs22">
					</view>
					<view v-else class=" icon-Starmarker iconfont fs22 ce">
		
					</view>
				</view>
			</view>
			
		
		</view>
		<view class="flex aic bgcf pl15 pr15 pt10 pb5">
			<text class="fs13 fwb">服务态度</text>
			<view :class="{starActive:item} " @click="choiset(index)" class="flex-item flex aic pl15 "
				v-for="(item,index) in clicked_listt">
		
				<view class="flex aic">
					<view v-if="item" class=" icon-Starmarker iconfont fs22">
					</view>
					<view v-else class=" icon-Starmarker iconfont fs22 ce">
		
					</view>
				</view>
			</view>
			
		
		</view>
		<view class="p15 mt10 bgcf">
			<textarea @input="descInput" v-model="desc" placeholder="请输入您要评价的内容……" maxlength="200" placeholder-class="fs14  gaodu cd">
			</textarea>
			<view class="num  flex flex-right fs14"><text class="" style="color: #ccc;">{{remnant}}</text>/200
			</view>
		</view>
		<view class="qing flex aic ju_c cf ml15 mt25" @click="pingjia">
			评价
		</view>
	</view>
</template>

<script>
	import api from '../../components/service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				remnant:0,
				desc:'',
				clicked_list: [false, false, false, false, false] ,//对应星星个数
				clicked_listx: [false, false, false, false, false] ,//对应星星个数
				clicked_listc: [false, false, false, false, false] ,//对应星星个数
				clicked_listz: [false, false, false, false, false] ,//对应星星个数
				clicked_listt: [false, false, false, false, false] ,//对应星星个数
				
			}
		},
		onHide() {

		},
		onLoad() {
			that = this
		},
		onShow() {

		},

		computed: {
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
			fanhui() {
				wx.navigateBack({
					delta: 1
				})
			},
		pingjia() {
			uni.showToast({
				title: '评价成功',
				icon: 'none',
			});
			setTimeout(function() {
				wx.navigateBack({
					delta: 1
				})
			}, 1000)
		
		},
			//点击选择
			choise(num) {
				// num 为点击的星星在数组中的下标
				this.clicked_list = [false, false, false, false, false];
				num = num + 1;
				for (let i = 0; i < num; i++) {
					this.clicked_list[i] = true;
				}
				//将分数传给父组件
				this.$emit('getScore', num)
			},
			choisex(num) {
				// num 为点击的星星在数组中的下标
				this.clicked_listx = [false, false, false, false, false];
				num = num + 1;
				for (let i = 0; i < num; i++) {
					this.clicked_listx[i] = true;
				}
				//将分数传给父组件
				this.$emit('getScore', num)
			},
			choisez(num) {
				// num 为点击的星星在数组中的下标
				this.clicked_listz = [false, false, false, false, false];
				num = num + 1;
				for (let i = 0; i < num; i++) {
					this.clicked_listz[i] = true;
				}
				//将分数传给父组件
				this.$emit('getScore', num)
			},
			choisec(num) {
				// num 为点击的星星在数组中的下标
				this.clicked_listc = [false, false, false, false, false];
				num = num + 1;
				for (let i = 0; i < num; i++) {
					this.clicked_listc[i] = true;
				}
				//将分数传给父组件
				this.$emit('getScore', num)
			},
			choiset(num) {
				// num 为点击的星星在数组中的下标
				this.clicked_listt = [false, false, false, false, false];
				num = num + 1;
				for (let i = 0; i < num; i++) {
					this.clicked_listt[i] = true;
				}
				//将分数传给父组件
				this.$emit('getScore', num)
			},
			descInput(e) {
				this.remnant = e.detail.value.length
			},
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

	.starActive {
		color: #FFAB0A;
	}
	uni-textarea {
		height: 210rpx !important;
	}
	.gaodu {
		color: #DDDDDD;
	}
	.qing {
		width: 690rpx;
		height: 72rpx;
		background: #F43B31;
		border-radius: 10rpx;
	}
</style>
