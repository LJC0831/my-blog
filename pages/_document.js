import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <noscript><link rel="stylesheet" href="/assets/css/noscript.css" /></noscript>
        <Head />
          <Main />
          <NextScript />
      </Html>
    );
  }
}

export default MyDocument;