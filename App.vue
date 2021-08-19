<script>
	import Vue from 'vue'
	import service from './components/service.js'
	import amap from './common/amap-wx.js'; 
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that, int_websc
	var gd_key = 'ec234dda8445d5c272b0141711ecb372'
	export default {
		onLaunch: function() {
			// #ifdef H5
			// var token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozNCwiYXVkIjoiWV8iLCJpYXQiOjE2MjgxNjA5MDYsIm5iZiI6MTYyODE2MDkwNiwiZXhwIjoxNjI4NzY1NzA2fQ.Ob9LHvWI_rvbxk7jHmwJ2LOtOzy4A7PLdXbh8TcGjT0'
			// uni.setStorageSync('token',token)
			// #endif
			// #ifdef APP-PLUS
				plus.screen.lockOrientation("portrait-primary");
			// #endif
			uni.onTabBarMidButtonTap((e) => {
				uni.navigateTo({
					url:'/pagesA_lzc/fabu/fabu'
				})
			})
			that = this
			console.log('App Launch');
			
			uni.getSystemInfo({
				success: function(e) {
					that.setplatform(e.platform)
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			// #ifndef H5
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					console.log('当前位置：');
					console.log(res);
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);

				}
			});
			var myAmapFun = new amap.AMapWX({
				key: gd_key
			});
			myAmapFun.getRegeo({
				success: (data) => {
					console.log(data)
					// that.addressName = data[0].name;  
					// that.city = data[0].name;  
					// uni.hideLoading();  
					that.setadd(data[0])
				},
				fail: (data) => {
					console.log(data)
					// uni.hideLoading();  
				}
			});
			// wx.onLocationChange(_locationChangeFn)
			
			
			// #endif
			service.wxlogin('token')
		},
		onShow: function() {
			console.log('App Show')
		},
		onInit() {

		},
		onHide: function() {
			console.log('App Hide')
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','socketOpen','socketMsgQueue','ws_url']),
		},
		mounted() {
			uni.onSocketOpen(function (res) {
				 console.log('WebSocket 已连接！');
				 clearInterval(int_websc);
			 //  // socketOpen = true;
				that.setSocketOpen(true)
			 //  for (var i = 0; i < that.socketMsgQueue.length; i++) {
			 //    that.sendSocketMessage(that.socketMsgQueue[i]);
			 //  }
			  // socketMsgQueue = [];
				var msg={
					msg:"",
					id:"ping"
				}
				that._send(msg)
				int_websc=setInterval(function(){
					var msg={
						msg:"",
						id:"ping"
					}
					that._send(msg)
				},20000)
			});
			uni.onSocketError(function (res) {
				clearInterval(int_websc);
			  console.log('WebSocket连接打开失败，请检查！');
				int_websc=setInterval(function(){
					uni.connectSocket({
					  url: that.ws_url
					});
				},20000)
			});
			uni.onSocketMessage(function (res) {
			  // console.log('收到服务器内容：' + res.data);
				var json=JSON.parse(res.data)
				// console.log(json)
				if(json.code==0){
					uni.showToast({
						icon:'none',
						title:json.msg
					})
				}else{
					if(json.data.type==-1||json.data.type==-2||json.data.type==0){
						// console.log(json)
					}else{
						uni.showTabBarRedDot({
							index: 2
						})
						//操作
						that.getdata()
						that.$store.commit("pushCurrentMessageList", json.data);
					}
				}
			});
			uni.onSocketClose(function (res) {
				clearInterval(int_websc);
			  console.log('WebSocket 已关闭！');
				int_websc=setInterval(function(){
					if(that.hasLogin){
						uni.connectSocket({
						  url: that.ws_url
						});
					}else{
						clearInterval(int_websc);
					}
					
				},20000)
				
			});
		},
		methods: {
			...mapMutations(['login','setadd','setSocketOpen','_send','setplatform']),
			getdata(){
				var jkurl="/chat/list"
				var datas={
					token:this.userinfo.token,
					// page:that.page,
					// limit:20
				}
				
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
					
						var messageList = datas
						
						this.$store.commit("updateConversationList", datas);
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
		},
	}
</script>
<style lang="scss">
	/*每个页面公共css */
	@import 'styles/base.scss';
	@import url("/common/iconfont.css");

	

	.uni-swiper-slides {
		height: 300rpx;
	}


	.hidden {
		display: none;
	}

	z-index8 {
		z-index: 8;
	}

	.zanwu {
		width: 100%;
		line-height: 240rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999;
	}

	view {
		box-sizing: border-box;
		font-family: PingFang SC;
	}

	.dis_flex {
		/*  #ifndef APP-PLUS-NVUE  */
		display: flex;
		/*  #endif  */
	}

	.dis_flex_c {
		/*  #ifndef APP-PLUS-NVUE  */
		display: flex;
		/*  #endif  */
		flex-direction: column;
	}

	.aic {
		align-items: center;
	}

	.ais {
		align-items: stretch;
	}

	.aift {
		align-items: flex-start;
	}

	.aife {
		align-items: flex-end;
	}

	.ju_a {
		justify-content: space-around;
	}

	.ju_b {
		justify-content: space-between;
	}

	.ju_c {
		justify-content: center;
	}

	.flex_1 {
		flex: 1;
	}

	.flex_0 {
		flex: none;
	}
	.fww{
		flex-wrap: wrap;
	}
	.oh1 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.oh2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

	}

	view {
		word-break: break-all;

		word-wrap: break-word;
	}

	.oh3 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.oh4 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}

	.data_last {
		line-height: 100rpx;
		text-align: center;
		width: 100%;
		font-size: 24rpx;
		color: #666;
	}

	.data_null {
		width: 480upx;
		height: 480upx;
		margin-top: 260upx;
	}



	.xmfwb_box image,
	.xmfwb_box img,
	.xmfwb_box table,
	rich-text p,
	rich-text img,
	rich-text table {
		max-width: 100% !important;
	}

	.xcx_fwb_img {
		max-width: 100% !important;
	}
	

	.loading_def {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
	}

	.loading_def_img {
		width: 200rpx !important;
		height: 200rpx !important
	}

	.minh100 {
		width: 100%;
		min-height: 100vh;
		background: #fff;
		box-sizing: border-box;
	}


	.scroll_x {
		width: 100%;
		white-space: nowrap;
	}
	
	
	
	
	.jgg_img{
		width: 33%;
		position: relative;
		height: 0;
		padding-top: 33%;
	}
	.jgg_img image{
		position: absolute;
		top: 5upx;
		left: 5upx;
		right: 5upx;
		bottom: 5upx;
		width: calc(100% - 10upx);
		height: calc(100% - 10upx);
	}
</style>
