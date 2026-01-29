<template>
	<div class="fx67ll-box">
		<div id="fx67ll-typical" class="fx67ll-tip" @click="repeatAnimation()" v-show="!isLoadingFireworks"></div>
		<div id="fx67ll-typical-egg" class="fx67ll-tip" @click="repeatAnimation()" v-show="isLoadingFireworks"></div>
		<div class="fx67ll-clock" @click="triggerFireworksEgg()"></div>
		<div class="fx67ll-fireworks">
			<fx67ll-nan-fireworks ref="fireworks" :isShowLaunchBtn="false"></fx67ll-nan-fireworks>
		</div>
		<fx67ll-footer />
	</div>
</template>

<script>
import FlipClock from 'flipclock';
import 'flipclock/dist/flipclock.css';
import moment from 'moment';
import { type, type as loop } from '@camwiegert/typical';
export default {
	name: 'fx67llIndex',
	data() {
		return {
			meetHerDate: '2022-01-08',
			meetHerDays: 0,
			chnNumChar: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
			chnUnitSection: ['', '万', '亿', '万亿', '亿亿'],
			chnUnitChar: ['', '十', '百', '千'],
			isFirstTrigger: true,
			isLoadingFireworks: false,
			fireworksTimer: null,
		};
	},
	mounted() {
		this.initStuDays();
		this.initClock();
		this.typeMyWords();
		this.stopLaunchFireworks();
	},
	beforeDestroy() {
		this.fireworksTimer = null;
	},
	methods: {
		// 点击后重复动画
		repeatAnimation() {
			this.typeMyWords();
		},
		// 打印一些有意思的内容
		typeMyWords() {
			// 循环打印动画
			const element = document.querySelector('#fx67ll-typical');
			const myWordArr = ['😝 很高兴能在这小小的宇宙里遇见你 🌏', '✨️ 今天是和楠楠在一起的第' + this.meetHerDays + '天' + ' ❤️'];
			type(element, myWordArr[0], 2000, myWordArr[1], 60000, loop);
		},
		// 天数计算
		initStuDays() {
			let meetHerDays = moment(moment().format('YYYY-MM-DD')).diff(moment(this.meetHerDate).format('YYYY-MM-DD'), 'day');
			this.meetHerDays = this.NumberToChinese(meetHerDays);
		},
		// 时钟初始化
		initClock() {
			const el = document.querySelector('.fx67ll-clock');
			const clock = new FlipClock(el, new Date(this.meetHerDate), {
				face: 'DayCounter', // 类型
				showSeconds: true, // 显示秒数
				showLabels: true, // 显示文字标识
				language: {
					years: '年',
					months: '月',
					days: '日',
					hours: '時',
					minutes: '分',
					seconds: '秒'
				},
				countdown: false // true为倒计时
			});
		},
		// 阿拉伯数字转换汉字数字
		NumberToChinese(num) {
			var unitPos = 0;
			var strIns = '',
				chnStr = '';
			var needZero = false;

			if (num === 0) {
				return this.chnNumChar[0];
			}

			while (num > 0) {
				var section = num % 10000;
				if (needZero) {
					chnStr = this.chnNumChar[0] + chnStr;
				}
				strIns = this.SectionToChinese(section);
				strIns += section !== 0 ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
				chnStr = strIns + chnStr;
				needZero = section < 1000 && section > 0;
				num = Math.floor(num / 10000);
				unitPos++;
			}

			if (chnStr.substring(0, 1) === '一' && chnStr.substring(1, 2) === '十') {
				chnStr = chnStr.substr(1, chnStr.length);
			}

			return chnStr;
		},
		// 节内转换算法
		SectionToChinese(section) {
			var strIns = '',
				chnStr = '';
			var unitPos = 0;
			var zero = true;
			while (section > 0) {
				var v = section % 10;
				if (v === 0) {
					if (!zero) {
						zero = true;
						chnStr = this.chnNumChar[v] + chnStr;
					}
				} else {
					zero = false;
					strIns = this.chnNumChar[v];
					strIns += this.chnUnitChar[unitPos];
					chnStr = strIns + chnStr;
				}
				unitPos++;
				section = Math.floor(section / 10);
			}
			return chnStr;
		},
		// 放烟花彩蛋
		triggerFireworksEgg() {
			const self = this;

			if (this.isFirstTrigger) {
				console.log("恭喜你触发了隐藏彩蛋 🥚");
				console.log("Thanks♪(･ω･)ﾉ For Ur Happy Fireworks ✨");
				this.isFirstTrigger = false;
			}

			if (this.$refs.fireworks && !this.isLoadingFireworks) {
				this.isLoadingFireworks = true;
				this.$refs.fireworks.startFireworks();
				this.$refs.fireworks.setBackground({
					color: 'rgba(0, 0, 0, 0.97)'
				});
				this.typeEggWords();
				this.fireworksTimer = setTimeout(() => {
					self.stopLaunchFireworks();
				}, 9999);
			}
		},
		// 停止放烟花
		stopLaunchFireworks() {
			this.isLoadingFireworks = false;
			if (this.$refs.fireworks) {
				this.$refs.fireworks.stopFireworks();
				this.$refs.fireworks.setBackground({
					color: 'rgba(236, 240, 241, 1)'
				});
			}
		},
		// 打印一些有意思的内容
		typeEggWords() {
			const element = document.querySelector('#fx67ll-typical-egg');
			const myWordArr = ['🎉 恭喜你触发了隐藏彩蛋 🥚', '🎊Thanks♪(･ω･)ﾉ 谢谢你送的祝福烟花秀 ㊗️'];
			type(element, myWordArr[0], 2000, myWordArr[1], 60000, loop);
		},
	}
};
</script>
<style type="text/css">
.flip-clock {
	font-size: 2vw;
	justify-content: center;
}
</style>
<style lang="less" scoped="scoped">
.fx67ll-box {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: #fff;

	.ban-user-select();

	.fx67ll-tip {
		width: 100%;
		text-align: center;
		font-size: 3vw;
		color: #2ecc71;
		position: absolute;
		top: 7vw;
		z-index: 233;
	}

	.fx67ll-clock {
		position: relative;
		top: 30vw;
		margin-top: -10vw;
		z-index: 233;
	}

	@media screen and (max-width: 960px) {
		.fx67ll-footer {
			font-size: 12px;
		}
	}

	.fx67ll-fireworks {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
	}
}
</style>
