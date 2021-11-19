<template>

	<view class="content">
		<topbar bg_color="#F43B31" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #FFFFFF;" @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;">{{title}}</text>
			<text class="pr5 fs14" style="color: #FFFFFF;"> </text>
		</topbar>
		<view class=" mian  dis_flex_c aic" v-if="userinfo.is_examine==1">
			<image src="/static/images/ma/shenhezhong.png" mode="aspectFill" class="shenhe"></image>
			<view class="fs15 pt15">
				审核中
			</view>
			<view class="c9 fs12 pt10">
				预计在2个工作日内审核完成
			</view>
		</view>
		<view class=" mian  dis_flex_c aic" v-if="userinfo.is_examine==2">
			
			<image src="/static/images/ma/shenhehcenggong.png" mode="aspectFill" class="shenhe"></image>
			<view class="fs15 pt15">
				认证成功
			</view>
			<view class="c9 fs12 pt10">
				您的认证信息已通过审核
			</view>
			<view class="funy fs15 flex aic ju_c mt30" @click='fanhui' data-url='/pages/index/index' :data-type='2'>
				确定
			</view>
		</view>
		<view class=" mian  dis_flex_c aic" v-if="userinfo.is_examine==3">
			
			<image src="/static/images/ma/shenheshibai.png" mode="aspectFill" class="shenhe"></image>
			<view class="fs15 pt15">
				审核失败
			</view>
			<view class="c9 fs12 pt10">
				很抱歉，您的认证信息未通过审批
			</view>
			<view class="funy fs15 flex aic ju_c mt30" @click='jump' data-url='/pagesB_mxx/shenfen/shenfen' :data-type='3'>
				重新上传
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
				id_type:'',
				title:'',
			}
		},
		onHide() {

		},
		onLoad(option) {
that=this
console.log(option)
that.id_type=option.id_type
if(option.id==1) {
	console.log('title')
	that.title='企业信息认证'
}else {
	that.title='实名认证'
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
				return api.getimg(img)
			},
			jump(e) {
				return api.jump(e)
			},
			fanhui() {
				wx.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>
	page {
		background-color:  #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color:  #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	.shenhe {
		width: 116rpx;
		height: 116rpx;
	}
	.mian {
		margin-top: 300rpx;
	}
	.funy {
		width: 250rpx;
		height: 80rpx;
		border: 1px solid #F6433A;
		
color: #F6433A;
		border-radius: 40rpx;
	}
</style>
