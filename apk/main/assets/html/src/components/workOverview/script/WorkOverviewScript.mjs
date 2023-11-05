/**
 *
 * @param {Number} level count from 0
 */
import {progressReference} from "../WorkOverviewComponent.mjs";

function setProgressLevel(level) {
    const children = Array.from(progressReference.getElement().children);

    children.forEach((child, index) => {
        child.className = `field ${(index <= level ? 'green' : '')}`
    })
}

export {setProgressLevel}