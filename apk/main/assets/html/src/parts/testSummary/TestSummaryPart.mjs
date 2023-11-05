import {TestSummaryHandler} from "./TestSummaryHandler.mjs";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {ContainerComponent} from "../../components/container/ContainerComponent.mjs";
import {PanelLayout} from "../../layouts/panel/PanelLayout.mjs";

export const TestSummaryPart = createPart(`
    <div class="test-summary">
        <div class="card">
            <div class="top">
                <span>Procentowy wynik testu</span>
                <span>0%</span>
            </div>
            <progress value="0" max="100"></progress>
            <div class="sub">
                <span>Poprawne odp: <span class="gray">0</span></span>
                <span>Błędne odp: <span class="gray">0</span></span>
            </div>
        </div>
        <div class="card">
            <div class="top">Pytania</div>
            <div class="list"></div>
        </div>
        <div class="card" style="background: transparent; padding: 0; padding-bottom: 50px;">
            <button ripple
                ${onClick(() => MainLayout.select(ContainerComponent).loadLayout(PanelLayout))}
            >Wyjdź z testu</button>
        </div>
    </div>
`);

TestSummaryPart.importStyle('./src/parts/testSummary/TestSummaryStyle.css');