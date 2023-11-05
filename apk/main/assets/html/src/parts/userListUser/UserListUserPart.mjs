import {UserListUserHandler} from "./UserListUserHandler.mjs";

const Handler = new UserListUserHandler();

export const UserListUserPart = createPart(`
    <div class="element">
        <img src="${asset(`images/user default pfp.png`)}">
        <div class="details">
            <div class="name">${text("user.username")}</div>
            <div class="sub">
                <!--<div class="field">Ostatnia aktywność 30 minut temu</div>-->
            </div>
        </div>
        <button style="filter: grayscale(0.5)"
            ${onClick((e) => { Handler.sendBattleInvite(e.source, e.data) })}
        ><i class="fa-regular fa-hand-point-up"></i></button>
    </div>
`);

UserListUserPart.importStyle('./src/parts/userListUser/UserListUserStyle.css');