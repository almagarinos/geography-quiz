// Sistema de notificaciones
window.Notification = (() => {

    const CONTAINER_ID = "notification-container";

    const DEFAULT_DURATION = 10000; // La notificación permanece 10 segundos visible

    // Obtiene el contenedor
    function getContainer() {
        return document.getElementById(CONTAINER_ID);
    }

    // Elimina una notificación
    function remove(notificationElement) {
        if (!notificationElement || !notificationElement.parentNode) {
            return;
        }

        notificationElement.remove();
    }

    // Elimina todas
    function clear() {
        const container = getContainer();

        if (!container) {
            return;
        }

        container.innerHTML = "";
    }

    // Crea una notificación
    function show({ message = "", type = "info", duration = DEFAULT_DURATION } = {}) {
        const container = getContainer();

        if (!container) {
            return;
        }

        const element = document.createElement("div");
        element.className = `notification notification--${type}`;
        element.textContent = String(message);
        container.appendChild(element);

        requestAnimationFrame(() => {
            element.style.opacity = "1";
        });

        const timeoutId = setTimeout(() => remove(element), duration);

        element.dataset.timeoutId = timeoutId;
    }

    // Atajo éxito
    function success(message, duration) {
        show({
            message,
            duration,
            type: "success",
        });
    }

    // Atajo error
    function error(message, duration) {
        show({
            message,
            duration,
            type: "error",
        });
    }

    // Atajo advertencia
    function warning(message, duration) {
        show({
            message,
            duration,
            type: "warning",
        });
    }

    // Atajo información
    function info(message, duration) {
        show({
            message,
            duration,
            type: "info",
        });
    }

    return {
        remove,
        clear,
        show,
        success,
        error,
        warning,
        info,
    };
})();