module MartialShirt.Init {
    'use strict';

	export class Logger {

		public static INFO: number = 0;
		public static WARNING: number = 1;
		public static DEBUG: number = 2;
		public static ERROR: number = 3;

		public static LogInfo(message: string, data?: string);
		public static LogInfo(message: string, data?: Object);
		public static LogInfo(message: string, data?: any): void {
			if (data == undefined)
				data = "";

			if (MartialShirt.Config.DEBUG && Logger.INFO >= MartialShirt.Config.DEBUG_LEVEL)
				console.info(message, data);

		}

		public static LogWarning(message: string, data?: string);
		public static LogWarning(message: string, data?: Object);
		public static LogWarning(message: string, data?: any): void {
			if (data == undefined)
				data = "";

			if (MartialShirt.Config.DEBUG && Logger.WARNING >= MartialShirt.Config.DEBUG_LEVEL)
				console.warn('/!\\ ' + message + ' /!\\', data);

		}

		public static LogDebug(message: string, data?: string);
		public static LogDebug(message: string, data?: Object);
		public static LogDebug(message: string, data?: any): void {
			if (data == undefined)
				data = "";

			if (MartialShirt.Config.DEBUG && Logger.DEBUG >= MartialShirt.Config.DEBUG_LEVEL)
				console.debug(message, data);

		}

		public static LogError(message: string, data?: string);
		public static LogError(message: string, data?: Object);
		public static LogError(message: string, data?: any): void {
			if (data == undefined)
				data = "";

			if (MartialShirt.Config.DEBUG && Logger.ERROR >= MartialShirt.Config.DEBUG_LEVEL)
				console.error('/!\\ ' + message + ' /!\\', data);

		}

	}
}
