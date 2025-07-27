import moment from 'moment';
// 格式化数据量描述
const formatView = (view: number) => {
    if(view) {
        if(view >= 10000) {
            return (view / 10000).toFixed(1) + '万';
        } else {
            return String(view);
        };
    } else {
        return '';
    };
};
// 格式化秒数
const formatSeconds = (seconds: number, isShowHour: boolean = false) => {
    if(seconds) {
        seconds = Math.floor(seconds);
        const oneHourToSeconds = 60 * 60;
        // 必要的
        const formatSecondsAndMinutes = (seconds: number) => {
            if(seconds) {
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60; 
    
                // 格式化分钟和秒，确保个位数前面补零
                const minutesFormatted = String(minutes).padStart(2, '0');
                const secondsFormatted = String(remainingSeconds).padStart(2, '0');
    
                return `${minutesFormatted}:${secondsFormatted}`;
            }
            else return isShowHour ? '00:00:00' : '00:00';
        };
        if(seconds < oneHourToSeconds) {
            // 计算分钟和秒
            return isShowHour ? '00:' + formatSecondsAndMinutes(seconds) : formatSecondsAndMinutes(seconds);
        }
        else {
            const hours = Math.floor(seconds / oneHourToSeconds);
            const hoursFormatted = String(hours).padStart(2, '0');
            const remainingSeconds = seconds % oneHourToSeconds;
            const lastFormatted = formatSecondsAndMinutes(remainingSeconds);
            return `${hoursFormatted}:${lastFormatted}`;
        };
    } else {
        return isShowHour ? '00:00:00' : '00:00';
    };
};

// 格式化发布时间描述
const formatTime = (timestamp: number) => {
    const now = moment();
    const targetDate = moment.unix(timestamp);
    const diffInDays = now.diff(targetDate, 'days');
    const diffInHours = now.diff(targetDate, 'hours');
    const diffInMinutes = now.diff(targetDate, 'minutes');

    const diffDaysOfThisYear = now.diff(moment().startOf('year'), 'days');
    if(diffInDays > diffDaysOfThisYear) {
        return targetDate.format('YYYY-MM-DD');
    }
    else if(diffInDays >= 2) {
        return targetDate.format('MM-DD');
    }
    else if(diffInDays >= 1) {
        return '昨天';
    }
    else if (diffInHours >= 1) {
        return `${diffInHours} 小时前`;
    } else if (diffInMinutes >= 1) {
        return `${diffInMinutes} 分钟前`;
    } else {
        return '刚刚';
    };
};

// 格式化历史记录时间描述
const formatHistoryTime = (timestamp: number) => {
    const now = moment();
    const targetDate = moment.unix(timestamp);
    if (now.isSame(targetDate, 'day')) {
        return `今天 ${targetDate.format('HH:mm')}`;
    } else if (now.clone().subtract(1, 'day').isSame(targetDate, 'day')) {
        return `昨天 ${targetDate.format('HH:mm')}`;
    } else {
        return targetDate.format('MM-DD');
    };
};

export {
    formatView,
    formatSeconds,
    formatTime,
    formatHistoryTime
};