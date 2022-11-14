export const validate = (input) => {
  let errors = {};

  if (!input.name) {
    errors.name = "*Name is required";
  } else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
    errors.name = "*Name only accept letters";
  }

  if (!input.healthScore) {
    errors.healthScore = "*Health score is required";
  } else if (!/^\d+$/.test(input.healthScore)) {
    errors.healthScore = "*Only accept numbers";
  } else if (input.healthScore < 0 || input.healthScore > 100) {
    errors.healthScore = "*Numbers (1 to 100)";
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
  } else if (!/^\d+$/.test(input.readyInMinutes)) {
    errors.readyInMinutes = "*Only accepts numbers";
  }

  if (!input.dishTypes) {
    errors.dishTypes = "*Dish type is required";
  }else if (/^\d+$/.test(input.dishTypes)){
    errors.dishTypes = "*Numbers not accepted"
  }

  if (!input.image) {
    errors.image = "*URL is required";
  }else if(
    !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(input.image)
  )errors.image ="*Insert a valid URL: https:// or http:// or www."

  return errors
};
