import {SidebarHandler} from "./SidebarHandler.mjs";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {ContentComponent} from "../content/ContentComponent.mjs";
import {TestCreatorLayout} from "../../layouts/testCreator/TestCreatorLayout.mjs";
import {MapCreatorComponent} from "../mapCreator/MapCreatorComponent.mjs";
import {MapCreatorLayout} from "../../layouts/mapCreator/MapCreatorLayout.mjs";

const Handler = new SidebarHandler();

export const SidebarComponent = createComponent(`
    <div class="sidebar">
        <div class="header">
            <img src="${asset(`images/logo (circle).png`)}">
            <div class="text">Panel administracyjny</div>
        </div>
        <div class="list">
            <div class="element">
                <i class="fa-regular fa-calendar-plus"></i>
                <span>Kalendarz</span>
            </div>
            <div class="element"
                ${onClick(() => { MainLayout.select(ContentComponent).loadLayout(MapCreatorLayout); })}
            >
                <i class="fa-regular fa-map"></i>
                <span>Kreator map</span>
            </div>
            <div class="element"
                ${onClick(() => { MainLayout.select(ContentComponent).loadLayout(TestCreatorLayout); })}
            >
                <i class="fa-regular fa-square-check"></i>
                <span>Kreator testów</span>
            </div>
        </div>
    <div>
`);

SidebarComponent.importStyle('./src/components/sidebar/SidebarStyle.css');

