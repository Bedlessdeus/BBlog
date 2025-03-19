/* Notification */
export type NotificationData = {
    id: number;
    type: notifyType;
    text: string;
    desc?: string;
    disappear: number;
};

export enum notifyType {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error'
}