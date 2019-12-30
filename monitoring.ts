import html2canvas from 'html2canvas';
import axios from 'axios';
import route from './router';

const REPORTURL = 'http://localhost:3000'; // 报告地址

(window as any).STARTTIME = Date.now();

enum ERROR_TYPE {
    Error = 'Error',  // onerror监听的错误
    Request = 'Request',  // 请求记录
    Custom = 'Custom',  // 自定义记录
}



const time = Date.now(); // 打开app时间
let target = null;
let historyRoute = [];  // 从上一次上报之后的操作路由
route.afterEach((to, from) => {
    historyRoute.push({
        date: Date().toLocaleString(),
        path: to.fullPath,
    });
});

document.body.addEventListener('click', (event) => {
    target = {
        target: event.target,
        clientXY: `${event.clientX}-${event.clientY}`,
        targetPath: event['path'],
    };
}, true);

class ReportInfo {
    constructor(
        private type: string,  // 错误类型
        private errorInfo: {
            message: string,
            url: string,
            line: number,
            col: number,
            error: string,
            useragent: string,
        },
        private extra?: any,
    ) { }
}

(window as any).onerror = (
    message: string,
    url: string,
    line: number,
    col: number,
    error: Error,
) => {
    const errStack = error ? error.stack : null;
    // 处理错误
    dispatchMessage(message, url, line, col, errStack);
};

// 处理错误
async function dispatchMessage(message: string, url: string, line: number, col: number, error: string) {
    let imgdata = '';
    // const canvas = await html2canvas(document.body);
    // imgdata = canvas.toDataURL('image/jpeg', 0.05);

    const routeArr = historyRoute;

    // console.log(imgdata);
    // console.log(message, url, line, col, error, imgdata, REPORTURL);

    const report = new ReportInfo(
        ERROR_TYPE.Error,
        {
            message,
            url,
            line,
            col,
            error,
            useragent: navigator.userAgent,
        },
        {
            route: routeArr,
            time: Date.now() - time,
            element: target,
            picture: imgdata,
        },
    );
    console.log(report);
    axios.post(REPORTURL + '/posttest', report).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(JSON.stringify(err));
    }).finally(() => {
        historyRoute = [];
    });

}

const a = 1;

setTimeout(() => {
    console.log(a['b'].c);
}, 5000); // 5s之后前端调用出错。该错误会被捕获上报

