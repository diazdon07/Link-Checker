jscolor.presets.default = {
    position: 'right',
    palette: [
        '#000000', '#7d7d7d', '#870014', '#ec1c23', '#ff7e26',
        '#fef100', '#22b14b', '#00a1e7', '#3f47cc', '#a349a4',
        '#ffffff', '#c3c3c3', '#b87957', '#feaec9', '#ffc80d',
        '#eee3af', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7',
    ],
    paletteCols: 12,
    hideOnPaletteClick: true,
    position: 'bottom',
    alpha: true
};

document.addEventListener('DOMContentLoaded', function () {
    let h1color = document.getElementById('h1color');
    let h2color = document.getElementById('h2color');
    let h3color = document.getElementById('h3color');
    let h4color = document.getElementById('h4color');
    let h5color = document.getElementById('h5color');
    let h6color = document.getElementById('h6color');

    function updateColor(picker, header) {
        chrome.storage.sync.set({ [header]: picker.toHEXAString() });
    }

    function updateInput(color, header) {
        header.jscolor.fromString(color);
    }

    window.updateHeaderColorH1 = function (picker) {
        updateColor(picker, 'h1color');
    }
    window.updateHeaderColorH2 = function (picker) {
        updateColor(picker, 'h2color');
    }
    window.updateHeaderColorH3 = function (picker) {
        updateColor(picker, 'h3color');
    }
    window.updateHeaderColorH4 = function (picker) {
        updateColor(picker, 'h4color');
    }
    window.updateHeaderColorH5 = function (picker) {
        updateColor(picker, 'h5color');
    }
    window.updateHeaderColorH6 = function (picker) {
        updateColor(picker, 'h6color');
    }

    chrome.storage.sync.get(['h1color', 'h2color', 'h3color', 'h4color', 'h5color', 'h6color'], (data) => {
        updateInput(data.h1color, h1color);
        updateInput(data.h2color, h2color);
        updateInput(data.h3color, h3color);
        updateInput(data.h4color, h4color);
        updateInput(data.h5color, h5color);
        updateInput(data.h6color, h6color);
    });
});