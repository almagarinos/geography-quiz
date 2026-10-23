/**
 * Componente de ordenación compatible con:
 * - Desktop (HTML5 Drag & Drop)
 * - Mobile (Pointer Events)
 *
 * Uso en el módulo de vista:
 * let dragSortInstance = DragSort.create({
 *     container: element,
 *     items: ["Madrid", "París", "Dublin", "Praga"],
 *     onChange: (order) => {}
 * });
 * dragSortInstance.getOrder();
 */
window.DragSort = (() => {

    // Crea el componente
    function create({ container, items = [], onChange = null } = {}) {
        if (!container) {
            throw new Error("Container requerido.");
        }

        let currentOrder = [...items];

        render();

        function render() {
            container.innerHTML = `
                <div class="sort-list">
                    ${currentOrder.map(
                            (item, index) => `
                                <div class="sort-item" draggable="true" data-index="${index}">
                                    <div class="sort-position">
                                        ${index + 1}
                                    </div>

                                    <div class="sort-label">
                                        ${item}
                                    </div>
                                </div>
                            `
                        ).join("")
                    }
                </div>
            `;

            bindDesktopDrag();
            bindPointerDrag();
        }

        function notifyChange() {
            if (typeof onChange === "function") {
                onChange([...currentOrder]);
            }
        }

        /**
         * ==========================
         * DESKTOP DRAG & DROP
         * ==========================
         */
        function bindDesktopDrag() {
            const items = container.querySelectorAll(".sort-item");

            let draggedIndex = null;

            items.forEach((element) => {
                element.addEventListener("dragstart", () => {
                    draggedIndex = Number(element.dataset.index);

                    element.classList.add("sort-item--dragging");
                });

                element.addEventListener("dragend", () => {
                    element.classList.remove("sort-item--dragging");
                });

                element.addEventListener("dragover", (event) => {
                    event.preventDefault();
                });

                element.addEventListener("drop", () => {
                    const destinationIndex = Number(element.dataset.index);

                    if (draggedIndex === null) {
                        return;
                    }

                    currentOrder = ArrayUtils.moveItem(currentOrder, draggedIndex, destinationIndex);

                    render();
                    notifyChange();
                });
            });
        }

        /**
         * ==========================
         * MOBILE / POINTER EVENTS
         * ==========================
         */
        function bindPointerDrag() {
            const items = container.querySelectorAll(".sort-item");

            let startY = 0;
            let draggedIndex = null;

            items.forEach((element) => {
                element.addEventListener("pointerdown", (event) => {
                    startY = event.clientY;

                    draggedIndex = Number(element.dataset.index);
                });

                element.addEventListener("pointerup", (event) => {
                    if (draggedIndex === null) {
                        return;
                    }

                    const deltaY = event.clientY - startY;

                    let destinationIndex = draggedIndex;

                    if (deltaY > 40) {
                        destinationIndex = Math.min(currentOrder.length - 1, draggedIndex + 1);
                    }

                    if (deltaY < -40) {
                        destinationIndex = Math.max(0, draggedIndex - 1);
                    }

                    if (destinationIndex !== draggedIndex) {
                        currentOrder = ArrayUtils.moveItem(currentOrder, draggedIndex, destinationIndex);

                        render();
                        notifyChange();
                    }

                    draggedIndex = null;
                });
            });
        }

        return {
            getOrder() {
                return [...currentOrder];
            },

            setOrder(order = []) {
                currentOrder = [...order];

                render();
                notifyChange();
            },

            reset() {
                currentOrder = [...items];

                render();
                notifyChange();
            },
        };
    }

    return {
        create,
    };
})();