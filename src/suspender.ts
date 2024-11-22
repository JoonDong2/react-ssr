import { PropsWithChildren, useRef } from "react";

type Status = "pending" | "rejected" | "fulfilled";
export interface DehydratedPromise<T> {
  value: T;
  status: Status;
}

export class Suspender<T> {
  private static cache = new Map<
    string | undefined | null,
    Suspender<unknown>
  >();

  static get(key?: string | null, delay = 3000) {
    let suspender = Suspender.cache.get(key);
    if (!suspender) {
      suspender = new Suspender(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(key);
          }, delay);
        })
      );
      Suspender.cache.set(key, suspender);
    }
    return suspender;
  }

  static values() {
    return Array.from(Suspender.cache).map(([key, suspender]) => {
      return [key, { value: suspender.value, status: suspender.status }];
    });
  }

  static init(entries: [string, DehydratedPromise<unknown>][]) {
    Suspender.cache = new Map(
      entries.map(([key, dehydratedPromise]) => [
        key,
        new Suspender(dehydratedPromise),
      ])
    );
  }

  status: Status = "pending";
  value: T | undefined;
  promise: Promise<T>;

  constructor(promise: Promise<T> | DehydratedPromise<T>) {
    if (promise instanceof Promise) {
      this.promise = promise;
      promise.then(
        (result) => {
          this.status = "fulfilled";
          this.value = result;
        },
        (reason) => {
          this.status = "rejected";
          this.value = reason;
        }
      );
    } else if (promise.status === "fulfilled") {
      this.promise = Promise.resolve(promise.value);
      this.value = promise.value;
      this.status = "fulfilled";
    } else {
      this.promise = Promise.reject(promise.value);
    }
  }

  read() {
    if (this.status === "fulfilled") {
      return this.value;
    } else if (this.status === "rejected") {
      throw this.value;
    } else if (this.status === "pending") {
      throw this.promise;
    }
  }
}

export const SuspenderProvider = ({ children }: PropsWithChildren) => {
  const prev = useRef<[string, DehydratedPromise<unknown>]>();
  const suspenderCache = (globalThis.window as any)?.__SUSPENDER_CACHE__;
  if (suspenderCache && prev.current !== suspenderCache) {
    Suspender.init(suspenderCache);
    prev.current = suspenderCache;
  }

  return children;
};
