import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { Environments } from 'app/_shared/environments/environments';
import { finalize, Observable, Subscription } from 'rxjs';
import { LoadingService } from './loading.service';


@Injectable()
export class ProductsService implements OnDestroy {
  private subscription: Subscription = new Subscription();
  http : HttpClient = inject(HttpClient)
  loadingService: LoadingService = inject(LoadingService)
  constructor() { }
  getProducts(productPage:number = 1): Observable<any> {
    const params = new HttpParams()
      .set('consumer_key', Environments.consumerKey)
      .set('consumer_secret', Environments.consumerSecret)
      .set('per_page', '20')
      .set('page', productPage.toString());
      this.loadingService.showLoading();
    const request = this.http.get(`${Environments.baseUrl}/products`, { params }).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
    return request;
  }
  getProduct(productId:string): Observable<any> {
    const params = new HttpParams()
      .set('consumer_key', Environments.consumerKey)
      .set('consumer_secret', Environments.consumerSecret)
      this.loadingService.showLoading();
    const request = this.http.get(`${Environments.baseUrl}/products/${productId}`, { params }).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
    return request;
  }
  getCategories(): Observable<any> {
    const params = new HttpParams()
      .set('consumer_key', Environments.consumerKey)
      .set('consumer_secret', Environments.consumerSecret)
      .set('per_page', '60');
      this.loadingService.showLoading();
    const request = this.http.get(`${Environments.baseUrl}/products/categories`, { params }).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
    return request;
  }
  getProductsByCategory(categoryId:string = ""): Observable<any> {
    const params = new HttpParams()
      .set('consumer_key', Environments.consumerKey)
      .set('consumer_secret', Environments.consumerSecret)
      .set('per_page', '20')
      .set('category', categoryId);
      this.loadingService.showLoading();
    const request = this.http.get(`${Environments.baseUrl}/products`, { params }).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
    return request;
  }
  getRelatedProducts(productIds:number[]): Observable<any> {
    const params = new HttpParams()
      .set('consumer_key', Environments.consumerKey)
      .set('consumer_secret', Environments.consumerSecret)
      .set('include' , productIds.join(','));
      this.loadingService.showLoading();
    const request = this.http.get(`${Environments.baseUrl}/products`, { params }).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
    return request;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

