import {CardComponent} from "../../components/card/CardComponent.mjs";
import {QuestionSettingsComponent} from "../../components/questionSettings/QuestionSettingsComponent.mjs";
import {QuestionTypeSelectorComponent} from "../../components/questionTypeSelector/QuestionTypeSelectorComponent.mjs";

export const QuestionCreatorLayout = new LayoutLoader(createLayout(
    [
        [
            CardComponent,
            [
                [QuestionSettingsComponent]
            ]
        ],
        [
            CardComponent,
            [
                [QuestionTypeSelectorComponent]
            ]
        ]
    ]
));


QuestionCreatorLayout.data = {
    testId: null,
    question: {
        id: null,
        question: null,
        type: null,
        data: {} // different for each question type
    }
}