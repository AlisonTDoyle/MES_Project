import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import Clock from './clock'
 
beforeEach(() => {
  jest.useFakeTimers();
});
 
afterEach(() => {
  jest.useRealTimers();
});
 
describe("Clock", () => {
  it("renders a time string on mount", () => {
    render(<Clock />);
    expect(screen.getByText(/\d{1,2}:\d{2}:\d{2}/)).toBeInTheDocument();
  });
 
  it("displays the current time using toLocaleTimeString", () => {
    const mockDate = new Date("2024-01-01T13:05:07");
    jest.setSystemTime(mockDate.getTime());
 
    render(<Clock />);
 
    expect(screen.getByText(mockDate.toLocaleTimeString())).toBeInTheDocument();
  });
 
  it("clears the interval on unmount", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
 
    const { unmount } = render(<Clock />);
    unmount();
 
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
 
    clearIntervalSpy.mockRestore();
  });
 
  it("renders inside a span element", () => {
    render(<Clock />);
    const span = screen.getByText(/\d{1,2}:\d{2}:\d{2}/);
    expect(span.tagName).toBe("SPAN");
  });
});