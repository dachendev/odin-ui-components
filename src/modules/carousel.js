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

  // Get the carousel items and convert to an array
  const items = carousel.element.querySelectorAll(".carousel-item");
  const itemsArr = Array.from(items);

  // Find the active item's index, default to 0 if not found
  let activeIdx = itemsArr.findIndex((item) =>
    item.classList.contains("active")
  );
  if (activeIdx === -1) {
    activeIdx = 0;
  }

  // Create and add indicators for each item
  const indicatorList = carousel.element.querySelector(".carousel-indicators");

  for (let i = 0; i < itemsArr.length; i++) {
    const indicator = document.createElement("li");
    indicator.classList.add("indicator");
    if (i === activeIdx) {
      indicator.classList.add("active");
    }
    indicatorList.appendChild(indicator);
  }

  const indicators = carousel.element.querySelectorAll(".indicator");
  const indicatorsArr = Array.from(indicators);

  /**
   * Transition the carousel to the specified item.
   * @param {number} idx - The index of the item to transition to.
   */
  carousel.goTo = (idx) => {
    if (idx < 0 || idx >= itemsArr.length) {
      return;
    }

    if (idx === activeIdx) {
      return;
    }

    // Remove active, prev, and next classes from all items
    itemsArr.forEach((item) => {
      item.classList.remove("active", "prev", "next");
    });

    // Update active index and transition to the new item
    activeIdx = idx;
    const activeItem = itemsArr[activeIdx];

    activeItem.classList.add("active");

    // Update indicators
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
    const nextIdx = activeIdx + 1;

    if (nextIdx >= itemsArr.length) {
      carousel.goTo(0);
    } else {
      carousel.goTo(nextIdx);
    }
  };

  /**
   * Transition the carousel to the previous item.
   */
  carousel.prev = () => {
    const prevIdx = activeIdx - 1;

    if (prevIdx < 0) {
      carousel.goTo(itemsArr.length - 1);
    } else {
      carousel.goTo(prevIdx);
    }
  };

  // Add event listeners for next and previous controls
  const controlNext = carousel.element.querySelector(".carousel-control-next");
  controlNext.addEventListener("click", carousel.next);

  const controlPrev = carousel.element.querySelector(".carousel-control-prev");
  controlPrev.addEventListener("click", carousel.prev);

  // Add event listeners for indicators
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const idx = indicatorsArr.indexOf(indicator);
      carousel.goTo(idx);
    });
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
