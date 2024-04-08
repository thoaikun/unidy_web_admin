const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256 / 2) + 128; // Red component
    const g = Math.floor(Math.random() * 256 / 2) + 128; // Green component
    const b = Math.floor(Math.random() * 256 / 2) + 128; // Blue component
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

export {
    getRandomColor
}