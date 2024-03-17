
export enum contentTab {
  HOME = 'HOME',
  EMPLOYEE = 'EMPLOYEE',
  DOCUMENT = 'DOCUMENT',
  DUTY = 'DUTY',
  LINK = 'LINK',
  ADMIN = 'ADMIN'
}

export const contextTabRender = new Map([
  [contentTab.HOME, 'Aktualności'],
  [contentTab.EMPLOYEE, 'Współpracownicy'],
  [contentTab.DOCUMENT, 'Dokumenty'],
  [contentTab.DUTY, 'Dyżury'],
  [contentTab.LINK, 'Sieć'],
  [contentTab.ADMIN, 'Ustawienia']
]);
