import {LoginComponent} from "../../components/login/LoginComponent.mjs";
import {PanelLayout} from "../panel/PanelLayout.mjs";
import {UpdateLayout} from "../update/UpdateLayout.mjs";
import {MainLayout} from "../main/MainLayout.mjs";
import {ContainerComponent} from "../../components/container/ContainerComponent.mjs";
import {Loader} from "../../components/loader/script/LoaderScript.mjs";
import {NotificationError} from "../../plugins/notification/notification.js";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";

const LoginLayout = new LayoutLoader(createLayout(
    [
        [LoginComponent]
    ]
));

LoginLayout.onLoad(async () => {
    const version = await AppRequest.app.checkVersion();
    const APP_VERSION = "2.1";

    if(version.version !== APP_VERSION) {
        return MainLayout
            .select(ContainerComponent)
            .loadLayout(
                UpdateLayout
                    .setData({
                        downloadUrl: version.downloadUrl
                    })
            );
    }

    const hasToken = localStorage.getItem("token") !== null;
    const loader = new Loader();

    if(hasToken) {
        await loader.enable(1000);

        const isTokenValid = await AppRequest.user.validateToken()

        await loader.disable();

        if(isTokenValid) {
            return MainLayout
                .select(ContainerComponent)
                .loadLayout(PanelLayout)
        }

        new NotificationError(`Automatyczne logowanie nie powiodło się`)
    }
})

export {LoginLayout}