export const validateUpdate = (input) => {
    let errors = {};
  
    if (!/^[a-zA-Z\s]*$/.test(input.name)) {
      errors.name = "*Name only accept letters";
    }
  
     if (input.healthScore.length > 0 && !/^\d+$/.test(input.healthScore)) {
      errors.healthScore = "*Only accept numbers";
    } else if (input.healthScore.length > 0 &&( input.healthScore <= 0 || input.healthScore > 100)) {
      errors.healthScore = "*Numbers (1 to 100)"}
  
    if (input.analyzedInstructions.length > 1000)
      errors.analyzedInstructions = "*Max characters exeeded (1000)";
  
  
    if (input.readyInMinutes.length > 0 && !/^\d+$/.test(input.readyInMinutes)) {
      errors.readyInMinutes = "*Only accepts numbers";
    } else if (input.readyInMinutes.length > 0 && input.readyInMinutes <= 0){
      errors.readyInMinutes = "*Must be a value greater than 0"
    }
  
    if (/^\d+$/.test(input.dishTypes)){
      errors.dishTypes = "*Numbers not accepted"
    }
  
    if(input.image.length > 0 &&
      !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(input.image)
    )errors.image ="*Insert a valid URL: https:// or http:// or www."
  
    return errors
  };