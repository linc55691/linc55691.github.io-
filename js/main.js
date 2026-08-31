//轮播逻辑 修复：末尾卡住不循环
(function() {
    var track = document.getElementById('promoTrack');
    var dots = document.getElementById('promoDots');
    if (!track) return;
    var slides = track.children.length;
    if (slides <= 1) return;

    var dotEls = dots ? dots.children : [];
    var current = 0;
    var autoTimer = null;
    var isAnimating = false;

    function goTo(index) {
        if(isAnimating) return;
        current = (index + slides) % slides;
        isAnimating = true;
        track.scrollTo({ left: track.clientWidth * current, behavior: 'smooth' });
        updateDots();
        //动画锁，防止连续点击触发错乱
        setTimeout(function(){ isAnimating = false; },450);
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
        }, 4200);
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
            if(page !== current && !isAnimating){
                current = page;
                updateDots();
            }
        }, 120);
    });

    track.addEventListener('touchstart', stopAuto);
    track.addEventListener('mouseenter', stopAuto);

    track.addEventListener('touchend', function () {
        setTimeout(startAuto, 300);
    });
    track.addEventListener('mouseleave', startAuto);

    //加长延时，等待图片+布局全部渲染完毕
    window.addEventListener('load', function(){
        setTimeout(function(){
            goTo(0);
            startAuto();
        },700);
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
