import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import ErrorBoundary from './services/errorBoundary.ts'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { LanguageContext, LanguageProvider } from './contexts/LangContext.tsx'
import React from 'react'
import { IntlProvider } from 'react-intl'

const Root = () => {
  const { locale, messages } = React.useContext(LanguageContext);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <App/>
    </IntlProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<p>Ha ocurrido un error inesperado.</p>}>
    <Provider store={store}>
      <LanguageProvider>
        <Root />
      </LanguageProvider>
    </Provider>
  </ErrorBoundary>
)
