import {ContainerComponent} from "../../components/container/ContainerComponent.mjs";
import {DrawboardComponent} from "../../components/drawboard/DrawboardComponent.mjs";
import {ExpanderimgComponent} from "../../components/expanderimg/ExpanderimgComponent.mjs";

export const MainLayout = new LayoutLoader(createLayout(
    [
        [
            ContainerComponent,
            [
                [ExpanderimgComponent]
            ]
        ]
    ]
));

// export const MainLayout = new LayoutLoader(createLayout(
//     [
//         [
//             ContainerComponent,
//             [
//                 [DrawboardComponent]
//             ]
//         ]
//     ]
// ));

MainLayout.onLoad(async () => {

});