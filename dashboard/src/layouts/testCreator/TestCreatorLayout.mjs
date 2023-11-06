import {CardComponent} from "../../components/card/CardComponent.mjs";
import {TestsListComponent} from "../../components/testsList/TestsListComponent.mjs";
import {TestCreatorComponent} from "../../components/testCreator/TestCreatorComponent.mjs";

export const TestCreatorLayout = new LayoutLoader(createLayout(
    [
        [
            CardComponent,
            [
                [TestsListComponent]
            ]
        ],
        [
            CardComponent,
            [
                [TestCreatorComponent]
            ]
        ]
    ]
));