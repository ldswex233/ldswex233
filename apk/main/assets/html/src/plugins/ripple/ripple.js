window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(`[ripple]`).forEach(el => {
        applyRippleClickEffect(el)
    });
})

function applyRippleClickEffect(element) {
    element.addEventListener('click', e => {
        e = e.touches ? e.touches[0] : e;
        const r = element.getBoundingClientRect(),
            d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
        element.style.cssText = `--s: 0; --o: 1;`;
        element.offsetTop;
        element.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`;
    });
}

const rippleObserver = new MutationObserver(function(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if(mutation.type !== 'childList') continue;

        mutation.addedNodes.forEach(addedNode => {
            if(!("getAttribute" in addedNode)) return;

            [addedNode, ...addedNode.querySelectorAll("*")].forEach(node => {
                if(node.getAttribute("ripple") !== null) {
                    applyRippleClickEffect(node);
                }
            })
        });
    }
});

rippleObserver.observe(document, { childList: true, subtree: true });