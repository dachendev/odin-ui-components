import "./carousel.css";

const instances = [];

/**
 * Creates a carousel instance.
 * @param {Element} element - The carousel element.
 * @param {Object} options - The options for the carousel.
 * @returns {Object} The carousel instance.
 */
export function create(element, options = {}) {
  const carousel = {};

  // Set the carousel element option
  carousel.element = element;
  carousel.autoStart = options.autoStart ?? true;
  carousel.interval = options.interval;

  // Set the initial active index
  const items = carousel.element.querySelectorAll(".carousel-item");

  let activeIdx = Array.from(items).findIndex((item) =>
    item.classList.contains("active")
  );

  if (activeIdx === -1 && items.length > 0) {
    // Set the active index to 0
    activeIdx = 0;
    // Make the first item active
    items[0].classList.add("active");
  }

  // Create and add indicators for each item
  const indicatorList = carousel.element.querySelector(".carousel-indicators");

  function createIndicators() {
    const items = carousel.element.querySelectorAll(".carousel-item");

    // Clear previous indicators
    indicatorList.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
      const indicator = document.createElement("li");
      indicator.classList.add("indicator");
      if (i === activeIdx) {
        indicator.classList.add("active");
      }
      indicatorList.appendChild(indicator);
    }
  }

  if (indicatorList) {
    createIndicators();
  }

  /**
   * Transition the carousel to the specified item.
   * @param {number} idx - The index of the item to transition to.
   */
  carousel.goTo = (idx) => {
    const items = carousel.element.querySelectorAll(".carousel-item");

    if (items.length === 0) {
      return;
    }

    if (idx < 0 || idx >= items.length) {
      return;
    }

    if (idx === activeIdx) {
      return;
    }

    // Remove active, prev, and next classes from all items
    items.forEach((item) => {
      item.classList.remove("active", "prev", "next");
    });

    // Update active index and transition to the new item
    activeIdx = idx;
    const activeItem = items[activeIdx];

    activeItem.classList.add("active");

    // Update indicators
    const indicators = carousel.element.querySelectorAll(".indicator");
    indicators.forEach((indicator, i) => {
      if (i === activeIdx) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  };

  /**
   * Transition the carousel to the next item.
   */
  carousel.next = () => {
    const items = carousel.element.querySelectorAll(".carousel-item");
    const nextIdx = activeIdx + 1;

    if (nextIdx >= items.length) {
      carousel.goTo(0);
    } else {
      carousel.goTo(nextIdx);
    }
  };

  /**
   * Transition the carousel to the previous item.
   */
  carousel.prev = () => {
    const items = carousel.element.querySelectorAll(".carousel-item");
    const prevIdx = activeIdx - 1;

    if (prevIdx < 0) {
      carousel.goTo(items.length - 1);
    } else {
      carousel.goTo(prevIdx);
    }
  };

  // Start the auto transition
  let intervalId = null;

  carousel.start = () => {
    if (carousel.interval) {
      intervalId = setTimeout(carousel.next, carousel.interval);
    }
  };

  carousel.stop = () => {
    if (intervalId) {
      clearTimeout(intervalId);
    }
  };

  if (carousel.autoStart && carousel.interval) {
    carousel.start();
  }

  // Add event listeners for next and previous controls
  const controlNext = carousel.element.querySelector(".carousel-control-next");
  if (controlNext) {
    controlNext.addEventListener("click", carousel.next);
  }

  const controlPrev = carousel.element.querySelector(".carousel-control-prev");
  if (controlPrev) {
    controlPrev.addEventListener("click", carousel.prev);
  }

  // Add event listeners for indicators
  indicatorList.addEventListener("click", (event) => {
    if (!event.target.classList.contains("indicator")) {
      return;
    }

    const indicators = carousel.element.querySelectorAll(".indicator");
    const idx = Array.from(indicators).indexOf(event.target);
    carousel.goTo(idx);
  });

  return carousel;
}

/**
 * Retrieves the carousel instance associated with the given element.
 *
 * @param {Element} element - The carousel element.
 * @return {Object|undefined} The carousel instance or undefined if not found.
 */
export function get(element) {
  // Search for an instance in the instances array that has the given element
  // as its element property.
  return instances.find((instance) => instance.element === element);
}

/**
 * Returns the carousel instance associated with the given element, if it exists.
 * If no instance is found, a new instance is created and returned.
 *
 * @param {Element} element - The carousel element.
 * @returns {Object} The carousel instance.
 */
export function getOrCreate(element) {
  // Try to find an existing instance associated with the element
  const instance = get(element);

  // If an instance is found, return it
  if (instance) {
    return instance;
  }

  // If no instance is found, create a new instance and return it
  return create(element);
}

export default {
  create,
  get,
  getOrCreate,
};
