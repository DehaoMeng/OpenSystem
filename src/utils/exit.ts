import {useMessageStore} from "@/stores/Message";
import {useTokenStore} from "@/stores/Token";
import router from "@/router";
import {notification} from "ant-design-vue";
import type {IconType} from "ant-design-vue/es/notification";


const openNotificationWithIcon = (type:  IconType, title: string, desc: string) => {
    notification[type]({
        message: title,
        description: desc,
        duration: 3,
    });
};
const token = useTokenStore()
const messageStore = useMessageStore();
export const exit = (type: IconType, title: string, msg: string) => {
    token.exit()
    messageStore.clear()
    router.push({name: 'root'})
    openNotificationWithIcon(type, title, msg)
}

