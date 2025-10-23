import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'storedUsername',
  standalone: true
})
export class StoredUsernamePipe implements PipeTransform {
  transform(_: any = null): string | null {
    return localStorage.getItem('username');
  }
}
