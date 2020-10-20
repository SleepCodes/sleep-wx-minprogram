<template>
	<view>
		<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" 
		:interval="interval" :duration="duration" class="swiper" circular="true">
			<block v-for="(item,index) in images" :key="index">
				<swiper-item>
					<image :src="item.url" mode="aspectFill" class="image"></image>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			images: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				interval: 5000, // 自动切换时间间隔
				indicatorDots: true, // 是否显示面板指示点
				duration: 500,
				autoplay: true
			};
		}
	}
</script>

<style lang="scss">
	.swiper {
		height: 40vh;
		.image{
			width: 100%;
		}
	}
</style>
