export class QuizSubjectSelectorHandler {
    constructor() { }

    /**
     *
     * @param {HTMLElement} part
     * @param {Array<{name: string, onClick: function}>} options
     */
    loadOptions(part, options) {
        options.forEach(option => {
            const element = createElement(`<div class="option">${option.name}</div>`).toElement();

            element.addEventListener('click', option.onClick);
            element.addEventListener('click', (e) => {
                const selected = part.querySelector(".selected");

                selected.innerHTML = option.name;
            });

            part.querySelector(".options").insertAdjacentElement(`beforeend`, element);
        });

        this.toggle(part, false);

        setTimeout(() => { part.querySelector(".options").removeAttribute("style") }, 500)
    }

    /**
     *
     * @param {HTMLElement} part
     * @param {Boolean} open
     */
    toggle(part, open) {
        const OPTION_HEIGHT = 50;

        const options = part.querySelector(".options");
        const keyFrame = new CjsKeyFrame()
            .setDuration(300)
            .addEntry({ height: `0px`, opacity: '0' })
            .addEntry({ height: `${OPTION_HEIGHT * options.children.length}px`, opacity: '1' });

        const isOpened = (
            options.classList.contains(keyFrame.getClass()) || options.className === 'options'
        )

        if(open === isOpened) return;

        options.classList.remove(keyFrame.getClass({ reversed: open }))
        options.classList.add(keyFrame.getClass({ reversed: !open }))
    }
}