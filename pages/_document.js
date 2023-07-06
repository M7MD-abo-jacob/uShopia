import { Html, Head, Main, NextScript } from "next/document";

const MyDocument = ({ __NEXT_DATA__: { locale } }) => {
  return (
    <Html dir="ltr" lang={locale}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" />
        <meta
          name="keywords"
          content="uShopia, online store, ecommerce, electronics, fashion, goods"
        />
        <meta name="author" content="Mohammad Kikhia" />
        <meta name="robots" content="index,follow" />
        <meta property="og:site_name" content="uShopia" />
        <meta property="og:url" content="https://u-shopia.vercel.app/" />
      </Head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              // getting and setting light / dark theme
              function setTheme(newTheme) {
                window.__theme = newTheme;
                if (newTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                  // document.documentElement.setAttribute("data-bs-theme", "light");
                } else if (newTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  // document.documentElement.setAttribute("data-bs-theme", "dark");
                }
              }
              
              var preferredTheme;
    
              try {
                preferredTheme = localStorage.getItem('theme');
              } catch (err) { }
              
              window.__setPreferredTheme = function(newTheme) {
                preferredTheme = newTheme;
                setTheme(newTheme);
                try {
                  localStorage.setItem('theme', newTheme);
                } catch (err) { }
              };
              
              var initialTheme = preferredTheme;
              var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
              if (!initialTheme) {
                initialTheme = darkQuery.matches ? 'dark' : 'light';
              }
              setTheme(initialTheme);
    
              darkQuery.addEventListener('change', function (e) {
                if (!preferredTheme) {
                  setTheme(e.matches ? 'dark' : 'light');
                }
              });
            })();
              `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
