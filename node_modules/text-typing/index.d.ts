// Type definitions for [text-typing]
// Project: [text-typing]
// Definitions by: [John Kapantzakis] <[https://github.com/kapantzak]>

export as namespace TTP;
export = textTyping;

declare function textTyping(elem: HTMLElement, options: TTP.defaultOptions): TTP.ITextTyping;

declare namespace TTP {
    export interface IDefaultOptions {
        speed?: number | number[];
        cursor?: string;
    }
    export interface ITextTyping {
        typeText?: (text: string, speed?: number | number[]) => Promise<TTP.textTyping>;
        lineBreak?: () => Promise<TTP.textTyping>;
        injectHTML?: (htmlElement: HTMLElement, speed: number | number[]) => Promise<TTP.textTyping>;
        delete?: (iterations: number, speed?: number | number[]) => Promise<TTP.textTyping>;
        backspace?: (iterations: number, speed?: number | number[]) => Promise<TTP.textTyping>;
        moveCursor?: (point: string) => Promise<TTP.textTyping>;
    }    
}