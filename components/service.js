import Vue from 'vue'
import store from '../store/index.js'
// import event from '../common/event.js'
// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
const map_key = "7FEBZ-WLWK2-PMGUE-C4BFT-EKXB6-BFFNR"
// const imgurl = "https://jianyou365.com.a.800123456.vip/"
const imgurl = "https://jianyou365.com/"

const IPurl = imgurl + 'api/'
/**
 * 请求头
 */
var header= {
		'content-type': 'application/x-www-form-urlencoded',
		'token':uni.getStorageSync('token')||'',
		// 'userId':uni.getStorageSync('userId')||''
	}


/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
	console.log("请求参数:", params)
	return params;
}



const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	let users = getUsers();
	users.push({
		account: userInfo.account,
		password: userInfo.password
	});
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}


const jump = function(e) {
	// console.log(e.currentTarget.dataset.type)
	var datas = e.currentTarget.dataset
	console.log(datas.login == true)
	console.log(datas.haslogin)
	if (datas.login == true) {
		console.log('store.state.hasLogin')
		console.log(store.state.hasLogin)
		var hasLogin=store.state.hasLogin
		if (!hasLogin) {
			uni.navigateTo({
				url: '/pagesB_mxx/login/login'
			})
			return
		}
	}
	if (datas.type == 'sp') {
		console.log(datas.spurl)
		store.commit('spurl_fuc', datas.spurl)
		uni.navigateTo({
			url: datas.url
		})
		return
	}
	if (datas.type == 'web') {
		console.log(datas.url)
		store.commit('web_url', datas.url)
		uni.navigateTo({
			url: '/pagesA_lzc/webhtml/webhtml'
		})
		return
	}
	if (datas.type == 2) {
		uni.switchTab({
			url: datas.url
		})
	} else if (datas.type == 3) {
		uni.redirectTo({
			url: datas.url
		})
	} else {
		uni.navigateTo({
			url: datas.url
		})
	}
}
const pveimg = function(e) {
	var current = e.currentTarget.dataset.src
	var urls = e.currentTarget.dataset.array

	let urls1 = []
	if (urls) {
		urls1 = urls

	} else {
		urls1[0] = current
	}
	// console.log(urls1)
	uni.previewImage({
		current: current, // 当前显示图片的http链接
		urls: urls1 // 需要预览的图片http链接列表
	})

}
const call = function(e) {
	console.log(e)
	// return
	if (e.currentTarget.dataset.tel) {
		// wx.makePhoneCall({
		// 	phoneNumber: e.currentTarget.dataset.tel+''
		// })
		uni.showModal({
			title: '提示',
			content: '是否拨打' + e.currentTarget.dataset.tel + '?',
			success: function(res) {
				if (res.confirm) {
					///shops/phone_buy
					var jkurl = '/shops/phone_buy'
					var datas={
						phone:e.currentTarget.dataset.tel
					}
					P_post(jkurl, datas).then(res => {
						console.log(res)
						if (res.code == 1) {
							var datas = res.data
							console.log(typeof datas)
					
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							
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
					wx.makePhoneCall({
						phoneNumber: e.currentTarget.dataset.tel + ''
					})
					console.log('用户点击确定');
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
}
// 微信登录
const wxlogin = function(num) {
	var that = this
	if (num == 1) {
		uni.showLoading({
			mask: true,
			title: '正在登录'
		})
	}
	if (num == 'token') {
		var data = {
			'token':uni.getStorageSync('token'),
			// // #ifdef H5
			// 'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJhdWQiOiJZXyIsImlhdCI6MTYyNTEwMjEzOCwibmJmIjoxNjI1MTAyMTM4LCJleHAiOjE2MjUxMDkzMzh9.nXB2nkRcvx6gcngv30HT1irDFdS_8lbXPzn6oh7uf-E',
			// // #endif
			type: 4
		}

		uni.request({
			url: IPurl + '/sign/sign',
			data: data,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				// 'token':uni.getStorageSync('token'),
				
			},
			dataType: 'json',
			method: 'POST',
			success(res) {
				uni.hideLoading()
				console.log(res.data)
				if (res.data.code == -1) {
					store.commit('logout')
					// uni.navigateTo({
					// 	url: '/pagesB_mxx/login/login'
					// })
					return
				}
				if (res.data.code == -2) {
					if (num == 1) {
						uni.redirectTo({
							url: '/pages/login_tel/login_tel?nickname=' + uinfo.nickName + '&avatarurl=' + uinfo.avatarUrl
						})
					} else {
						uni.navigateTo({
							url: '/pages/login_tel/login_tel?nickname=' + uinfo.nickName + '&avatarurl=' + uinfo.avatarUrl
						})
					}
					return
				}
				if (res.data.code == 1) {
					console.log('登录成功')
					uni.setStorageSync('userInfo', res.data.data)
					uni.setStorageSync('token', res.data.data.token)
								
												
					store.commit('login', res.data.data)

				} else {
					uni.removeStorageSync('userInfo')
					uni.removeStorageSync('token')
					uni.showToast({
						icon: 'none',
						title: '登录失败',
					})
				}

			},
			fail() {
				uni.hideLoading()
				uni.showToast({
					icon: 'none',
					title: '登录失败'
				})
			}
		})
	} else {
		var userInfo = uni.getStorageSync('userInfo')
		if (!userInfo) {
				
		} else {
			uni.login({
				success: function(res) {
					// console.log(res)
					// return
					// 发送 res.code 到后台换取 openId, sessionKey, unionId
					var uinfo = userInfo
					let data = {
						js_code: res.code,
						nick: uinfo.nickName,
						img: uinfo.avatarUrl
					}
					if (num == 'token') {
						data = {
							token: uni.getStorageSync('token')
						}
					}
					let rcode = res.code
					console.log(res.code)
					uni.request({
						url: IPurl + '/sign/wx_register',
						data: data,
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						dataType: 'json',
						method: 'POST',
						success(res) {
							uni.hideLoading()
							console.log(res.data)
							if (res.data.code == -2) {
								uni.showToast({
									icon:'none',
									title:'请绑定手机号'
								})
								setTimeout(()=>{
									if (num == 1) {
										uni.redirectTo({
											url: '/pages/login_tel/login_tel?nickname=' + uinfo.nickName + '&avatarurl=' + uinfo.avatarUrl
										})
									} else {
										uni.navigateTo({
											url: '/pages/login_tel/login_tel?nickname=' + uinfo.nickName + '&avatarurl=' + uinfo.avatarUrl
										})
									}
								},1000)
								return
							}
							if (res.data.code == 1) {
								/*{
									"code":1,"msg":"success",
									"data":
									{"img":"https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTLQyUDQBFgtqQlBSNEr4WJJqhslupYjMr1ojdUAPC0iaibmj2CICmC7aV6M5MG8nKFliaibxNAxJGSYXA\/132",
									"nick":"问心",
									"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJhdWQiOiJZXyIsImlhdCI6MTYyMzk4NTYzMSwibmJmIjoxNjIzOTg1NjMxLCJleHAiOjE2MjM5OTI4MzF9.BCuXb7D3Uyryt8DPf6pT_ptMWCYyX6aufx2MH218jZ4"}}
								*/
								console.log('登录成功')
								console.log(res.data)
								uni.setStorageSync('token', res.data.data.token)
			
							
								store.commit('login', res.data.data)
			
								
								if (num == 1) {
									uni.showToast({
										icon: 'none',
										title: '登录成功'
									})
									setTimeout(() => {
										uni.navigateBack()
									}, 1000)
								}
							} else {
								uni.removeStorageSync('userInfo')
								uni.removeStorageSync('token')
								uni.showToast({
									icon: 'none',
									title: '登录失败',
								})
							}
			
						},
						fail() {
							uni.hideLoading()
							uni.showToast({
								icon: 'none',
								title: '登录失败'
							})
						}
					})
				}
			})
		}
		return
		
		// #ifdef MP-WEIXIN
		uni.getSetting({
			success: res => {
				console.log(res)
				if (res.authSetting['scope.userInfo'] == true) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					console.log('已经授权')
					uni.getUserInfo({
						success(res) {
							var userInfo = res.userInfo
							console.log(userInfo)
							uni.setStorageSync('userInfo', res.userInfo)
							if (!userInfo) {

							} else {
								uni.login({
									success: function(res) {
										console.log(res)
										return
										// 发送 res.code 到后台换取 openId, sessionKey, unionId
										var uinfo = userInfo
										let data = {
											code: res.code,
											nickname: uinfo.nickName,
											avatarurl: uinfo.avatarUrl,
											type: 1
										}
										if (num == 'token') {
											data = {
												token: uni.getStorageSync('token')
											}
										}
										let rcode = res.code
										console.log(res.code)
										uni.request({
											url: IPurl + '/login',
											data: data,
											header: {
												'content-type': 'application/x-www-form-urlencoded'
											},
											dataType: 'json',
											method: 'POST',
											success(res) {
												uni.hideLoading()
												console.log(res.data)
												if (res.data.code == -2) {
													uni.showToast({
														icon:'none',
														title:'请绑定手机号'
													})
													setTimeout(()=>{
														if (num == 1) {
															uni.redirectTo({
																url: '/pages/login_tel/login_tel?nickname=' + uinfo.nickName + '&avatarurl=' + uinfo.avatarUrl
															})
														} else {
															uni.navigateTo({
																url: '/pages/login_tel/login_tel?nickname=' + uinfo.nickName + '&avatarurl=' + uinfo.avatarUrl
															})
														}
													},1000)
													return
												}
												if (res.data.code == 1) {
													console.log('登录成功')
													console.log(res.data)
													uni.setStorageSync('token', res.data.data.userToken)

													store.commit('logindata', res.data.data)
													store.commit('login', res.data.data.nickname)
													uni.setStorageSync('loginmsg', res.data.data)

													// event.trigger({
													//     type:'test',
													//     page:'/pages/index/index',
													//     //obj和test是举的例子，随意啥都行，这个传过去在on中的args中都可以获取到
													//     obj:{

													//     },
													//     test:{
													// 			'loginmsg': res.data.data
													//     },
													//     success:function(data){
													//         //data为on中返回的数据
													//     }
													// });
													// im login



													if (num == 1) {
														uni.showToast({
															icon: 'none',
															title: '登录成功'
														})
														setTimeout(() => {
															uni.navigateBack()
														}, 1000)
													}
												} else {
													uni.removeStorageSync('userInfo')
													uni.removeStorageSync('token')
													uni.showToast({
														icon: 'none',
														title: '登录失败',
													})
												}

											},
											fail() {
												uni.hideLoading()
												uni.showToast({
													icon: 'none',
													title: '登录失败'
												})
											}
										})
									}
								})
							}
						}
					})

				} else {
					uni.hideLoading()
				}
			}
		})
		// #endif
	}
}
// 手机号登录
const login_tel = function(num) {
	var datas
	var tel
	var password
	/*if(uni.getStorageSync('tel')){
		tel= uni.getStorageSync('tel')
		password= uni.getStorageSync('password')
		datas = {
			type:3,
			phone: tel,
			password: password
		}
	}else{
		return
	}*/
	if(!uni.getStorageSync('token')){
		return
	}else{
	
	}
	// var jkurl = '/login/login'
	var jkurl = '/login'
	var loginDatas=uni.getStorageSync('userinfo')
	datas={
		type:5,
		token:uni.getStorageSync('token')||''
	}
	P_post(jkurl, datas).then(res => {
		console.log(res)
		if (res.code == 1) {
			var datas = res.data
			console.log(typeof datas)

			if (typeof datas == 'string') {
				datas = JSON.parse(datas)
			}
			console.log('登录成功')
			// uni.setStorageSync('token', datas.token)
			// uni.setStorageSync('userId', datas.id)
			// uni.setStorageSync('tel', tel)
			// uni.setStorageSync('password', password)
			uni.setStorageSync('token', datas.token)
			store.commit('login', datas)
			// store.commit('login', datas.nickname)
			// setTimeout(() => {
			// 	uni.navigateBack({
			// 		delta: 1
			// 	})
			// }, 1000)

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
}
const setUsermsg = function(data) {
	var jkurl = '/user/amendInfo'

	post(jkurl, data,
		function(res) {

			// if (res.data.code == 1) {
			if (res.data.code == 1) {
				var datas = res.data.data
				// console.log(typeof datas)

				if (typeof datas == 'string') {
					datas = JSON.parse(datas)
				}
				wxlogin()
				uni.showToast({
					title: '操作成功'
				})

			} else {
				if (res.data.msg) {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				}
			}
		},
		function(err) {
			that.btnkg = 0

			uni.showToast({
				icon: 'none',
				title: '获取数据失败'
			})

		}
	)
}


const wx_upload = function(tximg) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			mask: true,
			title: '正在上传'
		})
		// #ifndef H5
		console.log(tximg)
		uni.uploadFile({
			url: IPurl + '/sign/img_upload',
			filePath: tximg,
			name: 'file',
			header: header,
			formData: {
				token: uni.getStorageSync('token')
			},
			// success: (uploadFileRes) => {
			// 	console.log(uploadFileRes.data);
			// 	var ndata = JSON.parse(uploadFileRes.data)
			// 	resolve(uploadFileRes)
			// },
			complete: (res) => {
				uni.hideLoading();
				uni.stopPullDownRefresh(); //慎用hideLoading,会关闭wx.showToast弹窗
				// console.log(`耗时${Date.now() - timeStart}`);
				console.log(res)
				if (res.statusCode == 200) { //请求成功
					var ndata = JSON.parse(res.data)
					if (ndata.code == -1) {
						store.commit('logout')
						uni.navigateTo({
							url: '/pagesB_mxx/login/login'
						})
						return
					} else if (ndata.code == 0) {
						if (ndata.msg) {

							uni.showToast({
								icon: 'none',
								title: ndata.msg
							})
						} else {

							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
					resolve(ndata)
				} else {
					reject(res);
				}
			}
		});
		// #endif
		// #ifdef H5
		uni.request({
				url: tximg,
				method: 'GET',
			
				responseType: 'arraybuffer',
				success: (res) => {
						let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
						console.log('base64')
						// console.log(base64)
						base64 = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
						// return base64
						var datas={
							base64_img:base64,
							// type:1,
						}
						var jkurl=IPurl + '/sign/base64_upload'
						// var jkurl='https://yibeitong.com.aa.800123456.top/api/'+'/upload/base64Img'
						console.log('h5 upload')
						uni.request({
							url: jkurl,
							data: datas,
							method: 'POST',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							complete: (res) => {
								uni.hideLoading();
								uni.stopPullDownRefresh(); //慎用hideLoading,会关闭wx.showToast弹窗
								console.log(res)
								if (res.statusCode == 200) { //请求成功
									console.log(res)
									if (res.data.code == 0) {
										if (res.data.msg) {
						
											uni.showToast({
												icon: 'none',
												title: res.data.msg
											})
										} else {
						
											uni.showToast({
												icon: 'none',
												title: '操作失败'
											})
										}
									}
									resolve(res.data)
								} else {
									reject(res);
								}
							}
						})
						// 单个请求
						// P_post(jkurl, datas).then(res => {
						// 	resolve(ndata)
						// }).catch(e => {
						// 	reject(res);
						// })
				},
				fail: (err) => {
					console.log(err)
				}
		});
		
		// #endif
	})

}




/**
 * @description    配置接口请求的公共方法
 * @example   
 * example   
 * @param {String} url = ''  接口请求地址  
 * @param {String} param = {}  接口请求参数  
 * @param {String} header = {}  接口请求头  
 * @param {String} method = [get|post] 可选值域包括get和post，get是直接请求，post是提交数据  
 * @author: wenxin  
 * @createTime: 2021-4-6 15:09:19  
 */
const http = ({
	url = '',
	param = {},
	method = '',
	header = {
		'content-type': 'application/x-www-form-urlencoded',
		// 'token':uni.getStorageSync('token')||''
	}
	// header:header,
	
} = {}) => {
	console.log(header)
	let timeStart = Date.now();
	return new Promise((resolve, reject) => {
		console.log('请求url：' + getUrl(url));

		console.log("请求头：", header)
		console.log("param：", param)
		var p_token=uni.getStorageSync('token')||''
		Vue.set(param,'token',p_token)
		console.log("param：", param)
		uni.request({
			url: getUrl(url),
			data: param,
			method: method,
			header: header,
			success: (res) => {
				console.log(res)
				uni.hideLoading();
				uni.stopPullDownRefresh(); //慎用hideLoading,会关闭wx.showToast弹窗
				
				if (res.data.code == -1) {
					store.commit('logout')
					uni.navigateTo({
						url: '/pagesB_mxx/login/login'
					})
					return
				} else if (res.data.code == 0 && res.msg == '请先登录账号~') {
					uni.navigateTo({
						url: '/pagesB_mxx/login/login'
					})
					return
				} else if (res.data.code == 0) {
					if (res.data.msg) {
				
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					} else {
				
						uni.showToast({
							icon: 'none',
							title: '操作失败'
						})
					}
				}
				resolve(res.data)
			},
			fail: (err) => {
				uni.hideLoading()
				uni.stopPullDownRefresh()
				if(!reject){
					uni.showToast({
						icon: 'none',
						title: '系统异常错误'
					})
					return
				}
				reject(err)
			},
			/*complete: (res) => {
					uni.hideLoading();
					uni.stopPullDownRefresh(); //慎用hideLoading,会关闭wx.showToast弹窗
				console.log(`耗时${Date.now() - timeStart}`);
				console.log(res)
				if (res.statusCode == 200) { //请求成功
					console.log(res)
					if (res.data.code == -1) {
						store.commit('logout')
						// #ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/login/login'
						})
						// #endif
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/login/login'
						})
						// #endif
						return
					} else if (res.data.code == 0 && res.msg == '请先登录账号~') {
						// #ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/login/login'
						})
						// #endif
						// #ifndef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/login/login'
						})
						// #endif
						return
					} else if (res.data.code == 0) {
						if (res.data.msg) {

							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
						} else {

							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
					resolve(res.data)
				} else {
					reject(res);
				}
			}*/
		})
	})
}
// 获取url
const getUrl = (url) => {
	if (!url) {
		return url
	}
	if (url.slice(0, 1) == "/") {
		console.log(true);
		url = url.substr(1);
	}
	if (url.indexOf('://') == -1) {
		url = IPurl + url;
	}
	return url;
}
//暴露出去调用的方法


/**
 * @description    get方法
 * @example   
 * example   
 * @param {String} url = ''  接口请求地址  
 * @param {String} param = 请求参数  
 * @author: wenxin  
 * @createTime: 2021-4-6 15:07:33  
 */
const P_get = (url, param = {}) => {
	if (!param.load_mode) {
		wx.showLoading({
			title: '请求中，请耐心等待...',
		});
	}
	return http({
		url,
		param,
		method: 'GET'
	})
}
/**
 * @description    post方法
 * @example   
 * example   
 * @param {String} url = ''  接口请求地址  
 * @param {String} param = 请求参数  
 * @author: wenxin  
 * @createTime: 2021-4-6 15:07:33  
 */
const P_post = (url, param = {}) => {
	return http({
		url,
		param,
		method: "POST"
	})
}

const P_put = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'put'
	})
}

const P_delete = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'delete'
	})
}
// // 单个请求
// service.P_get('/cate/list').then(res => {
// 	console.log(res)
// }).catch(e => {
// 	console.log(e)
// })

// // 一个页面多个请求
// Promise.all([
//   service.P_get('/cate/list'),
//   service.P_get(`detail/${id}`)
// ]).then(result => {
//   console.log(result)
// }).catch(e => {
//   console.log(e)
// })
const getimg = function(img,type) {
	// return img



	if (!img) return
	if (!type) {
		type = ','
	}
	if(type!='arr'){
		
		img = img.split(type)
	}
	// console.log(imgurl+img)
	if (img[0].indexOf('://') == -1) {
		img = imgurl + img[0]
	}else{
		img = img[0]
	}
	return img
}
const getimgarr = function(imgs, type) {
	if (!imgs) return
	if (!type) {
		type = ','
	}
	if(type!='arr'){
		
		imgs = imgs.split(type)
	}
	// console.log(imgurl+img)
	var newimgs = []
	for (var i = 0; i < imgs.length; i++) {
		var img = imgs[i]
		if (img.indexOf('://') == -1) {
			img = imgurl + img
		}
		newimgs.push(img)
	}
	// console.log(newimgs)
	return newimgs
}
const gettime = function(mj, join_msg,timetype) {
	if (!mj) {
		return ''
	}
	if(!join_msg){
		join_msg='-'
	}
	var ntime = new Date(mj * 1000)
	// console.log(ntime)
	var n_year = ntime.getFullYear();
	var n_month = ntime.getMonth() + 1;
	var n_date = ntime.getDate();
	var n_hour = ntime.getHours();
	var n_minute = ntime.getMinutes();
	n_month=n_month<10? '0'+n_month:n_month
	n_date = n_date < 10 ? '0' + n_date : n_date
	n_hour = n_hour < 10 ? '0' + n_hour : n_hour
	n_minute = n_minute < 10 ? '0' + n_minute : n_minute
	if(timetype=='ymd'){
		return n_year+join_msg+n_month+join_msg+n_date
	}
	if(timetype=='hm'){
		return n_hour+':'+n_minute
	}
	return n_year+join_msg+n_month+join_msg+n_date+' '+n_hour+':'+n_minute
	
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hour = time.getHours();
	var minute = time.getMinutes();
	// n_month=n_month<10? '0'+n_month:n_month
	n_date = n_date < 10 ? '0' + n_date : n_date
	n_hour = n_hour < 10 ? '0' + n_hour : n_hour
	n_minute = n_minute < 10 ? '0' + n_minute : n_minute
	if (n_year == year) {

		return {
			type: 1,
			year: n_year,
			month: n_month,
			date: n_date,
			hour: n_hour,
			minute: n_minute,
			time: '今天 ' + n_hour + ':' + n_minute
		}
	} else {

		return {
			type: 2,
			year: n_year,
			month: n_month,
			date: n_date,
			hour: n_hour,
			minute: n_minute,
			time: n_year + '-' + n_month + '-' + n_date
		}
	}
}


const get_fwb = function(str) {
	if (!str) {
		return
	}
	str = str // .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
		.replace(/<br\/>/ig, '<view style="width:100%;height:15upx;"></view>')
		.replace(/<br \/>/ig, '<view style="width:100%;height:15upx;"></view>')
		.replace(/<p([\s\w"-=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p $1')
		.replace(/<p([\s\w"-=\/\.:;]+)/ig, '<p$1 class="xcx_fwb_p"')
		// .replace(/<div([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<div')
		.replace(/<div([\s\w"-=\/\.:;]+)((?:(class="[^"]+")))/ig, '<div $1')
		.replace(/<div([\s\w"-=\/\.:;]+)/ig, '<div$1 class="xcx_fwb_div"')

		// .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img $1')
		// .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img $1')
		// .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img $1')
		.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img $1')
		.replace(/<img([\s\w"-=\/\.:;]+)((?:(class="[^"]+")))/ig, '<img $1')
		.replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img class="xcx_fwb_img" $1 ')
	return str
}



//pay
const wxpay=function (datas,type){
	if(!datas) return
	uni.showLoading({
		mask:true,
		title:'正在拉起支付'
	})
	if (typeof datas == 'string') {
		datas = JSON.parse(datas)
	}
	return new Promise((resolve,reject)=>{
		uni.hideLoading()
		uni.requestPayment({
		    provider: 'wxpay',
		    timeStamp: datas.timeStamp||String(Date.now()),
		    nonceStr:  datas.nonceStr,
		    package:  datas.package,
		    signType: datas.signType,
		    paySign:  datas.paySign,
		    success: function (res) {
		        console.log('success:' + JSON.stringify(res));
						if(!resolve){
							if(type=='fwb'){
								uni.showToast({
									icon: 'none',
									title: '购买成功'
								})
								setTimeout(() => {
									uni.redirectTo({
										url: "/pages/my_fwb/my_fwb"
									})
								}, 1000)
							}else{
								resolve(res)
							}
						}else{
							resolve(res)
						}
						
		    },
		    fail: function (err) {
					if(!reject){
						uni.showToast({
							icon: 'none',
							title: '微信支付失败'
						})
					}else{
						
						reject(err);
					}
		        console.log('fail:' + JSON.stringify(err));
		    }
		});
	})
	
}

const emojiList1 = [
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
]
const emojiList = [
	{
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
	},
	{
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
	},
	{
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
	},
	{
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
	},
	{
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
	}, 
]

/**@dateTimeFliter 转换格林日期时间格式为常用日期格式
 * @time[必填] 						Date  		格林日期格式
 * @part[可选,默认:0]				Number      选择返回日期时间部分  列:0:返回所有 1:只返回日期  2:只返回时间
 * @dateComplete[可选,默认:true] 	Boolean 	日期位数不足是否添0补齐:true:补齐,false:不补齐
 * @timeComplete[可选,默认:true] 	Boolean 	时间位数不足是否添0补齐:true:补齐,false:不补齐
 * @dateConnector[可选,默认:-] 		String 		年月日连接符  例: - : /
 * @timeConnector[可选,默认::] 		String 		时间连接符   例: - : /
 * @hour12[可选,默认:false]          Boolean     是否返回12小时制时间   例: true:返回12小时制时间   false:返回24小时制时间
 * @return   '2019-11-25 15:05:54'  String    返回示例
 * **/
const dateTimeFliter = function(time, part = 0, dateComplete = true, timeComplete = true, dateConnector = '-',
	timeConnector = ':', hour12 = false) {
	let year = time.getFullYear()
	let month = time.getMonth() + 1
	let day = time.getDate()
	let hour = time.getHours()
	let minute = time.getMinutes()
	let second = time.getSeconds()
	let dateStr = ''
	let timeStr = ''
	//转换日期
	if (dateComplete) { //添0补齐
		if (month < 10) {
			month = '0' + month
		}
		if (day < 10) {
			day = '0' + day
		}
	}
	dateStr = year + dateConnector + month + dateConnector + day
	//转换时间
	//修改小时制
	if (hour12) {
		if (hour > 12) {
			hour = hour - 12
			if (timeComplete) {
				if (hour < 10) {
					hour = '下午 ' + '0' + hour
				} else {
					hour = '下午 ' + hour
				}
			}
		} else {
			if (timeComplete) {
				if (hour < 10) {
					hour = '上午 ' + '0' + hour
				} else {
					hour = '上午 ' + hour
				}
			}
		}
	}
	//判断分钟与秒
	if (timeComplete) { //添0补齐
		if (minute < 10) {
			minute = '0' + minute
		}
		if (second < 10) {
			second = '0' + second
		}
	}
	// timeStr = hour + timeConnector + minute + timeConnector + second
	timeStr = hour + timeConnector + minute 
	//合成输出值
	if (part == 0) {
		return dateStr + ' ' + timeStr
	} else if (part == 1) {
		return dateStr
	} else if (part == 2) {
		return timeStr
	}
	return '传参有误'
}

/**
 * @description 视频封面  
 * @example   
 * example  
 
 * @param {String} img = ''  视频地址  
 * @author: wenxin  
 * @createTime: 2021-8-3 9:18:19 ?F10: AM?  
 */
const imgIP_video=function(img){
	if(!img){
		return img
	}
	var newimg =imgurl+img
	var arr = []
	arr = newimg.split(".");
	console.log(arr[arr.length-1])
	if(arr[arr.length-1]=='mp4'){
		arr[arr.length-1]='png'
	}
	newimg=arr.join('.')
	// console.log(newimg)
	return newimg
}

const swiper_jump=function(item){
	console.log(item)
	if(!item){
		return 
	}
	// 无跳转
	if(item.is_jump==1){
		return
	}
	// 单页
	if(item.is_jump==2){
		uni.navigateTo({
			url:'/pagesB_mxx/About/About?key='+item.jump_url
		})
		return
	}
	// 交易分类列表
	if(item.is_jump==3){
		uni.navigateTo({
			url:'/pagesA_lzc/shopList/shopList?type=4&buy_type=1&pid='+item.jump_url
		})
		return
	}
	// 招标分类列表
	if(item.is_jump==4){
		uni.navigateTo({
			url:'/pagesA_lzc/zhao/zhao'
		})
		return
	}
	// 新闻详情
	if(item.is_jump==5){
		uni.navigateTo({
			url:'/pagesA_lzc/QfDetails/QfDetails?id='+item.jump_url
		})
		return
	}
}
export default {
	getUsers,
	addUser,
	IPurl,
	map_key,
	imgurl,
	jump,
	call,
	wxlogin,
	login_tel,
	setUsermsg,
	P_get,
	P_post,
	P_put,
	P_delete,
	gettime,
	getimg,
	getimgarr,
	pveimg,
	get_fwb,
	wx_upload,
	wxpay,
	
	emojiList,
	dateTimeFliter,
	imgIP_video,
	
	
	swiper_jump,
}
