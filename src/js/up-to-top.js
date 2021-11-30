const upElement = document.querySelector('.up');
const screanHeight = window.innerHeight;

const upFunc = function upFunc() {
   upScroll();
    upClick();
  };
  document.addEventListener('DOMContentLoaded', upFunc);

const upScroll = function upScroll() {
  document.addEventListener('scroll', function (e) {
    if (screanHeight <= window.scrollY) {
      upElement.classList.add('up-active');
    } else if (e.target.scrollingElement.scrollTop <= screanHeight) {
      upElement.classList.remove('up-active');
      upElement.style.pointerEvents = 'auto';
    }
  });
};
const upClick = function upClick() {
   upElement.addEventListener('click', function () {
    const docHeight = window.scrollY;
    let progress = 0;
    let position = docHeight;
    const speed = 5; 
   upElement.style.pointerEvents = 'none';
    let upAnim = function upAnim() {
      progress += 1;
      position -= progress * speed;
      window.scrollTo(0, position);
      if (position > 0) {
        requestAnimationFrame(upAnim);
      }
    };
    requestAnimationFrame(upAnim);
  });
};


