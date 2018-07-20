/*!
 * Sliding 1.0.0
 *
 * Copyright © Capiner https://capiner.com
 * MIT License https://github.com/capiner/sliding/blob/master/LICENSE
 */
(function($){
	var scroll = 0, scrollTop = 0;
	$(window).scroll(function(){
		scroll = $(this).scrollTop()
	});
	$.Sliding = function(options, element){
		this.e = $(element);
		this.o = $.extend(true, {}, $.Sliding.defaults, options);
		this.init()
	};
	$.Sliding.prototype = {
		init: function(){
			var self = this, $item;
			if (self.o.opener)
				self.e.find(self.o.openerClass).empty().append(self.o.opener);
			if (self.o.closer){
				self.o.closerTitle ?
					self.e.find('.closer').empty().append(self.o.closer):
					self.e.find(self.o.closerClass).empty().append(self.o.closer);
			}
			if (self.o.opened){
				self.e.find(self.o.contentClass).css('display','block').addClass('open');
				self.o.openerType == 'icon' ?
					self.e.find(self.o.openerClass).parent().parent().addClass('active'):
					self.e.find(self.o.openerClass).parent().addClass('active');
			} else {
				self.e.find(self.o.contentClass).css('display','none');
				if (self.o.animate)
					self.e.find(self.o.contentClass).css(self.o.closerAnimate);
			}
			if (self.o.openerType == 'link')
				self.e.find(self.o.openerClass).parent().addClass('opener-link');
			self.e.find(self.o.openerType == 'link' ? '.opener-link' : self.o.openerClass).on('click', function(){
				if (self.e.hasClass(self.o.hasClass)){
					if ($(this).parent().hasClass('active')){
						self.o.openerType == 'icon' ?
							$item = $(this).parent().siblings(self.o.contentClass):
							$item = $(this).siblings(self.o.contentClass);
						self.closing($item)
					} else {
						self.o.openerType == 'icon' ?
							$item = $(this).parent().parent():
							$item = $(this).parent();
						self.opening($item)
					}
					return false
				}
			});
			self.e.find(self.o.closerClass).on('click', function(){
				if (self.e.hasClass(self.o.hasClass)){
					if (self.o.closingClass){
						$item = self.e.find(self.o.closingClass)
					} else {
						self.o.closerTitle ?
							$item = $(this).parent():
							$item = $(this).parent().parent();
					}
					self.closing($item);
					return false
				}
			})
		},
		opening: function($item){
			var self = this, $content;
			$item.addClass('active');
			self.e.addClass('active').find(self.o.firstClass).css({'overflow-x':'hidden','overflow-y':'hidden'}).scrollTop(0);
			$content = $item.children(self.o.contentClass).stop(true,true).addClass('open');
			if (self.o.overflow){
				self.e.find(self.o.contentClass).css({'overflow-x':'hidden','overflow-y':'hidden'}).scrollTop(0);
				$content.css({'overflow-x':'hidden','overflow-y':'auto'})
			}
			if (self.o.animate){
				$content.css('display','block').animate(self.o.openerAnimate, self.o.speed, self.o.easing)
			} else {
				self.o.effect == 'fade' ?
					$content.fadeIn(self.o.speed, self.o.easing):
					$content.slideDown(self.o.speed, self.o.easing);
			}
			if (self.o.scrollClass)
				$('html').addClass(self.o.scrollClass).css('top','-' + (scrollTop = scroll) + 'px');
			$('html').addClass(self.o.activeClass)
		},
		closing: function($item){
			var self = this, $content;
			$item.removeClass('open').parent().removeClass('active');
			$content = self.e.find(self.o.contentClass).stop(true,true);
			if (self.o.overflow){
				$content.css({'overflow-x':'hidden','overflow-y':'hidden'}).scrollTop(0);
				self.e.find('.open:last').css({'overflow-x':'hidden','overflow-y':'auto'})
			}
			if (self.o.animate){
				$item.animate(self.o.closerAnimate, self.o.speed, self.o.easing).hide(self.o.speed, self.o.easing);
			} else {
				self.o.effect == 'fade' ?
					$item.fadeOut(self.o.speed, self.o.easing):
					$item.slideUp(self.o.speed, self.o.easing);
			}
			if (self.o.scrollClass)
				$('html,body').removeClass(self.o.scrollClass).css('top','').scrollTop(scrollTop);
			setTimeout(function(){
				$('html').removeClass(self.o.activeClass)
			}, self.o.speed);
			if (self.e.hasClass('open') && !$content.hasClass('open'))
				self.e.removeClass('active').find(self.o.firstClass).css({'overflow-x':'hidden','overflow-y':'auto'});
		}
	};
	$.fn.Sliding = function(options){
		if (typeof options === 'string'){
			var args = Array.prototype.slice.call(arguments, 1);
			this.each(function(){
				var Sliding = $.data(this, 'Sliding');
				Sliding[options].apply(Sliding, args)
			})
		} else {
			this.each(function(){
				var Sliding = $.data(this, 'Sliding');
				if (!Sliding) $.data(this, 'Sliding', new $.Sliding(options, this))
			})
		}
		return this
	};
	$.Sliding.defaults = {
		hasClass      : 'sliding',
		firstClass    : null,
		openerType    : 'link',
		openerClass   : '.opener',
		closerTitle   : false,
		closerClass   : '.closer',
		contentClass  : 'ul',
		closingClass  : null,
		scrollClass   : null,
		activeClass   : null,
		overflow      : true,
		opened        : false,
		animate       : false,
		openerAnimate : null,
		closerAnimate : null,
		effect        : 'fade',
		speed         : 300,
		easing        : 'swing',
		opener        : null,
		closer        : null
    }
})(jQuery)