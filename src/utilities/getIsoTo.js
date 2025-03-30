import countries from "i18n-iso-countries";
import countriesEN from "i18n-iso-countries/langs/en.json";
import languages from "@cospired/i18n-iso-languages";
import languagesEN from "@cospired/i18n-iso-languages/langs/en.json";
countries.registerLocale(countriesEN);
languages.registerLocale(languagesEN);

export function getCountryName(countryCode) {
  return countries.getName(countryCode, "en");
}

export function getLanguageName(languageCode) {
  return languages.getName(languageCode, "en");
}
