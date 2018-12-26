import { AlertModule } from "vux"
export function generalAlert(content, title="提示") {
    AlertModule.show({
        title: title,
        content: content
    })
}
