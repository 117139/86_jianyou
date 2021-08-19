<!-- 发布交易商品 -->
<template>

	<view class="content">
		<view class="" v-if="isFu">
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
					<text class="fs10 biao1" style="">{{titles}}</text>
				</view>
				<text class="fb3b31 fs12" @click="back">修改类型</text>
			</view>
			<view class="fbi dis_flex ju_b aic">
				<view class="dis_flex aic fs15">
					<text class="fb3b31">*</text>
					<textarea class="titleText" maxlength="50" placeholder="添加标题" placeholder-class="titleTextClass"
						:style="{'line-height':titleLineNum>1?'':'91upx'}" disable-default-padding
						v-model="title" />
				</view>
				<text class="myC3 fs12"><text class="fb3b31">{{title.length}}</text>/50</text>
			</view>
			<view class="" v-for="(item,index) in shuju.params_arr" :key="index">
				<view class="tix1 dis_flex aic">
					<view class="redLine"></view>
					<view class="redText myC3 fs16 fw500">{{item.category[0]}}</view>
				</view>
				<view class="" v-for="(item1,index1) in item.info" :key="index1">
					<!-- 类型 1、输入框 2、单选 3、多选 4、文本输入 5、时间选择 6、图片上传 7、地址选择 8、单位输入 -->
					<view class="fbi dis_flex ju_b aic" v-if="item1.type == 1">
						<view class="dis_flex aic fs15">
							<text class="fb3b31">* </text>
							<text class="myC3">{{item1.title}}</text>
						</view>
						<view class="dis_flex aic myC3 fs14 fw400 flex_1" style="text-align: end;">
							<input class="flex_1" type="text" v-model="item1.c_value"  placeholder="请输入"/>
						</view>
					</view>
					<picker v-if="item1.type == 2" mode="selector" :range="item1.value.split(',')"
						class=" fs14 fw400" @change="industryChange" :data-item="item1" :data-arr="item1.value.split(',')"
						:data-index1="index1" :data-index="index">
						<view class="fbi dis_flex ju_b aic">
							<view class="dis_flex aic fs15">
								<text class="fb3b31">* </text>
								<text class="myC3">{{item1.title}}</text>
							</view>
							<view>{{item1.c_value?item1.c_value:'请选择'}}
								<text class="iconfont icon-arrow fs14"></text>
							</view>
						</view>
					</picker>
					<!-- v-if="item1.type == 3" -->
					<view class="bgcf fbi3 dis_flex aic" v-if="item1.type == 3">
						<view class="fs15 dis_flex oh1" style="width: 250upx;">
							<text class="fb3b31">* </text>
							<text class="myC3">{{item1.title}}</text>
						</view>
						<!-- {{item1.value}} -->
						<checkbox-group @change="jjxx" :data-index1="index1" :data-index="index" class="dis_flex aic flex_1"
							style="flex-wrap: wrap;padding: 34upx 0;">
							<label class="dis_flex aic" style="margin-top: 10upx; margin-left: 33upx;"
								v-for="(item2,index2) in item1.value.split(',')">
								<checkbox :value="item2" color="#ffffff" class="MyChecked"/>
								<text style="font-size: 26upx;color: #333;margin-left: 7upx;">{{item2}}</text>
							</label>
						</checkbox-group>
						<!-- <view class="" style="margin-right: 60upx;">
							<input type="text" value="" placeholder="$0.00" style="text-align: end;" />
						</view> -->
					</view>
					<!-- </view> -->
					<!-- //文本输入 -->
					<view class="bgcf pl15 pr15" v-if="item1.type == 4">
						<view class="fs15 pt15">
							<text class="fb3b31">* </text>
							<text class="myC3">{{item1.title}}</text>
							<text class="fs12" style="margin-left: 0.5rem;">({{item1.c_value.length}}/500)</text>
						</view>
						<textarea placeholder-class="miao" placeholder="请详细描述商品及特征、费用是否包含变更费用等（必填）" class="fs14 pt10"
							v-model="item1.c_value" maxlength="500" :data-index1="index1"
							 />
					</view>
					<!-- 时间选择 -->
					<picker v-if="item1.type == 5" mode="date"
						class="myC9 fs14 fw400" @change="bindDateChange" :data-index1="index1" :data-index="index">
						<view class="fbi dis_flex ju_b aic">
							<view class="dis_flex aic fs15">
								<text class="fb3b31">* </text>
								<text class="myC3">{{item1.title}}</text>
							</view>
							<view>{{item1.c_value}} <text class="iconfont icon-arrow fs14"></text>
							</view>
						</view>
					</picker>
					<!-- 图片 -->
					<view class="fbi dis_flex_c" style="min-height: 300upx;" v-if="item1.type == 6">
						<view class="dis_flex aic fs15">
							<text class="fb3b31">* </text>
							<text class="myC3 xz_tit">{{item1.title}}</text>
						</view>
						<view class="dis_flex aic fww xz_imgs" style="flex-wrap: wrap; margin-top: 21upx;">
							<view class="position_relative xz_img" v-for="item2,index2 in item1.c_value" v-if="item.length!=0">
								<!-- <text class="iconfont icon-del" @click.stop="imgListDel(index2,index,index1)"></text> -->
								<image class="del_img" src="/static/images/img_del.png" mode="aspectFit" @click.stop="imgListDel(index,index1,index2)"></image>
								<image class="dis_flex imgs" :src="getimg(item2)" mode="aspectFill">
								</image>
							</view>
							
							<view class="position_relative xz_img" v-if="item1.c_value.length<item1.value">
								<image  class="imgs" @click="scpic(index,index1,item1.value,item1.c_value)" :data-index1="index1" :data-index="index" src="/static/images/upimg.png" mode="aspectFill"></image>
							</view>
							
						</view>


						<!-- <view class="dis_flex aic myC3 fs14 fw400" style="text-align: end;">
							<input type="text" v-model="list[index][index1].value" />
							<text class="">万</text>
						</view> -->
					</view>
					<!-- 地址选择 -->
					<wangding-pickerAddress @change="cityChange" v-if="item1.type == 7" :index1="index1"
						:index="index">
						<view class="flex aic ju_b  pb10 pt10 fbi">
							<view class="flex aic">
								<text style="color: #F43B31;">*</text>
								<text class="fs15 pl5">{{item1.title}}</text>
							</view>
							<view class=" ">
								<text class="fs14  c9">{{item1.c_value?item1.c_value:'请选择地址'}}</text>
								<text class="myC9 iconfont icon-arrow fs14"></text>
							</view>
						</view>
					</wangding-pickerAddress>
					
					<!-- 单位输入 -->
					<view class="fbi dis_flex ju_b aic" v-if="item1.type == 8">
						<view class="dis_flex aic fs15">
							<text class="fb3b31">* </text>
							<text class="myC3">{{item1.title}}</text>
						</view>
						<view class="dis_flex aic myC3 fs14 fw400 flex_1" style="text-align: end;">
							<input class="flex_1" type="text" v-model="item1.c_value" placeholder="请输入"/>
							<text class="">{{item1.value}}</text>
						</view>
					</view>


				</view>
				
				
			</view>
			
			
			<!-- <view v-if="typeOt!=3" class="fbi dis_flex ju_b aic"> -->
			<view class="fbi dis_flex ju_b aic">
				<view class="dis_flex aic fs15">
					<text class="fb3b31">* </text>
					<text class="myC3">{{'支付金额'}}</text>
				</view>
				<view class="dis_flex aic myC3 fs14 fw400" style="text-align: end;">
					<input type="number" v-model="xq_price" placeholder="请输入支付金额" />
				</view>
			</view>
			<view v-if="zf_arr_index==1" class="fbi dis_flex ju_b aic">
				<view class="dis_flex aic fs15">
					<text class="fb3b31">* </text>
					<text class="myC3">{{'总价'}}</text>
				</view>
				<view class="dis_flex aic myC3 fs14 fw400" style="text-align: end;">
					<input type="number" v-model="xq_price_all" placeholder="请输入总价" />
				</view>
			</view>
			<picker  v-if="typeOt!=3" mode="selector" :range="zf_arr" range-key="name" :value="zf_arr_index"
				class=" fs14 fw400" @change="industryChange" 
				data-index1="-1" :data-index="-1">
				<view class="fbi dis_flex ju_b aic">
					<view class="dis_flex aic fs15">
						<text class="fb3b31">* </text>
						<text class="myC3">{{'支付方式'}}</text>
					</view>
					<view>
						{{zf_arr_name}}
						<text class="iconfont icon-arrow fs14" style="color: #999;"></text>
					</view>
				</view>
			</picker>
			
			<!-- 详情描述 -->
			<view v-if="typeOt==3" class="bgcf pl15 pr15">
				<view class="fs15 pt15">
					<text class="fb3b31">* </text>
					<text class="myC3">{{'详情描述'}}</text>
					<text class="fs12" style="margin-left: 0.5rem;">({{xq_ms.length}}/500)</text>
				</view>
				<textarea placeholder-class="miao" placeholder="请填写详情描述" class="fs14 pt10"
					v-model="xq_ms" maxlength="500"/>
			</view>
			<!-- <view class="dis_flex flex-right fs12" style="margin-right: 30upx;">
				<text class="myC3">平台担服务费</text><text class="fb3b31">¥0.00</text>
			</view>
			<view class="dis_flex flex-right fs12" style="margin-right: 30upx;margin-bottom: 32upx;">
				<text class="myC3">平台担服务费</text><text class="fb3b31">¥0.00</text>
			</view> -->
			<view class="foot dis_flex ju_b">
				<view class="myradio dis_flex aic ju_c fs10" @click="radios">
					<text class="iconfont icon-dui1" v-if="isQue"></text>
				</view>
				<view class="fs12 fw400">
					<text class="myC3">我承诺在平台上发布的信息真实合法并承担所对应的风险，且同意</text>
					<text class="fb3b31">《平台担保服务说明》</text>
				</view>
			</view>
			<view class="btn_box dis_flex aic ju_c">
				<button type="warn" class="footBtn" @click="fabu">发布</button>
			</view>
		</view>
		<view class="zanwu" v-else>服务器异常</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../components/service.js';
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
				imgList: [],
				arr: [],
				typeId: 0,
				date: '1',
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
				titles: '',
				titleNum: 0,
				remnant: 0,
				zhuNum: '',
				info: [],
				shuju: [],
				list: [],
				city: '',
				myOption: {},
				isFu: true,
				keChuan: false,
				maxCount: 3,
				
				
				
				
				
				xq_price:'',     //保证金
				xq_price_all:'',     //总价
				zf_arr:[
					{
						name:'保证金',
						id:1
					},
					// {
					// 	name:'全款',
					// 	id:2
					// },
				],
				zf_arr_index:0,
				zf_arr_name:'保证金',
				
				typeOt: "",
				fb_type:'',
				xq_ms:'',      //求购详情描述
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this;
			this.myOption = option;
			this.titles = option.title;
			that.fb_type=option.type
			if (option.type == '求购') {
				this.typeOt = 3;
			} else if (option.type == '出售') {
				this.typeOt = 1;
			} else {
				this.typeOt = 2;
			}
			that.typeId=option.typeId
			if (option.typeId && this.typeOt != 3) {
				this.getNowData()
			}


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
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			back() {
				uni.redirectTo({
					url: '/pagesA_lzc/faQiu/faQiu?id='+that.fb_type
				})
			},
			radios() {
				this.isQue = !this.isQue;
			},
			titleLine(e) {
				console.log(e)
				this.titleLineNum = e.detail.lineCount;
			},
			titleInput(e) {
				console.log(e);
				console.log(this.titleText);
				this.titleNum = e.detail.value.length;
			},
			titleInputs(e) {
				this.remnant = e.detail.value.length;
			},
			// 时间选择
			bindDateChange(e) {
				var datas =e.target.dataset
				// this.list[e.target.dataset.index][e.target.dataset.index1].value = e.target.value;
				var  set_data=that.shuju.params_arr[datas.index].info[datas.index1]
				Vue.set(set_data,'c_value',e.target.value)
			},
			// 单选
			industryChange(e) {
				var datas=e.target.dataset
				if(datas.index==-1){
					console.log(e)
					that.zf_arr_index=e.detail.value
					that.zf_arr_name=that.zf_arr[that.zf_arr_index].name
					return
				}
				console.log(datas.item.value)
				var arr=datas.item.value.split(',')
				var  set_data=that.shuju.params_arr[datas.index].info[datas.index1]
				Vue.set(set_data,'c_value',arr[e.detail.value])
				
			},
			taxChange(e) {
				this.fabuForm.tax = this.TaxTypes[e.target.value];
			},
			scpic(index,index1,z_count,x_count) {
			  var that = this
				z_count = z_count - x_count.length
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
							count: z_count,
							sizeType: ['original', 'compressed'],
							sourceType: sourceType,
							success: function(res) {
								console.log(res)
								const tempFilePaths = res.tempFilePaths
								
								
								that.upimg(tempFilePaths, 0,index,index1)
								
							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			 
			},
			upimg(imgs, i,index,index1) {
			  var that = this
			  
				service.wx_upload(imgs[i]).then(res => {
							
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(i)
						var  set_data=that.shuju.params_arr[index].info[index1]
						if(set_data.c_value.length>0){
							set_data.c_value.push(res.data)
						}else{
							set_data.c_value=[]
							set_data.c_value.push(res.data)
						}
						Vue.set(set_data,'c_value',set_data.c_value)
						if (i<imgs.length-1) {
						  i++
						 // setTimeout(function(){
							  that.upimg(imgs, i,index,index1)
						 // },500)
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
			// 删除图片
			imgListDel(index, index1, index2) {
				var  set_data=that.shuju.params_arr[index].info[index1]
				set_data.c_value.splice(index2,1);
				Vue.set(that.shuju.params_arr[index].info[index1],'c_value',set_data.c_value)
				// console.log(this.list[index1][index2].value)
			},
			// 地址选择
			cityChange(data) {
				console.log(data)
				var city = data.data.join('')
				var  set_data=that.shuju.params_arr[data.p_index].info[data.p_index1]
				Vue.set(set_data,'c_value',city)
				console.log(set_data)
				// for (var i = 0; i < this.list.length; i++) {
				// 	if (this.list[i].type == 7) {
				// 		this.list[i].value = this.city;
				// 	}
				// }
			},
			descInput(e) {
				this.remnant = e.detail.value.length
			},
			
			getNowData() {
				service.P_post("transaction_list/sell_show", {
					id: this.myOption.typeId
				}).then((res) => {
					this.isFu = true;
					if (res.code == 1) {
						console.log(res)
						
						this.shuju = res.data;
						
					} else {
						uni.showToast({
							title: res.msg+",请检查",
							icon:"none"
						})
					}


				}).catch((e) => {
					// this.isFu = false;
					uni.showToast({
						title:"服务器异常",
						icon:"none"
					})
				})
			},
			fabu() {
				// this.list[1][2].value = "https://img1.baidu.com/it/u=2947356332,3289073655&fm=15&fmt=auto&gp=0.jpg"
				console.log(this.shuju.params_arr)
				
				if(this.title.length<1){
					uni.showToast({
						icon:'none',
						title:'请填写标题'
					})
					return
				}
				if (this.typeOt != 3) {
					var params_j=this.shuju.params_arr
					let data = [];
					for(var i=0;i<params_j.length;i++){
						for(var j=0;j<params_j[i].info.length;j++){
							console.log(params_j[i].info[j])
							if(params_j[i].info[j].c_value.length==0){
								uni.showToast({
									icon:'none',
									title:'请填写或选择'+params_j[i].info[j].title
								})
								
								return
							}
						}
					}
					
					if(this.xq_price<1){
						uni.showToast({
							icon:'none',
							title:'请填写支付金额'
						})
						return
					}
					if(that.zf_arr_index==1){
						if(this.xq_price_all<1){
							uni.showToast({
								icon:'none',
								title:'请填写总价'
							})
							return
						}
					}
					
					var datas={
						pid: this.shuju.id,
						title: this.title,
						price: that.zf_arr_index==0?that.xq_price:that.xq_price_all,
						pay_status: that.zf_arr[that.zf_arr_index].id,
						pay_price: that.xq_price,
						type: this.typeOt,
						params: JSON.stringify(params_j)
					}
					console.log(datas)
					
					if(!that.isQue){
						uni.showToast({
							icon:'none',
							title:'请先同意平台担保服务说明'
						})
						return
					}
					if(that.btnkg==1){
						return
					}
					that.btnkg=1
					// return
					service.P_post("transaction_list/sell_add", datas).then((res) => {
						console.log(res)
						if (res.code == 1) {
							uni.showToast({
								title: '发布成功',
								icon: 'none',
								success() {
									setTimeout(() => {
										that.btnkg=0
										uni.switchTab({
											url: "/pages/my/my"
										})
									}, 1000)

								}
							})
						}else{
							that.btnkg=0
							uni.showToast({
								title: `${res.msg},请检查`,
								icon:"none"
							})
						}
					})
				} else {
					
					if(this.xq_price<1){
						uni.showToast({
							icon:'none',
							title:'请填写支付金额'
						})
						return
					}
					if(that.zf_arr_index==1){
						if(this.xq_price_all<1){
							uni.showToast({
								icon:'none',
								title:'请填写总价'
							})
							return
						}
					}
					if(this.xq_ms.length<1){
						uni.showToast({
							icon:'none',
							title:'请填写详情描述'
						})
						return
					}
					
					if(!that.isQue){
						uni.showToast({
							icon:'none',
							title:'请先同意平台担保服务说明'
						})
						return
					}
					
					if(that.btnkg==1){
						return
					}
					that.btnkg=1
					service.P_post("transaction_list/sell_add", {
						pid: this.typeId,
						title: this.title,
						price: that.zf_arr_index==0?that.xq_price:that.xq_price_all,
						pay_status: that.zf_arr[that.zf_arr_index].id,
						pay_price: that.xq_price,
						type: this.typeOt,
						content:that.xq_ms
					}).then((res) => {
						if (res.code == 1) {
							uni.showToast({
								title: '发布成功',
								icon: 'none',
								success() {
									setTimeout(() => {
										that.btnkg=0
										uni.switchTab({
											url: "/pages/my/my"
										})
									}, 2000)

								}
							})
						}else{
							that.btnkg=0
							uni.showToast({
								title: `${res.msg},请检查`,
								icon:"none"
							})
						}
					}).catch(e=>{
						that.btnkg=0
						uni.showToast({
							title:"服务器异常",
							icon:"none"
						})
					})

				}
			},
			jjxx(e) {
				console.log(e)
				var datas= e.currentTarget.dataset
				// var index = datas.index;
				// var index1 = datas.index1;
				// console.log(e.detail.value)
				// return
				// this.list[index][index1].value = e.detail.value.join(",");
				var  set_data=that.shuju.params_arr[datas.index].info[datas.index1]
				Vue.set(set_data,'c_value',e.detail.value)
			},
			
			
			

		}
	}
</script>

<style scoped>
	/* .MyChecked {
		width: 22upx;
		height: 22upx;
		border-radius: 4upx;
		background-color: #eee;
		position: relative;
	} */

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
		padding-bottom: 20upx;
	}

	.fbi {
		width: 690upx;
		min-height: 92upx;
		background-color: #fff;
		box-sizing: border-box;
		/* margin: 0 30upx; */
		margin: 0 auto;
		border-bottom: 1px solid #eee;
	}

	.fbi3 {
		width: 690upx;
		background-color: #fff;
		box-sizing: border-box;
		margin: 0 auto;
		/* padding: 0 30upx; */
		border-bottom: 1px solid #eee;
	}

	.fbi2 {
		width: 690upx;
		height: 288upx;
		background-color: #fff;
		box-sizing: border-box;
		/* margin: 0 30upx; */
		margin: 0 auto;
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
		margin: 0 auto;
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
		width: 100%;
		height: 116upx;
		background-color: #f8f8f8;
		padding: 30upx;
	}

	.footBtn {
		width: 690upx;
		/* margin: 0 30upx; */
		margin: 0 auto;
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

	/* /deep/uni-checkbox-group{ width: 100% !important; } */
	/* /deep/uni-checkbox-group uni-label{ width: 33% !important; display: inline-flex; margin-bottom: 20rpx; } */
	
	/*checkbox 选项框大小  */
	/deep/uni-checkbox .uni-checkbox-input{
		width: 22rpx !important;
		height: 22rpx !important;
	}
	
	/*checkbox选中后样式  */
	/deep/uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
		background: #F43B31;
		border-color:#F43B31;
	}
	
	/*checkbox选中后图标样式  */
	/deep/uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked::before{
	    width: 15rpx;
	    height: 15rpx;  
		/* line-height: 20rpx;
		text-align: center; */
		font-size: 18rpx;
		color: #fff;
		background: transparent;
		transform: translate(-70%, -50%) scale(1);
		-webkit-transform: translate(-70%, -50%) scale(1);
	}


	.xz_img {
		width: 216upx;
		height: 216upx;
		padding: 5upx;
	}
	.imgs{
		width: 100%;
		height: 100%;
	}
	.position_relative {
		width: 216upx;
		height: 216upx;
		min-width: 216upx;
		position: relative;
	}

	

	.my15 {
		margin-right: 20upx;
	}

	.icon-del {
		position: absolute;
		right: 10upx;
		z-index: 9999;
		top: 12upx;
	}
	
	
	
	
	input{
		font-size: 28upx;
	}
	
	
	.btn_box{
		background-color: #f8f8f8;
		/* padding-bottom: 20px; */
	}
	.xz_tit{
		height: 80upx;
		line-height: 80upx;
	}
	.xz_imgs{
		padding-bottom: 10upx
	}
	.del_img{
		position: absolute;
		top: -5upx;
		right: -5upx;
		z-index: 900;
		width: 30upx;
		height: 30upx;
	}
</style>
