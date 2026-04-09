declare namespace JSX {
  interface IntrinsicElements {
    'komoju-fields': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        'session-id'?: string;
        'publishable-key'?: string;
        'payment-type'?: string;
        locale?: string;
      },
      HTMLElement
    >;
    'komoju-picker': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
