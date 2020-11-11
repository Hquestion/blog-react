import dayjs from 'dayjs';
import zh from 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale(zh)
dayjs.extend(relativeTime);

export function relativeTimeFormatter(utcTime: string) {
    return dayjs(utcTime).fromNow()
}

export function timeFormatter(utcTime: string) {
    return dayjs(utcTime).format('YYYY日MM月DD日');
}

export function simplifiedMarkdown(content: string) {
    return content.split('\n').slice(0, 3).join('\n') + '...';
}


