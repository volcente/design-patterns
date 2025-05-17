type Toast = {
  content: string;
  id: string;
};

const toasts: Toast[] = [];
const TIMEOUT = 2_000;
const TOASTS_CONTAINER_ID = "toasts-container";

const ToastState = {
  subscribe: (data: string | Toast) => {
    const toastIndex = toasts.length;
    toasts.push(typeof data === "string" ? { content: data, id: data } : data);

    const toastsContainer = document.querySelector<HTMLUListElement>(
      `#${TOASTS_CONTAINER_ID}`
    );
    if (!toastsContainer) return;

    const toastFragment = document.createDocumentFragment();
    const toast = document.createElement("li");
    toast.setAttribute("id", typeof data === "string" ? data : data.id);
    toast.classList.add("toast");
    toast.textContent = typeof data === "string" ? data : data.content;
    toastFragment.appendChild(toast);
    toastsContainer.appendChild(toastFragment);
    setTimeout(() => {
      toast.setAttribute("data-mounted", "");
    }, 1);

    setTimeout(() => {
      toasts.splice(toastIndex);
      toast.removeAttribute("data-mounted");
      setTimeout(() => {
        toastsContainer.removeChild(toast);
      }, 300);
    }, TIMEOUT);
  },
  unsubscribe: (toastToRemove: Toast) => {
    toasts.filter((toast) => toast.id !== toastToRemove.id);
  },
};
Object.freeze(ToastState);

const toast = ToastState.subscribe;

const Toaster = () => {
  const toasterFragment = document.createDocumentFragment();
  const container = document.createElement("div");
  container.setAttribute("id", "toaster");

  const toastsContainer = document.createElement("ul");
  toastsContainer.setAttribute("id", "toasts-container");
  container.appendChild(toastsContainer);

  toasterFragment.appendChild(container);

  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) return;
  app.appendChild(toasterFragment);
};

export { toast, Toaster };
