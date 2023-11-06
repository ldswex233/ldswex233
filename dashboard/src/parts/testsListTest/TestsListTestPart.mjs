import {TestsListTestHandler} from "./TestsListTestHandler.mjs";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {ContentComponent} from "../../components/content/ContentComponent.mjs";
import {TestQuestionsOverviewLayout} from "../../layouts/testQuestionsOverview/TestQuestionsOverviewLayout.mjs";

const Handler = new TestsListTestHandler();

export const TestsListTestPart = createPart(`
    <div class="element"
        ${onOuterclick(async (e) => { await Handler.toggleTestTitleInput(e.part, e.data, false) })}
        ${onDblclick(async (e) => { await Handler.toggleTestTitleInput(e.part, e.data, true); })}
        
        subjectId="${text("subject.id")}"
    >
        <div class="title">
            <div class="main">${text("name")}</div>
            <div class="sub">${text("subject.name")}</div>
        </div>
        <div class="buttons">
            <button
                ${onClick((e) => { Handler.delete(e.part, e.data.id) })}
            ><i class="fa-regular fa-trash-can"></i></button>
            <button
                ${onClick((e) => { 
                    MainLayout
                        .select(ContentComponent)
                        .loadLayout(TestQuestionsOverviewLayout.setData({ testId: `${e.data.id}` })); 
                })}
            >
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
        </div>
    </div>
`);

TestsListTestPart.importStyle('./src/parts/testsListTest/TestsListTestStyle.css');