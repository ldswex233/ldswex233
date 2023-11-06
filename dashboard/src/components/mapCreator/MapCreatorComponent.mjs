import {MapCreatorHandler} from "./MapCreatorHandler.mjs";

const Handler = new MapCreatorHandler();

export const MapCreatorComponent = createComponent(`
    <div class="map-creator">
        <div class="title">Mapa przedmiotu</div>
        <div class="header"
            
        ></div>
        <div class="map" style="width: 100px; height: 50px;"
            ${onClick((e) => { console.log('test click') })}
        ></div>
    </div>
`);

MapCreatorComponent.importStyle('./src/components/mapCreator/MapCreatorStyle.css');

