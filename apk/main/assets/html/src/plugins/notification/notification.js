const NOTIFICATION_TYPES = {
    SUCCESS: "success",
    ERROR: "error",
    INFO: "info"
}

class Notification {
    constructor(description, type) {
        if(!document.getElementById("notification-container")) {
            document.body.insertAdjacentHTML(`afterbegin`, `<div class="notification-container" id="notification-container"></div>`)
        }

        this.container = document.getElementById("notification-container");
        this.description = description;
        this.type = type;
        this.notificationId = `temporary-notification`
    }

    show(hideTimeout = 2000) {
        /* Clear existing notifications */
        while(this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }

        this.container.insertAdjacentHTML(`beforeend`, `
            <div class="notification" id="${this.notificationId}" >
                <div class="icon">
                    <img src="src/plugins/notification/svg/${this.type}-icon.svg" alt="icon">
                </div>
                <div class="text">
                    ${this.description}
                </div>
            </div>
        `);

        this.container.classList.remove("hide");
        this.container.classList.add("show");

        setTimeout(() => {
            this.hide();
        }, hideTimeout);

        return this;
    }

    hide() {
        this.container.classList.remove("show");
        this.container.classList.add("hide");
    }
}

class NotificationError {
    constructor(description) {
        this.description = description;
        this.notification = new Notification(
            `${description}`,
            NOTIFICATION_TYPES.ERROR
        );

        this.notification.show();
    }
}

class NotificationInfo {
    constructor(description) {
        this.description = description;
        this.notification = new Notification(
            `${description}`,
            NOTIFICATION_TYPES.INFO
        );

        this.notification.show();
    }
}

class NotificationSuccess {
    constructor(description) {
        this.description = description;
        this.notification = new Notification(
            `${description}`,
            NOTIFICATION_TYPES.SUCCESS
        );

        this.notification.show();
    }
}

export {NotificationSuccess,NotificationInfo,NotificationError}