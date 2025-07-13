// Browser extensions type definitions

// Safari/iOS-specific extensions to Navigator interface
interface NavigatorStandalone {
  /**
   * Indicates whether the browser is running in standalone mode
   * This property is specific to iOS Safari when a website is added to the home screen
   */
  standalone?: boolean;
}

// Extend the Navigator interface with Safari/iOS specific properties
interface Navigator extends NavigatorStandalone {}

// Media Query extensions for PWA display modes
interface MediaQueryList {
  /**
   * Matches when the application is running in a specific display mode
   * Common values include: 'browser', 'standalone', 'minimal-ui', 'fullscreen'
   */
  matches: boolean;
}

// Add specific display-mode media query
interface Window {
  /**
   * matchMedia method with support for PWA display-mode queries
   */
  matchMedia(query: string): MediaQueryList;
}
