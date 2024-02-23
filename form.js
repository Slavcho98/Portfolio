const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector);

  const validationOptions = [
    {
      attribute: "required",
      isValid: (input) => input.value.trim() !== "",
      errorMessage: (input, label) => `${label.textContent} is required`,
    },
    {
      attribute: "custommaxlength",
      isValid: (input) =>
        input.value &&
        input.value.length <=
          parseInt(input.getAttribute("custommaxlength"), 10),
      errorMessage: (input, label) =>
        `${label.textContent} needs to be less than ${input.getAttribute(
          "custommaxlength"
        )} characters`,
    },
    {
      attribute: "match",
      isValid: (input) => {
        const matchSelector = input.getAttribute("match");
        const matchedElement = formElement.querySelector(`#${matchSelector}`);
        return (
          matchedElement && matchedElement.value.trim() === input.value.trim()
        );
      },
      errorMessage: (input, label) => {
        const matchSelector = input.getAttribute("match");
        const matchedElement = formElement.querySelector(`#${matchSelector}`);
        const matchedLabel = matchedElement
          ? matchedElement.parentElement.parentElement.querySelector("label")
          : null;
        return `${label.textContent} should match ${
          matchedLabel ? matchedLabel.textContent : "the corresponding field"
        }`;
      },
    },
    {
      attribute: "pattern",
      isValid: (input) => {
        const patternRegex = new RegExp(input.pattern);
        return patternRegex.test(input.value);
      },
      errorMessage: (input, label) => `Not a valid ${label.textContent}`,
    },
    {
      attribute: "minlength",
      isValid: (input) =>
        input.value &&
        input.value.length >= parseInt(input.getAttribute("minlength"), 10),
      errorMessage: (input, label) =>
        `${label.textContent} needs to be at least ${input.getAttribute(
          "minlength"
        )} characters`,
    },
  ];

  const validateSingleFormGroup = (formGroup) => {
    const label = formGroup.querySelector("label");
    const input = formGroup.querySelector("input, textarea");
    const errorContainer = formGroup.querySelector(".error");
    const errorIcon = formGroup.querySelector(".error-icon");
    const successIcon = formGroup.querySelector(".success-icon");

    let formGroupError = false;
    for (const option of validationOptions) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        errorContainer.textContent = option.errorMessage(input, label);
        input.classList.add("border-red-700");
        input.classList.remove("border-green-700");
        errorIcon.classList.remove("hidden");
        successIcon.classList.add("hidden");
        formGroupError = true;
        break;
      }
    }

    if (!formGroupError) {
      errorContainer.textContent = "";
      input.classList.remove("border-red-700");
      input.classList.add("border-green-700");
      errorIcon.classList.add("hidden");
      successIcon.classList.remove("hidden");
    }
  };

  const validateAllFormGroups = () => {
    const formGroups = Array.from(formElement.querySelectorAll(".formGroup"));
    formGroups.forEach(validateSingleFormGroup);
  };

  formElement.setAttribute("novalidate", "");

  Array.from(formElement.elements).forEach((element) => {
    element.addEventListener("blur", (e) => {
      validateSingleFormGroup(e.srcElement.parentElement.parentElement);
    });
  });

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    validateAllFormGroups();
  });
};

validateForm("#registrationForm");
