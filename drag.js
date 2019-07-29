let drag = function (opt) {
    console.log(opt)
    let el = document.querySelector(opt.el)
    console.log(el)
    el.style.cssText = 'position:absolute;margin:auto;width:auto;height:auto;z-index:20000;user-select: none;'
    el.style.cssText += opt.style
    if (opt.cursor === true) {
        el.style.cursor = 'move';
    }

    let $bg = document.createElement('div')
    $bg.id = 'bg'
    $bg.style.cssText = 'position:absolute;margin:auto;width:100%;top:0;left:0;right:0;'
    el.parentNode.appendChild($bg)

    let bg = document.getElementById('bg');
    bg.style.zIndex = el.style.zIndex - 1

    el.onmousedown = (e) => {
        let disx = e.pageX - el.offsetLeft
        let disy = e.pageY - el.offsetTop
        let overX = el.parentNode.clientWidth - el.clientWidth
        let overY = el.parentNode.clientHeight - el.clientHeight
        document.onmousemove = function (e) {
            let moveX = e.pageX - disx
            let moveY = e.pageY - disy
            bg.style.height = '100%'
            if (opt.frontier === true) {
                if (moveX <= 0) {
                    moveX = 0;
                }
                if (moveX > overX) {
                    moveX = overX;
                }
                if (moveY <= 0) {
                    moveY = 0
                }
                if (moveY > overY) {
                    moveY = overY;
                }
            }
            el.style.left = moveX + 'px'
            el.style.top = moveY + 'px'
        }
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null
            bg.style.height = null
        }
    }
}
