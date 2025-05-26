
/**
 * Pi Network Logger - Centralized logging for Pi SDK operations
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';
type LogCategory = 'auth' | 'payment' | 'ad' | 'browser' | 'init' | 'general';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  data?: any;
  error?: Error;
}

class PiLogger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  private createLogEntry(
    level: LogLevel,
    category: LogCategory,
    message: string,
    data?: any,
    error?: Error
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data,
      error
    };
  }

  private addLog(entry: LogEntry) {
    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Console output with formatting
    const prefix = `[Pi-${entry.category.toUpperCase()}]`;
    const timestamp = entry.timestamp.split('T')[1].split('.')[0];
    
    switch (entry.level) {
      case 'error':
        console.error(`${prefix} ${timestamp}:`, entry.message, entry.data || '', entry.error || '');
        break;
      case 'warn':
        console.warn(`${prefix} ${timestamp}:`, entry.message, entry.data || '');
        break;
      case 'debug':
        console.debug(`${prefix} ${timestamp}:`, entry.message, entry.data || '');
        break;
      default:
        console.log(`${prefix} ${timestamp}:`, entry.message, entry.data || '');
    }
  }

  info(message: string, data?: any) {
    this.addLog(this.createLogEntry('info', 'general', message, data));
  }

  warn(message: string, data?: any) {
    this.addLog(this.createLogEntry('warn', 'general', message, data));
  }

  error(message: string, error?: Error, data?: any) {
    this.addLog(this.createLogEntry('error', 'general', message, data, error));
  }

  debug(message: string, data?: any) {
    this.addLog(this.createLogEntry('debug', 'general', message, data));
  }

  // Category-specific loggers
  auth(message: string, data?: any, extra?: any) {
    this.addLog(this.createLogEntry('info', 'auth', message, { ...data, ...extra }));
  }

  payment(message: string, data?: any) {
    this.addLog(this.createLogEntry('info', 'payment', message, data));
  }

  ad(message: string, data?: any) {
    this.addLog(this.createLogEntry('info', 'ad', message, data));
  }

  browser(message: string, data?: any) {
    this.addLog(this.createLogEntry('info', 'browser', message, data));
  }

  // Get logs for debugging
  getLogs(category?: LogCategory, level?: LogLevel): LogEntry[] {
    return this.logs.filter(log => {
      if (category && log.category !== category) return false;
      if (level && log.level !== level) return false;
      return true;
    });
  }

  // Export logs for debugging
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Clear logs
  clearLogs() {
    this.logs = [];
  }
}

// Export singleton instance
const logger = new PiLogger();
export default logger;
