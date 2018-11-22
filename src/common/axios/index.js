import Axios from 'axios'

Axios.defaults.timeout = 10000;
Axios.defaults.baseURL = "http://www.z-xu.com";
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器

// 响应拦截器

export default Axios;
