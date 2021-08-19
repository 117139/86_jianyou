<template>

	<view class="content">
		<textarea value="" v-model="detail" placeholder="请在这里添加描述…" placeholder-class="faTieTextpla"
			class="faTieText" />
		<view class="uoloadView">
			<!-- <uni-file-picker limit="3" title="" @progress="success"></uni-file-picker> -->

		</view>
		<!-- <button type="default" @click="success">发布</button> -->
		<view class="dis_flex aic imgsList" style="">
			<view class="position_relative imgsListItem" v-for="item,index2 in imgList">
				<!-- <text class="iconfont icon-del"  @click="delList(index2)"></text> -->
				<image class="del_img" src="/static/images/img_del.png" mode="aspectFit" @click="delList(index2)"></image>
				<image class="dis_flex imgs" :src="getimg(item)" mode="aspectFill">
				</image>
			</view>
			<view class="position_relative imgsListItem">
			<image class="imgs" v-if="imgList.length<9" @click="scpic" src="/static/images/upimg_03.jpg"
				mode="aspectFill"></image>
			</view>
		</view>
		<!-- <image src="/static/images/22.png" mode="" @click="file"></image> -->
		<button type="warn" class="footBtn" @click="fabu">发贴</button>
	</view>
</template>

<script>
	import service from '../../components/service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {},
		data() {
			return {
				avatar: 'https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg',
				maxCount: 3,
				detail: "",
				imgLists: "",
				myId: "",
				imgList: []
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this
			if (option.id) {
				this.myId = option.id;
			}
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			// 上传成功
			success(e) {
				console.log(e)
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
					}
				});
			},
			fabu() {
				// this.file();

				// console.log(that.imgList)
				// setTimeout(() => {
				// console.log(that.imgLists, "12132323232")
				// return
				if (that.imgList.length == 0) {
					uni.showToast({
						title: "请上传图片",
						icon: "none"
					})
					return
				}
				if (that.detail.length == 0) {
					uni.showToast({
						title: "请输入发帖内容",
						icon: "none"
					})
					return
				}
				var jkurl = "circle/add_post";
				var datas = {
					pid: that.myId,
					pic: that.imgList.join(","),
					content: that.detail
				}
				service.P_post(jkurl, datas).then(res => {

					console.log(res)
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: '发布成功,请等待审核',
							success() {
								setTimeout(() => {
									uni.navigateBack({
										delta:1
									})
								}, 1000)
							}
						})

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
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				// }, 6000)
				// uni.showToast({
				// 	title: '发帖成功',
				// 	success: () => {
				// 		setTimeout(() => {
				// 			uni.navigateBack({
				// 				delta: 1
				// 			})
				// 		}, 2000)
				// 	}
				// })

			},
			scpic() {
			  var that = this
				var z_count = 9 - that.imgList.length
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
								
								const imglen = that.imgList.length
								that.upimg(tempFilePaths, 0)
								
							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			 
			},
			upimg(imgs, i) {
			  var that = this
			  const imglen = that.imgList.length
			  var newlen = Number(imglen) + Number(i)
			  if (imglen == 9) {
			    wx.showToast({
			      icon: 'none',
			      title: '最多可上传九张'
			    })
			    return
			  }
				service.wx_upload(imgs[i]).then(res => {
							
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(i)
						var newdata = that.imgList
						newdata.push(datas)
						that.imgList= newdata
						var news1 = that.imgList.length
						if (news1 < 9&& i<imgs.length-1) {
						  i++
						  that.upimg(imgs, i)
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
				/*var newdata = that.imgb
				console.log(i)
				newdata.push(imgs[i])
				that.imgb= newdata
				var news1 = that.imgb.length
				if (news1 < 9&& i<imgs.length-1) {
				  i++
				  that.upimg(imgs, i)
				}*/
				// return
			  // console.log(img1)
			  
			},
			
			myUpload() {
				uni.chooseImage({
					count: this.maxCount,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						var tempFilePaths = res.tempFilePaths;
						for (var i = 0; i < tempFilePaths.length; i++) {
							// that.imgList.push(tempFilePaths[i])
							uni.uploadFile({
								url: service.IPurl + "sign/img_upload",
								filePath: tempFilePaths[i],
								name: 'file',
								formData: {
									'user': 'test'
								},
								success: (res) => {
									var res = JSON.parse(res.data);
									console.log(res.data, "12121212121212")
									if (res.code == 1) {
										that.imgList.push(res.data)
										// console.log(that.imgList)
									}
								}
							})
						}
						// console.log(this.imgList)
					}
				});
				// uni.request({
				// 	url: api.IPurl + 'Base/upload',
				// 	method: 'GET',
				// 	responseType: 'arraybuffer',
				// 	success: async res => {
				// 		let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
				// 		that.toBase64Urls = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
				// 		console.log(that.toBase64Urls);
				// 	}
				// });

			},

			file() {
				var list = this.imgList;
				this.imgList = [];
				for (var i = 0; i < list.length; i++) {
					uni.uploadFile({
						url: service.IPurl + "sign/img_upload",
						filePath: list[i],
						name: 'file',
						formData: {
							'user': 'test'
						},
						success: (res) => {
							var res = JSON.parse(res.data);
							console.log(res.data, "12121212121212")
							if (res.code == 1) {
								that.imgList.push(res.data)
								// console.log(that.imgList)
							}
						}
					})

				}

				return "完成";
			},
			delList(i){
				this.imgList.splice(i,1);
				
			}
		}
	}
</script>

<style scoped>
	

	.imgsList {
		flex-wrap: wrap;
		padding: 0 30upx;
		width: 100%;
	}

	.imgsListItem {
		width: 172upx;
		height: 168upx;
		padding: 4upx;
		position: relative;
		
	}
	.imgs {
			width: 100%;
			height: 100%;
		}
		.del_img{
			width: 30upx;
			height: 30upx;
			position: absolute;
			right: -5upx;
			z-index: 999;
			top: -5upx;
		}
	.icon-del {
		position: absolute;
		right: -5upx;
		z-index: 999;
		top: -5upx;
	}

	page {
		background-color: #fff;
		width: 100%;
		min-height: 100vh;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #fff;
		width: 100%;
		/* height: 100%; */
		min-height: 100%;
		margin: 0;
		padding: 0;
	}

	.faTieText {
		width: 750upx;
		height: 369upx;
		font-size: 30upx;
		font-weight: 400;
		padding: 12upx 0 0 31upx;
	}

	.uoloadView {
		padding: 0 30upx;
	}

	.footBtn {
		width: 690upx;
		margin: 0 30upx;
		border-radius: 10upx;
		margin-top: 60upx;
	}

	/deep/.faTieTextpla {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #BBBBBB;
	}

	/deep/.icon-del-box {
		background-color: rgba(255, 255, 255, 0.5);
	}
</style>
