import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'storedEmail',
  standalone: true
})
export class StoredEmailPipe implements PipeTransform {
  transform(_: any = null): string | null {
    return localStorage.getItem('email');
  }
}
