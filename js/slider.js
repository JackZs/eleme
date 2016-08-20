'use strict';
window.onload = function () {
	var imgWrapper = document.querySelector('.imgWrapper');
	var slider = document.querySelector('.slider');
	
	// 在尾部添加第一张图片，初始化页码并添加事件监听，以便实现无限循环
	function init() {
		// 添加图片
		var newImg = imgWrapper.firstElementChild.cloneNode(true);
		imgWrapper.appendChild(newImg);
		// 添加页码
		var pageNum = document.createElement('div');
		var len = imgWrapper.children.length;
		pageNum.classList.add('pageNum');
		slider.appendChild(pageNum);
		for(var i = 1; i < len; i++) {
			pageNum.insertAdjacentHTML('beforeend', '<span>' + i + '</span>');
		}
		pageNum.firstElementChild.classList.add('page-focus');
		// 将imgWrapper的bottom初始化为0
		imgWrapper.style.bottom = '0px';
		// 开始循环吧！
		start(len, 1);
	}
	
	// 移动到某张图片
	function comeTo(imgIndex) {
		imgWrapper.style.transition = 'all ease-in-out 1s';
		imgWrapper.style.bottom =  imgIndex*100 + 'px';
	}
	
	// 将imgWrapper恢复到初始状态
	function recover () {
		imgWrapper.style.transition = '';
		imgWrapper.style.bottom = '0px';
	}
	
	// 改变pageNum状态
	function changePageNum (imgIndex) {
		var pageNum = document.querySelector('.pageNum');
		var imgLen = imgWrapper.children.length;
		for (var i = 0, len = pageNum.children.length; i < len; i ++) {
			pageNum.children[i].setAttribute('class', '');
		}
		if (imgIndex === imgLen) {
			pageNum.children[0].classList.add('page-focus');
		} else {
			pageNum.children[imgIndex - 1].classList.add('page-focus');
		}
	}
	
	// 轮播入口
	function start (len, imgIndex) {
		var pageNum = document.querySelector('.pageNum');
		var time = 3000;
		var timer2;
		var timer = setTimeout(function addIndex() {
			if (imgIndex >= len) {
				time = 13;
				imgIndex = 0;
				recover();
				imgIndex ++;
				changePageNum(imgIndex);
			} else {
				time = 3000;
				comeTo(imgIndex ++);
				changePageNum(imgIndex);
			}
			timer2 = setTimeout(addIndex, time);
		}, time);
		
		
		// 监听pageNum的click事件
		pageNum.addEventListener('click', function (e) {
			if (!e.target.classList.contains('page-focus')) {
				var currentIndex = parseInt(e.target.innerHTML);
				comeTo(currentIndex - 1);
				changePageNum(currentIndex);
			} 
		});
		// 鼠标移到slider上，动画取消
		slider.addEventListener('mouseenter', function () {
			console.log('mouseenter...');
			clearTimeout(timer);
			clearTimeout(timer2);
		});
		// 鼠标移开slider，开始动画
		slider.addEventListener('mouseleave', function () {
			console.log('mouseleave...');
			start(len, imgIndex);
		});
		
	}
	
	// 开始!
	init();
	
	// 附加：自动填充stores中的storeBox
	(function () {
		var stores = document.querySelector('.stores');
		for (var i = 0; i < 23; i ++) {
			var newStoreBox = document.querySelector('.storeBox').cloneNode(true);
			stores.appendChild(newStoreBox);
		}
	})();
};
