import {SidebarComponent} from "../../components/sidebar/SidebarComponent.mjs";
import {ContainerComponent} from "../../components/container/ContainerComponent.mjs";
import {ContentComponent} from "../../components/content/ContentComponent.mjs";
import {TestCreatorLayout} from "../testCreator/TestCreatorLayout.mjs";
import {QuestionCreatorLayout} from "../questionCreator/QuestionCreatorLayout.mjs";

export const MainLayout = new LayoutLoader(createLayout(
    [
        [
            ContainerComponent,
            [
                [SidebarComponent],
                [ContentComponent]
            ]
        ]
    ]
));

MainLayout.onLoad(async () => {
    MainLayout
        .select(ContentComponent)
        .loadLayout(TestCreatorLayout)
});