import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userinfo: "",
		addmsg:'',
		platform:'',
		kf_tel:'',
		kf_url:'',
		web_href:'',
		
		
		//socketOpen
		socketOpen:false,
		socketMsgQueue:[],
		
		conversationActive: {}, //聊天进行中的会话
		toUserId: '', //聊天对象id
		conversationList: [], //会话列表
		currentMessageList: [], //消息列表
		// ws_url:'ws://192.168.0.117:2347',
		ws_url:'ws://www.jianyou365.com.a.800123456.vip:2347'
	},
	mutations: {
		updatemessage_num(state,message_num){
			state.message_num = message_num || 0;
		},
		setkf_tel(state,kf_tel){
			state.kf_tel = kf_tel || '';
		},
		setkf_url(state,kf_url){
			state.kf_url = kf_url || '';
		},
		web_url(state,web_href){
			state.web_href = web_href || '';
		},
		spurl_fuc(state,spurl){
			state.spurl = spurl || '';
		},
		_send(state,msg) {
			
				var msg_xt='{"token":"'+state.userinfo.token+'","msg":"'+msg.msg.replace(/"/g, '\\"')+'","client_id":"'+msg.id+'","type":"'+1+'"}'
				// return new Promise(resolve => {
				// 	resolve(msg_xt)
				// })
				if (state.socketOpen) {
				  uni.sendSocketMessage({
				    data: msg_xt,
						success:(res)=>{
							console.log('发送成功'+msg_xt)
							// return new Promise(resolve => {
							// 	resolve(msg_xt)
							// })
						}
				  });
				} else {
					
					// var socketMsgQueue=that.socketMsgQueue
				//   socketMsgQueue=socketMsgQueue.push(msg);
					// console.log('socketMsgQueue--------------------------------->')
					// console.log(socketMsgQueue)
				}
			
			
			
		},
		setSocketOpen(state, socketOpen){
			state.socketOpen = socketOpen;
		},
		//选择已有会话聊天--更新选中会话详情
		updateConversationActive(state, conversationItem) {
			state.conversationActive = Object.assign({}, conversationItem);
			state.toUserId = conversationItem.to_uid
			console.log(state.conversationActive)
			state.currentMessageList = []
		},
		//更新会话列表
		updateConversationList(state, newConversationList) {
			state.conversationList = newConversationList
			console.log('更新会话列表----------------------->')
			console.log(state.conversationList)
		},
		/**
		 * 将消息插入当前会话列表
		 * 调用时机：收/发消息事件触发时
		 * @param {Object} state
		 * @param {Message[]|Message} data
		 * @returns
		 */
		pushCurrentMessageList(state, data) {
			console.log(data)
			console.log(state.conversationActive)
			// 还没当前会话，则跳过
			if (Array.isArray(data)) {
				// 筛选出当前会话的消息
				const result = data.filter(item => item.pid === state.conversationActive.id)
				state.currentMessageList = [...state.currentMessageList, ...result]
			} else if (data.pid === state.conversationActive.id) {
				state.currentMessageList = [...state.currentMessageList, data]
			}
			// state.currentMessageList = [...state.currentMessageList, ...data]
			console.log('1111')
			console.log('消息插入当前会话----------------------->')
			console.log(state.currentMessageList)
			
		},
		/**
		 * 滑到顶部请求更多的历史消息
		 * */
		unshiftCurrentMessageList(state, data) {
			console.log(data)
			if (data) {
				state.currentMessageList = [...data, ...state.currentMessageList]
			}
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		setadd(state,addmsg) {
			state.addmsg = addmsg;
		
		},
		setplatform(state, platform) {
			state.platform = platform || 'android';
		},
		login(state, userinfo) {
			console.log('userinfo-------------------------------.>')
			// console.log(userinfo)
			state.userinfo = userinfo;
			state.hasLogin = true;
			
			if(state.socketOpen == false){
				uni.connectSocket({
				  // url: 'ws://192.168.1.104:2346'
					url:state.ws_url
				});
			}
			// uni.setStorage({
			// 	key: 'userinfo',
			// 	data: userinfo
			// })
			// console.log(state.userinfo)
			// console.log(state.hasLogin)
		},
		logout(state) {
			state.userinfo = "";
			state.hasLogin = false;

		},
	}
})

export default store
