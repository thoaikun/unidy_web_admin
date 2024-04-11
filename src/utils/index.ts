import moment from "moment";

const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256 / 2) + 128; // Red component
    const g = Math.floor(Math.random() * 256 / 2) + 128; // Green component
    const b = Math.floor(Math.random() * 256 / 2) + 128; // Blue component
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

const formatDateTime = (date?: Date) => {
    return moment(date).format('DD/MM/YYYY HH:mm');
}

const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export {
    getRandomColor,
    formatDateTime,
    formatCurrency
}