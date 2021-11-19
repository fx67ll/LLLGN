<template>
	<div class="fx67ll-box">
		<!-- 点击重新开始动画 -->
		<div id="fx67ll-typical" class="fx67ll-tip" @click="repeatAnimation()">️</div>
		<!-- <div id="fx67ll-typical" class="fx67ll-tip"></div> -->
		<div class="fx67ll-clock"></div>
		<div class="fx67ll-record">
			<span id="fx67ll-record-start">From 2021-08-23 🥳 </span>
			&nbsp;&nbsp;&nbsp;
			<span id="fx67ll-record-end">To 2021-11-13 🥶 </span>
		</div>
	</div>
</template>

<script>
	import FlipClock from 'flipclock';
	import 'flipclock/dist/flipclock.css';
	import moment from 'moment';
	import {
		type,
		type as loop
	} from '@camwiegert/typical';
	export default {
		name: 'fx67llIndex',
		data() {
			return {
				meetHerDays: 0,
				chnNumChar: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
				chnUnitSection: ["", "万", "亿", "万亿", "亿亿"],
				chnUnitChar: ["", "十", "百", "千"]
			};
		},
		mounted() {
			this.initStuDays();
			this.initClock();
			this.typeMyWords();
			this.consoleFailDays();
			this.breathAnimation();
		},
		methods: {
			// 重复动画
			repeatAnimation() {
				this.typeMyWords();
				this.breathAnimation();
			},
			// 显示一下攻略的开始结束时间
			breathAnimation() {
				// document.getElementById("fx67ll-record-start").setAttribute("class", "fx67ll-record-animation-breath");
				document.getElementById("fx67ll-record-start").style.animation = "breath 5.4s linear 2 alternate";
				setTimeout(function() {
					// document.getElementById("fx67ll-record-end").setAttribute("class",
					// 	"fx67ll-record-animation-breath");
					document.getElementById("fx67ll-record-end").style.animation = "breath 5.4s linear 2 alternate";
				}, 5400);
				document.getElementById("fx67ll-record-start").addEventListener("animationend", function() {
					document.getElementById("fx67ll-record-start").style.animation = "";
				});
				document.getElementById("fx67ll-record-end").addEventListener("animationend", function() {
					document.getElementById("fx67ll-record-end").style.animation = "";
				});
			},
			// 失败日
			consoleFailDays() {
				let failDays = moment(moment('20211113').format('YYYY-MM-DD')).diff(moment('20210823').format(
						'YYYY-MM-DD'),
					'day');
				console.log('fx67ll已于2021年11月13日获得失败，本次攻略时间仅' + failDays + '天');
			},
			// 打印一些有意思的内容
			typeMyWords() {
				// 循环打印
				// const element = document.querySelector('#fx67ll-typical');
				// const myWordsFirst = "测试~测试~测试~测试~测试~测试~测试~测试~测试~";
				// const myWordsSecond = "继续测试！继续测试！继续测试！继续测试！继续测试！继续测试！";
				// const myWordsThird = "还是在测试哈哈///还是在测试哈哈///还是在测试哈哈";
				// const steps = [1000, myWordsFirst, 1000, myWordsSecond, 1000, myWordsThird];
				// type(element, ...steps, loop);

				// 打印完之后自动停止
				const element = document.querySelector('#fx67ll-typical');
				const myWordsFirst = "⛰️ 虽然，不太成熟的我虽然没能吸引到你 💖";
				const myWordsSecond = "😝 但是，很高兴能在这小小的宇宙里遇见你 🌏";
				const myWordsThird = "📷 所以，我还是想记录下这个在我生命中很重要的瞬间 🕰️";
				const myWordsFourth = "✨️ 今天是认识 yu 的第" + this.meetHerDays + "天" + " ❤️";
				type(element, myWordsFirst, 2000, myWordsSecond, 2000, myWordsThird, 2000, myWordsFourth);
			},
			// 天数计算
			initStuDays() {
				let meetHerDays = moment(moment().format('YYYY-MM-DD')).diff(moment('20210823').format('YYYY-MM-DD'),
					'day');
				this.meetHerDays = this.NumberToChinese(meetHerDays);
			},
			// 时钟初始化
			initClock() {
				const el = document.querySelector('.fx67ll-clock');
				const clock = new FlipClock(el, new Date('2021-08-23'), {
					face: 'DayCounter', // 类型  
					showSeconds: true, // 显示秒数  
					showLabels: true, // 显示文字标识  
					language: {
						'years': '年',
						'months': '月',
						'days': '日',
						'hours': '時',
						'minutes': '分',
						'seconds': '秒'
					},
					countdown: false, // true为倒计时
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
					strIns += (section !== 0) ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
					chnStr = strIns + chnStr;
					needZero = (section < 1000) && (section > 0);
					num = Math.floor(num / 10000);
					unitPos++;
				}

				if (chnStr.substring(0, 1) === '一' && chnStr.substring(1, 2) === '十') {
					chnStr = chnStr.substr(1, chnStr.length)
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
			}
		}
	};
</script>
<style type="text/css">
	.flip-clock {
		font-size: 2vw;
		justify-content: center;
	}

	@keyframes breath {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
</style>
<style lang="less" scoped="scoped">
	.fx67ll-box {
		width: 100%;
		height: 100%;
		overflow: hidden;
		.ban-user-select();

		.fx67ll-tip {
			width: 100%;
			text-align: center;
			font-size: 50px;
			color: #2ECC71;
			position: absolute;
			top: 15%;
		}

		.fx67ll-clock {
			position: relative;
			top: 60%;
			margin-top: -10vw;
		}

		.fx67ll-record {
			width: 100%;
			position: absolute;
			bottom: 10vw;
			display: flex;
			justify-content: center;
			font-size: 30px;
			font-weight: 900;
			color: #2ECC71;

			span {
				position: relative;
				opacity: 0;
			}

		}
	}

	// .fx67ll-record-animation-breath {
	// 	animation: breath 5s linear 2 alternate;
	// }

	// @keyframes breath {
	// 	from {
	// 		opacity: 0;
	// 	}

	// 	to {
	// 		opacity: 1;
	// 	}
	// }
</style>
