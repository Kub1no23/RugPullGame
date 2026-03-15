export const playSound = (file: string) => {
    const audio = new Audio(file);
    audio.currentTime = 0;
    audio.play();
}
