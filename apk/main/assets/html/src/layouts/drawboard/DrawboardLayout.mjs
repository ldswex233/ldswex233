import {DrawboardComponent} from "../../components/drawboard/DrawboardComponent.mjs";

export const DrawboardLayout = new LayoutLoader(createLayout(
    [
        [DrawboardComponent]
    ]
));

DrawboardLayout.setDefaultData({
    connectionKey: null
})

DrawboardLayout.onLoad(() => {

});