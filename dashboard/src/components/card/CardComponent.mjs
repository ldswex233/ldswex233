import {CardHandler} from "./CardHandler.mjs";

const Handler = new CardHandler();

export const CardComponent = createComponent(`
    <div class="card">
        
    </div>
`);

CardComponent.importStyle('./src/components/card/CardStyle.css');

