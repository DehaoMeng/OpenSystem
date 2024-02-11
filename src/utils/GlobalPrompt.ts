import {message} from 'ant-design-vue';

export const success = (msg: string) => {
    message.success(msg)
}
export const error = (msg: string) => {
    message.error(msg)
}
export const warning = (msg: string) => {
    message.warning(msg)
}
