<template>

	<view class="content">
		<view class="title dis_flex ju_c mt10 mb10">
			<text class="fs24 fwb">平台网络招标保证金规则</text>
		</view>
		<view class="" style="width: 750upx; padding: 0 30upx; box-sizing: border-box;">
			<text>
				采用投标保证金电子保函方式，是深化“放管服”改革，优化营商环境，降低企业制度性交易成本，提高投标效率和交易平台服务环境，支持民营企业发展的重要政策举措。为严肃和规范金融担保机构、交易服务主体、交易市场主体和交易平台运维主体各方责任，保障公共资源交易活动高效、规范、公平，特制订《寿县公共资源投标保证金电子保函操作规则（试行）》。内容如下：
				
				一、电子保函的效力。电子保函（包括但不限于银行保函、担保保函、保险保函）及相关附件作为投标保证金担保的形式之一，与常规现金支付的投标保证金具备同等效力。
				
				二、电子保函的服务
				
				（一）电子保函申请、审核、开具均在淮南市（寿县）公共资源电子保函平台（以下简称“电子保函平台”）完成，电子保函相关数据与淮南市（寿县）公共资源交易平台（以下简称“交易平台”）对接。
				
				（二）电子保函平台由苏州国泰新点软件有限公司开发和维护，平台网址：http://jy.ggj.huainan.gov.cn:8090/TPBidder/login.aspx。如需变更平台域名网址等，需取得寿县公共资源交易服务中心书面同意。
				
				（三）寿县共资源交易服务中心将根据电子保函平台对接情况选择合格的担保机构。
				
				（四）交易平台运维主体、金融担保机构不得强制投标企业使用电子保函服务及平台；应做好申请电子保函的投标企业的名称、数量、投标行为及电子保函信息的保密工作，任何一方不得外泄；应妥善解决投标企业因使用电子保函服务及其平台产生的纠纷。
				
				（五）金融担保机构应履行信息充分告知的义务，通过电子保函平台及时告知投标企业包括但不限于授信额度、电子保函审核出具情况、收费标准、服务承诺等事项。
			</text>
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
			return {}
		},
		onHide() {

		},
		onLoad() {
			that = this
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
		}
	}
</script>

<style scoped>
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
		height: 100%;
		margin: 0;
		padding: 0;
	}
</style>
