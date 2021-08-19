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
			<view v-if="tk_msg.value" class="" style="width: 100%;height: 100%;background-color: #fff;">
				<view class="dis_flex aic ju_c gbtn_title" style="">
					<text>{{tk_msg.title}}</text>
				</view>
				<view class="" style="width: 690upx;">
					<textarea style="margin:0 15upx;" cursor-spacing=200 value="" v-model="tk_msg.c_value" :placeholder="tk_msg.value[0]"/>
				</view>
				<view class="st_body_fl"  >
					<text class="iconfont icon-jinggao"></text>
					<text style="color: #333;">{{tk_msg.value[1]}}</text>
				</view>
				<view class="gbtn_foot dis_flex ju_b">
					<button class="btnright" @click.stop="gbtnClick">确定</button>
				</view>
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
			:style="{'border-bottom':shuju?'1px solid #eee':''}">删除</view>
		<!-- 需求分类 -->
		<view class="st_body_sl">
			<view  v-if="shuju" class="st_body_slfl dis_flex_c">
				<view class="dis_flex ju_b aic"
					style="width: 750upx; padding-left: 30upx; box-sizing: border-box;padding-bottom: 20upx;padding-top: 20upx; border-bottom: 1px solid #eee;"
					@click.stop="zhankaiType(0)" v-if="shuju">
					<view class="">
						<text>{{shuju.title}}</text>
						<!-- <text class="iconfont icon-xiala" v-if="typess[0].active==true"></text> -->
						<!-- <text class="iconfont icon-shangla" v-if="typess[0].active==false"></text> -->
						<text class="iconfont icon-xiala" v-show="isZhang"></text>
						<text class="iconfont icon-shangla" v-show="isZhang1"></text>
					</view>
					<!-- <text class="iconfont icon-icon--" style="padding-right: 20upx;"></text> -->
				</view>
				<view v-if="isZhang" class="" >
					<view style="width: 750upx; padding:0 30upx;background-color: #FFFFFF;">
						<view class="st_body_slsl dis_flex_c ju_c">
							<view class="pro_fl bs dis_flex aic" style="">
								<view class="redGan"></view>
								<view class="redText">验收标准</view>
							</view>
							<view class="st_slsl_text">
								<text>{{shuju.p_content}}</text>
							</view>
						</view>
						<!-- 提示 -->
						<view style="margin-left: -30upx;" class="st_body_hr dis_flex  aic" >
							<text>为了给您提供高效、准确的服务，请您完善一下信息</text>
						</view>
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
							<!-- 单位输入 -->
							<view class="fbi dis_flex ju_b aic" v-if="item1.type == 9" @click.stop="open(item1,index,index1)">
								<view class="dis_flex aic fs15 flex_0">
									<text class="fb3b31">* </text>
									<text class="myC3 flex_0">{{item1.title}}</text>
								</view>
								<view class="flex_1 fs14 dis_flex aic pl10">
									<text class="oh1 flex_1" style="text-align: right;">{{item1.c_value?item1.c_value:'请输入'}}</text>
									<text class="iconfont icon-arrow sbi_right fs14"></text>
								</view>
							</view>
					
							
						</view>
						
						
					</view>
					
				
				</view>
				
			</view>
			<view class="dis_flex ju_b aic" style="width: 750upx; height: 160upx;padding:0 30upx; background-color: #fff;" v-else>
				<view class="fs12" style="padding-right: 20upx; color:#F43B31 ;">
					<text class="iconfont icon-jinggao fs12"></text>
					<text>本平台支持同分类一个订单单一功能，暂不支持跨分类多个业务</text>
				</view>
				<view class="dis_flex ju_c aic fs16 addType" style="" @click="addTypeOpen">
					<text class="iconfont icon-chuangjian fs16" style="margin-right: 10upx;"></text> <text>添加</text>
				</view>
			</view>
			
		</view>
		
		<!-- 提示 -->
		<view class="st_body_hr dis_flex  aic">
			<text>标的信息</text>
		</view>
		<view class="st_body_item dis_flex ju_b aic" @click.stop="jump" data-url="/pagesB_mxx/enterprise/enterprise?type=1"
			style="border-bottom: 1px solid #eee;">
			<text class="sbi_left">招标主体</text>
			<view class="fs14 dis_flex aic">
				<text  class="oh1">{{subject.title}}</text>
				<text class="iconfont icon-arrow sbi_right fs14"></text>
			</view>
			
		</view>
		<wangding-pickerAddress @change="cityChange" data-index1="-1"
								data-index="-1" style="margin-left: -10upx;">
			<view class="st_body_item dis_flex ju_b aic">
				<view class="flex aic">
					<text class="fs15 pl5">办理地区</text>
				</view>
				<view style=";margin-right: -15upx;">
					<text class="fs14 " >{{xq_address?xq_address:'请选择办理地区'}}</text>
					<text class="iconfont icon-arrow sbi_right fs14"></text>
					</image>
				</view>
			</view>
		</wangding-pickerAddress>
		<view class="fbi dis_flex ju_b aic">
			<view class="dis_flex aic fs15">
				<text class="fb3b31">* </text>
				<text class="myC3">{{'总价'}}</text>
			</view>
			<view class="dis_flex aic myC3 fs14 fw400" style="text-align: end;">
				<input type="number" v-model="xq_price_all" placeholder="请输入总价" />
			</view>
		</view>
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
		<view class="" style="width: 750upx;height: 170upx;"></view>
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
					<text class="price fs10 fw400">￥<text class="fs14">{{shuju.price}}</text></text>
					<text class="stfoot_text fs12 fw400">本次招标保证金</text>
				</view>
				<view class="dis_flex aic ju_c fs15 fw400 st_foot2" @click="fabu" data-url="/pagesA_lzc/pay/pay?id=1">
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
				
				id:'',
				shuju:'',
				tk_msg:'',
				tk_index:'',
				tk_index1:'',
				xq_address:'',
				xq_price_all:'',
				/* 招标主体 */
				subject:'',
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
			if(option.id){
				that.showdata()
			}
			
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
			fabu() {
				// this.list[1][2].value = "https://img1.baidu.com/it/u=2947356332,3289073655&fm=15&fmt=auto&gp=0.jpg"
				console.log(this.shuju.params_arr)
				
				if(!this.shuju){
					uni.showToast({
						icon:'none',
						title:'请先选择服务'
					})
					return
				}
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
				
				if(this.xq_price_all<1){
					uni.showToast({
						icon:'none',
						title:'请填写总价'
					})
					return
				}
				
				var datas={
					pid: this.shuju.id,
					title: this.shuju.title,
					price: that.xq_price_all,
					pay_price:this.shuju.price,
					company_id: this.subject.id,
					lx_id: this.lxr_msg.id,
					address: this.xq_address,
					params: JSON.stringify(params_j)
				}
				console.log(datas)
				
				if(!that.isRadio){
					uni.showToast({
						icon:'none',
						title:'请先阅读同意《平台网络招标保证金规则》'
					})
					return
				}
				if(that.btnkg==1){
					return
				}
				that.btnkg=1
				// return
				service.P_post("/bidding_list/sell_add", datas).then((res) => {
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
				
			},
			
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
			
			typeChange(e) {
				this.types = this.typeList[e.target.value];
			},
			taxChange(e) {
				this.fabuForm.tax = this.TaxTypes[e.target.value];
			},
			addChange(e) {
				this.fabuForm.add = this.addTypes[e.target.value];
			},
			open(item,index,index1) {
				that.tk_msg=item
				that.tk_index=index
				that.tk_index1=index1
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
				// this.price = 98;
				// this.typeOneList1 = "工商财税";
				// console.log(this.navText);
				// let obj = {};
				// obj.text = this.navText;
				// obj.active = false;
				// this.typess[0] = obj;
				// console.log(JSON.stringify(this.typess));
				this.$refs.addType.close();
				this.isAddtype = false;
				that.id=that.typeOneList[that.fb_index].child[that.fb_index1].child[that.fb_index2].id
				that.showdata()
				


			},
			typeOneClick() {
				// console.log(this.typess.length)
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
									that.shuju = '';
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
				// this.typess[0].active = !this.typess[0].active;
				// console.log(this.typess[0].active)
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
				
				
				
				return
				
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
			//多选
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
			//图片
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
				if(data.p_index=='-1'){
					that.xq_address=city
					return
				}
				var  set_data=that.shuju.params_arr[data.p_index].info[data.p_index1]
				Vue.set(set_data,'c_value',city)
				console.log(set_data)
				// for (var i = 0; i < this.list.length; i++) {
				// 	if (this.list[i].type == 7) {
				// 		this.list[i].value = this.city;
				// 	}
				// }
			},
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
		/* padding: 0 30upx; */
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
