<template>
	<view>
		<ss-select-city v-model="value" @on-select="City" />
	</view>
</template>

<script>
	var that
	import ssSelectCity from '@/components/ss-select-city/index.vue'
	export default {
		components: {
			ssSelectCity
		},
		data() {
			return {
				value: '杭州',
				url:'/pages/index/index'
			}
		},
		onLoad(option) {
			that = this
			that.value = option.city
		},
		methods: {
			City(city) {
				console.log(1111)
				console.log(this.url)
				console.log(city)
				uni.switchTab({
					url: '/pages/index/index?city='+city
				})
				uni.setStorageSync('city',city)
				// uni.navigateTo({
				// 	url:`${this.url}`
				// })


			}
		}
	}
</script>

<style>
</style>
