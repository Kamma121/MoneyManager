import {MatSnackBar} from "@angular/material/snack-bar";

export function displaySuccessSnackBar(snackBar: MatSnackBar, message: string): void {
  snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['success-snackbar']
  });
}

export function displayErrorSnackBar(snackBar: MatSnackBar, message: string): void {
  snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['error-snackbar']
  });
}

export function displayNoDataToExportSnackBar(snackBar: MatSnackBar): void {
  snackBar.open('No data to export', 'Close', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['error-snackbar']
  });
}

export function isSameMonthAndYear(date1: string | Date | null, date2: Date): boolean {
  if (date1 === null) {
    return false;
  }
  const d1 = new Date(date1);
  return d1.getMonth() === date2.getMonth() && d1.getFullYear() === date2.getFullYear();
}

export function displayMonthYear(currentDate: Date): string {
  const month: string = currentDate.toLocaleString('en-US', {month: 'long'});
  const year: number = currentDate.getFullYear();
  return `${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
}

export function sortByDate(array: any[]) {
  array.sort((a, b) => {
    if (a.date === null) return 1;
    if (b.date === null) return -1;
    const dateA = a.date instanceof Date ? a.date : new Date(a.date);
    const dateB = b.date instanceof Date ? b.date : new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
}
