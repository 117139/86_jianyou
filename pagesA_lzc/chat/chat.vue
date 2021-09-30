<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<!-- <scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
			 :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50"> -->
			<scroll-view class="msg-list" :style="style_fos1" :class="popupLayerClass" scroll-y="true" :scroll-with-animation="scrollAnimation"
			 :scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">
				<!-- <view class="msg-list"> -->
				<view class="msg-list1">
					<!-- 加载历史数据waitingUI -->
					<view class="loading" v-if="isHistoryLoading">
						<view class="spinner">
							<view class="rect1"></view>
							<view class="rect2"></view>
							<view class="rect3"></view>
							<view class="rect4"></view>
							<view class="rect5"></view>
						</view>
					</view>
					<view class="row clearfix_s" v-for="(item,index) in msgList" :key="index" :id="'a_'+item.id">
						<!-- <view class="msg_time">
							<view class="time" v-if="index==0">{{timeFliter(item.create_times)}}</view>
							<view class="time" v-else-if="index>0">{{gettime1(index-1)}}</view>
						</view> -->
						<!-- 用户消息 -->
						<view class="dis_flex ju_b">
							<!-- 自己发出的消息 -->
							<view :class="item.fromTo==1?'my':'other'">
								<!-- 左-头像 -->
								<view class="left" v-if="item.fromTo!=1">
									<image  @tap="jump"  :src="getimg(msg_user.toInfo.img)" mode="aspectFill"></image>
								</view>
								<!-- 中-消息 -->
								<view :class="item.fromTo==1?'left':'right'">
									<!-- 文字消息 -->
									<view  class="bubble">
										<rich-text :nodes="nodesFliter(item.content)"></rich-text>
									</view>
									<view class="msg_time">
										<view class="time" >{{timeFliter(item.create_times)}}</view>
										<!-- <view>{{item.create_time}}</view> -->
									</view>
								</view>
								<!-- 右-头像 -->
								<view class="right" v-if="item.fromTo==1">
									<image @tap="jump" :data-url="'/pagesA/my_index/my_index?id='+item.id" :src="getimg(msg_user.fromInfo.img)"></image>
								</view>
							</view>

						</view>
					</view>
					
					<view style="width: 100%; height:80upx;opacity: 0;"></view>
				</view>
			</scroll-view>
			<!-- </view> -->
		
	</view>
	<!-- 抽屉栏 -->
	<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
		<!-- 表情 -->
		<scroll-view :class="{hidden:hideEmoji}" scroll-y="true" style="height: 100%;">
	
			<view class="rong-emoji-content_list">
				<!-- <block v-for="(e_page,index) in emojiList" >
				
					<view v-for="(item1,index1) in e_page"  @click="addEmoji(item1)" class="rong-emoji-content_li">
						<image class='rong-emoji-content' mode="widthFix" :src="'/static/images/emoji/'+em.url"></image>
					</view>
				</block> -->
				<view v-for="(e_page,index) in emojiList" class="rong-emoji-content_li">
					<image class='rong-emoji-content' mode="widthFix" @click="addEmoji(e_page)" :src="'/static/images/emoji/'+e_page.url"></image>
					
					<!-- <view v-for="(item1,index1) in e_page"  @click="addEmoji(item1)" class="rong-emoji-content_li">
						<image class='rong-emoji-content' mode="widthFix" :src="'/static/images/emoji/'+em.url"></image>
					</view> -->
				</view>
			</view>
		</scroll-view>
		
		
	</view>
	<!-- 底部输入栏 -->
	<view class="input-box" :class="popupLayerClass" :style="style_fos" @touchmove.stop.prevent="discard">
		
		<view class="textbox">
			<!-- <view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin"
			 @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view> -->
			<view class="text-mode" :class="isVoice?'hidden':''">
				<view class="box" style="flex: 1;">
					<!-- <textarea auto-height="true" v-model="textMsg" @focus="textareaFocus" cursor-spacing="18" /> -->
					<input type="text" id="msg-text" class="input" v-model="textMsg" confirm-type="send" :focus="isFocus" @focus="isFocus = true"
					 @blur="isFocus = false" @confirm='sendText' :confirm-hold='true' :adjust-position='false' cursor-spacing="18"  placeholder="谢谢您的称赞呀"/>
				</view>
				<view class="em" @tap="chooseEmoji">
					<view class="icon biaoqing"></view>
				</view>
			</view>
		</view>
		
		
		<label for="msg-text">
			<view class="send" :class="isVoice?'hidden':''" @touchend.prevent="sendText">
				<view class="btn">发送</view>
			</view>
		</label>
	</view>



	</view>
</template>
<!-- <script module="filter" lang="wxs" src="../../utils/filter.wxs"></script> -->
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
				msg_type: 1, //客服  2
				goods_id: '',
				goods_name: '',
				goods_img: '',
				goods_pri: '',
				//TIM变量
				conversationActive: null,
				toUserId: '',
				toUserInfo: null,
				userInfo: null,
				nextReqMessageID: '',
				count: 20,
				isCompleted: '',
				msgList: [],
				TIM: null,


				//文字消息
				textMsg: '',
				//消息列表
				isHistoryLoading: false,
				scrollAnimation: false,
				scrollTop: 0,
				scrollToView: '',

				msgImgList: [],
				myuid: 0,

				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER: uni.getRecorderManager(),
				// #endif
				isVoice: false,
				voiceTis: '按住 说话',
				recordTis: "手指上滑 取消发送",
				recording: false,
				willStop: false,
				initPoint: {
					identifier: 0,
					Y: 0
				},
				recordTimer: null,
				recordLength: 0,

				// 抽屉参数
				popupLayerClass: '',
				// more参数
				hideMore: true,
				//表情定义
				hideEmoji: true,
				emojiList: [],
				//表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要
				onlineEmoji: {
					"100.gif": "AbNQgA.gif",
					"101.gif": "AbN3ut.gif",
					"102.gif": "AbNM3d.gif",
					"103.gif": "AbN8DP.gif",
					"104.gif": "AbNljI.gif",
					"105.gif": "AbNtUS.gif",
					"106.gif": "AbNGHf.gif",
					"107.gif": "AbNYE8.gif",
					"108.gif": "AbNaCQ.gif",
					"109.gif": "AbNN4g.gif",
					"110.gif": "AbN0vn.gif",
					"111.gif": "AbNd3j.gif",
					"112.gif": "AbNsbV.gif",
					"113.gif": "AbNwgs.gif",
					"114.gif": "AbNrD0.gif",
					"115.gif": "AbNDuq.gif",
					"116.gif": "AbNg5F.gif",
					"117.gif": "AbN6ET.gif",
					"118.gif": "AbNcUU.gif",
					"119.gif": "AbNRC4.gif",
					"120.gif": "AbNhvR.gif",
					"121.gif": "AbNf29.gif",
					"122.gif": "AbNW8J.gif",
					"123.gif": "AbNob6.gif",
					"124.gif": "AbN5K1.gif",
					"125.gif": "AbNHUO.gif",
					"126.gif": "AbNIDx.gif",
					"127.gif": "AbN7VK.gif",
					"128.gif": "AbNb5D.gif",
					"129.gif": "AbNX2d.gif",
					"130.gif": "AbNLPe.gif",
					"131.gif": "AbNjxA.gif",
					"132.gif": "AbNO8H.gif",
					"133.gif": "AbNxKI.gif",
					"134.gif": "AbNzrt.gif",
					"135.gif": "AbU9Vf.gif",
					"136.gif": "AbUSqP.gif",
					"137.gif": "AbUCa8.gif",
					"138.gif": "AbUkGQ.gif",
					"139.gif": "AbUFPg.gif",
					"140.gif": "AbUPIS.gif",
					"141.gif": "AbUZMn.gif",
					"142.gif": "AbUExs.gif",
					"143.gif": "AbUA2j.gif",
					"144.gif": "AbUMIU.gif",
					"145.gif": "AbUerq.gif",
					"146.gif": "AbUKaT.gif",
					"147.gif": "AbUmq0.gif",
					"148.gif": "AbUuZV.gif",
					"149.gif": "AbUliF.gif",
					"150.gif": "AbU1G4.gif",
					"151.gif": "AbU8z9.gif",
					"152.gif": "AbU3RJ.gif",
					"153.gif": "AbUYs1.gif",
					"154.gif": "AbUJMR.gif",
					"155.gif": "AbUadK.gif",
					"156.gif": "AbUtqx.gif",
					"157.gif": "AbUUZ6.gif",
					"158.gif": "AbUBJe.gif",
					"159.gif": "AbUdIO.gif",
					"160.gif": "AbU0iD.gif",
					"161.gif": "AbUrzd.gif",
					"162.gif": "AbUDRH.gif",
					"163.gif": "AbUyQA.gif",
					"164.gif": "AbUWo8.gif",
					"165.gif": "AbU6sI.gif",
					"166.gif": "AbU2eP.gif",
					"167.gif": "AbUcLt.gif",
					"168.gif": "AbU4Jg.gif",
					"169.gif": "AbURdf.gif",
					"170.gif": "AbUhFS.gif",
					"171.gif": "AbU5WQ.gif",
					"172.gif": "AbULwV.gif",
					"173.gif": "AbUIzj.gif",
					"174.gif": "AbUTQs.gif",
					"175.gif": "AbU7yn.gif",
					"176.gif": "AbUqe0.gif",
					"177.gif": "AbUHLq.gif",
					"178.gif": "AbUOoT.gif",
					"179.gif": "AbUvYF.gif",
					"180.gif": "AbUjFU.gif",
					"181.gif": "AbaSSJ.gif",
					"182.gif": "AbUxW4.gif",
					"183.gif": "AbaCO1.gif",
					"184.gif": "Abapl9.gif",
					"185.gif": "Aba9yR.gif",
					"186.gif": "AbaFw6.gif",
					"187.gif": "Abaiex.gif",
					"188.gif": "AbakTK.gif",
					"189.gif": "AbaZfe.png",
					"190.gif": "AbaEFO.gif",
					"191.gif": "AbaVYD.gif",
					"192.gif": "AbamSH.gif",
					"193.gif": "AbaKOI.gif",
					"194.gif": "Abanld.gif",
					"195.gif": "Abau6A.gif",
					"196.gif": "AbaQmt.gif",
					"197.gif": "Abal0P.gif",
					"198.gif": "AbatpQ.gif",
					"199.gif": "Aba1Tf.gif",
					"200.png": "Aba8k8.png",
					"201.png": "AbaGtS.png",
					"202.png": "AbaJfg.png",
					"203.png": "AbaNlj.png",
					"204.png": "Abawmq.png",
					"205.png": "AbaU6s.png",
					"206.png": "AbaaXn.png",
					"207.png": "Aba000.png",
					"208.png": "AbarkT.png",
					"209.png": "AbastU.png",
					"210.png": "AbaB7V.png",
					"211.png": "Abafn1.png",
					"212.png": "Abacp4.png",
					"213.png": "AbayhF.png",
					"214.png": "Abag1J.png",
					"215.png": "Aba2c9.png",
					"216.png": "AbaRXR.png",
					"217.png": "Aba476.png",
					"218.png": "Abah0x.png",
					"219.png": "Abdg58.png"
				},
				


				customModalVisible: false,
				customData: '',
				customDescription: '',
				customExtension: '',
				focusedInput: '',


				isShow: false,


				style_fos: '',
				style_fos1: '',
				
				
				msg_user:'',
				isFocus:false,
				page: '',
			};
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','currentMessageList'])
		},
		watch: {
			currentMessageList(newVal, oldVal) {
				this.msgList = newVal
				console.log('页面收到消息')
				console.log(this.msgList)
				
				if(newVal.length>0){
					if(newVal[newVal.length-1].fromTo==2){
						var msg_xt='{"token":"'+that.userinfo.token+'","msg":"清楚已读","client_id":"'+that.toid+'","type":"-2"}'
						// return new Promise(resolve => {
						// 	resolve(msg_xt)
						// })
						if (state.socketOpen) {
						  uni.sendSocketMessage({
						    data: msg_xt,
								success:(res)=>{
									console.log('已读')
									console.log(msg_xt)
								}
						  });
						} else {
							
						
						}
					}
					this.screenMsg(newVal, oldVal)
				}
			},
		},
		onLoad(options) {
			that = this
			// console.log('对方聊天id' + option.id)
			// console.log('对方聊天type' + option.type)
			if (!this.hasLogin) {
				uni.navigateBack({
					delta: 1
				})
				return
			}
			// console.log(service.emojiList)
			that.emojiList=service.emojiList
			uni.onKeyboardHeightChange(res => {
				if (res.height > 0) {
					that.style_fos = 'transform: translate3d(0, -' + res.height + 'px, 0);'
					var list_h = res.height * 1
					that.style_fos1 = 'transform: translate3d(0, -' + list_h + 'px, 0);padding-top:' + list_h + 'px'
					console.log(that.style_fos)
				} else {
					that.style_fos = ""
					that.style_fos1 = ""
				}
			})
			if(!options.toid){
				uni.navigateBack({
					delta:1
				})
				return
			}
			that.toid=options.toid
			this.conversationActive = this.$store.state.conversationActive
			this.getMsgList();
			
			
		},
		onShow() {
			var that = this
			that.isShow = true
			setTimeout(function() {
				that.scrollToBottom()
				that.scrollTop = 99999999999999;
				that.isHistoryLoading = false;
			}, 500)
		},
		onUnload() {
			//退出页面 将所有的会话内的消息设置为已读
			
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		methods: {
			...mapMutations(['logout', 'login','_send']),
			onRetry(index) {
				that.datas=[]
				that.page=''
				that.btnkg=0
				that.data_last=false
				that.getdata()
			},
			
			gettime1(idx) {
				if (idx < 0) {
					return
				}
				// console.log(idx, idx + 1)
				var time = this.msgList[idx].create_times
				var time1 = this.msgList[idx + 1].create_times
				// console.log(this.getchattime(time), this.getchattime(time1))
				if (this.getchattime(time) != this.getchattime(time1)) {
					return this.getchattime(time1)
				}
			},
			getimg(img){
				return service.getimg(img)
			},
			jump(e) {
				console.log(e)
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},

			// 滚动到列表bottom
			scrollToBottom() {
				if (this.isShow) {
					wx.pageScrollTo({
						scrollTop: 9999999
					})
				}
			},
			getarg(str, arg, type) {
				if (type == 'custom') {
					return
				}
				if (!str) {
					return
				}
				// console.log(str)
				var reg = /\\$/gi
				str = str.replace(reg, '')
				// console.log(str)
				var jsonstr = JSON.parse(str)
				// console.log(jsonstr)
				if (jsonstr.hasOwnProperty(arg)) {

					// console.log(jsonstr[arg]);
					return jsonstr[arg]
				}
			},
			//聊天的节点加上外层的div
			nodesFliter(str) {
				let nodeStr = '<div class="ltbox_div" style="word-wrap:break-word;line-height:40upx;">' + str + '</div>'
				return nodeStr
			},
			//时间过滤
			timeFliter(timer) {
				let timeData = new Date(timer * 1000)
				let str = service.dateTimeFliter(timeData)
				return str
			},
			getchattime(time) {
				if (!time) {
					return
				}
				var newYear = new Date().getFullYear(); //目前系统时间是哪一年
				var nowMonth = new Date().getMonth() + 1; //目前系统时间是哪一月
				var nowDay = new Date().getDate(); //目前系统时间是几号
				time = Number(time * 1000)
				var sendtime = new Date(time)
				var sendYear = sendtime.getFullYear()
				var sendMonth = sendtime.getMonth() + 1
				var sendDate = sendtime.getDate()
				var sendHours = sendtime.getHours()
				var sendMinutes = sendtime.getMinutes()
				if (sendMinutes < 10) {
					sendMinutes = '0' + sendMinutes
				}
				// console.log(time)
				// console.log(sendtime)
				// console.log(sendtime.getDate())
				if (sendYear == newYear) {

					// console.log(sendDate, nowDay)
					if (sendMonth == nowMonth && sendDate == nowDay) {

						return sendHours + ':' + sendMinutes
					}


					return sendMonth + '-' + sendDate + ' ' + sendHours + ':' + sendMinutes
				} else {
					return sendYear + '-' + sendMonth + '-' + sendDate + ' ' + sendHours + ':' + sendMinutes
				}
			},
			// 接受消息(定位消息)
			screenMsg(newVal, oldVal) {
				console.log(newVal)
				if (newVal[0] && oldVal[0]) {
					// if (newVal[0].id != oldVal[0].id && newVal.length >= this.count) {
					if (newVal[0].id != oldVal[0].id) {

						let _index = newVal.length - oldVal.length - 1
						// this.$nextTick(()=> {this.scrollToView =newVal[_index].ID});
						setTimeout(() => {
							that.scrollToView = 'a_'+newVal[_index].id
						}, 100)
						// console.log(this.scrollToView)
						//拉取历史记录不用改变定位消息
					} else {
						//新的消息来了 自动向下滑动到最新消息
						// this.$nextTick(()=> {this.scrollToView =newVal[newVal.length-1].ID});
						setTimeout(() => {
							that.scrollToView = 'a_'+newVal[newVal.length - 1].id
						}, 100)
					}
				} else {
					console.log('*****')
					//第一次拉取历史记录 定位到最后一条消息
					that.$nextTick(() => {
						console.log('newVal---------------------------->')
						console.log(newVal)
						that.scrollToView = 'a_'+newVal[newVal.length - 1].id;
						that.scrollTop = 9999999;
					});
				}
			},
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e) {
				this.isHistoryLoading = true;
				this.scrollAnimation = false;
					// 更多消息列表
				var jkurl="/chat/history"
				var datas={
					token:this.userinfo.token,
					toid:that.toid,
					page:that.page,
					limit:20,
					// page:that.page,
					// limit:20
				}
				
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				uni.showLoading({
					mask:true,
					title:'正在获取数据'
				})
				var page_now=that.page
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
						if (datas.length == 0) {
							that.data_last = true
							that.isHistoryLoading = false
							return
						}
						
						
						that.page=res.page // 用于续拉，分页续拉时需传入该字段。
						// this.isCompleted = res.data.isCompleted
						that.isHistoryLoading = false
						
						that.$store.commit('unshiftCurrentMessageList', datas)
						
						
						// this.$nextTick(function() {
						// 	this.scrollToView = this.nextReqMessageID;//跳转上次的第一行信息位置
						// 	this.$nextTick(function() {
						// 		this.scrollAnimation = true;//恢复滚动动画
						// 	});	
						// });
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
			// 加载初始页面消息
			getMsgList() {
				// 历史消息列表
				// let id = this.conversationActive.id
				var jkurl="/chat/history"
				var datas={
					token:this.userinfo.token,
					toid:that.toid,
					page:that.page,
					limit:this.count,
					// page:that.page,
					// limit:20
				}
				
				uni.showLoading({
					mask:true,
					title:'正在获取数据'
				})
				var page_now=that.page
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(datas)
						var ConversationActive={
							id:res.classId,
							to_uid:res.user.toInfo.id
						}
						this.$store.commit('updateConversationActive', ConversationActive)
						
						// this.isCompleted = res.data.isCompleted
						if(datas.length>0){
							
							that.$store.commit('pushCurrentMessageList', datas)
							that.page=res.page // 用于续拉，分页续拉时需传入该字段。
							that.scrollToView ='a_'+datas[datas.length - 1].id
						}else{
							
						}
						
							// that.msgList = datas
							
							that.msg_user = res.user
							uni.setNavigationBarTitle({
								title:res.user.toInfo.nick
							})   
							console.log(datas)
							
							
							
						
						
						setTimeout(function() {
							that.scrollTop = 9999;
							// this.$nextTick(function() {
							// 	this.scrollAnimation = true;
							// });
							setTimeout(function() {
								that.scrollAnimation = true;
							}, 10)
						}, 10)
						
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
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content) {
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350); //350是定义消息图片最大宽度
				let maxH = uni.upx2px(350); //350是定义消息图片最大高度
				if (content.w > maxW || content.h > maxH) {
					let scale = content.w / content.h;
					content.w = scale > 1 ? maxW : maxH * scale;
					content.h = scale > 1 ? maxW / scale : maxH;
				}
				return content;
			},
			//更多功能(点击+弹出) 
			showMore() {
				this.isVoice = false;
				this.hideEmoji = true;
				if (this.hideMore) {
					this.hideMore = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer() {
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer() {
				this.popupLayerClass = '';
				setTimeout(() => {
					this.hideMore = true;
					this.hideEmoji = true;
				}, 150);
			},
			// 选择图片发送
			chooseImage() {
				this.getImage('album');
			},
			//拍照发送
			camera() {
				this.getImage('camera');
			},
			//发红包
			handRedEnvelopes() {
				uni.navigateTo({
					url: 'HM-hand/HM-hand'
				});
				this.hideDrawer();
			},
			//选照片 or 拍照
			getImage(type) {
				var that = this
				that.hideDrawer();
				uni.chooseImage({
					sourceType: [type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					count: 1,
					success: (res) => {
						that.sendMsg(res, 'img');
						return
						/*for(let i=0;i<res.tempFilePaths.length;i++){
							uni.getImageInfo({
								src: res.tempFilePaths[i],
								success: (image)=>{
									console.log(image)
									console.log(image.width);
									console.log(image.height);
									let msg = {url:res.tempFilePaths[i],w:image.width,h:image.height};
									that.sendMsg(msg,'img');
								}
							});
						}*/
					}
				});
			},
			// 选择表情
			chooseEmoji() {
				this.hideMore = true;
				if (this.hideEmoji) {
					this.hideEmoji = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em) {
				this.textMsg += em.alt;
			},

			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus() {
				if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
					this.hideDrawer();
				}
			},
			// 发送文字消息
			sendText() {
				// this.hideDrawer();//隐藏抽屉
				if (!this.textMsg) {
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {
					text: content
				}
				this.sendMsg(msg, 'text');
				this.textMsg = ''; //清空输入框
			},
			//替换表情符号为图片 旧
			replaceEmoji_11(str) {
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					console.log("item: " + item);
					for (let i = 0; i < this.emojiList.length; i++) {
						let row = this.emojiList[i];
						for (let j = 0; j < row.length; j++) {
							let EM = row[j];
							if (EM.alt == item) {
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								// let onlinePath = 'http://51daiyan.test.upcdn.net/static_s/51daiyan/img/emoji/'
								let onlinePath = service.imgurl + '/static_s/images/emoji/'
								// let imgstr = '<img class="emoji_i" src="'+onlinePath+this.onlineEmoji[EM.url]+'">';
								let imgstr = '<img class="emoji_i" src="' + onlinePath + EM.url + '">';
								console.log("imgstr: " + imgstr);
								return imgstr;
							}
						}
					}
				});
				return replacedStr;
			},
			//替换表情符号为图片
			replaceEmoji(str) {
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					console.log("item: " + item);
					for (let i = 0; i < this.emojiList.length; i++) {
						var EM=this.emojiList[i]
						if (EM.alt == item) {
							//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
							//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
							// let onlinePath = 'http://51daiyan.test.upcdn.net/static_s/51daiyan/img/emoji/'
							let onlinePath = service.imgurl + '/static_s/images/emoji/'
							// let imgstr = '<img class="emoji_i" src="'+onlinePath+this.onlineEmoji[EM.url]+'">';
							let imgstr = '<img class="emoji_i" src="' + onlinePath + EM.url + '">';
							console.log("imgstr: " + imgstr);
							return imgstr;
						}
					}
				});
				return replacedStr;
			},
			// 发送消息
			sendMsg(content, type) {
				
				console.log('????')
				console.log(content)
				console.log(type)
				let message
				console.log(type)
				if(type=='text'){
					message={
						msg:content.text,
						id:that.toid
					}
				}
				// that._send(message)
				console.log('????1')
				// this.$store.commit('pushCurrentMessageList', message)
				that._send(message)
				
			},

			// 添加文字消息到列表
			addTextMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加语音消息到列表
			addVoiceMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg) {
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.url);
				this.msgList.push(msg);
			},
			addRedEnvelopeMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加系统红包消息到列表
			addSystemRedEnvelopeMsg(msg) {
				this.msgList.push(msg);
			},
		
			sendSystemMsg(content, type) {
				let lastid = this.msgList[this.msgList.length - 1].msg.id;
				lastid++;
				let row = {
					type: "system",
					msg: {
						id: lastid,
						type: type,
						content: content
					}
				};
				this.screenMsg(row)
			},
			//领取详情
			toDetails(rid) {
				uni.navigateTo({
					url: 'HM-details/HM-details?rid=' + rid
				})
			},
			// 预览图片
			showPic(msg) {
				uni.previewImage({
					indicator: "none",
					current: msg.content.url,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(msg) {
				this.playMsgid = msg.id;
				this.AUDIO.src = msg.content.url;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			
			// 切换语音/文字输入
			switchVoice() {
				this.hideDrawer();
				this.isVoice = this.isVoice ? false : true;
			},
			discard() {
				return;
			},
			

			// 选项卡关闭
			handleClose() {
				this.rateModal = false
				this.isFocus = false
				this.isMoreOpen = false
				this.isEmojiOpen = false
			},
			previmg(e) {
				console.log(e)
				var urls = []
				urls.push(e.currentTarget.dataset.url)
				// return
				uni.previewImage({
					urls: urls,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>
<style lang="scss">
	@import "@/static/HM-chat/css/style.scss";

	.msg-list {
		// padding-bottom: 140px;

	}

	.msg-list1 {
		width: 100%;
		padding-bottom: 40upx;
		
	}

	.chat_box {
		width: 500upx;
		display: flex;
	}

	.chat_img {
		width: 240upx;
		height: 240upx;
		margin-right: 20upx;
	}

	.chat_msg {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.gb_name {
		font-size: 28upx;
	}

	.gb_msg {
		font-size: 22upx;
	}

	.ltbox_div {
		line-height: 45upx;
	}

	.emoji_i {
		height: 40upx;
		width: 40upx;
		padding: 2upx;
		box-sizing: border-box;
		vertical-align: text-bottom;
	}

	.other {
		padding-top: 20rpx;
	}

	.msg_time {
		position: relative;
		// height: 1rpx !important;
		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 26upx;
		color: #666;
	}

	.msg_time .time {
		// position: absolute;
		// // top: -40upx;
		// left: 0;
		// right: 0;
		// margin-top: 20upx;
		// margin-bottom: 20upx;
		text-align: center;
		// padding-right: 130rpx;

	}

	.bubble {
		max-width: 80% !important;
	}

	.rong-emoji-content_list {
		display: flex;
		flex-wrap: wrap;
	}

	.rong-emoji-content_li {
		width: 12.5%;
		display: flex;
		justify-content: center;
		margin-bottom: 20rpx;
	}

	.rong-emoji-content_list .rong-emoji-content {
		width: 50upx;
		height: 50upx;
	}

	.msg-list.showLayer {
		padding-top: 45vh;
		transform: translate3d(0, -45vh, 0);
	}
	.clearfix_s::after{
		content: '';
		display: block;
		clear: both;
	}
	.row{
		padding: 20upx 0;
	}
	.content .msg-list .row:first-child{
		margin-top: 0;
	}
	.left,.right{
		position: relative;
	}
	.input-box,.popup-layer{
		background: #fff;
	}
	.input-box{
		border-top: 1px solid #D6D6D6;
	}
	.text-mode .box{
		// width: 506upx;
		height: 71upx;
		background: #F3F3F3;
		border-radius: 36upx;
		box-sizing: border-box;
		padding: 0 30upx;
	}
	.text-mode .box input{
		width: 100%;
		min-width: 0;
	}
	.my .left,.other .right{
		
	}
	.my .left  .msg_time,.other .right .msg_time{
		position: absolute;
		bottom: -40upx;
		font-size: 24upx;
		color: #A1AEBE;
	}
	/deep/ .emoji_i{
		width: 40upx;
		vertical-align: middle;
	}
	.input-box .send .btn{
		background: #fff;
		font-size: 30upx;
		color: #FC8E48;
		font-weight: bold;
	}
</style>
