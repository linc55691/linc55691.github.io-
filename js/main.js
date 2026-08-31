//轮播逻辑
(function() {
    var track = document.getElementById('promoTrack');
    var dots = document.getElementById('promoDots');
    if (!track) return;
    var slides = track.children.length;
    if (slides <= 1) return;

    var dotEls = dots ? dots.children : [];
    var current = 0;
    var autoTimer = null;

    function goTo(index) {
        current = (index + slides) % slides;
        track.scrollTo({ left: track.clientWidth * current, behavior: 'smooth' });
        updateDots();
    }

    function updateDots() {
        for (var i = 0; i < dotEls.length; i++) {
            dotEls[i].classList.toggle('active', i === current);
        }
    }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(function() {
            goTo(current + 1);
        }, 4000);
    }

    function stopAuto() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    var scrollTimeout;
    track.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            var page = Math.round(track.scrollLeft / track.clientWidth);
            if(page !== current){
                current = page;
                updateDots();
            }
        }, 100);
    });

    track.addEventListener('touchstart', stopAuto);
    track.addEventListener('mouseenter', stopAuto);

    // touchend/mouseleave 增加延时，滑动完成后再开启自动轮播
    track.addEventListener('touchend', function () {
        setTimeout(startAuto, 300);
    });
    track.addEventListener('mouseleave', startAuto);

    // 等待页面图片、布局完全渲染，再启动轮播，修复图片加载慢初始错位
    window.addEventListener('load', function(){
        goTo(0);
        startAuto();
    });

})();

//回到顶部按钮逻辑
(function() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll',function(){
        if(window.scrollY > 350){
            btn.classList.add('show');
        }else{
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click',function(){
        window.scrollTo({top:0,behavior:'smooth'});
    });
})();
