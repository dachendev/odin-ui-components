import "./dropdown.css";

// Create an array to store the dropdown instances
const instances = [];

/**
 * Creates a dropdown instance.
 * @param {Element} element - The dropdown element.
 * @param {Object} options - The options for the dropdown.
 * @param {boolean} options.autoClose - Whether to auto close the dropdown when clicking outside of it.
 * @returns {Object} The dropdown instance.
 */
export function create(element, options = {}) {
  const dropdown = {};

  // Set the dropdown element and autoClose option
  dropdown.element = element;
  dropdown.autoClose = options.autoClose ?? true;

  // Get the toggle and menu elements
  const toggle = dropdown.element.querySelector(".dropdown-toggle");
  const menu = dropdown.element.querySelector(".dropdown-menu");

  /**
   * Show the dropdown menu.
   */
  dropdown.show = () => {
    menu.classList.add("show");
  };

  /**
   * Hide the dropdown menu.
   */
  dropdown.hide = () => {
    menu.classList.remove("show");
  };

  /**
   * Toggle the dropdown menu.
   */
  dropdown.toggle = () => {
    menu.classList.toggle("show");
  };

  // Add event listener for toggle click
  toggle.addEventListener("click", dropdown.toggle);

  /**
   * Check if the click event is outside the dropdown and hide the menu if autoClose is true.
   * @param {MouseEvent} event - The click event.
   */
  function clickedOutside(event) {
    if (dropdown.autoClose && !dropdown.element.contains(event.target)) {
      dropdown.hide();
    }
  }

  // Add event listener for document click
  document.addEventListener("click", clickedOutside);

  /**
   * Destroy the dropdown instance.
   */
  dropdown.destroy = () => {
    // Remove event listener for toggle click
    toggle.removeEventListener("click", dropdown.toggle);
    // Remove event listener for document click
    document.removeEventListener("click", clickedOutside);

    // Remove the dropdown instance from the instances array
    var index = instances.indexOf(dropdown);
    if (index > -1) {
      instances.splice(index, 1);
    }
  };

  // Add the dropdown instance to the instances array
  instances.push(dropdown);

  return dropdown;
}

/**
 * Retrieves the dropdown instance associated with the given element.
 *
 * @param {Element} element - The dropdown element.
 * @return {Object|undefined} The dropdown instance or undefined if not found.
 */
export function get(element) {
  // Search for an instance in the instances array that has the given element
  // as its element property.
  return instances.find((instance) => instance.element === element);
}

/**
 * Returns the dropdown instance associated with the given element, if it exists.
 * If no instance is found, a new instance is created and returned.
 *
 * @param {Element} element - The dropdown element.
 * @returns {Object} The dropdown instance.
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
