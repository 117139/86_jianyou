<template>
	<view class="circle">
		<!-- 自定义导航 -->
		<view class="">
			<topbar class="topbar bs" bg_img="/static_xcx/zulog.png" bg_color="#F43B31" text_color="#fff">
				<view class="tobItem bs dis_flex ju_b aic">
					<view class="CT leftC dis_flex_c ju_c aic" @click.top="tab_fuc(1)">
						<text>咨讯</text>
						<image src="/static/images/lzc/index/active.png" mode="aspectFill"
							style="width: 25upx;height: 11upx;" v-if="isZi"></image>
					</view>
					<view class="CT leftC dis_flex_c ju_c aic" @click.top="tab_fuc(2)">
						<text>圈子</text>
						<image src="/static/images/lzc/index/active.png" mode="aspectFill"
							style="width: 25upx;height: 11upx;" v-if="isZi==false"></image>
					</view>
				</view>
			</topbar>
			<!-- 固定位置 -->
			<view class="fixedView" v-if="isClickQuan">
				<view class="fv_item dis_flex aic ju_c" @click.stop="jump" data-url="/pagesB_mxx/My_circle/My_circle">
					<text style="font-size: 48upx;color: #F43B31;" class="iconfont icon-bazi"></text>
					<text>我的圈子</text>
				</view>
				<view class="" style="width: 100%;height: 1px;background-color: #eee;"></view>
				<view class="fv_item dis_flex aic ju_c" @click="jump" :data-url="createCircleUrl">
					<text style="font-size: 28upx;color: #F43B31;" class="iconfont icon-chuangjian"></text>
					<text style="margin-left: 5px;">创建圈子</text>
				</view>
			</view>
			<!-- 导航 -->
			<view class="cbody" v-if="isZi">
				<view class="cnav dis_flex">
					<view class="cnavItem dis_flex_c aic ju_c" @click="cnavClick(0)">
						<text class="cnavText"
							:class="{'cnavTextActive':znavActive==0,'cnavTextActiveNo':znavActive!=0}">热门咨询</text>
						<view class="cnavView" style="" v-if="znavActive==0"></view>
					</view>
					<view class="cnavItem dis_flex_c aic ju_c" v-for="(item,index) in znav" :key="index"
						@click="cnavClick(index+1,item.id)">
						<text class="cnavText"
							:class="{'cnavTextActive':znavActive==index+1,'cnavTextActiveNo':znavActive!=index+1}">{{item.title}}</text>
						<view class="cnavView" style="" v-if="znavActive==index+1"></view>
					</view>
				</view>
				<view class="citem dis_flex" v-for="(item,index) in zList" :key="index" @click="jump"
					:data-url="`${QfDetailsUrl}?id=${item.id}`">
					<view class="ci_img" style="">
						<image :src="getImg(item.img)" mode="aspectFill" lazy-load></image>
					</view>
					<view class="ci_view">
						<view class="ci_topv oh2">
							{{item.title}}
						</view>
						<view class="ci_bottom_v dis_flex ju_b aic">
							<view class="cil"><text>{{item.create_time}}</text></view>
							<view class="cir dis_flex aic"><text
									class="iconfont icon-yanjing"></text><text>{{item.visit}}浏览</text>
							</view>
						</view>
					</view>
				</view>
				<more color="#999" :mode="loadCss.mode" :loadTitle="loadCss.loadTitle" :padding="loadCss.padding"
					v-if="moreTrue"></more>
				<view class="zanwu" v-if="meiyou">没有更多了</view>
			</view>

			<view class="cbody2" v-else>
				<view class="cb1" style=""></view>
				<view class="chea dis_flex aic ju_b">
					<view class="searchView dis_flex aic" @click="jump" :data-url="searchUrl">
						<text class="searchIcon iconfont icon-sousou"></text>
						<text class="searchText">搜索更多精彩内容</text>
					</view>
					<view class="searchRight" @click.stop="QuanClick">
						<image src="/static/images/lzc/index/ren1.png" mode="heightFix"></image>
					</view>
				</view>
				<view class="ctit">
					<text class="ctit_text">推荐的圈子</text>
				</view>
				<!-- 推荐的圈子 -->
				<view class="csl dis_flex ju_b">
					<scroll-view scroll-x="true" class="scroll_x">
						<view>
							<view class="csl_item dis_flex_c aic" v-for="(item,index) in tList" @click="jump"
								:data-url='`/pagesA_lzc/circleDetail/circleDetail?id=${item.id}`'>
								<image class="csl_img" :src="getImg(item.pic)" mode="aspectFill"></image>
								<text class="csl_title">{{item.title}}</text>
								<view class="csl_con oh2">
									<text>{{item.subtitle}}</text>
								</view>
								<view class="csl_num">
									<text class="csl_num_left" style="margin-right: 10upx;">{{item.concerns_number}}</text>
									<text class="csl_num_right">关注</text>
								</view>
							</view>
						</view>
					</scroll-view>

				</view>
				<!-- 推荐nav -->
				<view class="tnav dis_flex ju_b">
					<!-- <view class=" dis_flex ju_c" :class="{'tnitem':tnav.active,'tnavA':tnav.active==false}"
						v-for="(tnav,index) in tnavList" :key="index" @click="tnavClick(index)">
						<text>{{tnav.text}}</text>
						<view class="t_active" v-if="tnav.active"></view>
					</view> -->
					<view class=" dis_flex ju_c" @click="tnavClick(1)"
						:class="{'tnitem':navActive == 1,'tnavA':navActive != 1}">
						<text>{{tnavList[0].text}}</text>
						<view class="t_active" v-if="navActive == 1"></view>
					</view>
					<view class=" dis_flex ju_c" @click="tnavClick(2)"
						:class="{'tnitem':navActive == 2,'tnavA':navActive != 2}">
						<text>{{tnavList[1].text}}</text>
						<view class="t_active" v-if="navActive == 2"></view>
					</view>
					<view class=" dis_flex ju_c" @click="tnavClick(3)"
						:class="{'tnitem':navActive == 3,'tnavA':navActive != 3}">
						<text>{{tnavList[2].text}}</text>
						<view class="t_active" v-if="navActive == 3"></view>
					</view>
				</view>
				<view class="tbody">
					<!-- <view class="tbitem" @click="jump" data-url="/pagesA_lzc/circleDetail2/circleDetail2">
						<view class="tbitem_fl dis_flex aic">
							<image :src="getImg('/static/images/logo.png')" mode="aspectFill"></image>
							<view class="tel">151****5678</view>
							<view class="time">刚刚</view>
							<view class="flex-right isDelText" style="position: absolute;right: 0;" v-if="isZhu">
								<text>可删除</text>
							</view>
						</view>
						<view class="tbitem_sl oh4">
							<text>公司注册时开始创业的第一步，当我们有了项目，开始创业时，会需要用到公司的营业执照及相关资质证书，例如：入住天猫、京东等都需要提供营业执照；跟合作伙伴签合同时</text>
						</view>
						<view class="tbitem_ll dis_flex ju_b">
							<image src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/applvyou/part-002139-1775.jpg"
								mode="center">
								<image
									src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/applvyou/part-002139-1775.jpg"
									mode="center">
									<image
										src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/applvyou/part-002139-1775.jpg"
										mode="center">
						</view>
						<view class="tbFoot dis_flex flex-right">
							<view class="tbFitem dis_flex aic ju_b">
								<view class="left_tb">
									<text class="iconfont icon-pinglun"></text>
									<text class="pinNum">{{pinNum}}</text>
								</view>
								<view class="right_tb" @tap.stop="zan">
									<text class="iconfont icon-zan-" v-if="iszan"></text>
									<text class="iconfont icon-zan" style="color: #F43B31;" v-if="iszan==false"></text>
									<text class="pinNum" :style="{color:iszan?'#ddd':'#F43B31'}">{{zanNum}}</text>
								</view>
			
							</view>
						</view>
					</view> -->
					<view class="tbitem" @click="jump"
						:data-url="`/pagesA_lzc/circleDetail2/circleDetail2?id=${item.id}`"
						v-for="(item,index) in shuju.data" v-if="shuju.length!=0">
						<view class="tbitem_fl dis_flex aic">
							<image :src="getImg(item.img)" mode="aspectFill"></image>
							<view class="tel">{{item.phone}}</view>
							<view class="time">{{item.create_time}}</view>
							<view class="flex-right isDelText" style="position: absolute;right: 0;" v-if="isZhu">
								<text>可删除</text>
							</view>
						</view>
						<view class="tbitem_sl oh4">
							<text>{{item.content}}</text>
						</view>
						<view class="tbitem_ll dis_flex fww">
							<view class="tbitem_ll_img" v-for="(item1,index1) in item.banner">
								<image :src="item1" mode="aspectFill">
							</view>
						</view>
						<view class="tbFoot dis_flex flex-right">
							<view class="tbFitem dis_flex aic ju_b">
								<view class="left_tb">
									<text class="iconfont icon-pinglun"></text>
									<text class="pinNum">{{item.comment}}</text>
								</view>
								<view class="right_tb" @tap.stop="zan(item.id)">

									<text class="iconfont icon-zan-" v-if="item.fans==2"></text>
									<text class="iconfont icon-zan" style="color: #F43B31;" v-if="item.fans==1"></text>
									<text class="pinNum" :style="{color:item.fans==2?'#ddd':'#F43B31'}">{{item.praise}}</text>
								</view>

							</view>
						</view>
					</view>
					<view class="zanwu" v-if="shuju.length == 0">
						<view class="dis_flex_c">
							<text v-if="loginIng">暂无数据</text>
							<button class="btnLogin" size="mini" @click="jump" data-url="/pagesB_mxx/login/login"
								data-haslogin=false v-else>去登录</button>
						</view>

					</view>
					<more color="#999" :mode="loadCss.mode" :loadTitle="loadCss.loadTitle" :padding="loadCss.padding"
						v-if="moreTrue"></more>
					<view class="zanwu" v-if="meiyou">没有更多了</view>
				</view>
			</view>
		</view>
		<!-- <view class="zanwu" v-else>
			服务器异常
		</view> -->
	</view>
</template>

<script>
	import service from '@/components/service.js'
	import topbar from '@/components/top_bar/top_bar.vue'
	import more from '@/components/more/more.vue'
	export default {
		components: {
			topbar,
			more
		},
		data() {
			return {
				meiyou: false,
				//更多
				loadCss: {
					mode: "loading2",
					status: "normal",
					showTitle: false,
					color: "#999",
					textColor: "#999",
					textSize: "20rpx",
					padding: "30rpx",
					loadTitle: {
						down: "1111",
						loading: "",
						normal: "1111"
					}
				},
				/* navActive */
				navActive: 1,
				moreTrue: false,
				fu1: true,
				isLogin: false,
				isActive: 0,
				znavActive: 0,
				shuju: [],
				/* 是否是圈子主页 */
				isZhu: false,
				noActive: false,
				isZi: false,
				pinNum: 200,
				zanNum: 200,
				iszan: true,
				znav: [{
						text: '热门咨询',
						active: true
					},
					{
						text: '服务攻略',
						active: false
					}
				],
				/* 搜索地址 */
				searchUrl: '/pagesB_mxx/serch_circle/serch_circle',
				createCircleUrl: '/pagesA_lzc/createCircle/createCircle',
				QfDetailsUrl: '/pagesA_lzc/QfDetails/QfDetails',
				isClickQuan: false,
				tnavList: [{
						text: '精选',
						active: true
					},
					{
						text: '关注',
						active: false
					},
					{
						text: '发现',
						active: false
					}
				],
				zList: [],
				jingSuo: true,
				tList: [],
				listSuo: true,
				shuju: [],
				loginIng: false,
				MyPage: 1,
				myType: 1,
				/* 咨询圈子切换锁 */
				navTrue: false,
				/* 赞锁 */
				zansTrue: false,
				tab_fuc_active: 2,
				circleTrue: false,
				ziTrue: false
			}
		},
		onLoad() {

		},
		
		onHide: () => {},
		onShow() {
			console.log("你好啊");
			this.isClickQuan = false;
			if (this.$store.state.hasLogin) {
				this.loginIng = true;
			} else {
				this.loginIng = false;
			}
			this.getHot();
			this.getHotTui();
			this.getJing();
		},
		onReachBottom() {
			console.log('触底了')
			this.moreTrue = true;
			if (this.tab_fuc_active == 2) {
				this.moreCircle();
			} else {
				this.moreZi()
			}

		},
		onPullDownRefresh() {
			this.navTrue = true;
			this.shuax()
			this.meiyou = false;
			this.znavActive = 0;
			if (this.shuax() == "完成") {
				this.navTrue = false;
				uni.stopPullDownRefresh();
			}
		},

		methods: {
			getImg(img) {
				return service.getimg(img);
			},
			jump(e) {
				console.log(e);
				return service.jump(e)
			},
			toXian(i) {

			},
			/*切换tab  */
			tab_fuc(index) {
				this.tab_fuc_active = index;
				if (this.navTrue) {
					return
				}
				this.navTrue = true;
				console.log(index)
				this.isClickQuan = false;

				if (index == 1) {
					this.isZi = true
					service.P_post("news/classify").then((res) => {
						if (res.code == 1) {
							this.znav = res.data;
							this.navTrue = false;
						} else {
							this.navTrue = false;
							uni.showToast({
								title: `${res.msg},请联系管理员`,
								icon: "none"
							})
						}
					}).catch((e) => {
						this.navTrue = false;
						uni.showToast({
							title: `服务器异常,请联系管理员`,
							icon: "none"
						})
					})
				} else {
					this.isZi = false
					this.navTrue = false;
					// uni.showToast({
					// 	title: `${res.msg},请联系管理员`,
					// 	icon: "none"
					// })
				}
			},
			
			
			tnavClick(index) {

				if (!this.listSuo) {
					return
				}
				this.listSuo = false
				this.MyPage = 1;
				this.myType = index;
				this.navActive = index;
				service.P_post("circle/recommend_post", {
					type: index,
					page: 1,
					limit: 3
				}).then((res) => {
					if (res.code == 1) {
						this.shuju = res.data;
						this.listSuo = true;
					} else {
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					uni.showToast({
						title: '服务器错误',
						icon: 'none'
					})
				})

			},
			cnavClick(index, id) {
				this.znavActive = index;
				console.log(id)
				if (index == 0) {
					service.P_post("news/list", {
						limit: 5,
						page: 1,
						hot: 1
					}).then((res) => {
						console.log(res)
						if (res.code == 1) {
							this.zList = res.data.data;
						} else {
							uni.showToast({
								title: `${res.msg},请联系管理员`,
								icon: "none"
							})
						}
					}).catch((e) => {
						uni.showToast({
							title: '服务器错误',
							icon: 'none'
						})
					})
				} else {
					service.P_post("news/list", {
						limit: 8,
						page: 1,
						pid: id
					}).then((res) => {
						console.log(res)
						if (res.code == 1) {
							this.zList = res.data.data;
						} else {
							uni.showToast({
								title: `${res.msg},请联系管理员`,
								icon: "none"
							})
						}
					}).catch((e) => {
						uni.showToast({
							title: '服务器错误',
							icon: 'none'
						})
					})
				}
			},
			zan(id) {
				if (this.zansTrue) {
					return
				}
				this.zansTrue = true;
				service.P_post("circle/follow_post", {
					id: id
				}).then((res) => {
					console.log(res)
					if (res.code == 1) {
						service.P_post("circle/recommend_post", {
							type: this.myType,
							page: 1
						}, {
							token: uni.getStorageSync('token')
						}).then((res) => {
							this.moreTrue = false;
							if (res.code == 1) {
								this.zansTrue = false;
								this.shuju = res.data;
							} else {
								uni.showToast({
									title: `${res.msg},请联系管理员`,
									icon: "none"
								})
							}
						}).catch((e) => {
							this.zansTrue = false;
							uni.showToast({
								title: '服务器错误',
								icon: 'none'
							})
						})
					} else {
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					uni.showToast({
						title: '服务器错误',
						icon: 'none'
					})
				})
			},
			QuanClick() {
				this.isClickQuan = !this.isClickQuan;
			},
			getHot() {
				service.P_post("news/list", {
					limit: 5,
					page: 1,
					hot: 1
				}).then((res) => {
					console.log(res)
					if (res.code == 1) {
						this.zList = res.data.data;
					} else {
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					uni.showToast({
						title: "服务器异常",
						icon: "none"
					})
				})
			},
			getHotTui() {
				service.P_post('/circle/recommend_circle').then((res) => {
					if (res.code == 1) {
						console.log(res, "热门推荐")
						this.tList = res.data;
					} else {
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					uni.showToast({
						title: "服务器异常",
						icon: "none"
					})
				})
			},
			getJing() {
				service.P_post("circle/recommend_post", {
					type: 1,
					page: 1,
					limit: 3
				}).then((res) => {
					if (res.code == 1) {
						this.shuju = res.data;
					} else {
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					uni.showToast({
						title: "服务器异常",
						icon: "none"
					})
				})
			},
			moreCircle() {
				if (this.circleTrue) {
					return
				}
				this.circleTrue = true;
				service.P_post("circle/recommend_post", {
					type: this.myType,
					page: this.MyPage,
					limit: 3
				}).then((res) => {
					this.moreTrue = false;
					if (res.code == 1) {
						this.circleTrue = false;
						if (res.data.data.length != 0) {
							this.MyPage++
							for (var i = 0; i < res.data.data.length; i++) {
								this.shuju.data.push(res.data.data[i])
							}
						} else {
							console.log('到底了')
							this.meiyou = true;
						}

					} else {
						this.circleTrue = false;
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					this.circleTrue = false;
					uni.showToast({
						title: "服务器异常",
						icon: "none"
					})
				})
			},
			moreZi() {
				if (this.circleTrue) {
					return
				}
				this.ziTrue = true;
				service.P_post("news/list", {
					limit: 2,
					page: this.MyPage,
					pid: 23
				}).then((res) => {
					if (res.code == 1) {
						this.moreTrue = false;
						let more = res.data.data;
						this.ziTrue = false;
						if (more.length != 0) {
							this.MyPage++
							for (var i = 0; i < more.length; i++) {
								this.zList.push(more[i])
							}
						} else {
							console.log('到底了')
							this.meiyou = true;
						}
					} else {
						this.ziTrue = false;
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					this.ziTrue = false;
					uni.showToast({
						title: "服务器异常",
						icon: "none"
					})
				})
			},
			shuax() {
				this.isClickQuan = false;
				this.MyPage = 1;
				this.navActive = 1;
				this.getHot();
				this.getHotTui();
				this.getJing();

				/* 精选 */

				return "完成";
			}
		}
	}
</script>

<style scoped lang="scss">
	@import url("/static/css/lzc/commin.scss");

	// .status_bar {
	// 	height: var(--status-bar-height);
	// 	width: 100%;
	// 	background-color: #F43B31;
	// }
	.btnLogin {
		background-color: #F43B31;
		color: #fff;
	}

	.circle {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;

		.fixedView {
			width: 200upx;
			height: 187upx;
			background: #fff;
			box-shadow: 0upx 8upx 16upx 0upx rgba(237, 238, 244, 0.5);
			position: fixed;
			top: 270upx;
			right: 30upx;
			z-index: 999;

			.fv_item {
				width: 100%;
				height: 93upx;
			}
		}

		.topbar {
			width: 750upx;
			// height: 106upx;
			margin-left: -2upx;
			background-color: #F43B31;

			.tobItem {
				width: 750upx;
				height: 100%;
				padding: 0 224upx;

				.CT {
					// width: 63upx;
					// height: 31upx;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}

				.leftC {
					// width: 63upx;
					height: 100%;
					position: relative;

					text {
						margin-bottom: 18upx;
					}

					image {
						position: absolute;
						bottom: 0;
					}
				}
			}
		}

		/* 咨询 */
		.cbody {
			width: 750upx;

			.cb1 {
				width: 750upx;
				height: var(--status-bar-height);
				background-color: #F43B31;
				// margin-top: var(--status-bar-height);
				margin-left: -2upx;
				z-index: 100;
			}

			.cnav {
				width: 750upx;
				height: 74upx;
				margin-top: var(--status-bar-height);
				background-color: #fff;
				border-top-left-radius: 20upx;
				border-top-right-radius: 20upx;
				margin-left: -1upx;
				border-bottom: 1px solid #eee;
				padding: 0 30upx;

				.cnavItem {
					width: 20%;
					height: 100%;
					// background-color: #389EF6;
					position: relative;

					.cnavTextActive {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 36upx;
					}

					.cnavTextActiveNo {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #BBBBBB;
						line-height: 36upx;
					}

					.cnavView {
						width: 102upx;
						height: 5upx;
						background-color: rgba(244, 59, 49, 1);
						position: absolute;
						bottom: 0;
						border-radius: 5px 5px 0px 0px;
					}
				}
			}

			.citem {
				width: 750upx;
				height: 190upx;
				box-sizing: border-box;
				// margin-top:30upx;
				padding: 24upx 45upx 24upx 30upx;
				border-bottom: 1px solid #eee;

				.ci_img {
					width: 208upx;
					height: 142upx;
					// background-color: #007AFF;
					border-radius: 10upx;

					image {
						width: 208upx;
						height: 142upx;
						border-radius: 10upx;
					}
				}

				.ci_view {
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					padding: 15upx 0 0 35upx;
					position: relative;

					.ci_topv {
						width: 100%;
						// height: 61upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 36upx;
					}

					.ci_bottom_v {
						width: 100%;
						height: 16upx;
						position: absolute;
						box-sizing: border-box;
						padding-left: 35upx;
						bottom: 0;
						left: 0;
						font-size: 20upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #BBBBBB;
						line-height: 36upx;
					}
				}
			}
		}

		/* 圈子 */
		.cbody2 {
			width: 750upx;

			.cb1 {
				width: 750upx;
				background-color: #F43B31;
				// margin-top: var(--status-bar-height);
				margin-left: -2upx;
			}

			.chea {
				width: 750upx;
				// height: 132upx;
				margin-top: var(--status-bar-height);
				background-color: #fff;
				border-top-left-radius: 20upx;
				border-top-right-radius: 20upx;
				margin-left: -1upx;
				padding: 28upx 30upx 34upx 30upx;
				// z-index: 1000;

				.searchView {
					width: 595upx;
					height: 70upx;
					background: #F8F8F8;
					border-radius: 35upx;
					box-sizing: border-box;
					padding: 21upx 24upx;

					.searchIcon {
						font-size: 28upx;
						color: #BBBBBB;
					}

					.searchText {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #BBBBBB;
						margin-left: 10upx;
					}
				}

				.searchRight {
					width: 69upx;
					height: 69upx;

					image {
						width: 69upx;
						height: 69upx;
					}
				}
			}

			.ctit {
				width: 750upx;
				height: 31upx;
				// background-color: #007AFF;
				box-sizing: border-box;
				padding: 0 30upx;

				.ctit_text {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
				}
			}

			.csl {
				width: 750upx;
				height: 304upx;
				// background-color: #389EF6;
				box-sizing: border-box;
				padding: 0 30upx;
				margin-top: 32upx;
				position: relative;
				.csl_item+.csl_item{
					margin-left: 20upx;
				}
				.csl_item {
					width: 220upx;
					height: 304upx;
					background: #FFFFFF;
					// border: 1upx solid #EEEEEE;
					border-radius: 10upx;
					box-sizing: border-box;
					padding: 30upx 28upx;
					box-shadow: 0px 8upx 16upx 0px rgba(237, 238, 244, 0.5);
					display: inline-flex;
					.csl_img {
						width: 88upx;
						height: 88upx;
					}

					.csl_title {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						margin-top: 19upx;
					}

					.csl_con {
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 36upx;
						margin-top: 18upx;
					}

					.csl_num {
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 30upx;
						position: absolute;
						bottom: 15upx;
					}

				}
			}

			/* 推荐nav */
			.tnav {
				width: 375upx;
				height: 45upx;
				// background-color: #FF2941;
				box-sizing: border-box;
				padding-left: 30upx;
				margin-top: 47upx;

				.tnitem {
					// width: 33.3%;
					height: 100%;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 38upx;
					color: #333333;
					// background-color: #2C405A;
					position: relative;

					.tnitemA {
						height: 100%;
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 38upx;
						color: #333333;
						// background-color: #2C405A;
						position: relative;
					}

					.t_active {
						width: 40upx;
						height: 4upx;
						background: #F43B31;
						border-radius: 2upx;
						position: absolute;
						bottom: 0;
					}
				}
			}

			.tbody {
				width: 750upx;
				box-sizing: border-box;
				padding: 0 30upx;
				margin-top: 23upx;

				.tbitem {
					width: 690upx;
					// height: 592upx;
					background-color: #fff;
					box-sizing: border-box;
					padding: 28upx 27upx 28upx 20upx;
					box-shadow: 0px 8upx 16upx 0px rgba(237, 238, 244, 0.5);
					margin-bottom: 30upx;

					.isDelText {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
					}

					.tbitem_fl {
						width: 100%;
						height: 40upx;
						position: relative;

						// background-color: #F0AD4E;
						image {
							width: 40upx;
							height: 40upx;
							border-radius: 50%;
						}

						.tel {
							font-size: 22upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							margin-left: 10upx;
						}

						.time {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
							margin-left: 22upx;
						}
					}

					.tbitem_sl {
						width: 100%;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 48upx;
						margin-top: 26upx;
					}

					.tbitem_ll {
						width: 100%;
						// height: 207upx;
						.tbitem_ll_img{
							width: 33%;
							max-width: 230upx;
							height: 227upx;	
							padding:10upx;
							image {
								width: 100%;
								height: 100%;
								border-radius: 4px;
							}
						}

						
					}

					.tbFoot {
						width: 100%;
						height: 26upx;
						margin-bottom: 32upx;

						// background-color: #112288;
						.tbFitem {
							width: 200upx;
							height: 100%;
							// background-color: #007AFF;
							font-size: 24upx;
							font-family: Arial;
							font-weight: 400;
							color: #DDDDDD;
							line-height: 48upx;
							margin-top: 30upx;

							.pinNum {
								margin-left: 10upx;
							}
						}
					}
				}
			}
		}
	}

	.yuanhu {
		width: 25upx;
		height: 11px;
		background-color: transparent;
		border-bottom-right-radius: 90px;
		border-bottom-left-radius: 90px;
		/*增加了边框，圆角半径也要变化*/
		border-left: 10px solid black;
		/*边框左边线*/
		border-right: 10px solid black;
		/*边框右边线*/
		border-bottom: 10px solid black;
		/*边框底边线*/
	}

	.tnavA {
		height: 100%;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 38upx;
		color: #999999;
		// background-color: #2C405A;
		position: relative;
	}
</style>
