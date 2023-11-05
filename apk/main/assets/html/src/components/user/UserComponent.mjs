import {UserHandler} from "./UserHandler.mjs";

const Handler = new UserHandler();

const headerSubReference = new Reference();
const progressSectionReference = new Reference();
const testsReference = new Reference();
const questionsReference = new Reference();
const writesReference = new Reference();
const drawboardPopupReference = new Reference();

Handler.setReferences(
    headerSubReference,
    progressSectionReference,
    testsReference,
    questionsReference,
    writesReference,
    drawboardPopupReference
)

export const UserComponent = createComponent(`
    <div class="user"
        ${onLoad(async (e) => { 
            await Handler.setProgressData(); 
            await Handler.setStatistics();
        })}
    >
        <section class="header">
            <div class="title">Profil</div>
            <div class="image">
                <img src="${asset(`images/user-profile.png`)}">
                <div class="sub" ${headerSubReference}>0 XP</div>
            </div>
            <div class="username"
                ${onLoad((e) => { e.source.innerHTML = localStorage.getItem("username") })}
            >Nie definiowano</div>
        </section>
        <section class="body">
            <div class="card">
                <div class="section progress" ${progressSectionReference}>
                    <div class="title">Nie zdefiniowano</div>
                    <progress value="70" max="100"></progress>
                    <div class="sub left">XP <span>0</span>/<span class="gray">0</span></div>
                    <div class="sub right">Następny poziom: <span class="gray">Nie zdefiniowano</span></div>
                </div>
                <div class="section statistics">
                    <div class="box">
                        <div class="icon purple"><i class="fa-solid fa-flask-vial"></i></div>
                        <div class="side">
                            <div class="number" ${testsReference}>0</div>
                            <div class="sub">Testy</div>
                        </div>
                    </div>
                    <div class="box">
                        <div class="icon green"><i class="fa-solid fa-earth-asia"></i></div>
                        <div class="side">
                            <div class="number" ${questionsReference}>0</div>
                            <div class="sub">Pytania</div>
                        </div>
                    </div>
                    <div class="box">
                        <div class="icon yellow"><i class="fa-solid fa-rocket"></i></div>
                        <div class="side">
                            <div class="number" ${writesReference}>0</div>
                            <div class="sub">Wpisy</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="section connections">
                    <div class="title">Połączenia</div>
                    <div class="box drawboard">
                        <div class="drawboard-popup"
                            ${drawboardPopupReference}
                            ${onOuterclick((e) => { Handler.closeDrawboardPinPopup() })}
                        >
                            <input type="text" placeholder="Wpisz pin dołączenia">
                            <button ripple
                                ${onClick((e) => { Handler.connectToDrawboard() })}
                            >
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                        <div class="icon"><i class="fa-solid fa-chalkboard-user"></i></div>
                        <div class="name">
                            <div class="big">Tablica</div>
                            <div class="sub">Nie połączono</div>
                        </div>
                        <button ripple
                            ${onClick((e) => { Handler.openDrawboardPinPopup(); })}
                        >Połącz</button>
                    </div>
                </div>
            </div>
        </section>
        
    </div>
`);

UserComponent.importStyle('./src/components/user/UserStyle.css');

