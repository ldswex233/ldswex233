import {BottomNavigationButtonHandler} from "./BottomNavigationButtonHandler.mjs";
import {PanelLayout} from "../../layouts/panel/PanelLayout.mjs";

const Handler = new BottomNavigationButtonHandler();

export const BottomNavigationButtonPart = createPart(`
    <button 
        class="${text("class")}" 
        ${onClick((event) => { Handler.click(event.source, event.data.index) })}
    >
        <i class="fa-regular ${text("fa")}"></i>
    </button>
`);

BottomNavigationButtonPart.importStyle(`./src/parts/bottomNavigationButton/BottomNavigationButtonStyle.css`);