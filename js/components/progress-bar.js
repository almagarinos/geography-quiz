// Componente reutilizable de barra de progreso
window.ProgressBar = (() => {

    // Crea la estructura HTML
    function render(container, percentage = 0) {
        if (!container) {
            return;
        }

        container.innerHTML = `
            <div class="progress" aria-label="Progreso de la partida">
                <div class="progress__track">
                    <div class="progress__fill" style="width:${percentage}%"></div>
                </div>
            </div>
        `;
    }

    // Actualiza el porcentaje visual
    function update(container, percentage = 0) {
        if (!container) {
            return;
        }

        const fill = container.querySelector(".progress__fill");

        if (!fill) {
            return;
        }

        const safePercentage = ValidationUtils.clamp(Number(percentage) || 0, 0, 100);

        fill.style.width = `${safePercentage}%`;
    }

    // Obtiene porcentaje actual
    function getPercentage(container) {
        if (!container) {
            return 0;
        }

        const fill = container.querySelector(".progress__fill");

        if (!fill) {
            return 0;
        }

        return parseFloat(fill.style.width) || 0;
    }

    // Reinicia barra
    function reset(container) {
        update(container, 0);
    }

    // Completa la barra
    function complete(container) {
        update(container, 100);
    }

    return {
        render,
        update,
        getPercentage,
        reset,
        complete,
    };
})();