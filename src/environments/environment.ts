// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dbApi: "http://localhost:3000",
  spellCheckerAPI: 'https://speller.yandex.net/services/spellservice.json/checkText',
  originalityCheckerAPI: 'http://api.text.ru/post',
  originalityCheckerKey: ''
};

