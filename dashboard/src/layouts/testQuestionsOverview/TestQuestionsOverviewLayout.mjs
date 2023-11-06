import {CardComponent} from "../../components/card/CardComponent.mjs";
import {TestQuestionsListComponent} from "../../components/testQuestionsList/TestQuestionsListComponent.mjs";

export const TestQuestionsOverviewLayout = new LayoutLoader(createLayout(
    [
        [
            CardComponent,
            [
                [TestQuestionsListComponent]
            ]
        ],
    ]
));

TestQuestionsOverviewLayout.data = {
    testId: null
}