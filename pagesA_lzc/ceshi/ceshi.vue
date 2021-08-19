<!-- 发布交易商品 -->
				<!-- 类型 1、输入框 2、单选 3、多选 4、文本输入 5、时间选择 6、图片上传 7、地址选择 8、单位输入 -->
<template>

	<!-- <view class="content">
		<topbar text_color="#000" bg_color="#fff">
			<text class="iconfont icon-back-line" @click="back"></text>
			<text>发布</text>
			<text @click="back">取消</text>
		</topbar>
		<view class="fbhr"></view>
		<view class="fbi dis_flex ju_b aic">
			<view class="dis_flex aic fs15">
				<text class="fb3b31">* </text>
				<text class="myC3">请完善商品信息</text>
				<text class="fs10 biao1" style="">{{shuju.title}}</text>
			</view>
			<text class="fb3b31 fs12" @click="back">修改类型</text>
		</view>
		<view class="fbi dis_flex ju_b aic">
			<view class="dis_flex aic fs15">
				<text class="fb3b31">*</text>
				<textarea class="titleText" maxlength="50" placeholder="添加标题" placeholder-class="titleTextClass"
					:style="{'line-height':titleLineNum>1?'':'91upx'}" disable-default-padding @linechange="titleLine"
					@input="titleInput" v-model="title" />
			</view>
			<text class="myC3 fs12"><text class="fb3b31">{{titleNum}}</text>/50</text>
		</view>
		<view class="" v-for="(item,index) in shuju.params_arr" :key="index">
			<view class="tix1 dis_flex aic">
				<view class="redLine"></view>
				<view class="redText myC3 fs16 fw500">{{item.category[0]}}</view>
			</view>
			<view class="" v-for="(item1,index1) in item.info" :key="index1">
				<picker v-if="item1.type == 2" mode="selector" :range="item1.value.split(',')" class="myC9 fs14 fw400"
					@change="industryChange" :data-arr="item1.value.split(',')" :data-index1="index1" :data-index="index">
					<view class="fbi dis_flex ju_b aic">
						<view class="dis_flex aic fs15">
							<text class="fb3b31">* </text>
							<text class="myC3">{{item1.title}}</text>
						</view>
						<view>{{list[index][index1].value}}
							<text class="iconfont icon-arrow fs14" v-if="fabuForm.myDate=='请选择'"></text>
						</view>
					</view>
				</picker>
				</view>
				<view class="bgcf pl15 pr15" v-if="item1.type == 4">
					<view class="fs15 pt15">
						<text class="fb3b31">* </text>
						<text class="myC3">{{item1.title}}</text>
						<text class="fs12" style="margin-left: 0.5rem;">({{remnant}}/500)</text>
					</view>
					<textarea placeholder-class="miao" placeholder="请详细描述商品及特征、费用是否包含变更费用等（必填）" class="fs14 pt10"
					v-model="list[index][index1].value" maxlength="500" :data-index1="index1" :data-index="index"/>
				</view>
				<picker v-if="item1.type == 5" mode="date" :value="fabuForm.myDate" :range="array"
					class="myC9 fs14 fw400" @change="bindDateChange" :data-index1="index1" :data-index="index" >
					<view class="fbi dis_flex ju_b aic">
						<view class="dis_flex aic fs15">
							<text class="fb3b31">* </text>
							<text class="myC3">{{item1.title}}</text>
						</view>
						<view>{{list[index][index1].value}} <text class="iconfont icon-arrow fs14"
								v-if="fabuForm.myDate=='请选择'"></text>
						</view>
					</view>
				</picker>
				<wangding-pickerAddress @change="cityChange" v-if="item1.type == 7" :index1="index1" :index2="index">
					<view class="flex aic ju_b  pb10 pt10 fbi">
						<view class="flex aic">
							<text style="color: #F43B31;">*</text>
							<text class="fs15 pl5">{{item1.title}}</text>
						</view>
						<view class=" ">
							<text class="fs14  c9">{{city}}</text>
							<text class="myC9 iconfont icon-arrow fs14" v-if="fabuForm.city=='请选择'"></text>
							</image>
						</view>
					</view>
				</wangding-pickerAddress>
				<view class="fbi dis_flex ju_b aic" v-if="item1.type == 8">
					<view class="dis_flex aic fs15">
						<text class="fb3b31">* </text>
						<text class="myC3">{{item1.title}}</text>
					</view>
					<view class="dis_flex aic myC3 fs14 fw400" style="text-align: end;">
						<input type="text" v-model="list[index][index1].text" />
						<text class="">万</text>
					</view>
				</view>


			</view>



		<view class="dis_flex flex-right fs12" style="margin-right: 30upx;">
			<text class="myC3">平台担服务费</text><text class="fb3b31">¥0.00</text>
		</view>
		<view class="dis_flex flex-right fs12" style="margin-right: 30upx;margin-bottom: 32upx;">
			<text class="myC3">平台担服务费</text><text class="fb3b31">¥0.00</text>
		</view>
		<view class="foot dis_flex ju_b">
			<view class="myradio dis_flex aic ju_c fs10" @click="radios">
				<text class="iconfont icon-dui1" v-if="isQue"></text>
			</view>
			<view class="fs12 fw400">
				<text class="myC3">我承诺在平台上发布的信息真实合法并承担所对应的风险，且同意</text>
				<text class="fb3b31">《平台担保服务说明》</text>
			</view>
		</view>
		<button type="warn" class="footBtn" @click="fabu">发布</button>
	</view> -->
</template>

<script>
	import api from '../../components/service.js';
	import topbar from '@/components/top_bar/top_bar.vue'
	import wan from '@/components/wangding-pickerAddress/data.js'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				arr:[],
				typeId: 0,
				date: '1',
				array: ['中国', '美国', '巴西', '日本'],
				imageValue: [],
				value: [0, 0, 0],
				isQue: true,
				titleLineNum: 1,
				industryType: ['金融', '餐饮'],
				TaxTypes: ['一般纳税人'],
				fabuForm: {
					tax: '请选择',
					city: '请选择',
					myDate: '请选择',
					industry: '请选择',
				},
				desc: '',
				title: '',
				titleNum: 0,
				remnant: 0,
				zhuNum: '',
				info: [],
				shuju: [],
				list:[],
				city:''
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this;
			console.log(option)
			if (option.type == '求购') {
				this.typeId = 3;
			}
			if (option.type == '出售') {
				this.typeId = 2;
			}
			// if (option.type && this.typeId != 3) {
			// 	api.P_post("transaction_list/sell_show",{id:option.typeId},{token:uni.getStorageSync('token')}).then((res) =>{
			// 		let arr = [];
			// 		let arr1 = [];
			// 		let list = [];
			// 		if(res.code == 1){
			// 			console.log(1111111111111111)
			// 			this.shuju = res.data;
			// 			this.info = res.data.title;
			// 			for (var i = 0; i < this.shuju.params_arr.length; i++) {
			// 				let xx = [];
			// 				list.push(xx)
			// 				for (var j = 0; j < this.shuju.params_arr[i].info.length; j++) {
			// 					let x1 = {
			// 						title:this.shuju.params_arr[i].info[j].title,
			// 						type:this.shuju.params_arr[i].info[j].type,
			// 						value:''
			// 						};
			// 					list[i].push(x1);
			// 					if(this.shuju.params_arr[i].info[j].type == 2){
			// 						arr.push(this.shuju.params_arr[i].info[j].value)
									
			// 					}
			// 				}
			// 			}
			// 		}
					
			// 	})
			// }
			// if(option.typeId){
			// 	uni.request({
			// 		url: api.IPurl + 'transaction_list/sell_show',
			// 		method: 'POST',
			// 		data: {
			// 			id: option.typeId
			// 		},
			// 		header: {
			// 			token: uni.getStorageSync('token')
			// 		},
			// 		success: (res) => {
			// 			let arr = [];
			// 			let arr1 = [];
			// 			let list = [];
			// 			this.shuju = res.data.data;
			// 			this.info = res.data.data.params_arr[0].info;
			// 			for (var i = 0; i < this.shuju.params_arr.length; i++) {
			// 				let xx = [];
			// 				list.push(xx)
			// 				for (var j = 0; j < this.shuju.params_arr[i].info.length; j++) {
			// 					// let x1 = {text:'',type:this.shuju.params_arr[i].info[j].type};
			// 					let x1 = {
			// 						title:this.shuju.params_arr[i].info[j].title,
			// 						type:this.shuju.params_arr[i].info[j].type,
			// 						value:''
			// 						};
			// 					list[i].push(x1);
			// 					if(this.shuju.params_arr[i].info[j].type == 2){
			// 						arr.push(this.shuju.params_arr[i].info[j].value)
									
			// 					}
			// 				}
			// 			}
			// 			for (var i = 0; i < arr.length; i++) {
			// 				arr1.push(arr[i].split(','))
			// 			}
			// 			// console.log(arr1)
			// 			this.arr = arr1;
			// 			console.log(list)
			// 			this.list = list;
			// 		}
			// 	})
			// }
			

		},
		onReady() {

		},
		onShow() {
			
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		// methods: {
		// 	...mapMutations(['logout', 'login']),
		// 	getimg(img) {
		// 		return api.getimg(img)
		// 	},
		// 	jump(e) {
		// 		return api.jump(e)
		// 	},
		// 	// 获取上传状态
		// 	select(e) {
		// 		console.log('选择文件：', e)
		// 	},
		// 	// 获取上传进度
		// 	progress(e) {
		// 		console.log('上传进度：', e)
		// 	},

		// 	// 上传成功
		// 	success(e) {
		// 		console.log('上传成功')
		// 	},

		// 	// 上传失败
		// 	fail(e) {
		// 		console.log('上传失败：', e)
		// 	},
		// 	back() {
		// 		uni.navigateTo({
		// 			url: '/pagesA_lzc/faQiu/faQiu'
		// 		})
		// 	},
		// 	radios() {
		// 		this.isQue = !this.isQue;
		// 	},
		// 	titleLine(e) {
		// 		console.log(e)
		// 		this.titleLineNum = e.detail.lineCount;
		// 	},
		// 	titleInput(e) {
		// 		console.log(e);
		// 		console.log(this.titleText);
		// 	},
		// 	bindDateChange(e) {
		// 		this.list[e.target.dataset.index][e.target.dataset.index1].value = e.target.value;
		// 	},
		// 	industryChange(e) {
		// 		console.log(e)
		// 		// console.log(uni.createSelectorQuery('#index0').range)
		// 		this.fabuForm.industry = e.target.dataset.arr[e.detail.value];
		// 		console.log(e.target.dataset.index)
		// 		console.log(e.target.dataset.index1)
		// 		this.list[e.target.dataset.index][e.target.dataset.index1].value = e.target.dataset.arr[e.detail.value];
		// 		console.log(this.list)
		// 	},
		// 	taxChange(e) {
		// 		this.fabuForm.tax = this.TaxTypes[e.target.value];
		// 	},
		// 	cityChange(data) {
		// 		console.log(data)
		// 		this.city = data.data.join('')
		// 		for (var i = 0; i < this.list.length; i++) {
		// 			if(this.list[i].type == 7){
		// 				this.list[i].value = this.city;
		// 			}
		// 		}
		// 		// console.log(this.city);
		// 		// this.fabuForm.city = this.array[e.target.value];
		// 	},
		// 	descInput(e) {
		// 		this.remnant = e.detail.value.length
		// 	},
		// 	titleInput(e) {
		// 		this.titleNum = e.detail.value.length;
		// 	},
		// 	fabu() {
		// 		console.log(this.list)
		// 		console.log(this.shuju.params_arr[0].category[0])
		// 		let data = [];
		// 		for (var i = 0; i < this.list.length; i++) {
		// 			let arr = {};
		// 			arr.category = this.shuju.params_arr[i].category[0];
		// 			arr.info = this.list[i]
		// 			data.push(arr)
		// 		}
		// 		console.log(data)
		// 		uni.request({
		// 			url:api.IPurl+'transaction_list/sell_add',
		// 			method:'POST',
		// 			header:{token:uni.getStorageSync('token')},
		// 			data:{
		// 				pid:this.shuju.id,
		// 				title:'测试',
		// 				price:'1000',
		// 				pay_status:1,
		// 				pay_price:1000,
		// 				type:1,
		// 				params:data
		// 			},
		// 			success: (res) => {
		// 				console.log(res)
		// 			}
		// 		})
		// 	}

		// }
	}
</script>

<style scoped>
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
		margin: 0;
		padding: 0;
	}

	.fbi {
		width: 690upx;
		height: 92upx;
		background-color: #fff;
		box-sizing: border-box;
		margin: 0 30upx;
		border-bottom: 1px solid #eee;
	}

	.fbi2 {
		width: 690upx;
		height: 288upx;
		background-color: #fff;
		box-sizing: border-box;
		margin: 0 30upx;
		border-bottom: 1px solid #eee;
	}

	.bgcf uni-textarea {
		height: 228upx;
		border-bottom: 1px solid #eee;
		padding-bottom: 15upx;
		box-sizing: border-box;
	}

	.fb3b31 {
		color: #fb3b31;
	}

	.myC3 {
		color: #333;
	}

	.myC9 {
		color: #999;
	}

	.biao1 {
		padding: 7upx;
		background-color: #B7D0F8;
		border-radius: 4upx;
		margin-left: 27upx;
		color: #fff;
	}

	.fbhr {
		width: 750upx;
		height: 20upx;
		background-color: #f8f8f8;
	}

	.tix1 {
		width: 750upx;
		height: 91upx;
		background-color: #f8f8f8;
		padding-left: 30upx;
	}

	.redLine {
		width: 6upx;
		height: 31upx;
		background-color: #F43B31;
	}

	.redText {
		margin-left: 10upx;
	}

	.miao {
		width: 100%;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 36upx;
	}

	.titleText {
		width: 600upx;
		height: 91upx;
		word-break: break-all;
		font-size: 30upx;
	}

	/deep/.titleTextClass {
		display: flex;
		align-items: center;
		color: #333;
		font-size: 30upx;
	}

	.uoloadText {
		width: 750upx;
		height: 90upx;
		padding-left: 30upx;
	}

	.foot {
		width: 750upx;
		height: 116upx;
		background-color: #f8f8f8;
		padding: 30upx;
	}

	.footBtn {
		width: 690upx;
		margin: 0 30upx;
		border-radius: 10upx;
		margin-bottom: 53upx;
	}

	.myradio {
		min-width: 24upx;
		width: 24upx;
		height: 24upx;
		border: 2upx solid #999;
		border-radius: 50%;
		margin-right: 5upx;
		margin-top: 10upx;
	}

	.icon-dui1 {
		font-size: 24upx;
		color: #F43B31;
	}

	/deep/uni-textarea {
		width: 100%;
	}

	/deep/.icon-del-box {
		background-color: rgba(255, 255, 255, 0.5);
	}

	/deep/.uni-radio-input {
		border: 2px solid #999999 !important;
	}

	/deep/.uni-file-picker__header {
		margin-left: 30upx !important;
	}

	/deep/.file-picker__box {
		margin-left: 30upx !important;
	}

	/* 	/deep/.uni-file-picker__container{
		margin: 0 30upx;
	}

	/deep/.uni-picker-container .uni-picker-header {
		background-color: #d71f1f;
	} */
</style>
