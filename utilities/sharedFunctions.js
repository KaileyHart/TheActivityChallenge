 export const formatLowerCase = (value) => {

    let lowerCaseValue = "";

    if (value !== "" || value !== undefined || value !== null) {

      lowerCaseValue = formatToString(value).toLowerCase();

    };

    return lowerCaseValue;

  };


 export const formatTrim = (value) => {

    let trimValue = "";

    if (value !== "" || value !== undefined || value !== null) {

      trimValue = formatToString(value).toLowerCase();

    };

    return trimValue;

  };

  
  export const formatToString = (value) => {

    let toStringValue = "";

    if (value !== "" || value !== undefined || value !== null) {

      toStringValue = value.toString();

    };

    return toStringValue;

  };


  export const formatSearchInput = (value) => {

    let formattedSearchInput = "";

    if (value !== "" || value !== undefined || value !== null) {

      formattedSearchInput = formatTrim(value).toLowerCase();

    };

    return formattedSearchInput;

  };