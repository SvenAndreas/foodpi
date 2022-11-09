export const validate = (input) => {
  let errors = {};

  if (!input.name) {
    errors.name = "*Name is required";
  } else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
    errors.name = "*Name only accept letters";
  }

  if (!input.healthScore) {
    errors.healthScore = "*Health score is required";
  } else if (!/[0-9]/.test(input.healthScore)) {
    errors.healthScore = "*Health score only accept numbers";
  } else if (input.healthScore < 0 || input.healthScore > 100) {
    errors.healthScore = "*Only numbers between 1 and 100";
  }

  if (!input.analyzedInstructions) {
    errors.analyzedInstructions = "*Instructions are required";
  } else if (input.analyzedInstructions.length > 1000)
    errors.analyzedInstructions = "*Max characters exeeded (1000)";

  if (input.diets.length === 0) {
    errors.diets = "*Select a diet";
  }

  if (!input.summary) {
    errors.summary = "*Summary is required";
  }

  if (!input.readyInMinutes) {
    errors.readyInMinutes = "*Minutes are required";
  } else if (!/[0-9]/.test(input.readyInMinutes)) {
    errors.readyInMinutes = "*Minutes only accepts numbers";
  }

  if (!input.dishTypes) {
    errors.dishTypes = "*Dish type is required";
  }

  if (!input.image) {
    errors.image = "*URL is required";
  }

  return errors
};
