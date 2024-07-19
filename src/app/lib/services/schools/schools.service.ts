import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse, Pagination } from '@lib/constants';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SchoolsService implements OnDestroy {
  private _http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}schools`;

  ngOnDestroy(): void {
    console.error('Method not implemented.');
  }

  get(pagination?: Pagination): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(
      `${this.apiUrl}?_page=${pagination?.page || 1}&_per_page=${pagination?.perPage || 10}`,
    );
  }

  create(data: { name: string }): Observable<void> {
    return this._http.post<void>(this.apiUrl, data);
  }
}
