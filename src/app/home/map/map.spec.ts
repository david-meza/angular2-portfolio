import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';


import {MapService} from './map.service';

describe('Map', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    Map
  ]);


  it('should have http', inject([ Map ], (map) => {
    expect(!!map.http).toEqual(true);
  }));

  it('should get data from the server', inject([ Map ], (map) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    map.getData();
    expect(console.log).toHaveBeenCalled();
    expect(map.getData()).toEqual({ value: 'AngularClass' });
  }));

});
