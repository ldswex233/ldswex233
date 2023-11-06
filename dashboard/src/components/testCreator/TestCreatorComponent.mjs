import {TestCreatorHandler} from "./TestCreatorHandler.mjs";

const Handler = new TestCreatorHandler();

export const TestCreatorComponent = createComponent(`
    <div class="test-creator">
        <div class="title">Tworzenie testu</div>
        <div class="body"
            ${onLoad(async (e) => { await Handler.loadSubjectSelector(e.source) })}
        >
            <input type="text" placeholder="Nazwa testu"
                ${onLoad((e) => { Handler.setTestNameInput(e.source) })}
            >
        </div>
        <button
            ${onClick(async(e) => { await Handler.createTest(); })}
        ><i class="fa-regular fa-square-check"></i></button>
    </div>
`);

TestCreatorComponent.importStyle('./src/components/testCreator/TestCreatorStyle.css');

