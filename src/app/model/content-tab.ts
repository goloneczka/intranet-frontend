
export enum contentTab {
  HOME = 'HOME',
  EMPLOYEE = 'EMPLOYEE',
  DOCUMENT = 'DOCUMENT'
}

export const contextTabRender = new Map([
  [contentTab.HOME, 'Aktualności'],
  [contentTab.EMPLOYEE, 'Współpracownicy'],
  [contentTab.DOCUMENT, 'Dokumenty']
]);
