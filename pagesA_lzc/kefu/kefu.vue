<template>
	<view>
		<view class="container" :style="{height:`${heightCon}upx`}">
			<scroll-view class="content" :scroll-y="true" :scroll-top="scrollTop" :scroll-into-view="scrollToView">
				<view class="news" style="" v-for="(item,index) in msgList" :key="index" v-if="" :id="`mag${item.id}`">

					<view class="dis_flex aic flex-left" v-if="item.info.uid == 1">
						<image class="hpicImg" :src="getimg(item.info.hpic)" mode="widthFix"></image>
						<text class="news2" v-html="item.con.text" />
					</view>
					<view class="dis_flex aic flex-right" v-if="item.info.uid == 0" @click="jump"
						data-url="/pagesA_lzc/fuIndex/fuIndex">
						<!-- <text class="news1">{{item.con.text}}</text> -->
						<text class="news1" v-html="item.con.text" />
						<image class="hpicImg" :src="getimg(item.info.hpic)" mode="widthFix"></image>
					</view>
					<view class="fs12 data" style=""><text>{{item.con.time}}</text></view>
				</view>
			</scroll-view>
		</view>
		<view class="dis_flex_c bottom-textarea" :style="{bottom:inputBottom+'upx'}">
			<view class="dis_flex aic bt1 ju_a">
				<textarea v-model="textMag" :maxlength="-1" :auto-height="true" :show-confirm-bar="false"
					:cursor-spacing="10" :fixed="true" auto-blur :adjust-position="false" @focus="focusTextarea"
					@blur="blurTextarea" placeholder="谢谢您的称赞呀" placeholder-style="" />
				<image style="width: 55upx;height: 55upx;margin: 0 29upx;min-width: 55upx;" @click.stop="biaoqingClick"
					:src="getimg('/static/images/lzc/index/biao.png')" mode="heightFix"></image>
				<view class="sendBtn" @click.stop="sendView">发送</view>
			</view>
			<view class="" style="width: 750upx;height: 250upx;background-color: #fff;margin-left: 30upx;" v-if="chou">
				<swiper class="emoji-swiper" vertical duration="200" circular>
					<swiper-item v-for="(page,pid) in emojiList" :key="pid" style="overflow: inherit;">
						<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
							<image mode="widthFix" :src="'/static/images/lzc/emoji/'+em.url"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
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
				triggered: true,
				records: [],
				recordInput: "",
				scrollTop: 0,
				scrollToView: '',
				inputBottom: 0,
				inputBottom1: 0,
				chou: false,
				textMag: '',
				contact: '',
				heightCon: 0,
				msgList: [{
						id: 1,
						info: {
							uid: 1,
							hpic: '/static/images/logo.png',
							name: '客服'
						},
						type: 'text',
						con: {
							text: '你的作品真的好棒啊',
							time: '2021-12-11 16:15'
						}
					}, {
						id: 2,
						info: {
							uid: 0,
							hpic: '/static/images/logo.png',
							name: 'hello'
						},
						type: 'text',
						con: {
							text: '谢谢夸奖',
							time: '2021-12-11 16:15'
						}
					},


				],
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
				emojiList: [
					[{
						"url": "100.gif",
						alt: "[微笑]"
					}, {
						"url": "101.gif",
						alt: "[伤心]"
					}, {
						"url": "102.gif",
						alt: "[美女]"
					}, {
						"url": "103.gif",
						alt: "[发呆]"
					}, {
						"url": "104.gif",
						alt: "[墨镜]"
					}, {
						"url": "105.gif",
						alt: "[哭]"
					}, {
						"url": "106.gif",
						alt: "[羞]"
					}, {
						"url": "107.gif",
						alt: "[哑]"
					}, {
						"url": "108.gif",
						alt: "[睡]"
					}, {
						"url": "109.gif",
						alt: "[哭]"
					}, {
						"url": "110.gif",
						alt: "[囧]"
					}, {
						"url": "111.gif",
						alt: "[怒]"
					}, {
						"url": "112.gif",
						alt: "[调皮]"
					}, {
						"url": "113.gif",
						alt: "[笑]"
					}, {
						"url": "114.gif",
						alt: "[惊讶]"
					}, {
						"url": "115.gif",
						alt: "[难过]"
					}, {
						"url": "116.gif",
						alt: "[酷]"
					}, {
						"url": "117.gif",
						alt: "[汗]"
					}, {
						"url": "118.gif",
						alt: "[抓狂]"
					}, {
						"url": "119.gif",
						alt: "[吐]"
					}, {
						"url": "120.gif",
						alt: "[笑]"
					}, {
						"url": "121.gif",
						alt: "[快乐]"
					}, {
						"url": "122.gif",
						alt: "[奇]"
					}, {
						"url": "123.gif",
						alt: "[傲]"
					}],
					[{
						"url": "124.gif",
						alt: "[饿]"
					}, {
						"url": "125.gif",
						alt: "[累]"
					}, {
						"url": "126.gif",
						alt: "[吓]"
					}, {
						"url": "127.gif",
						alt: "[汗]"
					}, {
						"url": "128.gif",
						alt: "[高兴]"
					}, {
						"url": "129.gif",
						alt: "[闲]"
					}, {
						"url": "130.gif",
						alt: "[努力]"
					}, {
						"url": "131.gif",
						alt: "[骂]"
					}, {
						"url": "132.gif",
						alt: "[疑问]"
					}, {
						"url": "133.gif",
						alt: "[秘密]"
					}, {
						"url": "134.gif",
						alt: "[乱]"
					}, {
						"url": "135.gif",
						alt: "[疯]"
					}, {
						"url": "136.gif",
						alt: "[哀]"
					}, {
						"url": "137.gif",
						alt: "[鬼]"
					}, {
						"url": "138.gif",
						alt: "[打击]"
					}, {
						"url": "139.gif",
						alt: "[bye]"
					}, {
						"url": "140.gif",
						alt: "[汗]"
					}, {
						"url": "141.gif",
						alt: "[抠]"
					}, {
						"url": "142.gif",
						alt: "[鼓掌]"
					}, {
						"url": "143.gif",
						alt: "[糟糕]"
					}, {
						"url": "144.gif",
						alt: "[恶搞]"
					}, {
						"url": "145.gif",
						alt: "[什么]"
					}, {
						"url": "146.gif",
						alt: "[什么]"
					}, {
						"url": "147.gif",
						alt: "[累]"
					}],
					[{
						"url": "148.gif",
						alt: "[看]"
					}, {
						"url": "149.gif",
						alt: "[难过]"
					}, {
						"url": "150.gif",
						alt: "[难过]"
					}, {
						"url": "151.gif",
						alt: "[坏]"
					}, {
						"url": "152.gif",
						alt: "[亲]"
					}, {
						"url": "153.gif",
						alt: "[吓]"
					}, {
						"url": "154.gif",
						alt: "[可怜]"
					}, {
						"url": "155.gif",
						alt: "[刀]"
					}, {
						"url": "156.gif",
						alt: "[水果]"
					}, {
						"url": "157.gif",
						alt: "[酒]"
					}, {
						"url": "158.gif",
						alt: "[篮球]"
					}, {
						"url": "159.gif",
						alt: "[乒乓]"
					}, {
						"url": "160.gif",
						alt: "[咖啡]"
					}, {
						"url": "161.gif",
						alt: "[美食]"
					}, {
						"url": "162.gif",
						alt: "[动物]"
					}, {
						"url": "163.gif",
						alt: "[鲜花]"
					}, {
						"url": "164.gif",
						alt: "[枯]"
					}, {
						"url": "165.gif",
						alt: "[唇]"
					}, {
						"url": "166.gif",
						alt: "[爱]"
					}, {
						"url": "167.gif",
						alt: "[分手]"
					}, {
						"url": "168.gif",
						alt: "[生日]"
					}, {
						"url": "169.gif",
						alt: "[电]"
					}, {
						"url": "170.gif",
						alt: "[炸弹]"
					}, {
						"url": "171.gif",
						alt: "[刀子]"
					}],
					[{
						"url": "172.gif",
						alt: "[足球]"
					}, {
						"url": "173.gif",
						alt: "[瓢虫]"
					}, {
						"url": "174.gif",
						alt: "[翔]"
					}, {
						"url": "175.gif",
						alt: "[月亮]"
					}, {
						"url": "176.gif",
						alt: "[太阳]"
					}, {
						"url": "177.gif",
						alt: "[礼物]"
					}, {
						"url": "178.gif",
						alt: "[抱抱]"
					}, {
						"url": "179.gif",
						alt: "[拇指]"
					}, {
						"url": "180.gif",
						alt: "[贬低]"
					}, {
						"url": "181.gif",
						alt: "[握手]"
					}, {
						"url": "182.gif",
						alt: "[剪刀手]"
					}, {
						"url": "183.gif",
						alt: "[抱拳]"
					}, {
						"url": "184.gif",
						alt: "[勾引]"
					}, {
						"url": "185.gif",
						alt: "[拳头]"
					}, {
						"url": "186.gif",
						alt: "[小拇指]"
					}, {
						"url": "187.gif",
						alt: "[拇指八]"
					}, {
						"url": "188.gif",
						alt: "[食指]"
					}, {
						"url": "189.gif",
						alt: "[ok]"
					}, {
						"url": "190.gif",
						alt: "[情侣]"
					}, {
						"url": "191.gif",
						alt: "[爱心]"
					}, {
						"url": "192.gif",
						alt: "[蹦哒]"
					}, {
						"url": "193.gif",
						alt: "[颤抖]"
					}, {
						"url": "194.gif",
						alt: "[怄气]"
					}, {
						"url": "195.gif",
						alt: "[跳舞]"
					}],
					[{
						"url": "196.gif",
						alt: "[发呆]"
					}, {
						"url": "197.gif",
						alt: "[背着]"
					}, {
						"url": "198.gif",
						alt: "[伸手]"
					}, {
						"url": "199.gif",
						alt: "[耍帅]"
					}, {
						"url": "200.png",
						alt: "[微笑]"
					}, {
						"url": "201.png",
						alt: "[生病]"
					}, {
						"url": "202.png",
						alt: "[哭泣]"
					}, {
						"url": "203.png",
						alt: "[吐舌]"
					}, {
						"url": "204.png",
						alt: "[迷糊]"
					}, {
						"url": "205.png",
						alt: "[瞪眼]"
					}, {
						"url": "206.png",
						alt: "[恐怖]"
					}, {
						"url": "207.png",
						alt: "[忧愁]"
					}, {
						"url": "208.png",
						alt: "[眨眉]"
					}, {
						"url": "209.png",
						alt: "[闭眼]"
					}, {
						"url": "210.png",
						alt: "[鄙视]"
					}, {
						"url": "211.png",
						alt: "[阴暗]"
					}, {
						"url": "212.png",
						alt: "[小鬼]"
					}, {
						"url": "213.png",
						alt: "[礼物]"
					}, {
						"url": "214.png",
						alt: "[拜佛]"
					}, {
						"url": "215.png",
						alt: "[力量]"
					}, {
						"url": "216.png",
						alt: "[金钱]"
					}, {
						"url": "217.png",
						alt: "[蛋糕]"
					}, {
						"url": "218.png",
						alt: "[彩带]"
					}, {
						"url": "219.png",
						alt: "[礼物]"
					}, ]
				],
			};
		},
		onReady() {
			this.heightCon = uni.getSystemInfoSync().windowHeight * 2;
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
			
			shangLa1() {
				let msgList = [{
						id: 1,
						info: {
							uid: 1,
							hpic: '/static/images/logo.png',
							name: '客服'
						},
						type: 'text',
						con: {
							text: '你的作品真的好棒啊',
							time: '2021-12-11 16:15'
						}
					}, {
						id: 2,
						info: {
							uid: 0,
							hpic: '/static/images/logo.png',
							name: 'hello'
						},
						type: 'text',
						con: {
							text: '谢谢夸奖',
							time: '2021-12-11 16:15'
						}
					}, {
						id: 3,
						info: {
							uid: 1,
							hpic: '/static/images/logo.png',
							name: '客服'
						},
						type: 'text',
						con: {
							text: '你的作品真的好棒啊',
							time: '2021-12-11 16:15'
						}
					},
					{
						id: 4,
						info: {
							uid: 1,
							hpic: '/static/images/logo.png',
							name: '客服'
						},
						type: 'text',
						con: {
							text: '你的作品真的好棒啊',
							time: '2021-12-11 16:15'
						}
					},
					
					{
						id: 5,
						info: {
							uid: 0,
							hpic: '/static/images/logo.png',
							name: 'hello'
						},
						type: 'text',
						con: {
							text: '谢谢夸奖',
							time: '2021-12-11 16:15'
						}
					},
					{
						id: 6,
						info: {
							uid: 0,
							hpic: '/static/images/logo.png',
							name: 'hello'
						},
						type: 'text',
						con: {
							text: '谢谢夸奖',
							time: '2021-12-11 16:15'
						}
					}
				]
				this.msgList = msgList;
				let id = this.msgList[this.msgList.length - 1].id;
				this.scrollToView = `mag${id}`;
			},
			topScroll(e) {
				console.log(1111)
			},
			focusTextarea(e) {
				this.chou = false;
				this.inputBottom = e.detail.height * 2 + 30;
				// this.inputBottom1 = e.detail.height * 2 + 70;
				this.inputBottom1 = e.detail.height * 2 + 30;
				let id = this.msgList[this.msgList.length - 1].id;
				this.$nextTick(() => {
					console.log(id)
					// 滚动到底

				});
				this.scrollToView = `mag${id-2}`;
				console.log(this.scrollToView);
				this.heightCon = uni.getSystemInfoSync().windowHeight * 2 - this.inputBottom;
			},
			blurTextarea(e) {
				this.inputBottom = 0;
				this.inputBottom1 = 80;
				console.log(11111)
				this.heightCon = uni.getSystemInfoSync().windowHeight * 2 - 0;
			},
			biaoqingClick() {
				this.chou = !this.chou;
				let id = this.msgList[this.msgList.length - 1].id;
				this.scrollToView = `mag${id-2}`;
				console.log(this.scrollToView);
				this.heightCon = uni.getSystemInfoSync().windowHeight * 2 - 250;
			},
			addEmoji(em) {
				console.log(em);
				this.textMag += em.alt;
			},

			addTextMag(text) {

			},
			//替换表情符号为图片
			replaceEmoji1(str) {
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					console.log("item: " + item);
					for (let i = 0; i < this.emojiList.length; i++) {
						let row = this.emojiList[i];
						for (let j = 0; j < row.length; j++) {
							let EM = row[j];
							if (EM.alt == item) {
								let onlinePath = 'https://s2.ax1x.com/2019/04/12/'
								let imgstr = '<img src="' + onlinePath + this.onlineEmoji[EM.url] + '">';
								console.log("imgstr: " + imgstr);
								return imgstr;
							}
						}
					}
				});
				return '<div style="display: flex;align-items: center;word-wrap:break-word;flex-wrap: wrap;">' +
					replacedStr + '</div>';
			},

			sendView() {
				this.chou = false;
				this.heightCon = uni.getSystemInfoSync().windowHeight * 2 - 80;
				let nowDate = new Date();
				if (this.msgList.length > 0) {
					let id = this.msgList[this.msgList.length - 1].id;
					console.log(id);
					id++;
					console.log(id);
					let msg = {
						id: id,
						info: {
							uid: 0,
							hpic: '/static/images/logo.png',
							name: 'hello'
						},
						type: 'text',
						con: {
							text: this.replaceEmoji1(this.textMag),
							time: `${nowDate.getHours()}:${nowDate.getMinutes()}`
						}
					}
					this.msgList.push(msg);
					this.contact = this.textMag;
					this.textMag = '';
					this.$nextTick(() => {
						console.log(id)
						// 滚动到底
						this.scrollToView = 'mag' + id;
					});
				} else {
					let id = 1;
					let msg = {
						id: 1,
						info: {
							uid: 0,
							hpic: '/static/images/logo.png',
							name: 'hello'
						},
						type: 'text',
						con: {
							text: this.replaceEmoji1(this.textMag),
							time: `${nowDate.getHours()}:${nowDate.getMinutes()}`
						}
					}
					this.msgList.push(msg);
					this.textMag = '';
					this.$nextTick(() => {
						console.log(id)
						// 滚动到底
						this.scrollToView = 'mag' + id;
					});
				}
				setTimeout(() => {
					let id = this.msgList[this.msgList.length - 1].id;
					console.log(id);
					id++;
					console.log(id);
					let msg = {
						id: id,
						info: {
							uid: 1,
							hpic: '/static/images/logo.png',
							name: '客服'
						},
						type: 'text',
						con: {
							text: this.replaceEmoji1(this.contact),
							time: `${nowDate.getHours()}:${nowDate.getMinutes()}`
						}
					}
					this.msgList.push(msg);
					this.textMag = '';
					this.$nextTick(() => {
						console.log(id)
						// 滚动到底
						this.scrollToView = 'mag' + id;
					});
					console.log(this.scrollToView)
				}, 2000)



			}
		},
		onLoad(options) {
			this._freshing = false;
			this.shangLa1();
		},
	};
</script>

<style lang="less">
	@left-right-margin: 40rpx;

	.container {
		width: 100vw;

		// height: 100vh;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;

		.header {
			flex-shrink: 0;
			padding: 0px @left-right-margin 32rpx @left-right-margin;
		}

		.content {
			flex-grow: 1;
			height: 100%;
			overflow: auto;
			padding-bottom: 20upx;


			.message {
				margin: 0px @left-right-margin 32rpx;
				display: flex;
				flex-direction: column;
				align-items: flex-end;

				.message-content {
					width: auto;
					max-width: calc(100vw - 80rpx);
					word-wrap: break-word;
					box-sizing: border-box;
					padding: 32rpx;
					line-height: 48rpx;
					background: pink;
					border-radius: 16rpx 0px 16rpx 16rpx;
				}

				.message-time {
					line-height: 32rpx;
					margin-top: 16rpx;
				}
			}
		}
	}

	.bottom-textarea {
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		background-color: #fff;
		border-top: 2rpx solid rgba(226, 226, 226, 1);
		// padding: 6px 20px;
		display: flex;
		align-items: flex-end;

		.textarea-container {
			flex: 1;
			min-height: 80rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 8rpx;
			box-sizing: border-box;
			padding: 20rpx 16rpx;

			>textarea {
				max-height: 250rpx;
				font-size: 36rpx;
				color: rgba(8, 8, 8, 1);
				width: auto;
			}
		}

		>button {
			flex-shrink: 0;
			height: 80rpx;
			margin: 0;
			margin-left: 16rpx;
		}
	}

	.hpicImg {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		min-width: 80upx;
	}

	.bt1 {
		width: 750upx;
		padding: 0 30upx;
		margin: 13upx 0;
	}

	uni-textarea {
		width: 506upx;
		// margin: 0 30upx;
		min-height: 91upx !important;
		line-height: 91upx;
		background-color: #f3f3f3;
		border-radius: 36upx;
		padding-left: 51upx;
	}

	/deep/.uni-textarea-textarea {
		font: unicase;
	}

	.sendBtn {
		font-size: 30upx;
		font-family: PingFang;
		font-weight: 800;
		color: #FC8E48;
		min-width: 3rem;
	}

	.news {
		width: 750upx;
		box-sizing: border-box;
		padding: 20upx 45upx 0 45upx;
		// margin-top: 60upx;
	}

	.news1 {
		background: #FC8E48;
		box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.11);
		border-radius: 20upx;
		padding: 20upx;
		box-sizing: border-box;
		margin-right: 38upx;
		font-size: 30upx;
		color: #fff;
	}

	.news2 {
		background: #FFFFFF;
		box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.11);
		border-radius: 20upx;
		padding: 20upx;
		box-sizing: border-box;
		margin-left: 38upx;
		font-size: 30upx;
		color: #999;
	}

	.data {
		font-weight: 500;
		color: #A1AEBE;
		text-align: center;
		margin-top: 22upx;
		margin-bottom: 60upx;
	}

	.emoji-swiper {
		height: 40vw;

		/deep/.uni-swiper-item[data-v-2af4e3c2] {
			overflow: inherit;
		}

		swiper-item {
			display: flex;
			align-content: flex-start;
			flex-wrap: wrap;

			view {
				width: 12vw;
				height: 12vw;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 8.4vw;
					height: 8.4vw;
				}
			}
		}
	}
</style>
 