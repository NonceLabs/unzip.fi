import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import localeTrans from '@locales/index'

const isClient = () => {
  return typeof window !== 'undefined'
}

export type LocaleSafe = Exclude<__localeType, null>

export type WithLocaleProps = {
  forwardRef: React.Ref<any>
  locale: LocaleSafe
  t: TranslationPipe
}

export const LOCALES: Record<Uppercase<LocaleSafe>, LocaleSafe> = {
  EN: 'en',
  ZH: 'zh',
}

export type ExcludeLocalePropsProps<P> = Pick<
  P,
  Exclude<keyof P, keyof WithLocaleProps>
>

export const getStaticLocale = (): LocaleSafe => {
  if (isClient()) {
    const isZH = `${navigator.language}`.toLowerCase().includes('zh')
    return isZH ? LOCALES.ZH : LOCALES.EN
  }
  return LOCALES.EN
}

export type TranslationPipe = (key: string, ...args: Array<unknown>) => string

const getTranslateFunction = (
  zhJson,
  enJson,
  locale: LocaleSafe
): TranslationPipe => {
  let trans: any = null
  return (key, ...args) => {
    if (!trans) {
      trans = locale === 'zh' ? zhJson : enJson
    }
    const splitKey = key && key.split('.')
    let value = _.get(trans, splitKey)
    if (args.length) {
      let i = 0
      if (value) {
        value = value.replace(/\$s/gi, () => {
          const o = args[i] || ''
          i++
          return o
        })
      }
    }

    return value || key
  }
}

export const memoTransResults: Record<LocaleSafe, TranslationPipe> = {
  en: getTranslateFunction(
    localeTrans.zhTrans,
    localeTrans.enTrans,
    LOCALES.EN
  ),
  zh: getTranslateFunction(
    localeTrans.zhTrans,
    localeTrans.enTrans,
    LOCALES.ZH
  ),
}

export const useLocale = (): [LocaleSafe, TranslationPipe] => {
  let mounted = true
  const [state, setState] = useState<LocaleSafe>(() => getStaticLocale())
  const locale = getStaticLocale()
  const t = useMemo<TranslationPipe>(
    () => memoTransResults[state] || memoTransResults[LOCALES.EN],
    [state]
  )

  useEffect(() => {
    if (!mounted) return
    if (locale) {
      setState(locale)
      return
    }
    if (isClient()) {
      setState(getStaticLocale())
    }
    return () => {
      mounted = false
    }
  }, [locale])

  /**
   * Some codes that canno be refactoted exists in file: /applications/src/modules/exchange/MainArea/validations
   * They use external libraries and do not facilitate changes to the execution context,
   * so here we sync "t" to "window".
   *
   * Please do not use "window.t" in any new code.
   * If you have refactored the code of module "MainArea/validations", please remove here.
   */
  useEffect(() => {
    if (!isClient() || !mounted) return
    ;(window as any).t = t
    return () => {
      mounted = false
    }
  }, [locale, t])

  return [state, t]
}

const withLocale = <P,>(Component: React.ComponentType<P>) => {
  const forwardComponent = React.forwardRef<any, ExcludeLocalePropsProps<P>>(
    (props: P, ref: React.RefObject<any>) => {
      const [locale, t] = useLocale()

      return useMemo(() => {
        return <Component {...props} locale={locale} t={t} ref={ref} />
      }, [props, ref, Component, locale, t])
    }
  )

  if (
    typeof process !== 'undefined' &&
    process?.env?.NODE_ENV !== 'production'
  ) {
    const name = Component.displayName || Component.name || 'Unknown'
    forwardComponent.displayName = `withLocale${name}`
  }

  return React.memo(forwardComponent)
}

export default withLocale
