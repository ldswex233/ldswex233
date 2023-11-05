import {BottomNavigationComponent} from "../../components/bottomNavigation/BottomNavigationComponent.mjs";
import {SliderComponent} from "../../components/slider/SliderComponent.mjs";
import {QuizesComponent} from "../../components/quizes/QuizesComponent.mjs";
import {CalendarComponent, Handler as CalendarHandler} from "../../components/calendar/CalendarComponent.mjs";
import {CalendarDayPopupComponent} from "../../components/calendarDayPopup/CalendarDayPopupComponent.mjs";
import {UserComponent} from "../../components/user/UserComponent.mjs";
import {CalendarDayPopup} from "../../components/calendarDayPopup/script/CalendarDayPopup.mjs";
import {Slider} from "../../components/slider/script/SliderScript.mjs";
import {WebSocket} from "../../Root.mjs";

const PanelLayout = new LayoutLoader(createLayout(
    [
        [
            SliderComponent,
            [
                [QuizesComponent],
                [CalendarComponent],
                [UserComponent]
            ]
        ],
        [BottomNavigationComponent],
        [CalendarDayPopupComponent]
    ]
));

PanelLayout.setDefaultData({
    calendarDate: null,
    selectedDayDate: null,
    defaultSlide: 1, // count from 0
    handlers: {
        calendar: CalendarHandler
    }
})

PanelLayout.onLoad(async () => {
    new CalendarDayPopup().instantClose();
    new Slider().setDefaultSlide(PanelLayout.data.defaultSlide);

    const now = new Date();

    PanelLayout.data.calendarDate = new Date(now.getFullYear(), now.getMonth(), 1);

    WebSocket.sendJson({ type: "register", token: localStorage.getItem("token")  });
});

export {PanelLayout}