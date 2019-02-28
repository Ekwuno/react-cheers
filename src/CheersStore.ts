import { WatchableStore } from "watchable-stores";

//SETTING THE INITIAL VALUE FOR ICHEERSSTORE. THIS IS THE MODEL OF HOW THE DATA WILL GO
export interface ICheersStore {
    status: string;
    message: string;
    timer: number;
    className: string[] | string;
}

//THE CHEERALERT IS THE STORE WHERE THE ALERT TYPES WILL BE DECLEARED AND MADE PUBLIC
class CheersAlert extends WatchableStore<ICheersStore> {
    constructor() {
        super({
            status: "",
            message: "",
            timer: 0,
            className: ""
        });
    }

    //HERE WE MADE THE SUCCESS PUBLIC SO THAT OTHER COMPONENTS CAN ACCESS IT.
    public success(message: string, timer?: number, className?: string | string[]): void {
        this.cheer("success", message, timer, className);
    }

    public info(message: string, timer?: number,className?: string | string[]): void {
        this.cheer("info", message, timer, className);
    }

    public warning(message: string, timer?: number,className?: string | string[]): void {
        this.cheer("warning", message, timer, className);
    }

    public error(message: string, timer?: number,className?: string | string[]): void {
        this.cheer("error", message, timer, className);
    }

    private cheer(status: string, message: string, timer?: number, className?: string | string[]): void {
        this.data = {
            className: className || "",
            message,
            status,
            timer: timer || 3000,
        };
    }
}

export const CheersStore = new CheersAlert()