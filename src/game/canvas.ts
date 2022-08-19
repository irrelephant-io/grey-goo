const matchCanvasSizeToScreen = (canvas : HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

export const setupCanvas = (canvas : HTMLCanvasElement) => {
    matchCanvasSizeToScreen(canvas);
    window.addEventListener('resize', () => {
        matchCanvasSizeToScreen(canvas);
    });
}