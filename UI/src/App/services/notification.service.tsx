import React from 'react';

import { notification } from 'antd';



export interface IMessage {
    data?: { [key: string]: string };
    text: string;
}

export enum NotificationMsgType {
    Success = "success",
    Error = "error",
    Info = "info",
    Warning = "warning"
}

class NotificationService {
    private static _cache: { [key: string]: string } = {};

    /**
     * Show new notification messaje.
     * @param message 
     * @param type 
     * @param duration 
     * @param description 
     */
    public static show(
        message: IMessage, 
        type: NotificationMsgType = NotificationMsgType.Success, 
        duration: number = 6, 
        description: boolean = false
    ) {
        const key = Math.random().toString(36).substr(2, 16);

        if (!NotificationService._exist(key)) {
            const className: string = NotificationService._getClassName(type);

            if (type === NotificationMsgType.Error) {
                description = true;
                duration = 0;
            }

            const descriptionMsg: React.ReactNode = description ? NotificationService._getErrorText(message.data) : undefined;

            notification[type]({
                className,
                description: descriptionMsg,
                duration,
                key,
                message: message.text,
                onClose: () => NotificationService._remove(key),
                placement: 'topRight',
            });
        }
    }

    private static _getErrorText(data?: { [key: string]: string }): React.ReactNode {
        if (data) {
            return Object.keys(data).map(k => (
                <li key={k}>
                    <div>{k}</div>
                    <ul style={{ paddingLeft: 16 }}>
                        <li>{ data[k] }</li>
                    </ul>
                </li>
            ));
        }
    }

    private static _getClassName(type: NotificationMsgType): string {
        switch (type) {
            case NotificationMsgType.Error:
                return "error-notification";
            case NotificationMsgType.Info:
                return "info-notification";
            default:
                return "success-notification"
        }
    }

    private static _remove(id: string): void {
        if (NotificationService._exist(id)) {
            delete NotificationService._cache[id];
        }
    }

    private static _exist(id: string): boolean {
        return NotificationService._cache.hasOwnProperty(id);
    }
}

export default NotificationService;