function generateBarcode() {

    const prefix = document.getElementById("prefix").value;
    const start = parseInt(document.getElementById("start").value);
    const end = parseInt(document.getElementById("end").value);
    const increment = parseInt(document.getElementById("step").value);

    const barWidth = parseFloat(document.getElementById("barWidth").value);
    const barHeight = parseInt(document.getElementById("barHeight").value);
    const barMargin = parseInt(document.getElementById("barMargin").value);

    const labelSize = parseFloat(document.getElementById("labelSize").value);

    const borderThickness = parseInt(document.getElementById("borderThickness").value);
    const gap = parseInt(document.getElementById("gap").value);

    const labels = document.getElementById("labels");

    labels.innerHTML = "";
    labels.style.gap = gap + "px";

    if (
        isNaN(start) ||
        isNaN(end) ||
        isNaN(increment) ||
        increment <= 0 ||
        start > end
    ) {
        alert("Please enter a valid range.");
        return;
    }

    for (let i = start; i <= end; i += increment) {

        const code = prefix + i;

        const label = document.createElement("div");
        label.className = "label";

        // Set label size (px)
        label.style.size = labelSize + "px";

        // Border
        label.style.border = `${borderThickness}px solid #000`;

        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

        const text = document.createElement("p");
        text.textContent = code;

        label.appendChild(svg);
        label.appendChild(text);

        labels.appendChild(label);

        JsBarcode(svg, code, {
            format: "CODE128",
            width: barWidth,
            height: barHeight,
            margin: barMargin,
            displayValue: false
        });

        requestAnimationFrame(() => {
            const barcodeHeight = svg.getBoundingClientRect().height;
            const textHeight = text.getBoundingClientRect().height;

            label.style.height = (barcodeHeight + textHeight + 20) + "px";
        });

    }

}

function clearLabels() {
    document.getElementById("labels").innerHTML = "";
}

function toggleSettings() {

    const settings = document.getElementById("advancedSettings");
    const button = document.getElementById("toggleSettings");

    if (settings.classList.contains("hidden-settings")) {
        settings.classList.remove("hidden-settings");
        button.textContent = "▲ Hide Advanced Settings";
    } else {
        settings.classList.add("hidden-settings");
        button.textContent = "▼ Advanced Settings";
    }

}