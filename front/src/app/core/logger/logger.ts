import { environment } from 'environments/environment';

export class Logger {

    public static INFO: Number = 0;
    public static WARNING: Number = 1;
    public static DEBUG: Number = 2;
    public static ERROR: Number = 3;

    public static LogInfo(message: string, data?: string | Object | any): void {
        if (data === undefined) { data = ""; }

        if (environment.DEBUG && Logger.INFO >= environment.DEBUG_LEVEL) {
            console.info(message, data);
        }

    }

    public static LogWarning(message: string, data?: string | Object | any): void {
        if (data === undefined) { data = ""; }


        if (environment.DEBUG && Logger.WARNING >= environment.DEBUG_LEVEL) {
            console.warn('/!\\ ' + message + ' /!\\', data);
        }

    }

    public static LogDebug(message: string, data?: string | Object | any): void {
        if (data === undefined) { data = ""; }

        if (environment.DEBUG && Logger.DEBUG >= environment.DEBUG_LEVEL) {
            console.debug(message, data);
        }

    }

    public static LogError(message: string, data?: any): void {
        if (data === undefined) { data = ""; }


        if (environment.DEBUG && Logger.ERROR >= environment.DEBUG_LEVEL) {
            console.error('/!\\ ' + message + ' /!\\', data);
        }

    }

}