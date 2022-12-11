import axios from 'axios';
import user from "@/store/user";

function request(method, url, data) {
    const userInfo = user.getters.getUser(user.state);
    if (userInfo) {
        data.append("username", userInfo.user.username)
        data.append("authorization", userInfo.user.Authorization)
        data.append("userID", userInfo.user.userId)
    }
    return new Promise((resolve, reject) => {
        
        axios({
            method: method,
            url: url,
            data: data
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        })
    })
}

// 导出 request 函数
export default request;
