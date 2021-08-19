<!-- 发送招标需求 -->
<template>
	<view class="content">
		<topbar :bg_color="'linear-gradient(to bottom, #F43B31,#F43B31)'" :have_top="true">
			<text style="font-size: 36upx;color: #fff;"  @click="back" class="iconfont icon-back-line"></text>
			<text style="font-size: 32upx;color: #fff;">发布招标需求</text>
			<text style="font-size: 36upx;opacity: 0;"   class="iconfont icon-back-line"></text>
		</topbar>
		<!-- 添加类型 -->
		<uni-popup class="addTypeList" ref="addType" type="bottom">
			<view class="" style="height:60vh;background-color: #fff; position: relative;" v-show="isOne">
				<scroll-view scroll-y="true" style="height:45vh;">
					<view class="">
						<view class="fs16 dis_flex flex-right" style="padding: 30upx; " @click="typeDel">
							<text class="iconfont icon-del"></text>
						</view>
						<view class="dis_flex fs12" style="padding: 0 30upx;flex-wrap: wrap;">
							<view class="dis_flex aic ju_c" style="width: 30%;height: 75upx; margin: 0 10upx 10upx 0;"
								v-for="(item1,index1) in typeOneList" :key="index1" @click.stop="typeSclick1(item1,index1)"
								:class="{'typeAct':fb_index==index1,'typeAct1':fb_index!=index1}">
								{{item1.title}}
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="" style="width: 690upx;height: 95upx;"></view>
				<view class=" dis_flex aic ju_a typeBtn" style="">
					<view class="typeBtn2 dis_flex aic ju_c" @click="typeOneClick">确定</view>
				</view>
			</view>
			<view class="" style="height:60vh;background-color: #fff; position: relative;" v-show="isTwo">
				<scroll-view scroll-y="true" style="height:50vh;"  v-if="typeOneList.length>0&&typeOneList[fb_index]">
					<view class="" v-for="(item,index) in typeOneList[fb_index].child" :key="index">
						<view class="fs16 dis_flex aic" style="padding: 30upx; margin-bottom: 40upx;">
							<text
								style="display: inline-block; width: 10upx; height: 44upx; background-color: #F43B31; margin-right: 20upx;"></text>
							<text>{{item.title}}</text>
							<!-- <text style="margin-left: 4upx;margin-top: 8upx;" class="iconfont icon-xiala"></text> -->
						</view>
						<view class="dis_flex fs12" style="padding: 0 30upx;flex-wrap: wrap;">
							<view class="dis_flex aic ju_c"
								style="border-radius: 14upx;padding: 15upx 15upx; margin: 20upx 20upx;"
								v-for="(item1,index1) in item.child" :key="index1" @click.stop="typeSclick(index,index1)"
								:class="{'typeAct':fb_index1==index&&fb_index2==index1,'typeAct1':fb_index1!=index||fb_index2!=index1}">
								{{item1.title}}
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="" style="width: 690upx;height: 95upx;"></view>
				<view class=" dis_flex aic ju_a typeBtn" style="">
					<view class="typeBtn1 dis_flex aic ju_c" @click="typeListBack">返回</view>
					<view class="typeBtn2 dis_flex aic ju_c" @click="typeListClick">确定</view>
				</view>
			</view>
		</uni-popup>
		<!-- 注册企业名称 -->
		<uni-popup ref="popup" type="bottom" class="gbtn">
			<view class="" style="width: 100%;height: 100%;background-color: #fff;">
				<view class="dis_flex aic ju_c gbtn_title" style="">
					<text>注册企业名称的全称</text>
				</view>
				<view class="" style="width: 690upx; height: 240upx;">
					<textarea style="margin:0 15upx;" cursor-spacing=200 value="" v-model="gonText" placeholder="例如:南昌新意传媒有限公司"/>
				</view>
				<view class="gbtn_foot dis_flex ju_b">
					<button class="btnright" @click.stop="gbtnClick">确定</button>
				</view>
			</view>
		</uni-popup>
		<!-- 经营范围 -->
		<uni-popup ref="fang" type="bottom" class="gbtn" style="background-color: rgba(255,255,255,1);">
			<view class="dis_flex aic ju_c gbtn_title" style="">
				<text>经营范围</text>
			</view>
			<view class="" style="width: 750upx; height: 240upx;">
				<textarea cursor-spacing=200 v-model="fangText"
					placeholder="例如:销售工艺品、陶瓷制品、皮革制品、塑料制品、针纺织品、服装服饰、床上用品、家具、卫生洁具" />
			</view>
			<view class="gbtn_foot dis_flex ju_b">
				<!-- <button  class="btnLeft">取消</button> -->
				<button class="btnright" @click.stop="fangClick">确定</button>
			</view>
		</uni-popup>
		<view class="st_header">
			<image :src="getimg('/static_s/images/lzc/SendTender/bg1.png')" mode="scaleToFill"></image>
			<view class="st_header_fl dis_flex aic ju_c">
				<text>{{shuju.p_title}}</text>
			</view>
			<view class="st_header_sl dis_flex ju_b aic">
				<view class="st_header_sl_item dis_flex_c aic ju_c flex_1" style="min-width: 7rem;">
					<text>①</text>
					<text>描述所需的服务</text>
				</view>
				<view class="st_header_sl_item dis_flex_c aic ju_c flex_1" style="min-width: 4rem;">
					<text>②</text>
					<text>确认需求</text>
				</view>
				<view class="st_header_sl_item dis_flex_c aic ju_c flex_1" style="min-width: 4rem;">
					<text>③</text>
					<text>坐等报价</text>
				</view>
			</view>
		</view>
		<!-- 温馨提示 -->
		<view class="st_body_fl">
			<text class="iconfont icon-jinggao"></text>
			<text>温馨提示：您填写的所有资料平台都会做加密处理，信息绝对安全，只有在交易促成的情况下我们才会根据情况逐步显示您的必要信息，请您放心填写，有任何疑问都可以咨询我们的客服。</text>
		</view>
		<view @click.stop="clearList" style="text-align: end;padding: 10upx 30upx;color: #F43B31;"
			:style="{'border-bottom':typess.length>0?'1px solid #eee':''}">删除</view>
		<!-- 需求分类 -->
		<view class="st_body_sl">
			<view class="st_body_slfl dis_flex_c">
				<view class="dis_flex ju_b aic"
					style="width: 750upx; margin-left: -30upx; padding-left: 30upx; box-sizing: border-box;padding-bottom: 20upx;padding-top: 20upx; border-bottom: 1px solid #eee;"
					@click.stop="zhankaiType(0)" v-if="typess.length>0">
					<view class="">
						<text>{{shuju.title}}</text>
						<!-- <text class="iconfont icon-xiala" v-if="typess[0].active==true"></text> -->
						<!-- <text class="iconfont icon-shangla" v-if="typess[0].active==false"></text> -->
						<text class="iconfont icon-xiala" v-show="isZhang"></text>
						<text class="iconfont icon-shangla" v-show="isZhang1"></text>
					</view>
					<!-- <text class="iconfont icon-icon--" style="padding-right: 20upx;"></text> -->
				</view>
				<view class="" style="width: 690upx;background-color: #FFFFFF;">
					<view class="st_body_slsl dis_flex_c ju_c"
						v-if="typess.length>0&&typess[0].text == '公司注册'&&typess[0].active == true">
						<view class="pro_fl bs dis_flex aic" style="">
							<view class="redGan"></view>
							<view class="redText">验收标准</view>
						</view>
						<view class="st_slsl_text">
							<text>行政审批局合法的营业执照（正副本），如选择刻章服务酱油服务者提供高能干机关所出的备案证明以及可好的备案章。</text>
						</view>
					</view>
					<!-- 提示 -->
					<view style="margin-left: -30upx;" class="st_body_hr dis_flex  aic"
						v-if="typess.length>0&&typess[0].text == '公司注册'&&typess[0].active == true">
						<text>为了给您提供高效、准确的服务，请您完善一下信息</text>
					</view>
					<view class="st_body_item dis_flex ju_b aic"
						style="border-bottom: 1px solid #eee;margin-left: -5upx;" @click.stop="open"
						v-if="typess.length>0&&typess[0].text == '公司注册'&&typess[0].active == true">
						<text class="sbi_left">注册企业全称</text>
						<view class=" fs14 dis_flex aic">
							<text style="color: #ddd;" class="oh1">{{gonText}}</text>
							<text class="iconfont icon-arrow sbi_right fs14"></text>
						</view>
					</view>
					<view class="st_body_item dis_flex ju_b aic"
						style="border-bottom: 1px solid #eee;margin-left: -5upx;" @click.stop="fangOpen"
						v-if="typess.length>0&&typess[0].text == '公司注册'&&typess[0].active == true">
						<text class="sbi_left" style="min-width: 10rem;">注册企业的经营范围</text>
						<view class=" fs14 dis_flex aic">
							<text style="color: #ddd;" class="oh1">{{fangText}}</text>
							<text class="iconfont icon-arrow sbi_right fs14"></text>
						</view>

					</view>
					<picker style="color: #ddd;" mode="selector" :range="addTypes" class="myC9 fs14 fw400"
						@change="addChange"
						v-if="typess.length>0&&typess[0].text == '公司注册'&&typess[0].active == true">
						<view class="st_body_item dis_flex ju_b aic"
							style="border-bottom: 1px solid #eee;margin-left: -5upx;">
							<text class="sbi_left">企业的注册区域地址</text>
							<view>{{fabuForm.add}}<text class="iconfont icon-arrow fs14"></text></view>
						</view>
					</picker>
					<picker style="color: #ddd;" mode="selector" :range="TaxTypes" class="myC9 fs14 fw400"
						@change="taxChange"
						v-if="typess.length>0&&typess[0].text == '公司注册'&&typess[0].active == true">
						<view class="st_body_item dis_flex ju_b aic"
							style="border-bottom: 1px solid #eee;margin-left: -5upx;">
							<text class="sbi_left">企业税务的性质</text>
							<view>{{fabuForm.tax}}<text class="iconfont icon-arrow fs14"></text></view>
						</view>
					</picker>
					<wangding-pickerAddress @change="cityChange1"
						style="margin-left: -10upx; border-bottom: 1px solid #eee;"
						v-if="typess.length>0&&typess[0].text == '公司注册'&&typess[0].active == true">
						<view class="st_body_item dis_flex ju_b aic" style="width: 690upx;margin-left: -5upx;">
							<view class="flex aic">
								<text class="fs15 pl5">企业的注册区域</text>
							</view>
							<view class=" " style="color: #ddd;margin-right: -15upx;">
								<text class="fs14  c9" style="color: #ddd;">{{fabuForm.city}}</text>
								<text class="iconfont icon-arrow sbi_right fs14"></text>
								</image>
							</view>
						</view>
					</wangding-pickerAddress>
				</view>
			</view>
			<view class="dis_flex ju_b aic" style="width: 690upx; height: 160upx; background-color: #fff;" v-if="isAddtype">
				<view class="fs12" style="padding-right: 20upx; color:#F43B31 ;">
					<text class="iconfont icon-jinggao fs12"></text>
					<text>本平台支持同分类一个订单单一功能，暂不支持跨分类多个业务</text>
				</view>
				<view class="dis_flex ju_c aic fs16 addType" style="" @click="addTypeOpen">
					<text class="iconfont icon-chuangjian fs16" style="margin-right: 10upx;"></text> <text>添加</text>
				</view>
			</view>
			<!-- <picker mode="selector" :range="typeList" @change="typeChange">
				<view class="st_body_slfl dis_flex aic">
					<text>{{types}}</text>
					<text class="iconfont icon-xiala"></text>
				</view>
			</picker> -->
			<!-- <view class="st_body_slsl dis_flex_c ju_c" v-if="typess.length>0&&typess[0].active == true">
				<view class="pro_fl bs dis_flex aic">
					<view class="redGan"></view>
					<view class="redText">验收标准</view>
				</view>
				<view class="st_slsl_text">
					<text>行政审批局合法的营业执照（正副本），如选择刻章服务酱油服务者提供高能干机关所出的备案证明以及可好的备案章。</text>
				</view>
			</view> -->
		</view>
		<!-- 提示 -->
		<!-- 		<view class="st_body_hr dis_flex  aic" v-if="typess.length>0&&typess[0].active == true">
			<text>为了给您提供高效、准确的服务，请您完善一下信息</text>
		</view> -->
		<!-- <view class="st_body_item dis_flex ju_b aic" style="border-bottom: 1px solid #eee;" @click.stop="open"
			v-if="typess.length>0&&typess[0].active == true">
			<text class="sbi_left">注册企业全称</text>
			<view class=" fs14 dis_flex aic">
				<text style="color: #ddd;" class="oh1">{{gonText}}</text>
				<text class="iconfont icon-arrow sbi_right fs14"></text>
			</view>
		</view> -->
		<!-- <view class="st_body_item dis_flex ju_b aic" style="border-bottom: 1px solid #eee;" @click.stop="fangOpen"
			v-if="typess.length>0&&typess[0].active == true">
			<text class="sbi_left" style="min-width: 10rem;">注册企业的经营范围</text>
			<view class=" fs14 dis_flex aic">
				<text style="color: #ddd;" class="oh1">{{fangText}}</text>
				<text class="iconfont icon-arrow sbi_right fs14"></text>
			</view>

		</view> -->
		<!-- <view class="st_body_item dis_flex ju_b aic" style="border-bottom: 1px solid #eee;">
			<text class="sbi_left">企业的注册区域地址</text>
			<picker style="color: #ddd;" mode="selector" :range="addTypes" class="myC9 fs14 fw400" @change="addChange">
				<view>{{fabuForm.add}}<text class="iconfont icon-arrow fs14"></text></view>
			</picker>
		</view> -->
		<!-- <picker style="color: #ddd;" mode="selector" :range="addTypes" class="myC9 fs14 fw400" @change="addChange"
			v-if="typess.length>0&&typess[0].active == true">
			<view class="st_body_item dis_flex ju_b aic" style="border-bottom: 1px solid #eee;">
				<text class="sbi_left">企业的注册区域地址</text>
				<view>{{fabuForm.add}}<text class="iconfont icon-arrow fs14"></text></view>
			</view>
		</picker> -->

		<!-- <picker style="color: #ddd;" mode="selector" :range="TaxTypes" class="myC9 fs14 fw400" @change="taxChange"
			v-if="typess.length>0&&typess[0].active == true">
			<view class="st_body_item dis_flex ju_b aic" style="border-bottom: 1px solid #eee;">
				<text class="sbi_left">企业税务的性质</text>
				<view>{{fabuForm.tax}}<text class="iconfont icon-arrow fs14"></text></view>
			</view>
		</picker> -->
		<!-- <wangding-pickerAddress @change="cityChange1" style="margin-left: -10upx;"
			v-if="typess.length>0&&typess[0].active == true">
			<view class="st_body_item dis_flex ju_b aic" style="width: 690upx;">
				<view class="flex aic">
					<text class="fs15 pl5">企业的注册区域</text>
				</view>
				<view class=" " style="color: #ddd;margin-right: -15upx;">
					<text class="fs14  c9" style="color: #ddd;">{{fabuForm.city}}</text>
					<text class="iconfont icon-arrow sbi_right fs14"></text>
					</image>
				</view>
			</view>
		</wangding-pickerAddress> -->
		<!-- 提示 -->
		<view class="st_body_hr dis_flex  aic">
			<text>标的信息</text>
		</view>
		<view class="st_body_item dis_flex ju_b aic" @click.stop="jump" data-url="/pagesB_mxx/enterprise/enterprise?type=1"
			style="border-bottom: 1px solid #eee;">
			<text class="sbi_left">招标主体</text>
			<view class="fs14 dis_flex aic">
				<text  class="oh1">{{subject}}</text>
				<text class="iconfont icon-arrow sbi_right fs14"></text>
			</view>
			
		</view>
		<wangding-pickerAddress @change="cityChange" style="margin-left: -10upx;">
			<view class="st_body_item dis_flex ju_b aic">
				<view class="flex aic">
					<text class="fs15 pl5">办理地区</text>
				</view>
				<view style=";margin-right: -15upx;">
					<text class="fs14 " >{{fabuForm.bcity}}</text>
					<text class="iconfont icon-arrow sbi_right fs14"></text>
					</image>
				</view>
			</view>
		</wangding-pickerAddress>
		<!-- 提示 -->
		<view class="st_body_hr dis_flex  aic">
			<text>联系人信息</text>
		</view>
		<view class="st_body_item dis_flex ju_b aic" @click="jump" data-url="/pagesB_mxx/contacts/contacts?type=1">
			<text class="sbi_left">联系人信息</text>
			<view class="fs14 dis_flex aic">
				<text  class="oh1">{{lxr_msg.phone}}</text>
				<text class="iconfont icon-arrow sbi_right fs14"></text>
			</view>
		</view>
		<view class="" style="width: 750upx;height: 150upx;"></view>
		<view class="" style="position: fixed;bottom: 0;width: 750upx;;background-color: #fff;">
			<view class="st_foot_top dis_flex aic">
				<label class="radio dis_flex aic">
					<!-- <radio value="r1" checked="true" color="#00ff00" /> -->
					<view class="dis_flex aic ju_c" style="width: 22upx;height: 22upx;margin-right: 5upx;"
						:style="{'background-color':isRadio?'#F43B31':'','border':isRadio?'none':'1px solid #999'}"
						@tap.stop="radioView">
						<image src="/static/images/lzc/commin/dui.png" mode="widthFix"
							style="width: 17upx;height: 17upx;" v-if="isRadio">
						</image>
					</view>
					<text class="fs12" style="color: #333;">我已经阅读并同意遵守</text>
					<text class="fs12" style="color: #F43B31;" @click="jump"
						data-url="/pagesA_lzc/yin/yin">《平台网络招标保证金规则》</text>
				</label>
			</view>
			<view class="st_foot dis_flex ju_b">
				<view class="dis_flex_c flex-left st_foot1">
					<text class="price fs10 fw400">￥<text class="fs14">{{price}}</text></text>
					<text class="stfoot_text fs12 fw400">本次招标保证金</text>
				</view>
				<view class="dis_flex aic ju_c fs15 fw400 st_foot2" @click="jump" data-url="/pagesA_lzc/pay/pay?id=1">
					<text>提交</text>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../components/service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				/* 招标主体 */
				subject:'',
				
				isAddtype:false,
				price: 100,
				isZhang:true,
				isZhang1:false,
				isAdd: false,
				iszhan: true,
				isOne: true,
				isTwo: false,
				xxx: false,
				isJian: false,
				jianHeight: 0,
				navText: '',
				/* 公司全称 */
				gonText: '',
				/* 经营范围 */
				fangText: '',
				isRadio: true,
				city: '',
				types: '公司注册',
				typeList: ['公司注册', '商标注册'],
				TaxTypes: ['一年一般纳税人', '一年小规模'],
				addTypes: ['住宅', '商住两用', '商用', '没有地址'],
				toUrlList: [{
						text: '注册企业全称',
						url: ''
					},
					{
						text: '注册企业的经营范围',
						url: ''
					},
					{
						text: '企业的注册区域',
						url: ''
					},
					{
						text: '企业注册地址性质',
						url: ''
					},
					{
						text: '企业的注册区域地址',
						url: ''
					},
					{
						text: '企业税务的性质',
						url: ''
					}
				],
				biaoList: [{
						text: '招标主体',
						url: ''
					},
					{
						text: '办理地区',
						url: ''
					},
				],
				payUrl: '/pagesA_lzc/pay/pay',
				fabuForm: {
					tax: '',
					city: '',
					add: '',
					bcity: ''
				},
				
				
				//联系人信息
				lxr_msg:'',
				typeOneList: [],
				fb_index:0,
				fb_index1:0,
				fb_index2:0,
				typeOneList1: '工商财税',
				typesList: [{
					type: '工商财税',
					list: [{
							text: '公司注册',
							active: true
						},
						{
							text: '企业名称疑难核准',
							active: false
						},
						{
							text: '个体工商户注册',
							active: false
						},
						{
							text: '离岸公司注册',
							active: false
						},
						{
							text: '外资中外合资企业注册',
							active: false
						},
						{
							text: '集团公司注册',
							active: false
						}
					]
				}],
				typess: [{
					text: '公司注册',
					active: true
				}],
				id:''
			}
		},
		onHide() {
			uni.removeStorageSync('lxr_msg')
		},
		onLoad(option) {
			that = this;
			// if(uni.getStorageSync('TenderSubject')){
			// 	this.subject = uni.getStorageSync('TenderSubject');
			// }
			// if(uni.getStorageSync('contactInformation')){
			// 	this.information = uni.getStorageSync('contactInformation');
			// }
			that.id=option.id
			that.showdata()
			that.getdata()
		},
		onShow() {
			var lxr_msg=uni.getStorageSync('lxr_msg')
			if(lxr_msg){
				that.lxr_msg=lxr_msg
			}
			var TenderSubject=uni.getStorageSync('TenderSubject')
			if(TenderSubject){
				that.subject=TenderSubject
			}
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getdata(){
				service.P_post("bidding_list/classfiy").then((res)=>{
					console.log(res)
					if(res.code == 1){
						that.typeOneList = res.data.list;
						
						console.log(this.typeOneList)
					}
				})
			},
			showdata(){
				service.P_post("/bidding_list/sell_show", {
					id: this.id
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
			getimg(img) {
				return service.getimg(img);
			},
			jump(e) {
				return service.jump(e)
			},
			radioView() {
				this.isRadio = !this.isRadio;
			},
			cityChange1(data) {
				this.fabuForm.city = data.data.join('')
				console.log(data.data.join(''))
				// this.fabuForm.city = this.array[e.target.value];
			},
			cityChange(data) {
				this.fabuForm.bcity = data.data.join('')
				console.log(data.data.join(''))
				// this.fabuForm.city = this.array[e.target.value];
			},
			typeChange(e) {
				this.types = this.typeList[e.target.value];
			},
			taxChange(e) {
				this.fabuForm.tax = this.TaxTypes[e.target.value];
			},
			addChange(e) {
				this.fabuForm.add = this.addTypes[e.target.value];
			},
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('bottom')
			},
			gbtnClick() {
				console.log(this.gonText)
				this.$refs.popup.close()
			},
			fangOpen() {
				this.$refs.fang.open('bottom')
			},
			fangClick() {
				console.log(11111)
				console.log(this.fangText)
				this.$refs.fang.close()
			},
			addTypeOpen() {
				this.$refs.addType.open('bottom')
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			zzz() {
				this.xxx = false;
			},
			typeListBack() {
				this.isOne = true;
				this.isTwo = false;
			},
			typeListClick() {
				this.price = 98;
				this.typeOneList1 = "工商财税";
				console.log(this.navText);
				let obj = {};
				obj.text = this.navText;
				obj.active = false;
				this.typess[0] = obj;
				console.log(JSON.stringify(this.typess));
				this.$refs.addType.close();
				this.isAddtype = false;
				// this.price = 98;
				// this.typeOneList1 = "工商财税";
				// if (this.navText == '') {
				// 	let obj = {};
				// 	obj.text = '公司注册';
				// 	obj.active = false;
				// 	this.typess.push(obj);
				// 	console.log(JSON.stringify(this.typess));
				// 	this.$refs.addType.close();
				// 	this.isAdd = true;
				// }
				// if (this.typess.length > 0) {
				// 	for (var i = 0; i < this.typess.length; i++) {
				// 		if (this.navText == this.typess[i].text) {
				// 			console.log(11111)
				// 			console.log(this.isAdd);
				// 			this.isAdd = true;
				// 			this.$refs.addType.close();
				// 		} else {}
				// 	}
				// } else {
				// 	console.log()
				// 	let obj = {};
				// 	obj.text = this.navText;
				// 	obj.active = false;
				// 	this.typess.push(obj);
				// 	this.isAdd = true;
				// 	console.log(JSON.stringify(this.typess));
				// 	this.$refs.addType.close();
				// }
				// if (this.isAdd) {
				// 	console.log(2222)
				// 	this.$refs.addType.close();
				// } else {
				// 	let obj = {};
				// 	obj.text = this.navText;
				// 	obj.active = false;
				// 	this.typess.push(obj);
				// 	console.log(JSON.stringify(this.typess));
				// 	this.$refs.addType.close();
				// 	this.isAdd = false;
				// }
				// this.isAdd = false;


			},
			typeOneClick() {
				console.log(this.typess.length)
				this.isOne = false;
				this.isTwo = true;


				// this.$refs.addType.close();

			},
			gonInput(e) {
				setTimeout(() => {
					this.jianHeight = e.detail.height;
					// this.xxx = true;
				}, 100)
			},
			gonBlur() {
				this.jianHeight = 0;
			},
			clearList() {
				// uni.showNavigationBarLoading()
				uni.showModal({
					title: '你确定要全部删除吗',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '删除成功',
								duration: 500,
								icon: 'none',
								success: () => {
									console.log(1111)
									this.price = '';
									this.typess = []
									this.typeOneList1 = '';
									console.log(this.price);
									this.isAddtype = true;
								}
							})

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			zhankaiType(index) {
				console.log(index);
				this.typess[0].active = !this.typess[0].active;
				console.log(this.typess[0].active)
				this.isZhang = !this.isZhang;
				this.isZhang1 = !this.isZhang1;
			},
			typeDel() {
				this.$refs.addType.close();
			},
			// 切换一级分类
			typeSclick1(item,index) {
				that.fb_index=index
				// if(!item.active){
				// 	Vue.set(item,'active',true)
				// }else{
				// 	Vue.set(item,'active',false)
				// }
				
			},
			typeSclick(index1, index2) {
				console.log(index1);
				console.log(index2);
				that.fb_index1=index1
				that.fb_index2=index2
				that.showdata()
				
				
				return
				var newarr=that.typeOneList
				for (var i = 0; i < this.newarr.length; i++) {
					if (i == index) {
						for (var j = 0; j < this.typesList[i].list.length; j++) {
							if (j == index1) {
								this.typesList[i].list[j].active = true;
								this.navText = this.typesList[i].list[j].text;
								console.log(this.navText);

							} else {
								this.typesList[i].list[j].active = false;
							}
						}
					}
				}
				for (var i = 0; i < this.typess.length; i++) {
					if (this.navText == this.typess[i].text) {
						console.log(11111)
						console.log(this.isAdd);
						this.isAdd = true;
						// this.$refs.addType.close();
					} else {}
				}
			}
		}
	}
</script>

<style scoped>
	.typeBtn {
		width: 690upx;
		height: 95upx;
		/* background-color: #F43B31; */
		margin-top: 10upx;
		position: absolute;
		bottom: 20upx;
		left: 30upx;
		right: 30upx;
		color: #fff;
	}

	.typeBtn1 {
		margin-right: 20upx;
		width: 100%;
		height: 100%;
		color: #F43B31;
		border: 1px solid #F43B31;
		border-radius: 20upx;
	}

	.typeBtn2 {
		margin-left: 20upx;
		width: 100%;
		height: 100%;
		background-color: #F43B31;
		border-radius: 20upx;
	}

	.typeAct {
		background-color: #F43B31;
		color: #fff;
	}

	.typeAct1 {
		border: 1px solid #F43B31;
		color: #F43B31;
	}

	.addTypeList {
		width: 750upx;
		height: 60vh;
		/* max-height: 1134upx; */
		padding: 0 30upx;
		box-sizing: border-box;
		overflow: auto;
	}

	.addType {
		width: 150upx;
		height: 50%;
		background-color: #fff;
		border: 1px solid #F43B31;
		border-radius: 20upx;
		min-width: 150upx;
		color: #F43B31;
	}

	.gbtn {
		width: 750upx;
		height: 450upx;
		background-color: #ffffff;
		/* padding: 0 15upx; */
		box-sizing: border-box;
	}

	.gbtn uni-view {
		background-color: #fff;
	}

	.gbtn_title {
		width: 750upx;
		height: 95upx;
		/* background-color: #00C5D8; */
	}

	.gbtn uni-textarea {
		width: 720upx;
		height: 210upx;
		margin: 0 15upx;
		background-color: #f8f8f8;
		padding: 15upx;
		box-sizing: border-box;
	}

	.gbtn_foot {
		width: 100%;
		height: 120upx;
		padding: 15upx 0;
		box-sizing: border-box;
		/* margin-top: 50upx; */
		/* margin-bottom: 20upx; */
	}

	.gbtn_foot .btnLeft {
		width: 350upx;
		height: 100%;
		margin-left: 15upx;
		border-radius: 20upx;
		background-color: #fff;
		border: 1px solid #F43B31;
		color: #F43B31;
	}

	.gbtn_foot .btnright {
		width: 720upx;
		height: 100%;
		margin: 0 15upx;
		margin-right: 15upx;
		border-radius: 20upx;
		background-color: #F43B31;
		color: #fff;
	}

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
		height: 100vh;
	}

	.content .st_header {
		width: 750upx;
		height: 227upx;
		position: relative;
	}

	.content .st_header image {
		width: 750upx;
		height: 227upx;
	}

	.content .st_header .st_header_fl {
		width: 750upx;
		height: 107upx;
		position: absolute;
		top: 0;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}

	.content .st_header .st_header_sl {
		width: 750upx;
		height: 119upx;
		position: absolute;
		bottom: 0;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		padding: 0 30upx;
	}

	.content .st_header .st_header_sl .st_header_sl_item {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		max-width: 33.3%;
		position: relative;
	}

	.content .st_body_fl {
		box-sizing: border-box;
		padding: 31upx;
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #999999;
		line-height: 36upx;
		text-align: justify;
		border-bottom: 20upx solid #f8f8f8;
	}

	.content .st_body_fl .icon-jinggao {
		color: #F43B31;
		font-size: 22upx;
		margin-right: 0.2rem;
	}

	.content .st_body_sl {
		width: 750upx;
		box-sizing: border-box;
		padding: 0 30upx;
	}

	.content .st_body_sl .st_body_slfl {
		width: 100%;
		/* height: 93upx; */
		/* border-bottom: 1px solid #eee; */
	}

	.content .st_body_sl .st_body_slsl {
		padding-bottom: 28upx;
		box-sizing: border-box;
	}

	.content .st_body_sl .st_body_slsl .pro_fl {
		margin-top: 11upx;
	}

	.content .st_body_sl .st_body_slsl .st_slsl_text {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 36upx;
		margin-top: 11upx;
	}

	.content .st_body_hr {
		width: 750upx;
		height: 80upx;
		background-color: #F8F8F8;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #BBBBBB;
		line-height: 30upx;
		box-sizing: border-box;
		padding-left: 30upx;
	}

	.content .st_body_item {
		width: 690upx;
		height: 92upx;
		margin: 0 30upx;
	}

	.content .st_body_item .sbi_left {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 30upx;
		min-width: 7rem;
	}

	.content .st_body_item .sbi_right {
		font-size: 19upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #DDDDDD;
	}

	.st_foot_top {
		width: 750upx;
		height: 70upx;
		box-sizing: border-box;
		padding: 0 30upx;
		border-top: 20upx solid #f8f8f8;
	}

	.st_foot {
		width: 750upx;
		height: 98upx;
		padding-left: 30upx;
		box-sizing: border-box;
		border-top: 20upx solid #f8f8f8;
	}

	.st_foot1 {}

	.price {
		font-family: PingFang SC;
		color: #F43B31;
	}

	.stfoot_text {
		font-family: PingFang SC;
		color: #DDDDDD;
	}

	.st_foot2 {
		width: 242upx;
		height: 100%;
		background: #F43B31;
		font-family: PingFang SC;
		color: #FFFFFF;
	}

	/deep/uni-radio .uni-radio-input {
		border-radius: 4upx;
		background-color: #F43B31 !important;
		color: #fff !important;
	}

	/* 页面公共样式 */
	.redGan {
		width: 5upx;
		height: 26upx;
		background: #F43B31;
	}

	.redText {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 48upx;
		margin-left: 10upx;
	}

	uni-button {
		margin: 0;
		padding: 0;
	}
</style>
