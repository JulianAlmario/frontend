// Performance monitoring utilities
export interface PerformanceMetrics {
  navigationTiming?: PerformanceNavigationTiming;
  resourceLoadTimes?: ResourceLoadTime[];
  pageLoadTime?: number;
  domContentLoaded?: number;
  firstPaint?: number;
  firstContentfulPaint?: number;
}

export interface ResourceLoadTime {
  name: string;
  duration: number;
  size?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: PerformanceObserver[] = [];

  startMonitoring() {
    this.collectNavigationTiming();
    this.observeResourceLoading();
    this.observePaintTiming();
  }

  stopMonitoring() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  private collectNavigationTiming() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.navigationTiming = navigation;
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      }
    }
  }

  private observeResourceLoading() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceResourceTiming[];
        this.metrics.resourceLoadTimes = entries.map(entry => ({
          name: entry.name.split('/').pop() || entry.name,
          duration: Math.round(entry.duration),
          size: entry.transferSize
        }));
      });
      
      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    }
  }

  private observePaintTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformancePaintTiming[];
        entries.forEach(entry => {
          if (entry.name === 'first-paint') {
            this.metrics.firstPaint = Math.round(entry.startTime);
          } else if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = Math.round(entry.startTime);
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  logMetrics() {
    console.log('📊 Performance Metrics:', {
      pageLoadTime: `${this.metrics.pageLoadTime}ms`,
      domContentLoaded: `${this.metrics.domContentLoaded}ms`,
      firstPaint: `${this.metrics.firstPaint}ms`,
      firstContentfulPaint: `${this.metrics.firstContentfulPaint}ms`,
      resources: this.metrics.resourceLoadTimes?.slice(0, 5)
    });
  }

  // Navigation performance tracking
  trackNavigationStart() {
    sessionStorage.setItem('navigationStart', Date.now().toString());
  }

  trackNavigationEnd() {
    const start = sessionStorage.getItem('navigationStart');
    if (start) {
      const duration = Date.now() - parseInt(start);
      console.log(`🚀 Navigation completed in ${duration}ms`);
      sessionStorage.removeItem('navigationStart');
      
      // Report slow navigations
      if (duration > 1000) {
        console.warn(`⚠️ Slow navigation detected: ${duration}ms`);
      }
    }
  }
}

// Cache management utilities
export class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  set(key: string, data: any, ttl: number = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > cached.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }

  clearExpired() {
    const now = Date.now();
    for (const [key, cached] of this.cache.entries()) {
      if (now - cached.timestamp > cached.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Resource preloader
export class ResourcePreloader {
  private preloadedResources: Set<string> = new Set();

  async preloadImage(src: string): Promise<void> {
    if (this.preloadedResources.has(src)) return;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  async preloadImages(sources: string[]): Promise<void> {
    const promises = sources.map(src => this.preloadImage(src));
    await Promise.allSettled(promises);
  }

  preloadData(url: string): void {
    if (this.preloadedResources.has(url)) return;

    fetch(url, { method: 'GET', credentials: 'same-origin' })
      .then(() => this.preloadedResources.add(url))
      .catch(console.warn);
  }
}

// Export singleton instances
export const performanceMonitor = new PerformanceMonitor();
export const cacheManager = CacheManager.getInstance();
export const resourcePreloader = new ResourcePreloader();

// Initialize performance monitoring
document.addEventListener('astro:page-load', () => {
  performanceMonitor.trackNavigationEnd();
  performanceMonitor.startMonitoring();
  
  // Log metrics after a short delay to allow full page load
  setTimeout(() => {
    performanceMonitor.logMetrics();
  }, 1000);
});

document.addEventListener('astro:before-swap', () => {
  performanceMonitor.trackNavigationStart();
});