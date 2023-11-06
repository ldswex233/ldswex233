import {ContentHandler} from "./ContentHandler.mjs";

const Handler = new ContentHandler();

export const ContentComponent = createComponent(`
    <div class="content"></div>
`);

ContentComponent.importStyle('./src/components/content/ContentStyle.css');

