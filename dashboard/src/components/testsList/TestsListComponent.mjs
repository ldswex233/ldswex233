import {TestsListHandler} from "./TestsListHandler.mjs";

const Handler = new TestsListHandler();

export const TestsListComponent = createComponent(`
    <div class="tests-list">
        <div class="title">Lista testów</div>
        <div class="header"
            ${onLoad((e) => { Handler.loadSubjectsFilter() })}
        ></div>
        <div class="list"
            ${onLoad(async (e) => { await Handler.loadTests() })}
        ></div>
    </div>
`);

TestsListComponent.importStyle('./src/components/testsList/TestsListStyle.css');

