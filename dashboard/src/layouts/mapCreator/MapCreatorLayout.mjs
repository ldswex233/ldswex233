import {CardComponent} from "../../components/card/CardComponent.mjs";
import {MapCreatorComponent} from "../../components/mapCreator/MapCreatorComponent.mjs";

export const MapCreatorLayout = new LayoutLoader(createLayout(
    [
        [
            CardComponent,
            [
                [MapCreatorComponent]
            ]
        ]
    ]
));