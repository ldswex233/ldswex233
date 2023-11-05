import {Slider} from "../../components/slider/script/SliderScript.mjs";
import {SliderComponent} from "../../components/slider/SliderComponent.mjs";
import {WorkSubjectPart} from "../../parts/workSubject/WorkSubjectPart.mjs";
import {WorkDescriptionPart} from "../../parts/workDescription/WorkDescriptionPart.mjs";
import {WorkOverviewComponent} from "../../components/workOverview/WorkOverviewComponent.mjs";
import {setProgressLevel} from "../../components/workOverview/script/WorkOverviewScript.mjs";

const WorkOverviewLayout = new LayoutLoader(createLayout(
    [
        [
            WorkOverviewComponent,
            [
                [SliderComponent]
            ]
        ]
    ]
));

WorkOverviewLayout.setDefaultData({
    subject: "",
    description: "",
    type: null,
    calendarDate: null,
    workId: null
})

WorkOverviewLayout.onLoad(() => {
    setProgressLevel(0);
    const slider = new Slider();

    slider.setDefaultSlide(0);
    slider.setSlides(
        WorkSubjectPart.setData({ subject: WorkOverviewLayout.data.subject }).toElement(),
        WorkDescriptionPart.setData({ description: WorkOverviewLayout.data.description }).toElement()
    );
})

export {WorkOverviewLayout}