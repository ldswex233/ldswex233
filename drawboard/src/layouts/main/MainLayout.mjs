import {ContainerComponent} from "../../components/container/ContainerComponent.mjs";
import {DrawboardComponent} from "../../components/drawboard/DrawboardComponent.mjs";

export const MainLayout = new LayoutLoader(createLayout(
    [
        [
            ContainerComponent,
            [
                [DrawboardComponent]
            ]
        ]
    ]
));

MainLayout.onLoad(async () => {

});
