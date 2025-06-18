// src/app/utils/cookie.utils.ts

/**
 * Utility functions for handling cookies in Angular 19 SSR
 * Works in both server-side and client-side contexts
 * Updated for Angular 19's SSR implementation
 */

import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PLATFORM_ID, inject, InjectionToken } from '@angular/core';

// Define injection tokens for REQUEST and RESPONSE
// These replace the deprecated @nguniversal/express-engine/tokens
export const REQUEST = new InjectionToken<Request>('REQUEST');
export const RESPONSE = new InjectionToken<Response>('RESPONSE');

/**
 * Cookie options interface
 */
export interface CookieOptions {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
  maxAge?: number;
}

/**
 * Default cookie options
 */
const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  path: '/',
  sameSite: 'lax',
  secure: true,
};

/**
 * Cookie service for Angular 19 with SSR support
 */
export class CookieUtils {
  private platformId = inject(PLATFORM_ID);
  private request = isPlatformServer(this.platformId) ? inject(REQUEST, { optional: true }) : null;
  private response = isPlatformServer(this.platformId) ? inject(RESPONSE, { optional: true }) : null;

  /**
   * Get a cookie by name
   * @param name Cookie name
   * @returns Cookie value or null if not found
   */
  getCookie(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.getClientCookie(name);
    } else if (isPlatformServer(this.platformId)) {
      return this.getServerCookie(name);
    }
    return null;
  }

  /**
   * Set a cookie
   * @param name Cookie name
   * @param value Cookie value
   * @param options Cookie options
   */
  setCookie(name: string, value: string, options: CookieOptions = {}): void {
    const cookieOptions = { ...DEFAULT_COOKIE_OPTIONS, ...options };

    if (isPlatformBrowser(this.platformId)) {
      this.setClientCookie(name, value, cookieOptions);
    } else if (isPlatformServer(this.platformId)) {
      this.setServerCookie(name, value, cookieOptions);
    }
  }

  /**
   * Delete a cookie
   * @param name Cookie name
   * @param options Cookie options
   */
  deleteCookie(name: string, options: CookieOptions = {}): void {
    const cookieOptions = { ...DEFAULT_COOKIE_OPTIONS, ...options };
    
    // Set expiration to past date to delete the cookie
    const deleteOptions = {
      ...cookieOptions,
      expires: new Date(0),
    };

    if (isPlatformBrowser(this.platformId)) {
      this.setClientCookie(name, '', deleteOptions);
    } else if (isPlatformServer(this.platformId)) {
      this.setServerCookie(name, '', deleteOptions);
    }
  }

  /**
   * Check if a cookie exists
   * @param name Cookie name
   * @returns True if cookie exists
   */
  hasCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }

  /**
   * Get all cookies
   * @returns Object with all cookies
   */
  getAllCookies(): Record<string, string> {
    if (isPlatformBrowser(this.platformId)) {
      return this.getAllClientCookies();
    } else if (isPlatformServer(this.platformId)) {
      return this.getAllServerCookies();
    }
    return {};
  }

  // Private methods for client-side cookie handling
  private getClientCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  private setClientCookie(name: string, value: string, options: CookieOptions): void {
    let cookieString = `${name}=${encodeURIComponent(value)}`;

    if (options.expires) {
      if (typeof options.expires === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        options.expires = date;
      }
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }

    if (options.maxAge) {
      cookieString += `; max-age=${options.maxAge}`;
    }

    if (options.path) {
      cookieString += `; path=${options.path}`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
      cookieString += '; secure';
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
  }

  private getAllClientCookies(): Record<string, string> {
    const result: Record<string, string> = {};
    const cookies = document.cookie.split(';');
    
    for (const cookie of cookies) {
      if (cookie.trim()) {
        const [name, value] = cookie.trim().split('=');
        result[name] = decodeURIComponent(value);
      }
    }
    
    return result;
  }

  // Private methods for server-side cookie handling
  private getServerCookie(name: string): string | null {
    if (!this.request) return null;
    
    // Access cookies from the request object
    // This approach works with Express and similar frameworks
    const req = this.request as any;
    const cookies = req.cookies || this.parseCookies(req.headers?.cookie);
    
    return cookies && name in cookies ? cookies[name] : null;
  }

  private setServerCookie(name: string, value: string, options: CookieOptions): void {
    if (!this.response) return;
    
    const res = this.response as any;
    
    // Check if response has cookie method (Express-like)
    if (typeof res.cookie === 'function') {
      res.cookie(name, value, options);
    } else {
      // Fallback: set header directly
      const cookieValue = this.serializeCookie(name, value, options);
      const currentCookies = res.getHeader('Set-Cookie') || [];
      const cookies = Array.isArray(currentCookies) ? [...currentCookies, cookieValue] : [currentCookies.toString(), cookieValue];
      res.setHeader('Set-Cookie', cookies);
    }
  }

  private getAllServerCookies(): Record<string, string> {
    if (!this.request) return {};
    
    const req = this.request as any;
    return req.cookies || this.parseCookies(req.headers?.cookie);
  }

  // Helper methods for parsing and serializing cookies
  private parseCookies(cookieHeader?: string): Record<string, string> {
    if (!cookieHeader) return {};
    
    return cookieHeader.split(';').reduce((cookies, cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name) cookies[name] = decodeURIComponent(value || '');
      return cookies;
    }, {} as Record<string, string>);
  }

  private serializeCookie(name: string, value: string, options: CookieOptions): string {
    let cookieString = `${name}=${encodeURIComponent(value)}`;

    if (options.expires) {
      if (typeof options.expires === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        options.expires = date;
      }
      cookieString += `; Expires=${options.expires.toUTCString()}`;
    }

    if (options.maxAge) {
      cookieString += `; Max-Age=${options.maxAge}`;
    }

    if (options.path) {
      cookieString += `; Path=${options.path}`;
    }

    if (options.domain) {
      cookieString += `; Domain=${options.domain}`;
    }

    if (options.secure) {
      cookieString += '; Secure';
    }

    if (options.sameSite) {
      cookieString += `; SameSite=${options.sameSite}`;
    }

    if (options.httpOnly) {
      cookieString += '; HttpOnly';
    }

    return cookieString;
  }
}
