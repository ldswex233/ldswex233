import {BottomNavigationHandler} from "./BottomNavigationHandler.mjs";

const Handler = new BottomNavigationHandler()

export const BottomNavigationComponent = createComponent(`
    <div class="bottom-navigation"
        ${onLoad(() => { Handler.loadButtons(); })}
    >
    </div>
`);

BottomNavigationComponent.importStyle('./src/components/bottomNavigation/BottomNavigationStyle.css');

