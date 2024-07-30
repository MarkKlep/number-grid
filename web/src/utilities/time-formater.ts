export function formatTime(timer: number) {
    const milliseconds = timer % 1000;
    const seconds = Math.floor((timer / 1000) % 60);
    const minutes = Math.floor((timer / 60000) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds / 10}`;
}
