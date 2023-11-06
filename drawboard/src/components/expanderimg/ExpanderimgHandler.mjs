export class ExpanderimgHandler {
    constructor() { }

    async trigger() {
        const request = (await new CjsRequest("https://prodapi.phot.ai/app/api/v3/user_activity/outpaint", "post")
            .setBody({
                canvas_h: 1024,
                canvas_w: 1024,
                center_x: 0,
                center_y: 0,
                // input_image_link: "https://i.imgur.com/xPiHBmY.png",
                input_image_link: "https://ai-image-editor-webapp.s3.us-east-2.wasabisys.com/background_generator/input_image/2023-11-05/71cf2f67-fc90-45c3-b3da-31d389b2b05e.png",
                rotation_angle: 0,
                scale: 0.724699221514508
            })
            .setHeaders({
                "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ0Zjk1YWE4ZTNlM2I3Nzg0NjUzOGIiLCJlbWFpbCI6ImJlZG9jZTE1NDRAbWt1cmcuY29tIiwibmFtZSI6InVuZGVmaW5lZCIsInBhY2thZ2VJZCI6IlBBQ0tBR0VfSURfUEhPVF9BSV9XRUIiLCJ1c2VyVHlwZSI6IkZSRUUiLCJpYXQiOjE2OTkyMDUwODd9.KFRKi-xOJlBkZJhMIb765CkfzHRoS36NT17dGplN1i8_wVy_6VNVjhykDgYuy7T_zTZY-uVCpnye3JoZZnYsjxV-iKBLmgMpTBG5eS1_VmC6iCbhSn0mFyrm_3TIu20ozj-6eFGq9GM-e-K8T7hj-zcYnf5oAvtcQ1mgGMqrnZhjePe04qrK6wrRH0EtywD0mVc8M37FnHjZHFts04w0-6Jx2rG-AfaI3u9_nYrTMK0_dm4Y3QFGnZBqJS4g01aIhNxCLHxI7-vbjs-kxC0YHgTmpBi2W0YGOsHK6j_LFtTk87xHwrByMg4fFujpG-6Gk0fJrHBj3fOXO3iOvPEw7Q",
                "Content-Type": "application/json",
                "Origin": "https://www.phot.ai",
                "Content-Length": "269"
            })
            .doRequest())
            .json()

        console.log(request);
    }
}