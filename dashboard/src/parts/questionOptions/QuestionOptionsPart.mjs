import {QuestionOptionsHandler} from "./QuestionOptionsHandler.mjs";

const optionsList = new Reference();
const optionsSelectorContainer = new Reference();
const correctOptionsContainer = new Reference();

const Handler = new QuestionOptionsHandler();

export const QuestionOptionsPart = createPart(`
    <div class="question-options"
        ${onLoad((e) => {
            Handler.reloadData();
            
            Handler.setElements(
                optionsList.getElement(),
                optionsSelectorContainer.getElement(),
                correctOptionsContainer.getElement()
            )
            
            Handler.addOption();
            Handler.addOption();
        })}
    >
        <div class="body">
            <div class="field">
                <span>Treść pytania</span>
                <textarea ${onInput((e) => { Handler.setQuestion(e.source.value) })}></textarea>
            </div>
            <div class="field">
                <span>Opcje pytania</span>
                <div class="list" ${optionsList}>
                </div>
                <button
                    ${onClick((e) => { Handler.addOption() })}
                >+</button>
            </div>
            <div class="field">
                <span>Poprawne odpowiedzi</span>
                <div class="correct" ${correctOptionsContainer}></div>
                <div class="row">
                    <div class="options-selector" ${optionsSelectorContainer}></div>
                </div>
            </div>
            <div class="field">
                <span>Zaawansowane ustawienia pytania</span>
                <label>
                    <input type="checkbox" checked
                        ${onInput((e) => { Handler.setRandomAllowed(e.source.checked) })}
                    >
                    Pozwalaj na losowe generowanie opcji
                </label>
            </div>
        </div>
        <button
            ${onClick((e) => { Handler.saveQuestion(e.data.questionId) })}
        >Zapisz pytanie</button>
    </div>
`);

QuestionOptionsPart.importStyle('./src/parts/questionOptions/QuestionOptionsStyle.css');