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
        for (var i = 0; i < dotEls.length; i++) dotEls[i].classList.toggle('active', i === current);
    }
    function startAuto() { stopAuto(); autoTimer = setInterval(function() { goTo(current + 1); }, 4000); }
    function stopAuto() { if (autoTimer) clearInterval(autoTimer); }

    var scrollTimeout;
    track.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            current = Math.round(track.scrollLeft / track.clientWidth);
            updateDots();
        }, 80);
    });
    track.addEventListener('touchstart', stopAuto);
    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('touchend', startAuto);
    track.addEventListener('mouseleave', startAuto);

    startAuto();
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
    })
    btn.addEventListener('click',function(){
        window.scrollTo({top:0,behavior:'smooth'});
    })
})();